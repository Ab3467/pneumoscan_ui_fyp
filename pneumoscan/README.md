# PneumoScan - AI-Powered Pneumonia Detection System

![PneumoScan Banner](https://images.unsplash.com/photo-1576091160550-2187d80aeff2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

> **Final Year Project (FYP)**  
> *Advanced Medical Imaging Made Intelligent*

## 📋 Project Overview

**PneumoScan** is a web-based diagnostic tool designed to assist medical professionals in the early detection of pneumonia from chest X-ray images. Utilizing deep learning algorithms (CNNs), the system analyzes uploaded radiographs and provides an instant probability score, highlighting potential opacities to support clinical decision-making.

This repository contains the **Frontend UI** for the project, built with modern web technologies to ensure a professional, responsive, and user-friendly experience.

## ✨ Key Features

*   **🔍 AI-Powered Analysis**: Interface ready for integration with trained Deep Learning models (ResNet50/VGG16) achieving ~95% accuracy.
*   **⚡ Instant Results**: Real-time image processing and diagnostic reporting UI.
*   **🛡️ Secure & Compliant**: Designed with HIPAA compliance in mind for patient data privacy.
*   **🎨 Modern UI/UX**:
    *   **Glassmorphism Design**: Sleek, translucent visuals using Tailwind CSS.
    *   **Interactive Animations**: Smooth transitions powered by `framer-motion`.
    *   **Responsive**: Fully optimized for desktop, tablet, and mobile devices.
*   **📂 Drag-and-Drop Upload**: Intuitive file handling for X-ray images (JPEG/PNG).
*   **🔐 Authentication**: Secure Patient/Doctor Login and Signup pages.
*   **📊 Detailed Reports**: Visual representation of confidence scores and analysis summaries.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)

### Planned Backend (FYP Part 2)
*   **Language**: Python
*   **Framework**: Flask / FastAPI
*   **ML Libraries**: TensorFlow / Keras, NumPy, OpenCV

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/pneumoscan-ui.git
    cd pneumoscan-ui
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173` to view the application.

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx      # Responsive navigation with auth state
│   ├── Hero.jsx        # Landing page main section with animations
│   ├── ModelStats.jsx  # Technical performance metrics
│   └── ...
├── context/            # Global state management
│   └── AuthContext.jsx # User authentication logic
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Upload.jsx      # Image upload interface
│   ├── Result.jsx      # Diagnostic report display
│   ├── Login.jsx       # User sign-in
│   └── Signup.jsx      # User registration
├── App.jsx             # Main router configuration
└── index.css           # Global styles & Tailwind imports
```

## 🔮 Future Roadmap (FYP Part 2)

*   [ ] **Model Integration**: Connect Python backend with the React frontend.
*   [ ] **Heatmap Visualization**: Overlay Grad-CAM heatmaps on X-rays to show affected areas.
*   [ ] **Patient History**: Database integration to save and retrieve past scans.
*   [ ] **PDF Export**: Generate downloadable medical reports.

## 👥 Contributors

*   **Ahmad AbuBakr** - Frontend & UI Design
*   **[Team Member 2]** - ML Model Development
*   **[Team Member 3]** - Backend & Integration

---
*© 2026 PneumoScan FYP Group. All Rights Reserved.*
