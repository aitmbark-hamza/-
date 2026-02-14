import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/New";
import CatalogSection from "@/components/CatalogSection";
import OrderProcess from "@/components/Videos";
import WholesaleTerms from "@/components/WholesaleTerms";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <CatalogSection />
      <OrderProcess />
      <WholesaleTerms />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
