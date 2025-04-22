import HeroBanner from "@/components/HeroBanner";
import FeaturesSection from "@/components/FeaturesSection";
import RatingsSection from "@/components/RatingsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroBanner />
      <FeaturesSection />
      <RatingsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
