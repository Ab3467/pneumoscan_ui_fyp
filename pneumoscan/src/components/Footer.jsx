import { Github, Twitter, Linkedin, Activity, Heart, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <footer className="relative mt-auto overflow-hidden bg-linear-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Background Orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [-50, 50, -50], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
        />

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
            style={{
              backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        {/* Floating Icons */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 right-10 text-blue-400/20"
        >
          <Heart size={48} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ ...floatingVariants.animate.transition, delay: 1 }}
          className="absolute bottom-1/4 left-10 text-teal-400/20"
        >
          <Zap size={48} />
        </motion.div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
              <motion.div 
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="bg-linear-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Activity className="text-white h-5 w-5" />
                </motion.div>
                <span className="text-2xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  PneumoScan
                </span>
              </motion.div>
              <motion.p 
                className="text-gray-400 max-w-xs leading-relaxed"
                whileHover={{ color: "#e0e7ff" }}
              >
                Empowering healthcare with AI-driven pneumonia detection for faster,
                more accurate diagnoses.
              </motion.p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["Home", "About Us", "Start Diagnosis"].map((link, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a href={link === "Start Diagnosis" ? "/upload" : link === "About Us" ? "/#about" : "/"} 
                      className="text-gray-400 hover:text-blue-400 transition-colors inline-block">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-teal-500 rounded-full" />
                Contact
              </h4>
              <ul className="space-y-3 text-gray-400">
                <motion.li whileHover={{ color: "#ffffff" }} className="cursor-pointer">
                  support@pneumoscan.health
                </motion.li>
                <li className="flex gap-4 mt-4 pt-2">
                  {[
                    { icon: Github, href: "#", color: "text-gray-400 hover:text-blue-400" },
                    { icon: Twitter, href: "#", color: "text-gray-400 hover:text-cyan-400" },
                    { icon: Linkedin, href: "#", color: "text-gray-400 hover:text-blue-600" },
                  ].map((social, idx) => (
                    <motion.a 
                      key={idx}
                      href={social.href} 
                      className={social.color + " transition-colors"}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div 
            variants={itemVariants}
            className="border-t border-gray-700/50 mt-12 pt-8"
          >
            <motion.p 
              className="text-center text-gray-500 text-sm"
              whileHover={{ color: "#a1a5fb" }}
            >
              © {new Date().getFullYear()} PneumoScan FYP Group. All rights reserved.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
