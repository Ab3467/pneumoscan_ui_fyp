import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileImage, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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
        if (err.isValidChestXray === false) {
          throw new Error(err.message || "The uploaded image does not appear to be a chest X-ray. Please upload a proper chest X-ray image.");
        }

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
    <div className="w-full max-w-xl mx-auto">
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
            className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 cursor-pointer ${
              isDragging
                ? "border-blue-500 bg-blue-50/50 scale-105 shadow-xl"
                : "border-gray-300 hover:border-blue-400 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
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
              className="bg-gradient-to-br from-blue-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Upload className="w-10 h-10 text-blue-600" />
            </motion.div>

            <motion.h3
              className="text-xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Upload Chest X-Ray
            </motion.h3>
            <motion.p
              className="text-gray-500 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Drag and drop your chest X-ray image here, or{' '}
              <span className="text-blue-600 font-medium hover:underline">browse files</span>
            </motion.p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2 text-red-600 text-sm mb-4 bg-red-50 rounded-lg p-3"
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="flex items-center justify-center gap-4 text-xs text-gray-400 uppercase tracking-wider font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span whileHover={{ scale: 1.1, color: "#2563eb" }}>JPG</motion.span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <motion.span whileHover={{ scale: 1.1, color: "#2563eb" }}>PNG</motion.span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <motion.span whileHover={{ scale: 1.1, color: "#2563eb" }}>DICOM</motion.span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
          >
            <div className="relative h-64 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
              <motion.img
                src={preview}
                alt="X-ray Preview"
                className="h-full object-contain opacity-90"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.5 }}
              />

              {/* Animated overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />

              <motion.button
                onClick={handleRemove}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <X size={16} />
              </motion.button>

              {/* Success indicator */}
              <motion.div
                className="absolute bottom-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <CheckCircle2 size={14} />
                Ready for Analysis
              </motion.div>
            </div>

            <div className="p-6">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-teal-50 p-3 rounded-lg border border-blue-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <FileImage className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate max-w-50">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <motion.div
                  className="text-green-500 font-semibold flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle2 size={16} />
                  Ready
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Analyzing image...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-teal-400 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Analyze Image
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
