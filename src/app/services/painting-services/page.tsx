import type { Metadata } from "next";
import PaintingServicesMarketplace from "./PaintingServicesMarketplace";

export const metadata: Metadata = {
  title: "Painting Services | City Coolies",
  description: "Explore home and commercial painting, waterproofing, texture finishes, and safety marking. Book a painting site survey with City Coolies.",
};

export default function PaintingServicesPage() {
  return <PaintingServicesMarketplace />;
}
