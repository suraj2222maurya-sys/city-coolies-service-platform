import CivilServicesMarketplace from "./CivilServicesMarketplace";
import type { Metadata } from "next";

import CivilConstructionHeroMotion from "./CivilConstructionHeroMotion";

export const metadata: Metadata = {
  title: "Civil Construction & Maintenance Services | City Coolies",
  description:
    "Book professional civil construction, structural, masonry, flooring, waterproofing, repair and maintenance services with City Coolies.",
  alternates: {
    canonical: "/services/civil-construction-maintenance",
  },
};

export default function CivilConstructionMaintenancePage() {
  return (
    <main>
      <CivilConstructionHeroMotion />
          <CivilServicesMarketplace />
    </main>
  );
}