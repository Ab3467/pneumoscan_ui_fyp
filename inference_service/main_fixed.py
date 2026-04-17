from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
import cv2
import numpy as np
import base64
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image

app = FastAPI(title="Pneumonia Detection API", version="1.0")

# Allow frontend and backend to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device: use GPU if available, else CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Load DenseNet121 chest X-ray classifier
print("Loading DenseNet121 chest X-ray classifier...")
chest_classifier = models.densenet121(weights=None)
chest_classifier.classifier = nn.Linear(1024, 2)  # Binary classification: chest_xray vs not_chest_xray

try:
    # You'll need to train or download pre-trained weights for chest X-ray classification
    # For now, we'll initialize with random weights - replace with actual trained model
    # chest_classifier.load_state_dict(torch.load("chest_xray_classifier.pth", map_location=device))
    print("⚠️  Chest X-ray classifier initialized with random weights. Please train or load pre-trained weights!")
except Exception as e:
    print(f"⚠️  Chest X-ray classifier not found: {e}. Using random weights.")

chest_classifier.to(device)
chest_classifier.eval()

# Load ResNet50 pneumonia model
print("Loading ResNet50 pneumonia model...")
pneumonia_model = models.resnet50(weights=None)
pneumonia_model.fc = nn.Linear(2048, 2)

try:
    state_dict = torch.load("best_resnet50_pneumonia.pth", map_location=device)
    pneumonia_model.load_state_dict(state_dict)
    print("✅ Pneumonia model loaded!")
except Exception as e:
    print(f"❌ Pneumonia model error: {e}")
    raise

pneumonia_model.to(device)
pneumonia_model.eval()

# Initialize Grad-CAM for pneumonia model
target_layers = [pneumonia_model.layer4[-1]]
cam = GradCAM(model=pneumonia_model, target_layers=target_layers)

# Preprocessing for both models (224x224 is standard for both DenseNet and ResNet)
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

CLASS_NAMES = ["NORMAL", "PNEUMONIA"]
CHEST_CLASSES = ["NOT_CHEST_XRAY", "CHEST_XRAY"]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print("=== NEW PREDICTION REQUEST ===")
    try:
        # Read image
        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        input_tensor = preprocess(img).unsqueeze(0).to(device)

        print(f"Image loaded: {img.size}")

        # Step 1: Check if it's a chest X-ray
        print("Step 1: Checking if image is a chest X-ray...")
        with torch.no_grad():
            chest_outputs = chest_classifier(input_tensor)
            chest_probs = torch.nn.functional.softmax(chest_outputs.squeeze(0), dim=0)
            chest_pred_idx = int(chest_probs.argmax())
            chest_confidence = float(chest_probs[chest_pred_idx])
            is_chest_xray = CHEST_CLASSES[chest_pred_idx] == "CHEST_XRAY"

        print(f"Chest X-ray classification: {CHEST_CLASSES[chest_pred_idx]} ({chest_confidence:.2%} confidence)")

        # If not a chest X-ray, return early
        if not is_chest_xray:
            print("❌ Image is not identified as a chest X-ray. Skipping pneumonia analysis.")
            return {
                "label": "INVALID_IMAGE",
                "confidence": chest_confidence,
                "is_chest_xray": False,
                "message": "The uploaded image does not appear to be a chest X-ray. Please upload a proper chest X-ray image for analysis.",
                "chest_confidence": chest_confidence
            }

        # Step 2: Pneumonia detection with ResNet50 (only if it's a chest X-ray)
        print("Step 2: Running pneumonia detection...")
        with torch.no_grad():
            pneumonia_outputs = pneumonia_model(input_tensor)
            pneumonia_probs = torch.nn.functional.softmax(pneumonia_outputs.squeeze(0), dim=0)
            pred_idx = int(pneumonia_probs.argmax())
            confidence = float(pneumonia_probs[pred_idx])
            label = CLASS_NAMES[pred_idx]

        # Step 3: Generate Grad-CAM Heatmap
        print("Step 3: Generating heatmap...")
        targets = [ClassifierOutputTarget(pred_idx)]

        # Generate grayscale CAM
        grayscale_cam = cam(input_tensor=input_tensor, targets=targets)
        grayscale_cam = grayscale_cam[0, :]

        # Prepare original image for visualization
        rgb_img = np.array(img.resize((224, 224))).astype(np.float32) / 255.0

        # Overlay heatmap on image
        cam_image = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)

        # Convert to BGR for OpenCV encoding, then to base64
        cam_image_bgr = cv2.cvtColor(cam_image, cv2.COLOR_RGB2BGR)
        _, buffer = cv2.imencode('.jpg', cam_image_bgr)
        heatmap_base64 = base64.b64encode(buffer).decode('utf-8')

        print(f"🎯 Result: {label} ({confidence:.2%} confidence)")

        return {
            "label": label,
            "confidence": confidence,
            "is_chest_xray": True,
            "chest_confidence": chest_confidence,
            "heatmap": f"data:image/jpeg;base64,{heatmap_base64}"
        }

    except Exception as e:
        print(f"❌ Error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

@app.get("/")
def health():
    return {
        "status": "ok",
        "device": str(device),
        "models": {
            "chest_classifier": "DenseNet121",
            "pneumonia_detector": "ResNet50"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
