import { motion } from "framer-motion";
import { Database, Cpu, Activity, BarChart3, Brain, Layers } from "lucide-react";

export default function ModelStats() {
  const stats = [
    {
      icon: <Database className="w-8 h-8 text-blue-500" />,
      value: "5,856",
      label: "X-Ray Images",
      desc: "Trained on validated chest radiographs (Normal & Pneumonia)",
      color: "bg-blue-50 border-blue-100"
    },
    {
      icon: <Activity className="w-8 h-8 text-emerald-500" />,
      value: "95.2%",
      label: "Model Accuracy",
      desc: "Achieved on independent test set using Custom CNN",
      color: "bg-emerald-50 border-emerald-100"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      value: "ResNet50",
      label: "Architecture",
      desc: "Transfer learning with fine-tuned convolution layers",
      color: "bg-purple-50 border-purple-100"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Technical <span className="text-blue-600">Performance</span>
            </h2>
            <p className="text-lg text-slate-600">
              Our AI model is built on rigorous testing and high-quality medical datasets.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} border p-8 rounded-3xl relative overflow-hidden group hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {stat.icon}
              </div>
              
              <div className="relative z-10">
                <div className="mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</h3>
                <p className="font-bold text-slate-700 mb-2">{stat.label}</p>
                <p className="text-sm text-slate-600">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Powered by Modern Tech Stack</h3>
              <p className="text-slate-400">Built for speed, reliability, and scalability.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {['Python', 'TensorFlow', 'React', 'Tailwind CSS', 'Vite'].map((tech, i) => (
                <div key={i} className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 font-medium hover:bg-white/20 transition-colors">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
