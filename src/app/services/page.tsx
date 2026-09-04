import type { Metadata } from "next";

import PopularServicesSection from "./PopularServicesSection";
import AllServicesSection from "./AllServicesSection";
import ServicesTrustOfferSection from "./ServicesTrustOfferSection";
import ServicesHowItWorksSection from "./ServicesHowItWorksSection";
import ServicesTrustStatsStrip from "./ServicesTrustStatsStrip";
import ServicesHeroSection from "./ServicesHeroSection";


import ServicesExperienceMotion from "./ServicesExperienceMotion";
export const metadata: Metadata = {
  title: "Professional Property Services | City Coolies",
  description:
    "Book professional cleaning, renovation, electrical, plumbing, painting, repairs, interiors, moving, pest control and complete property maintenance services with City Coolies in Chennai and across India.",
};

export default function ServicesPage() {
  return (
    <main>
            <ServicesExperienceMotion />
      <ServicesHeroSection />
      <PopularServicesSection />
      <AllServicesSection />
      <ServicesTrustOfferSection />
      <ServicesHowItWorksSection />
      <ServicesTrustStatsStrip />
    </main>
  );
}

