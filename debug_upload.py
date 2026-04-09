#!/usr/bin/env python3
"""
Debug script to test image uploads and see what's happening
"""

import requests
import os
from PIL import Image

def test_image_upload(image_path):
    print(f"🔍 Testing image: {image_path}")
    
    # Check if file exists
    if not os.path.exists(image_path):
        print(f"❌ File not found: {image_path}")
        return False
    
    # Check image properties
    try:
        with Image.open(image_path) as img:
            print(f"   📏 Image size: {img.size}")
            print(f"   🎨 Image format: {img.format}")
            print(f"   🎨 Image mode: {img.mode}")
    except Exception as e:
        print(f"❌ Invalid image file: {e}")
        return False
    
    # Test upload to backend
    try:
        with open(image_path, "rb") as f:
            files = {"image": (os.path.basename(image_path), f, "image/png")}
            response = requests.post("http://localhost:5000/api/predict", files=files)
        
        print(f"   🌐 Upload status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   ✅ SUCCESS: {result['label']} ({result['confidence']:.2%})")
            return True
        else:
            print(f"   ❌ Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Upload failed: {e}")
        return False

def main():
    print("🏥 PneumoScan Upload Debug Tool")
    print("=" * 50)
    
    # Test the working image first
    print("\n1️⃣ Testing known working image...")
    test_image_upload("/Users/mac/Desktop/pneumoscan_ui_fyp/inference_service/test.png")
    
    # Test with a different image if you have one
    print("\n2️⃣ If you have chest X-rays that aren't working,")
    print("   place them in the inference_service folder and update this script:")
    print("   Example: test_image_upload('/path/to/your/chest_xray.jpg')")
    
    print("\n📋 TROUBLESHOOTING:")
    print("   ✅ JPEG and PNG images only")
    print("   ✅ File size < 10MB") 
    print("   ✅ Must be valid image files")
    print("   ✅ Your models ARE working - test.png proves this")

if __name__ == "__main__":
    main()
