import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Shield, Zap, CheckCircle2, Cpu, Brain, Radio } from "lucide-react";

export default function Hero() {
  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "High Accuracy",
      desc: "Trained on 50,000+ X-ray images for precise clinical validation.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      text: "text-blue-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Analysis",
      desc: "Get detailed diagnostic reports within seconds of uploading.",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      text: "text-amber-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "HIPAA Compliant",
      desc: "Enterprise-grade security ensuring your patient data remains private.",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600"
    },
  ];

  const floatingIcons = [
    { Icon: Radio, top: "10%", left: "5%", delay: 0, duration: 4 },
    { Icon: Brain, top: "15%", right: "8%", delay: 1, duration: 5 },
    { Icon: Cpu, bottom: "20%", left: "10%", delay: 2, duration: 6 },
    { Icon: Activity, bottom: "10%", right: "5%", delay: 0.5, duration: 5.5 },
  ];

  return (
    <div className="relative bg-slate-50 pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-linear-to-bl from-blue-100/40 to-transparent rounded-bl-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-teal-100/40 to-transparent rounded-tr-full blur-3xl" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-24 h-24 bg-blue-200/20 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-10 w-32 h-32 bg-teal-200/20 rounded-full blur-xl"
        />

        {/* Floating Animated Icons */}
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -10, 0],
              rotate: [0, 5, -5, 0],
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
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
              <item.Icon className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 text-sm font-semibold mb-8 shadow-sm border border-blue-100"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                AI-Powered Pneumonia Detection
              </motion.span>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
                Advanced Medical Imaging <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
                  Made Intelligent
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                PneumoScan assists radiologists by providing rapid, AI-driven analysis of chest X-rays. Enhance your diagnostic workflow with our state-of-the-art deep learning models.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  to="/upload" 
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group"
                >
                  Start Diagnosis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#about" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center shadow-sm"
                >
                  View Methodology
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-teal-50 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  </div>
                  <span>98.5% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-teal-50 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  </div>
                  <span>FDA Guidelines</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visuals */}
          <div className="lg:w-1/2 w-full relative perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: -5, x: 20 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative z-10"
            >
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white bg-white">
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent z-10" />
                <img 
                  src="/hero-chest.jpg" 
                  alt="Chest X-ray" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Analysis Card */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Status</p>
                        <p className="text-sm font-bold text-slate-900">Analysis Complete</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">94% Confidence</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>Pneumonia Probability</span>
                      <span>High</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "94%" }}
                        transition={{ duration: 1, delay: 1 }}
                        className="h-full bg-linear-to-r from-blue-500 to-teal-400 rounded-full" 
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Background Blobs */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
            </motion.div>
          </div>
        </div>

        {/* Features Grid with Enhanced Design */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">PneumoScan</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Industry-leading technology meets clinical excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Glowing background blur */}
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

                {/* Glass morphism card */}
                <div className="relative bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-8 h-full overflow-hidden">
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-br from-white/20 to-slate-50/10 group-hover:from-blue-50/30 group-hover:to-teal-50/20"
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Icon Container with animation */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                      className="mb-6"
                    >
                      <div className={`w-16 h-16 bg-linear-to-br ${f.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <div className="text-white">
                          {f.icon}
                        </div>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-teal-600 transition-all">
                      {f.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed">
                      {f.desc}
                    </p>

                    {/* Accent Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      className={`mt-6 h-1 bg-linear-to-r ${f.gradient} rounded-full`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
