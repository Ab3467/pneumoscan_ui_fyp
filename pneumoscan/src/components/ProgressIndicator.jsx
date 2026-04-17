import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function ProgressIndicator({ status, progress, message }) {
  const getStatusConfig = () => {
    switch (status) {
      case "uploading":
        return {
          icon: Loader2,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
          animate: true,
        };
      case "analyzing":
        return {
          icon: Loader2,
          color: "text-teal-600",
          bgColor: "bg-teal-50",
          borderColor: "border-teal-200",
          textColor: "text-teal-800",
          animate: true,
        };
      case "processing":
        return {
          icon: Loader2,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          textColor: "text-purple-800",
          animate: true,
        };
      case "saving":
        return {
          icon: Loader2,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          animate: true,
        };
      case "success":
        return {
          icon: CheckCircle2,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          animate: false,
        };
      case "error":
        return {
          icon: AlertCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          animate: false,
        };
      default:
        return {
          icon: Loader2,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-800",
          animate: false,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${config.bgColor} border ${config.borderColor} rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4`}
    >
      <div className="text-center">
        <motion.div
          className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${config.borderColor}`}
          animate={config.animate ? { rotate: 360 } : {}}
          transition={config.animate ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
        >
          <Icon className={`w-8 h-8 ${config.color}`} />
        </motion.div>

        <motion.h3
          className={`text-lg font-semibold ${config.textColor} mb-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.h3>

        {progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className={`h-full ${config.color.replace('text-', 'bg-')} rounded-full`}
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Animated dots for loading states */}
        {config.animate && (
          <motion.div
            className="flex justify-center gap-1 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 bg-current rounded-full ${config.color}`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}