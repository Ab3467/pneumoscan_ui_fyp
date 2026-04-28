import UploadBox from "../components/UploadBox";
import MedicalDisclaimer from "../components/MedicalDisclaimer";
import { motion } from "framer-motion";
import { Upload as UploadIcon, BarChart3, Shield, Zap, AlertTriangle, Clock, Cpu, Lock } from "lucide-react";

export default function Upload() {
  const features = [
    {
      Icon: Cpu,
      title: "AI-Powered Analysis",
      description: "Advanced deep learning model for accurate pneumonia detection",
    },
    {
      Icon: Clock,
      title: "Instant Results",
      description: "Get analysis results within seconds",
    },
    {
      Icon: Lock,
      title: "Secure & Private",
      description: "Your medical data is encrypted and protected",
    },
  ];

  const floatingIcons = [
    { Icon: UploadIcon, delay: 0, duration: 4, top: "20%", left: "5%" },
    { Icon: BarChart3, delay: 1, duration: 5, bottom: "15%", right: "8%" },
    { Icon: Shield, delay: 0.5, duration: 5.5, top: "50%", right: "5%" },
    { Icon: Zap, delay: 1.5, duration: 6, bottom: "25%", left: "8%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/20 pointer-events-none" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%232563eb" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

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
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{
                duration: 3,
                delay: idx * 0.3,
                repeat: Infinity,
              }}
              className="bg-blue-400/10 backdrop-blur-md p-5 rounded-2xl border border-blue-200/20"
            >
              <item.Icon className="w-10 h-10 text-blue-500" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Critical Warning Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-gradient-to-r from-red-100/80 to-orange-100/80 backdrop-blur-xl border-2 border-red-300 rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0"
              >
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </motion.div>
              <div>
                <h3 className="text-base font-bold text-red-800 mb-2">⚠️ Chest X-Ray Images Only</h3>
                <p className="text-sm text-red-700 leading-relaxed">
                  This tool is designed <span className="font-semibold">exclusively for chest X-ray images</span>. Uploading non-X-ray images (photos, selfies, other medical scans, etc.) will produce inaccurate and unreliable results. Always verify you are uploading a genuine chest X-ray before proceeding.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Header Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                Scan Now
              </h1>
              <p className="text-xl sm:text-2xl text-blue-900 mb-4 max-w-3xl mx-auto leading-relaxed">
                Upload your chest X-ray for intelligent AI-powered pneumonia detection
              </p>
              <p className="text-blue-700 max-w-2xl mx-auto text-lg">
                Get instant, accurate analysis to support your clinical decision-making
              </p>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:bg-white transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Upload Box Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <UploadBox />
          </motion.div>

          {/* Medical Disclaimer Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <MedicalDisclaimer variant="detailed" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
