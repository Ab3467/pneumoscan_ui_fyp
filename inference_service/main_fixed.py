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

# Preprocessing for the ResNet50 pneumonia model
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

CLASS_NAMES = ["NORMAL", "PNEUMONIA"]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print("=== NEW PREDICTION REQUEST ===")
    try:
        # Read image
        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        input_tensor = preprocess(img).unsqueeze(0).to(device)

        print(f"Image loaded: {img.size}")

        print("Running pneumonia detection...")
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
            "heatmap": f"data:image/jpeg;base64,{heatmap_base64}"
        }

    except Exception as e:
        print(f"❌ Error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

@app.get("/")
def health():
    return {"status": "ok", "device": str(device), "models": "ResNet50"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
