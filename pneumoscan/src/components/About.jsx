import { motion } from "framer-motion";
import { Upload, Cpu, FileText, CheckCircle2, ArrowRight, TrendingUp, Lock, Zap } from "lucide-react";

export default function About() {
  const steps = [
    {
      icon: <Upload className="w-6 h-6 text-white" />,
      title: "Upload X-Ray",
      desc: "Securely upload a chest X-ray image in standard formats (JPEG, PNG).",
      color: "bg-blue-600",
      delay: 0,
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: "AI Analysis",
      desc: "Our deep learning model analyzes the image for pneumonia patterns.",
      color: "bg-teal-500",
      delay: 0.2,
      gradient: "from-teal-500 to-emerald-400"
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Instant Report",
      desc: "Receive a comprehensive diagnostic report with confidence scores.",
      color: "bg-indigo-600",
      delay: 0.4,
      gradient: "from-indigo-600 to-purple-500"
    },
  ];

  const stats = [
    { value: "92.46%", label: "Accuracy Rate", icon: TrendingUp },
    { value: "97.46%", label: "AUC Score", icon: Zap },
    { value: "50k+", label: "Images Trained", icon: Lock },
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
    hidden: { opacity: 0, y: 40 },
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
    <section id="about" className="py-32 bg-linear-to-b from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 text-blue-400"
        >
          <div className="w-48 h-48 rounded-full border-2 border-blue-200/30" />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: -360,
            y: [0, 30, 0],
            opacity: [0.08, 0.2, 0.08] 
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-20 left-5 text-teal-300"
        >
          <div className="w-56 h-56 rounded-full border-2 border-teal-200/20" />
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-linear-to-br from-blue-400/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Section with Glass Morphism */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative group"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
                <div className="relative bg-white/50 backdrop-blur-xl border border-white/50 rounded-2xl p-6 text-center overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-br from-blue-50/0 to-teal-50/0 group-hover:from-blue-100/50 group-hover:to-teal-100/50"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                  
                  <motion.div
                    className="relative flex justify-center mb-4"
                    animate={{
                      y: [0, -8, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white">
                      <IconComponent size={24} />
                    </div>
                  </motion.div>

                  <motion.h4
                    className="text-3xl font-bold text-slate-900 mb-1"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {stat.value}
                  </motion.h4>
                  <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-0"
          >
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-semibold text-blue-600 mb-6 border border-blue-100">
              How It Works
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Revolutionizing Diagnosis with <br />
              <span className="text-blue-600">Artificial Intelligence</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              PneumoScan bridges the gap between advanced technology and healthcare. By leveraging Convolutional Neural Networks (CNNs), we provide a rapid, reliable second opinion for medical professionals.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Early detection of pneumonia patterns",
                "Support for multiple image formats",
                "Detailed confidence probability scoring"
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  </motion.div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 text-center"
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Timeline/Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-8 bottom-8 w-0.5 bg-linear-to-b from-blue-200 via-teal-200 to-transparent lg:left-8" />
            
            <div className="space-y-12">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: step.delay }}
                  className="relative flex items-start gap-6 group"
                >
                  <motion.div 
                    className={`relative z-10 shrink-0 w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/5`}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 40px rgba(59, 130, 246, 0.6)",
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      delay: idx * 0.5,
                      repeat: Infinity,
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2.5,
                        delay: idx * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Medical Disclaimer</h3>
              <div className="text-amber-800 space-y-2">
                <p>
                  <strong>PneumoScan is not a substitute for professional medical advice, diagnosis, or treatment.</strong> This tool is designed to assist healthcare professionals by providing AI-powered analysis of chest X-ray images for pneumonia detection.
                </p>
                <p>
                  Always consult with qualified medical professionals for accurate diagnosis and treatment decisions. The AI model&apos;s predictions should be used as a supplementary tool alongside clinical judgment, patient history, and other diagnostic tests.
                </p>
                <p>
                  The developers and providers of this application are not liable for any decisions made based on the AI analysis results. Users are responsible for verifying the accuracy of results and ensuring appropriate medical care.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
