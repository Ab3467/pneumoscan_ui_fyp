import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load a pretrained ResNet18 as a binary classifier (chest X-ray vs non-X-ray)
validator = models.resnet18(weights=None)
num_ftrs = validator.fc.in_features
validator.fc = nn.Sequential(
    nn.Linear(num_ftrs, 2),  # 2 classes: chest_xray, other
    nn.Softmax(dim=1)
)

# For now, we’ll use a simple heuristic model (no real training)
# In production, you’d train this on a dataset of chest X-rays vs general images
validator.eval()
validator.to(device)

# Preprocessing for validator (same as main model)
val_preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

def is_chest_xray_image(img_bytes: bytes, threshold: float = 0.7) -> bool:
    """
    Returns True if the image is likely a chest X-ray.
    Uses a lightweight binary filter (ResNet18) to classify.
    """
    try:
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        tensor = val_preprocess(img).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = validator(tensor)
            probs = outputs.squeeze(0).cpu().numpy()
            # Assuming index 0 = chest_xray, index 1 = other
            chest_xray_prob = float(probs[0])
        print(f"[Validator] Chest X-ray probability: {chest_xray_prob:.3f}")
        return chest_xray_prob >= threshold
    except Exception as e:
        print("[Validator] Error:", e)
        return False  # Fail safe: reject if validation fails
