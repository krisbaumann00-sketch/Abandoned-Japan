import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import IslandsCarouselSection from "@/components/IslandsCarouselSection";
import TakaikamishimaSection from "@/components/TakaikamishimaSection";
import MapSection from "@/components/MapSection";
import AkiyaSection from "@/components/AkiyaSection";
import ExploreSection from "@/components/ExploreSection";
import VolunteerSection from "@/components/VolunteerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MissionSection />
      <IslandsCarouselSection />
      <TakaikamishimaSection />
      <MapSection />
      <AkiyaSection />
      <ExploreSection />
      <VolunteerSection />
      <Footer />
    </main>
  );
}
