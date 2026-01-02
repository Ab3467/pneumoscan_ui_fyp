export default function About() {
  const steps = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2v10l3-3"/></svg>
      ),
      title: "Upload X-Ray",
      desc: "Upload a chest X-ray image in standard formats (JPEG, PNG).",
      color: "bg-blue-500",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 12l2 2 4-4"/></svg>
      ),
      title: "AI Analysis",
      desc: "Our deep learning model analyzes the image for pneumonia patterns.",
      color: "bg-teal-500",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18"/></svg>
      ),
      title: "Get Diagnosis",
      desc: "Receive an instant prediction with confidence score and suggestions.",
      color: "bg-indigo-500",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="mb-12 lg:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Revolutionizing Healthcare with <br />
              <span className="text-blue-600">Artificial Intelligence</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Pneumonia is a life-threatening disease that requires early
              detection for effective treatment. PneumoScan bridges the gap
              between technology and healthcare by providing an accessible,
              accurate, and fast diagnostic tool.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our system utilizes advanced Convolutional Neural Networks (CNNs)
              trained on thousands of validated medical datasets to identify
              potential pneumonia indicators in chest X-rays, acting as a
              reliable assistant for medical professionals and patients alike.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="text-3xl font-bold text-blue-600 mb-1">95%</h4>
                    <p className="text-sm text-gray-600 font-medium">Model Accuracy</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                    <h4 className="text-3xl font-bold text-teal-600 mb-1">2s</h4>
                    <p className="text-sm text-gray-600 font-medium">Processing Time</p>
                </div>
            </div>
          </div>

          {/* Right Content - Timeline/Steps */}
          <div className="relative">
            <div className="absolute top-0 left-8 h-full w-0.5 bg-gray-200" />
            
            <div className="space-y-12">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-6 group">
                  <div
                    className={`relative z-10 flex-shrink-0 w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
