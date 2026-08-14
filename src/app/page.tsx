import CoreServicesSection from "@/components/home/CoreServicesSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import WorkProcessSection from "@/components/home/WorkProcessSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreServicesSection />
      <WhyChooseUsSection />
      <WorkProcessSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}