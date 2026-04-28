import { motion } from "framer-motion";
import { AlertTriangle, Shield, Stethoscope } from "lucide-react";

export default function MedicalDisclaimer({ variant = "compact", className = "" }) {
  const disclaimerText = "This AI-powered tool is designed to assist healthcare professionals in analyzing chest X-rays for pneumonia detection. It is not a substitute for professional medical diagnosis, clinical judgment, or radiological expertise. Always consult with qualified healthcare providers for medical decisions.";

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-amber-100 border border-amber-300 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="font-medium mb-1">Medical Disclaimer</p>
            <p className="leading-relaxed">{disclaimerText}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "detailed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-3xl p-8 ${className}`}
      >
        <div className="flex items-start gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg flex-shrink-0">
            <Stethoscope className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              Important Medical Disclaimer
            </h3>
            <div className="space-y-4 text-gray-800">
              <p className="leading-relaxed text-lg">
                PneumoScan utilizes advanced AI technology to assist in the preliminary analysis of chest X-ray images for potential pneumonia indicators. Our system provides probability scores and visual heatmaps to support clinical decision-making.
              </p>
              <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-300">
                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Critical Limitations:
                </h4>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex gap-2">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>
                    <span>Not a replacement for professional radiological interpretation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>
                    <span>Results should be validated by qualified healthcare professionals</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>
                    <span>Clinical context and patient history are essential for accurate diagnosis</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>
                    <span>False positives and false negatives may occur</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-blue-700 italic border-l-4 border-blue-600 pl-4 bg-blue-50 py-3 px-4 rounded-lg">
                Always prioritize patient safety and consult with licensed medical professionals for final diagnosis and treatment decisions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl p-5 shadow-lg border-2 border-orange-600 ${className}`}
      >
        <div className="flex items-center gap-4">
          <AlertTriangle className="w-7 h-7 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-lg mb-1">Medical Professional Use Only</p>
            <p className="text-sm opacity-95 leading-relaxed">
              This tool is intended to assist healthcare professionals. Not for self-diagnosis. Consult qualified medical experts for all health decisions.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default compact variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-blue-100 border border-blue-300 rounded-xl p-3 ${className}`}
    >
      <div className="flex items-center gap-3">
        <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <p className="text-sm text-blue-800 font-medium">
          AI-assisted analysis • Professional medical review required
        </p>
      </div>
    </motion.div>
  );
}