# Run the full PneumoScan app with ResNet50 inference

## Overview
- **Frontend (React)**: `http://localhost:5173`
- **Backend (Node/Express)**: `http://localhost:5000`
- **Inference Service (Python FastAPI)**: `http://localhost:8000`

## 1️⃣ Prepare your model weights
- Place your trained ResNet50 `.pth` file inside `inference_service/` as `best_resnet50_pneumonia.pth`.
  - If your filename differs, edit `MODEL_PATH` in `inference_service/main.py`.

## 2️⃣ Start the Python inference service
```bash
cd inference_service
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- Verify health: `GET http://localhost:8000/` should return `{"status":"ok","device":"cpu"}` (or `cuda`).

## 3️⃣ Start the Node backend
```bash
cd pneumoscan_backend
npm install
npm start  # or nodemon for dev
```
- Backend will mount `/api/predict` (protected) and `/api/auth/*`.

## 4️⃣ Start the React frontend
```bash
cd pneumoscan
npm install
npm run dev
```

## 5️⃣ Test end-to-end
1. Sign up/login in the app.
2. Upload a chest X-ray (JPEG/PNG only; DICOM UI present but not yet processed).
3. Click “Analyze” → request goes to Node → Node forwards to Python → returns `{label, confidence}`.
4. Result page shows real prediction and confidence.

## Notes
- The prediction endpoint is **protected** (requires JWT token). To make it public, remove `authMiddleware` from `predictRoutes.js`.
- Accepted image types: JPEG, PNG (enforced in Node). If you add DICOM processing, update both the Python service and the Node file filter.
- If your model uses a different class order or naming, update `CLASS_NAMES` in `main.py`.
- If you run the inference service on another host/port, update `INFERENCE_SERVICE_URL` in `pneumoscan_backend/.env`.

## Troubleshooting
- **CORS errors**: ensure the FastAPI CORS origins include `http://localhost:5173` and `http://localhost:5000`.
- **Model load error**: verify the `.pth` path and that the state dict matches the ResNet50 architecture defined in `main.py`.
- **401 Unauthorized**: make sure you’re logged in and the token is sent in the `Authorization: Bearer <token>` header.
