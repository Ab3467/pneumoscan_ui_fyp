import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Zap, BarChart3, Download, Share2 } from "lucide-react";
import jsPDF from "jspdf";

export default function Result() {
  const location = useLocation();
  const image = location.state?.image;
  const prediction = location.state?.prediction; // { label, confidence }
  useLocation();
  
  const [scanId] = useState(() => Math.floor(Math.random() * 10000));
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  
  // Use real prediction if available; otherwise fallback to mock
  const isPneumonia = prediction?.label === "PNEUMONIA";
  const confidence = prediction?.confidence ? Math.round(prediction.confidence * 100) : null;
  const heatmap = prediction?.heatmap;

  const modelMetrics = {
    accuracy: "92.46%",
    precision: "92.62%",
    recall: "92.46%",
    f1: "92.36%",
    auc: "97.46%",
    confusion: {
      normal: { tn: 197, fp: 37 },
      pneumonia: { fn: 10, tp: 380 },
    },
  };

  const handleShare = async () => {
    setIsSharing(true);
    const reportText = `PneumoScan Report\n\nScan ID: #PN-${scanId}\nDate: ${new Date().toLocaleDateString()}\nModel: ResNet50\nAccuracy: ${modelMetrics.accuracy}\nAUC: ${modelMetrics.auc}\nResult: ${isPneumonia ? "Pneumonia Detected" : "Normal / Healthy"}\nConfidence: ${confidence}%\n\nDisclaimer: This tool is for educational and assistive purposes only. Always consult a medical professional for diagnosis.`;
    try {
      await navigator.clipboard.writeText(reportText);
      alert("Report copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy report.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let y = margin;

    pdf.setFontSize(20);
    pdf.text("PneumoScan Report", margin, y);
    y += 15;

    pdf.setFontSize(12);
    pdf.text(`Scan ID: #PN-${scanId}`, margin, y);
    y += 8;
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, y);
    y += 8;
    pdf.text(`Result: ${isPneumonia ? "Pneumonia Detected" : "Normal / Healthy"}`, margin, y);
    y += 8;
    pdf.text(`Confidence: ${confidence}%`, margin, y);
    y += 15;

    pdf.setFontSize(10);
    pdf.text("Disclaimer: This tool is for educational and assistive purposes only.", margin, y);
    y += 6;
    pdf.text("Always consult a medical professional for diagnosis.", margin, y);

    pdf.save(`PneumoScan_Report_${scanId}.pdf`);
    setIsDownloading(false);
  };

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
      className="min-h-screen pt-24 pb-12 bg-linear-to-b from-gray-50 to-blue-50/20 relative overflow-hidden"
    >
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 text-green-400"
        >
          <CheckCircle size={80} />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-10 text-blue-300"
        >
          <BarChart3 size={70} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <Link to="/upload" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">← Back to Upload</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Input Image</h3>
              <div className="bg-gray-900 rounded-xl overflow-hidden aspect-4/5 flex items-center justify-center relative">
                <img
                  src={image}
                  alt="Analyzed X-ray"
                  className="w-full h-full object-contain"
                />
                {showHeatmap && heatmap && (
                  <img
                    src={heatmap}
                    alt="AI Explainability Heatmap"
                    className="absolute inset-0 w-full h-full object-contain opacity-60 mix-blend-screen pointer-events-none"
                  />
                )}
              </div>
              
              {heatmap && (
                <div className="mt-4 flex justify-center">
                  <label className="flex items-center gap-2 cursor-pointer bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={showHeatmap}
                      onChange={() => setShowHeatmap(!showHeatmap)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-medium text-blue-900 text-sm">Overlay AI Explainability (Heatmap)</span>
                  </label>
                </div>
              )}

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
                
                <div className="bg-gray-50 px-6 py-4 rounded-xl text-center min-w-35">
                  <p className="text-sm text-gray-500 font-medium mb-1">Confidence</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {confidence !== null ? `${confidence}%` : "—"}
                  </p>
                </div>
              </div>

              <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-8">
                <div style={{ width: confidence !== null ? `${confidence}%` : "0%" }} className={`h-full ${isPneumonia ? 'bg-red-500' : 'bg-green-500'}`} />
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

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Model Evaluation Metrics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { label: "Accuracy", value: modelMetrics.accuracy },
                        { label: "Precision", value: modelMetrics.precision },
                        { label: "Recall", value: modelMetrics.recall },
                        { label: "F1 Score", value: modelMetrics.f1 },
                        { label: "AUC", value: modelMetrics.auc },
                      ].map((metric) => (
                        <div key={metric.label} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                          <p className="text-xs text-slate-500 uppercase tracking-[0.16em] mb-2">{metric.label}</p>
                          <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Classification Report</h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="min-w-full text-left text-sm text-slate-700">
                        <thead className="bg-slate-100 text-slate-500 uppercase text-xs">
                          <tr>
                            <th className="px-4 py-3">Label</th>
                            <th className="px-4 py-3">Precision</th>
                            <th className="px-4 py-3">Recall</th>
                            <th className="px-4 py-3">F1 Score</th>
                            <th className="px-4 py-3">Support</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-slate-200 bg-white">
                            <td className="px-4 py-3 font-semibold text-slate-900">NORMAL</td>
                            <td className="px-4 py-3">0.95</td>
                            <td className="px-4 py-3">0.84</td>
                            <td className="px-4 py-3">0.89</td>
                            <td className="px-4 py-3">234</td>
                          </tr>
                          <tr className="border-t border-slate-200 bg-slate-50">
                            <td className="px-4 py-3 font-semibold text-slate-900">PNEUMONIA</td>
                            <td className="px-4 py-3">0.91</td>
                            <td className="px-4 py-3">0.97</td>
                            <td className="px-4 py-3">0.94</td>
                            <td className="px-4 py-3">390</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? "Generating..." : "Download Report"}
                </button>
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Share2 className="w-4 h-4" />
                  {isSharing ? "Copying..." : "Share Results"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
