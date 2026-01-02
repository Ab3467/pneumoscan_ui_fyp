import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Result() {
  const location = useLocation();
  const image = location.state?.image;
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.pred || (image ? (Math.random() > 0.5 ? 'Positive' : 'Negative') : 'Negative');
  
  const [scanId] = useState(() => Math.floor(Math.random() * 10000));

  // Mock Result Logic (Random for demo purposes, or fixed)
  // In real app, this comes from the backend
  const isPneumonia = true; // Toggle this for testing different UI states
  const confidence = 94.8;

  if (!image) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">No image uploaded.</p>
        <Link to="/upload" className="text-blue-600 hover:underline">
          Go back to upload
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/upload" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">← Back to Upload</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Input Image</h3>
              <div className="bg-gray-900 rounded-xl overflow-hidden aspect-[4/5] flex items-center justify-center">
                <img
                  src={image}
                  alt="Analyzed X-ray"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Scan Date</p>
                  <p className="font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Scan ID</p>
                  <p className="font-medium text-gray-900">#PN-{scanId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Analysis Report */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Result Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-2 h-full ${isPneumonia ? 'bg-red-500' : 'bg-green-500'}`} />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Diagnosis Result
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center">
                      {isPneumonia ? (
                        <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01"/></svg>
                      ) : (
                        <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      )}
                    </div>
                    <h1 className={`text-3xl md:text-4xl font-bold ${isPneumonia ? 'text-red-600' : 'text-green-600'}`}>
                      {isPneumonia ? "Pneumonia Detected" : "Normal / Healthy"}
                    </h1>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 rounded-xl text-center min-w-[140px]">
                  <p className="text-sm text-gray-500 font-medium mb-1">Confidence</p>
                  <p className="text-3xl font-bold text-gray-900">{confidence}%</p>
                </div>
              </div>

              <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-8">
                <div style={{ width: `${confidence}%` }} className={`h-full ${isPneumonia ? 'bg-red-500' : 'bg-green-500'}`} />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Analysis Summary</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {isPneumonia 
                      ? "The AI model has detected patterns consistent with pneumonia, including potential opacities in the lung fields. High confidence suggests immediate medical attention is recommended."
                      : "The AI model analyzed the chest X-ray and found no significant abnormalities. The lung fields appear clear with no signs of consolidation or pleural effusion."
                    }
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Recommended Actions</h3>
                  <ul className="space-y-3">
                    {isPneumonia ? (
                      <>
                        <li className="flex items-start gap-3 text-blue-800">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Consult a pulmonologist for a comprehensive clinical evaluation.
                        </li>
                        <li className="flex items-start gap-3 text-blue-800">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Consider further diagnostic tests (CT Scan, blood work).
                        </li>
                        <li className="flex items-start gap-3 text-blue-800">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Monitor oxygen saturation levels and temperature.
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-3 text-blue-800">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Continue regular health check-ups.
                        </li>
                        <li className="flex items-start gap-3 text-blue-800">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Maintain good respiratory hygiene.
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4">
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Download Report
                </button>
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Share Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
