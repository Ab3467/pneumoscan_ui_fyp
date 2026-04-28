# PneumoScan - AI-Powered Pneumonia Detection System

> **Final Year Project (FYP)**  
> *Advanced Medical Imaging Made Intelligent*

## 📋 Project Overview

**PneumoScan** is a web-based diagnostic tool designed to assist medical professionals in the early detection of pneumonia from chest X-ray images. Utilizing deep learning algorithms (CNNs), the system analyzes uploaded radiographs and provides an instant probability score, highlighting potential opacities to support clinical decision-making.

## ✨ Features

- **AI-Powered Detection**: ResNet50 deep learning model for accurate pneumonia classification
- **User Authentication**: Secure login/signup system with JWT tokens
- **Image Upload & Analysis**: Support for JPEG/PNG chest X-ray images
- **Real-time Results**: Instant probability scores with confidence levels
- **Medical History**: Track and review previous analyses
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **PDF Reports**: Generate downloadable analysis reports
- **Email Notifications**: Automated email alerts for analysis results

## 🏗️ Architecture

This project consists of three main components:

### Frontend (`pneumoscan/`)
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF

### Backend (`pneumoscan_backend/`)
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer
- **Email**: Nodemailer
- **CORS**: Enabled for frontend communication

### AI Inference Service (`inference_service/`)
- **Framework**: FastAPI (Python)
- **ML Framework**: PyTorch
- **Model**: ResNet50 (pretrained on ImageNet)
- **Image Processing**: PIL, OpenCV
- **Deployment**: Uvicorn server

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python 3.11+
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ab3467/pneumoscan_ui_fyp.git
   cd pneumoscan_ui_fyp
   ```

2. **Setup Backend**
   ```bash
   cd pneumoscan_backend
   npm install
   # Configure environment variables in .env
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../pneumoscan
   npm install
   npm run dev
   ```

4. **Setup AI Inference Service**
   ```bash
   cd ../inference_service
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python main_fixed.py
   ```

### Environment Configuration

Create `.env` file in `pneumoscan_backend/` with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pneumoscan
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
INFERENCE_URL=http://localhost:8000
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request

### Analysis
- `POST /api/predict` - Upload and analyze X-ray image
- `GET /api/analysis/history` - Get user's analysis history
- `DELETE /api/analysis/:id` - Delete analysis record

### AI Inference
- `POST /predict` - Direct model prediction (internal use)
- `GET /` - Health check

## 🔧 Development

### Frontend Development
```bash
cd pneumoscan
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd pneumoscan_backend
npm start            # Start production server
npm run dev          # Start with nodemon (if configured)
```

### AI Service Development
```bash
cd inference_service
python main_fixed.py  # Start FastAPI server
```

## 📊 Model Details

- **Architecture**: ResNet50 Convolutional Neural Network
- **Input**: 224x224 RGB images
- **Classes**: NORMAL, PNEUMONIA
- **Preprocessing**: ImageNet normalization
- **Output**: Probability scores for each class

## 🛡️ Security & Privacy

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure file upload handling

## 📈 Performance

- **Model Accuracy**: ~95% on validation set
- **Inference Time**: <2 seconds per image
- **Concurrent Users**: Supports multiple simultaneous analyses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Chest X-ray dataset from [Kaggle](https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia)
- ResNet50 model pretrained weights from PyTorch
- Medical imaging community for validation and feedback

## 📞 Contact

**Project Author**: Ab3467  
**GitHub**: [https://github.com/Ab3467/pneumoscan_ui_fyp](https://github.com/Ab3467/pneumoscan_ui_fyp)

---

*This project was developed as a Final Year Project to demonstrate the practical application of AI in medical diagnostics. Always consult with qualified medical professionals for clinical decisions.*
