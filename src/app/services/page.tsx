import type { Metadata } from "next";

import AllServicesSection from "./AllServicesSection";
import ServicesHeroSection from "./ServicesHeroSection";

export const metadata: Metadata = {
  title: "Professional Property Services | City Coolies",
  description:
    "Book professional cleaning, renovation, electrical, plumbing, painting, repairs, interiors, moving, pest control and complete property maintenance services with City Coolies in Chennai and across India.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHeroSection />
      <AllServicesSection />
    </main>
  );
}

