import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileImage, X, CheckCircle2, AlertCircle, Loader2, AlertTriangle, Info, Zap, Shield } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";

export default function UploadBox() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'application/dicom'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.dcm'];

  const isValidFile = (file) => {
    const mimeType = file.type;
    const fileName = file.name.toLowerCase();
    const extension = fileName.substring(fileName.lastIndexOf('.'));
    return allowedTypes.includes(mimeType) || allowedExtensions.includes(extension);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setError(null);
      handleFileSelect(droppedFile);
    } else {
      setError("Invalid file type. Please upload JPEG, PNG, or DICOM files only.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (selectedFile) => {
    if (!isValidFile(selectedFile)) {
      setError("Invalid file type. Please upload JPEG, PNG, or DICOM files only.");
      return;
    }
    setError(null);
    setIsLoading(true);

    // Simulate loading for better UX
    setTimeout(() => {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    }, 800);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setProgress(25); // Starting analysis
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000"}/api/predict`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setProgress(60); // Prediction received

      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch {
          const text = await res.text();
          throw new Error(text || "Prediction failed");
        }

        // Handle invalid chest X-ray images
        throw new Error(err.message || "Prediction failed");
      }

      const data = await res.json();
      setProgress(80); // Processing results
      let saveError = null;

      // Save to analysis history if authenticated
      if (token) {
        const historyResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000"}/api/analysis`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            label: data.label,
            confidence: data.confidence,
            imageUrl: preview,
            heatmapUrl: data.heatmap || null,
          }),
        });

        if (!historyResponse.ok) {
          const historyError = await historyResponse.json();
          saveError = historyError.message || "Failed to save analysis history.";
        }
      } else {
        saveError = "Login to save the analysis history.";
      }

      setProgress(100); // Complete
      navigate("/result", { state: { image: preview, prediction: data } });
      if (saveError) {
        setError(saveError);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Attention Banner */}
      <AnimatePresence mode="wait">
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="mb-8 bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </motion.div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-red-800 mb-2">⚠️ Important - Chest X-Ray Only</h4>
                <p className="text-xs text-red-700 leading-relaxed mb-3">
                  This tool is designed specifically for <span className="font-semibold">chest X-ray images only</span>. Uploading non-X-ray images (such as photos, general medical images, or other types of radiographs) will produce inaccurate results.
                </p>
                <div className="bg-white rounded-lg p-3 border border-red-200 mb-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold text-green-700">✓ Valid:</span> Chest X-rays (frontal, lateral views) in JPEG, PNG, or DICOM format
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    <span className="font-semibold text-red-700">✗ Invalid:</span> Photos, selfies, CT scans, MRI images, ultrasounds, or non-medical images
                  </p>
                </div>
                <button
                  onClick={() => setShowWarning(false)}
                  className="text-xs font-medium text-red-700 hover:text-red-900 underline hover:no-underline transition-all"
                >
                  I understand, proceed with caution →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingSkeleton type="upload" />
          </motion.div>
        ) : !preview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer backdrop-blur-sm ${
              isDragging
                ? "border-blue-500 bg-blue-100 scale-105 shadow-lg"
                : "border-blue-300 hover:border-blue-500 bg-white/60 hover:bg-white hover:shadow-xl"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
              accept="image/jpeg,image/png,.dcm"
            />

            <motion.div
              className="bg-gradient-to-br from-blue-200 to-blue-300 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-blue-400"
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Upload className="w-12 h-12 text-blue-600" />
            </motion.div>

            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Upload Your X-Ray
            </motion.h3>
            <motion.p
              className="text-blue-700 mb-2 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Drag and drop your chest X-ray image here
            </motion.p>
            <motion.p
              className="text-blue-600/70 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              or <span className="font-semibold text-blue-700 cursor-pointer hover:text-blue-800">browse files</span>
            </motion.p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-3 text-red-600 text-sm mb-6 bg-red-100 rounded-xl p-4 border border-red-300"
                >
                  <AlertCircle size={18} />
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="flex items-center justify-center gap-6 text-xs text-blue-700 uppercase tracking-widest font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span 
                className="px-3 py-2 bg-blue-100 rounded-lg border border-blue-300"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(219, 234, 254, 0.8)" }}
              >
                JPG
              </motion.span>
              <span className="text-blue-400">•</span>
              <motion.span 
                className="px-3 py-2 bg-blue-100 rounded-lg border border-blue-300"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(219, 234, 254, 0.8)" }}
              >
                PNG
              </motion.span>
              <span className="text-blue-400">•</span>
              <motion.span 
                className="px-3 py-2 bg-blue-100 rounded-lg border border-blue-300"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(219, 234, 254, 0.8)" }}
              >
                DICOM
              </motion.span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-200"
          >
            {/* Image Preview Area */}
            <div className="relative h-80 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden">
              <motion.img
                src={preview}
                alt="X-ray Preview"
                className="h-full object-contain opacity-95 drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.95 }}
                transition={{ duration: 0.5 }}
              />

              {/* Animated Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-blue-200/20 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />

              {/* Remove Button */}
              <motion.button
                onClick={handleRemove}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg border border-red-600"
                whileHover={{ scale: 1.15, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <X size={18} />
              </motion.button>

              {/* Success Indicator */}
              <motion.div
                className="absolute bottom-4 left-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-emerald-600 shadow-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <CheckCircle2 size={16} />
                Ready for Analysis
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* File Information */}
              <motion.div
                className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <FileImage className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate text-lg">{file.name}</p>
                  <p className="text-blue-600 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <motion.div
                  className="text-emerald-600 font-bold flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle2 size={18} />
                  <span className="text-sm">Ready</span>
                </motion.div>
              </motion.div>

              {/* Progress Bar */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex justify-between text-sm text-blue-800 mb-3">
                      <span className="font-semibold">🔍 Analyzing image...</span>
                      <span className="text-blue-600 font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden border border-blue-300 shadow-sm">
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full shadow-lg shadow-blue-500/30"
                        style={{ width: `${progress}%` }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Validation Guidance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 bg-blue-50 border border-blue-300 rounded-2xl p-5"
              >
                <div className="flex gap-3 items-start">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-bold mb-2">Verification Checklist:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Image is a <span className="font-semibold text-blue-700">chest X-ray</span></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Image is <span className="font-semibold text-blue-700">clear and readable</span></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>You have <span className="font-semibold text-blue-700">proper authorization</span></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Analyze Button */}
              <motion.button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 border border-blue-700"
                whileHover={{ scale: isAnalyzing ? 1 : 1.03, boxShadow: isAnalyzing ? "none" : "0 0 30px rgba(37, 99, 235, 0.5)" }}
                whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Your Image...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Analyze Image</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
