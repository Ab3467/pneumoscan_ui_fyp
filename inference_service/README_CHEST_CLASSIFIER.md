# Chest X-ray Classifier for PneumoScan

This directory contains the inference service with a two-stage classification pipeline:

1. **Chest X-ray Detection**: DenseNet121 model that verifies if the uploaded image is actually a chest X-ray
2. **Pneumonia Detection**: ResNet50 model that analyzes chest X-rays for pneumonia (only runs if image passes first stage)

## Model Architecture

### Stage 1: Chest X-ray Classifier (DenseNet121)
- **Purpose**: Binary classification (chest X-ray vs. not chest X-ray)
- **Architecture**: DenseNet121 with modified classifier layer
- **Input**: 224x224 RGB images
- **Output**: Probability scores for both classes

### Stage 2: Pneumonia Detector (ResNet50)
- **Purpose**: Binary classification (normal vs. pneumonia)
- **Architecture**: ResNet50 with modified fully connected layer
- **Input**: 224x224 RGB images (chest X-rays only)
- **Output**: Pneumonia prediction with Grad-CAM heatmap

## Training the Chest X-ray Classifier

### Dataset Preparation

Create a dataset directory with the following structure:

```
chest_xray_dataset/
├── chest_xray/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
└── not_chest_xray/
    ├── image1.jpg
    ├── image2.jpg
    └── ...
```

### Data Sources

For chest X-ray images:
- **NIH Chest X-ray Dataset**: https://nihcc.app.box.com/v/ChestXray-NIHCC
- **ChestX-ray14**: https://nihcc.app.box.com/v/ChestXray-NIHCC/folder/36938765345
- **PadChest**: https://bimcv.cipf.es/bimcv-projects/padchest/

For non-chest X-ray images (negative examples):
- Use images from other medical imaging modalities (MRI, CT, ultrasound)
- General photographs
- Other types of X-rays (dental, extremity, etc.)

### Training

1. Update the `data_dir` path in `train_chest_classifier.py`
2. Run the training script:

```bash
python train_chest_classifier.py
```

The script will:
- Load DenseNet121 with ImageNet weights
- Fine-tune on your dataset
- Save the best model as `chest_xray_classifier.pth`

### Expected Performance

With proper training data (~1000 images per class), you should achieve:
- **Accuracy**: 95%+
- **Precision/Recall**: 90%+ for both classes

## API Usage

### Prediction Endpoint

```bash
POST /predict
Content-Type: multipart/form-data

file: [chest_xray_image]
```

### Response Format

**Valid Chest X-ray:**
```json
{
  "label": "NORMAL" | "PNEUMONIA",
  "confidence": 0.87,
  "is_chest_xray": true,
  "chest_confidence": 0.92,
  "heatmap": "data:image/jpeg;base64,..."
}
```

**Invalid Image (Not a chest X-ray):**
```json
{
  "label": "INVALID_IMAGE",
  "confidence": 0.15,
  "is_chest_xray": false,
  "message": "The uploaded image does not appear to be a chest X-ray...",
  "chest_confidence": 0.15
}
```

## Model Files

- `best_resnet50_pneumonia.pth`: Pre-trained pneumonia detection model
- `chest_xray_classifier.pth`: Chest X-ray classification model (you need to train this)

## Running the Service

```bash
# Install dependencies
pip install -r requirements.txt

# Run the service
python main_fixed.py
# or
uvicorn main_fixed:app --host 0.0.0.0 --port 8000 --reload
```

## Integration with Frontend

The frontend will automatically handle the new response format. Invalid images will show an appropriate error message instead of proceeding to pneumonia analysis.