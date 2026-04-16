import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function IconUpload() {
  return (
    <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 10l5-5 5 5" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
    </svg>
  );
}

export default function UploadBox() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
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

  const handleFileSelect = (selectedFile) => {
    if (!isValidFile(selectedFile)) {
      setError("Invalid file type. Please upload JPEG, PNG, or DICOM files only.");
      return;
    }
    setError(null);
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
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
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setProgress(60); // Prediction received

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Prediction failed");
      }

      const data = await res.json();
      setProgress(80); // Processing results
      let saveError = null;

      // Save to analysis history if authenticated
      if (token) {
        const historyResponse = await fetch("http://localhost:5000/api/analysis", {
          method: "POST",
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
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 bg-white"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
            accept="image/jpeg,image/png,.dcm"
          />

          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconUpload />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Chest X-Ray</h3>
          <p className="text-gray-500 mb-6">
            Drag and drop your chest X-ray image here, or{' '}
            <button onClick={() => fileInputRef.current?.click()} className="text-blue-600 font-medium hover:underline">
              browse files
            </button>
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 uppercase tracking-wider font-semibold">
            <span>JPG</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>PNG</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>DICOM</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="relative h-64 bg-gray-900 flex items-center justify-center">
            <img src={preview} alt="X-ray Preview" className="h-full object-contain opacity-90" />
            <button onClick={handleRemove} className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
              ✕
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 truncate max-w-50">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <div className="ml-auto text-green-500 font-semibold">Ready</div>
            </div>

            {isAnalyzing && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Analyzing image...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-blue-400 transition-all">
              {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
