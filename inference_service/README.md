# Pneumonia Detection Inference Service

FastAPI service that loads a ResNet50 PyTorch model (`.pth`) and serves binary pneumonia predictions.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Place your trained model weights in this directory as `best_resnet50_pneumonia.pth`.
   - If your file has a different name, update `MODEL_PATH` in `main.py`.

3. Run the service:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## API

- `POST /predict` – upload an image file (`multipart/form-data` field `image`). Returns:
  ```json
  {
    "label": "PNEUMONIA",
    "confidence": 0.92
  }
  ```

The service now runs an initial X-ray validator (ResNet18) before pneumonia prediction. When the validator accepts the image, the response will include extra fields:

```json
{
   "label": "PNEUMONIA",
   "confidence": 0.92,
   "validator_label": "xray",
   "validator_confidence": 0.95
}
```

- `GET /` – health check (returns device used).

## Notes

- Accepts common image formats (JPEG, PNG). Converts to RGB before inference.
- Uses ImageNet normalization as required for pretrained ResNet50.
- Returns the softmax confidence for the predicted class.
 - The X-ray validator weights should be placed as `xray_validator_best.pth` in this folder.
 - You can adjust the validator acceptance threshold via the `VALIDATOR_THRESHOLD` environment variable (default `0.9`). Example:

```bash
VALIDATOR_THRESHOLD=0.85 uvicorn main:app --host 0.0.0.0 --port 8000
```

 - The Node backend forwards validator errors (HTTP 400) and includes validator diagnostics in successful responses.
