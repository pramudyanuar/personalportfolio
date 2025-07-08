import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";
import Starfield from "./components/Starfield";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Starfield />
      <IntroSection />
      <Footer />
    </div>
  );
}