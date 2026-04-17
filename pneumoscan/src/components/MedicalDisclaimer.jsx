import { motion } from "framer-motion";
import { AlertTriangle, Shield, Stethoscope } from "lucide-react";

export default function MedicalDisclaimer({ variant = "compact", className = "" }) {
  const disclaimerText = "This AI-powered tool is designed to assist healthcare professionals in analyzing chest X-rays for pneumonia detection. It is not a substitute for professional medical diagnosis, clinical judgment, or radiological expertise. Always consult with qualified healthcare providers for medical decisions.";

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-amber-50 border border-amber-200 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
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
        className={`bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-6 ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Important Medical Disclaimer
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                PneumoScan utilizes advanced AI technology to assist in the preliminary analysis of chest X-ray images for potential pneumonia indicators. Our system provides probability scores and visual heatmaps to support clinical decision-making.
              </p>
              <div className="bg-white/50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-gray-900 mb-2">⚠️ Critical Limitations:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Not a replacement for professional radiological interpretation</li>
                  <li>• Results should be validated by qualified healthcare professionals</li>
                  <li>• Clinical context and patient history are essential for accurate diagnosis</li>
                  <li>• False positives and false negatives may occur</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 italic">
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
        className={`bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-4 shadow-lg ${className}`}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold mb-1">Medical Professional Use Only</p>
            <p className="text-sm opacity-90 leading-relaxed">
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
      className={`bg-blue-50 border border-blue-200 rounded-lg p-3 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <p className="text-sm text-blue-800 font-medium">
          AI-assisted analysis • Professional medical review required
        </p>
      </div>
    </motion.div>
  );
}