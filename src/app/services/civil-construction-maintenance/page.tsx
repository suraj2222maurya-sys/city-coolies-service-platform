import type { Metadata } from "next";
import CivilConstructionMarketplace from "./CivilConstructionMarketplace";

export const metadata: Metadata = {
  title: "Civil Construction & Maintenance | City Coolies",
  description: "Explore home and apartment construction, exterior civil work, commercial and industrial construction, repairs, RCC and complete construction. Book a site survey with City Coolies.",
};

export default function CivilConstructionPage() {
  return <CivilConstructionMarketplace />;
}
