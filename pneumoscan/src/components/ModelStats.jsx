import { motion } from "framer-motion";
import { Database, Cpu, Activity, BarChart3, Brain, Layers, Zap, TrendingUp, Shield } from "lucide-react";

export default function ModelStats() {
  const stats = [
    {
      icon: <Database className="w-6 h-6 text-white" />,
      value: "5,856",
      label: "X-Ray Images",
      desc: "Trained on validated chest radiographs (Normal & Pneumonia)",
      gradient: "from-blue-600 to-cyan-500",
      color: "bg-blue-600"
    },
    {
      icon: <Activity className="w-6 h-6 text-white" />,
      value: "95.2%",
      label: "Model Accuracy",
      desc: "Achieved on independent test set using Custom CNN",
      gradient: "from-emerald-500 to-teal-400",
      color: "bg-emerald-500"
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      value: "ResNet50",
      label: "Architecture",
      desc: "Transfer learning with fine-tuned convolution layers",
      gradient: "from-purple-600 to-pink-500",
      color: "bg-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-32 bg-linear-to-b from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
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
          className="absolute top-20 right-20 text-blue-400"
        >
          <div className="w-52 h-52 rounded-full border-2 border-blue-200/30" />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: -360,
            y: [0, 40, 0],
            opacity: [0.08, 0.2, 0.08] 
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-32 left-10 text-purple-300"
        >
          <div className="w-60 h-60 rounded-full border-2 border-purple-200/20" />
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-80 h-80 bg-linear-to-br from-blue-400/10 to-transparent rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-linear-to-tl from-purple-400/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-semibold text-blue-600 mb-6 border border-blue-100">
            Performance Metrics
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Advanced ML Model <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-teal-500 to-purple-600">
              Built for Accuracy
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Our AI model is built on rigorous testing and high-quality medical datasets with proven results.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative group"
            >
              {/* Blur glow background */}
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
              
              {/* Main card with glass morphism */}
              <div className="relative bg-white/50 backdrop-blur-xl border border-white/50 rounded-2xl p-8 text-center overflow-hidden h-full">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-blue-50/0 to-teal-50/0 group-hover:from-blue-100/40 group-hover:to-teal-100/40"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />

                {/* Floating animated icon */}
                <motion.div
                  className="relative flex justify-center mb-6"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                </motion.div>

                {/* Stat value with pulsing animation */}
                <motion.h3
                  className="text-3xl font-bold text-slate-900 mb-2"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  {stat.value}
                </motion.h3>

                {/* Label */}
                <p className="font-bold text-slate-800 mb-3">{stat.label}</p>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Background animated gradient elements */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 right-0 w-80 h-80 bg-linear-to-bl from-blue-500/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-72 h-72 bg-linear-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"
          />

          {/* Main content */}
          <div className="relative bg-linear-to-br from-slate-900/90 via-slate-900/95 to-slate-950/95 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-slate-800/50 overflow-hidden">
            
            {/* Content grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-teal-500 rounded-full" />
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">Technology Stack</h3>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                  Powered by Modern <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-teal-400">Technologies</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Built with cutting-edge frameworks and libraries designed for speed, reliability, and enterprise-grade scalability.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-wrap gap-3 md:gap-4"
              >
                {['Python', 'TensorFlow', 'React', 'Tailwind CSS', 'Vite', 'Node.js'].map((tech, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                    className="px-5 py-3 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 font-semibold text-white hover:border-white/40 transition-all group"
                  >
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-teal-400 to-purple-400 group-hover:from-blue-300 group-hover:to-purple-300">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
