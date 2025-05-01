import HeroBanner from "@/components/HeroBanner";
import FeaturesSection from "@/components/FeaturesSection";
import RatingsSection from "@/components/RatingsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="">
      <HeroBanner />
      <FeaturesSection />
      <RatingsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
