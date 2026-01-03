import { motion } from "framer-motion";
import { Upload, Cpu, FileText, CheckCircle2 } from "lucide-react";

export default function About() {
  const steps = [
    {
      icon: <Upload className="w-6 h-6 text-white" />,
      title: "Upload X-Ray",
      desc: "Securely upload a chest X-ray image in standard formats (JPEG, PNG).",
      color: "bg-blue-600",
      delay: 0,
    },
    {
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: "AI Analysis",
      desc: "Our deep learning model analyzes the image for pneumonia patterns.",
      color: "bg-teal-500",
      delay: 0.2,
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Instant Report",
      desc: "Receive a comprehensive diagnostic report with confidence scores.",
      color: "bg-indigo-600",
      delay: 0.4,
    },
  ];

  const stats = [
    { value: "98.5%", label: "Accuracy Rate" },
    { value: "2.4s", label: "Processing Time" },
    { value: "50k+", label: "Images Trained" },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 text-center">
                  <h4 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Timeline/Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-teal-200 to-transparent lg:left-8" />
            
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
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/5 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
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
      </div>
    </section>
  );
}
