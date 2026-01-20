import UploadBox from "../components/UploadBox";
import { motion } from "framer-motion";
import { Upload as UploadIcon, BarChart3, Shield, Zap } from "lucide-react";

export default function Upload() {
  const floatingIcons = [
    { Icon: UploadIcon, delay: 0, duration: 4, top: "20%", left: "5%" },
    { Icon: BarChart3, delay: 1, duration: 5, bottom: "15%", right: "8%" },
    { Icon: Shield, delay: 0.5, duration: 5.5, top: "50%", right: "5%" },
    { Icon: Zap, delay: 1.5, duration: 6, bottom: "25%", left: "8%" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-linear-to-b from-gray-50 via-blue-50/30 to-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -40, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
            className="pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 3,
                delay: idx * 0.3,
                repeat: Infinity,
              }}
              className="bg-white/40 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/30"
            >
              <item.Icon className="w-10 h-10 text-blue-600" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Chest X-Ray
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please upload a clear chest X-ray image for analysis. Supported
            formats include JPEG, PNG, and DICOM.
          </p>
        </motion.div>

        <UploadBox />
        
        <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
                Disclaimer: This tool is for educational and assistive purposes only. <br/>
                Always consult a medical professional for diagnosis.
            </p>
        </div>
      </div>
    </div>
  );
}
