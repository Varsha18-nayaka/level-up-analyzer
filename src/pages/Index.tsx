import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AnalyzeForm from "@/components/AnalyzeForm";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <HowItWorks />
    <AnalyzeForm />
    <PricingSection />
    <TestimonialsSection />
    <Footer />
  </div>
);

export default Index;
