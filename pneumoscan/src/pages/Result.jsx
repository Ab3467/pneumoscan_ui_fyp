// Member 2
// Result.jsx: AI prediction result page (dummy for now)

export default function Result() {
  // Dummy result for FYP presentation
  const result = "Positive"; // change to "Negative" if needed

  return (
    <div className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">
        AI Prediction Result
      </h2>

      {/* Result Status */}
      <p
        className={`text-4xl font-bold ${
          result === "Positive"
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {result}
      </p>

      {/* Suggestion */}
      <p className="mt-6 max-w-xl mx-auto text-gray-600">
        {result === "Positive"
          ? "Pneumonia detected. Please consult a medical professional."
          : "No pneumonia detected. Stay healthy!"}
      </p>
    </div>
  );
}