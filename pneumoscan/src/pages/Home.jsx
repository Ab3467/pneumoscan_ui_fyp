// Member 2
// Home.jsx: Landing page

import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* About Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          About PneumScan
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600">
          PneumScan is an AI-driven system designed to detect pneumonia
          from chest X-ray images using deep learning models.
        </p>
      </section>
    </>
  );
}