import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import AIBuilderSection from "@/components/AIBuilderSection";
import DevMarketplace from "@/components/DevMarketplace";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <AIBuilderSection />
      <DevMarketplace />
      <PricingSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
