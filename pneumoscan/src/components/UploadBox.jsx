// Member 3
// UploadBox.jsx: File upload UI (no backend yet)

import { useNavigate } from "react-router-dom";

export default function UploadBox() {
  const navigate = useNavigate();

  // Temporary handler (AI integration later)
  const handleAnalyze = () => {
    navigate("/result");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <input
        type="file"
        accept="image/*"
        className="mb-4 w-full"
      />

      <button
        onClick={handleAnalyze}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Analyze X-ray
      </button>
    </div>
  );
}