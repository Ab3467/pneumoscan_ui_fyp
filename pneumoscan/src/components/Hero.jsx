import { Link } from "react-router-dom";

function SmallIcon({ type }) {
  if (type === "spark")
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  return null;
}

export default function Hero() {
  const features = [
    {
      title: "High Accuracy",
      desc: "Trained on thousands of X-ray images for precise results.",
    },
    {
      title: "Instant Results",
      desc: "Get analysis within seconds of uploading your scan.",
    },
    {
      title: "Secure & Private",
      desc: "Your medical data is handled securely and privately.",
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white pt-28 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <SmallIcon type="spark" /> AI-Powered Diagnostics
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Detect Pneumonia with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Unmatched Precision</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Leveraging state-of-the-art deep learning models to analyze chest X-rays and provide instant, reliable pneumonia predictions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/upload" className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-shadow shadow">
              Start Diagnosis
            </Link>
            <a href="#about" className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50">
              Learn More
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-blue-600 font-semibold">{i + 1}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-100/50 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
