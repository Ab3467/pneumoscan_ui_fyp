import Hero from "../components/Hero";
import About from "../components/About";
import ModelStats from "../components/ModelStats";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <ModelStats />
    </div>
  );
}
