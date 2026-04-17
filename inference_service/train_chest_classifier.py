"""
Chest X-ray Classification Training Script
Trains a DenseNet121 model to classify images as chest X-rays or not.
"""

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms, datasets
from torch.utils.data import DataLoader, random_split
import os
from PIL import Image
import numpy as np

def create_dataset(data_dir, transform):
    """
    Create a dataset from directory structure:
    data_dir/
        chest_xray/
            image1.jpg
            image2.jpg
            ...
        not_chest_xray/
            image1.jpg
            image2.jpg
            ...
    """
    dataset = datasets.ImageFolder(data_dir, transform=transform)
    return dataset

def train_chest_classifier():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # Data transforms
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(10),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    # Load your dataset
    # Replace 'path/to/your/dataset' with actual path containing chest_xray/ and not_chest_xray/ folders
    data_dir = "path/to/your/dataset"  # Update this path

    if not os.path.exists(data_dir):
        print(f"❌ Dataset directory not found: {data_dir}")
        print("Please create a dataset with the following structure:")
        print("dataset/")
        print("  chest_xray/")
        print("    image1.jpg")
        print("    image2.jpg")
        print("    ...")
        print("  not_chest_xray/")
        print("    image1.jpg")
        print("    image2.jpg")
        print("    ...")
        return

    dataset = create_dataset(data_dir, transform)

    # Split dataset
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

    # Load DenseNet121
    model = models.densenet121(weights=models.DenseNet121_Weights.IMAGENET1K_V1)
    model.classifier = nn.Linear(1024, 2)  # Binary classification
    model.to(device)

    # Loss and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # Training loop
    num_epochs = 10
    best_accuracy = 0.0

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

        train_accuracy = 100 * correct / total
        print(f"Epoch {epoch+1}/{num_epochs}, Loss: {running_loss/len(train_loader):.4f}, Train Acc: {train_accuracy:.2f}%")

        # Validation
        model.eval()
        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()

        val_accuracy = 100 * val_correct / val_total
        print(f"Validation Accuracy: {val_accuracy:.2f}%")

        # Save best model
        if val_accuracy > best_accuracy:
            best_accuracy = val_accuracy
            torch.save(model.state_dict(), "chest_xray_classifier.pth")
            print("✅ Model saved!")

    print(f"Training completed! Best validation accuracy: {best_accuracy:.2f}%")
    print("Model saved as: chest_xray_classifier.pth")

if __name__ == "__main__":
    train_chest_classifier()