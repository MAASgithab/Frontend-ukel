import NavbarComponent from "./assets/components/Navbar.jsx";
import HeroSection from "./assets/components/HeroSection.jsx";
import BannerPromo from "./assets/components/BannerPromo.jsx";
import KeunggulanSection from "./assets/components/KeunggulanSection.jsx";
import TentangSection from "./assets/components/TentangSection.jsx";
import Footer from "./assets/components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarComponent />
      <HeroSection />
      <BannerPromo />
      <KeunggulanSection />
      <TentangSection />
      <Footer />
    </div>
  );
}