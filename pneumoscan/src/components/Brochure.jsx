import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Shield, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";

const sections = [
  {
    id: "workflow",
    title: "Clinical workflow",
    subtitle: "Fast scans, clear results",
    description:
      "Streamline chest X-ray review with instant AI findings, confidence scores, and a clinician-friendly reporting experience.",
    accent: "bg-blue-100 text-blue-700",
  },
  {
    id: "security",
    title: "Security & compliance",
    subtitle: "Protected patient data",
    description:
      "Encrypted upload and secure history management help maintain trust across hospital and clinic environments.",
    accent: "bg-teal-100 text-teal-700",
  },
  {
    id: "insights",
    title: "Explainable insights",
    subtitle: "Heatmaps and confidence",
    description:
      "Support decisions with transparent model output, visual heatmaps, and easy-to-share diagnostic summaries.",
    accent: "bg-slate-100 text-slate-700",
  },
];

export default function Brochure() {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm">
              <FileText className="w-4 h-4" />
              App brochure
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              A smarter brochure for PneumoScan
            </h2>
            <p className="text-lg text-slate-600 max-w-xl leading-8">
              Explore three interactive sections that highlight the clinical workflow, security, and explainable AI behind our chest X-ray analysis.
            </p>

            <div className="relative">
              <div className="pointer-events-none hidden lg:block">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 380" fill="none" preserveAspectRatio="none">
                  <path d="M80 80 C 240 80 360 160 520 160" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 6" />
                  <path d="M80 200 C 240 200 360 240 520 240" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 6" />
                  <path d="M80 320 C 240 320 360 320 520 320" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="520" cy="160" r="4" fill="#cbd5e1" />
                  <circle cx="520" cy="240" r="4" fill="#cbd5e1" />
                  <circle cx="520" cy="320" r="4" fill="#cbd5e1" />
                </svg>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 relative z-10">
                {sections.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveSection(item);
                      setIsModalOpen(true);
                    }}
                    className="group rounded-3xl border border-slate-200 p-5 bg-slate-50 shadow-sm text-left transition hover:border-blue-300 hover:bg-white"
                  >
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${item.accent}`}>
                      <CheckCircle2 className="w-4 h-4" /> {item.subtitle}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition">
                      Open brochure →
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition"
              >
                Explore the app
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                View brochure
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-700 to-teal-500 p-1 shadow-2xl shadow-slate-300/30"
            >
              <div className="rounded-[2rem] bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Brochure preview
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900">Live brochure card</h3>
                  </div>
                  <div className="rounded-2xl bg-blue-50 px-3 py-2 text-blue-700 text-xs font-semibold">
                    Interactive
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-200 p-4 bg-slate-50">
                    <h4 className="text-sm font-semibold text-slate-900">{activeSection.title}</h4>
                    <p className="mt-2 text-sm text-slate-600 leading-6">{activeSection.description}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 p-4 bg-slate-50">
                    <h4 className="text-sm font-semibold text-slate-900">Section</h4>
                    <p className="mt-2 text-sm text-slate-600 leading-6">{activeSection.subtitle}</p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 text-white">
                  <img src="/hero-chest.jpg" alt="Brochure preview" className="h-52 w-full object-cover" />
                  <div className="p-5 bg-slate-950/95">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Interactive preview</p>
                    <h4 className="mt-3 text-lg font-semibold text-white">Tap any card to open details</h4>
                    <p className="mt-2 text-sm text-slate-300 leading-6">
                      The brochure animation shows each section with a clean, polished UI that matches PneumoScan.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-3xl rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Brochure section</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900">{activeSection.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-6 lg:grid-cols-3 p-6">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      item.id === activeSection.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.subtitle}</p>
                    <h4 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h4>
                  </button>
                ))}
              </div>
              <div className="space-y-6 p-6 border-t border-slate-200 bg-slate-50">
                <p className="text-base leading-7 text-slate-700">{activeSection.description}</p>
                <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">What this means for your team</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {activeSection.id === "workflow"
                      ? "Save hours with a more efficient X-ray review process and fewer manual steps between scan and decision."
                      : activeSection.id === "security"
                      ? "Keep patient records secure while giving care teams a familiar, compliant review interface."
                      : "Help clinicians trust AI findings with transparent visuals and straightforward summary details."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                    <Sparkles className="w-4 h-4" /> Smooth animated reveal
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                    <Shield className="w-4 h-4" /> Clinically relevant
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// brochure design