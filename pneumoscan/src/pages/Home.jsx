import Hero from "../components/Hero";
import Brochure from "../components/Brochure";
import About from "../components/About";
import ModelStats from "../components/ModelStats";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Brochure />
      <About />
      <ModelStats />
    </div>
  );
}
