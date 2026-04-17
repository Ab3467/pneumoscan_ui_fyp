import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export default function Notification({ type = "info", message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: "text-green-600",
      progress: "bg-green-500",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: "text-red-600",
      progress: "bg-red-500",
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-800",
      icon: "text-yellow-600",
      progress: "bg-yellow-500",
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-800",
      icon: "text-blue-600",
      progress: "bg-blue-500",
    },
  };

  const Icon = icons[type];
  const colorScheme = colors[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed top-4 right-4 z-50 max-w-sm w-full ${colorScheme.bg} border rounded-xl shadow-xl backdrop-blur-sm`}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-1 rounded-full bg-white/50 ${colorScheme.icon}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${colorScheme.text} leading-5`}>
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-1 rounded-full hover:bg-white/50 transition-colors ${colorScheme.icon}`}
            >
              <X size={16} />
            </button>
          </div>

          {/* Progress bar for auto-dismiss */}
          {duration > 0 && (
            <motion.div
              className="mt-3 h-1 bg-white/30 rounded-full overflow-hidden"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            >
              <div className={`h-full ${colorScheme.progress} rounded-full`} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Notification Container Component
export function NotificationContainer({ notifications, removeNotification }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
            duration={notification.duration}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}