import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="bg-blue-50 py-20 text-center">
      <h1 className="text-5xl font-bold text-blue-700">
        AI-Driven Pneumonia Detection
      </h1>

      <p className="mt-4 text-gray-600">
        Upload chest X-ray and get instant AI analysis
      </p>

      <Link to="/upload">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
          Get Started
        </button>
      </Link>
    </div>
  );
}