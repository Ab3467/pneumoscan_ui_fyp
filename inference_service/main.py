from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io

app = FastAPI(title="Pneumonia Detection API", version="1.0")

# Allow frontend (localhost:5173) and backend (localhost:5000) to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device: use GPU if available, else CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Load ResNet50 and adapt for binary classification
model = models.resnet50(weights=None)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 2)  # your .pth expects 'fc.weight'/'fc.bias'

# Load your .pth state dict (replace path if needed)
MODEL_PATH = "best_resnet50_pneumonia.pth"
try:
    state_dict = torch.load(MODEL_PATH, map_location=device)
    model.load_state_dict(state_dict)
    model.to(device)
    model.eval()
    print("Model loaded successfully.")
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Apply softmax in inference instead of embedding it in the model

# Preprocessing: resize to 224x224, ImageNet normalization
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

CLASS_NAMES = ["NORMAL", "PNEUMONIA"]

def is_chest_xray(img: Image.Image) -> bool:
    """Heuristic check: chest X-rays are typically portrait-ish with reasonable dimensions and mostly grayscale."""
    # Disabled: accept all images for now
    return True

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print("Received /predict request")
    try:
        # Read and open image
        print("Reading image bytes...")
        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        if not is_chest_xray(img):
            raise HTTPException(status_code=400, detail="Uploaded image does not appear to be a chest X-ray. Please upload a valid chest X-ray image.")
        input_tensor = preprocess(img).unsqueeze(0).to(device)  # shape: [1, 3, 224, 224]
        print("Image preprocessed, running inference...")

        with torch.no_grad():
            outputs = model(input_tensor)  # raw logits
            probs = torch.nn.functional.softmax(outputs.squeeze(0), dim=0).cpu().numpy()
            pred_idx = int(probs.argmax())
            confidence = float(probs[pred_idx])
            label = CLASS_NAMES[pred_idx]
        print(f"Prediction: {label} ({confidence:.4f})")

        return {"label": label, "confidence": confidence}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print("Error during inference:", e)
        raise HTTPException(status_code=500, detail=f"Inference failed: {e}")

@app.get("/")
def health():
    return {"status": "ok", "device": str(device)}
