import { motion } from "framer-motion";

export default function LoadingSkeleton({ type = "card" }) {
  if (type === "analysis") {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="p-8">
          <div className="animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-6 bg-slate-200 rounded-full w-20"></div>
            </div>

            {/* Image placeholder */}
            <div className="relative mb-6">
              <div className="w-full h-64 bg-slate-200 rounded-2xl"></div>
              <div className="absolute inset-0 bg-slate-100 rounded-2xl animate-pulse"></div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "upload") {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="animate-pulse">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-64 mx-auto"></div>
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-32 mx-auto mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
      <div className="animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-slate-200 rounded"></div>
          <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          <div className="h-3 bg-slate-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}