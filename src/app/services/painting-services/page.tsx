import type { Metadata } from "next";

import PaintingHeroMotion from "./PaintingHeroMotion";

import PaintingWorksCommerce from "./PaintingWorksCommerce";
export const metadata: Metadata = {
  title: "Professional Painting Services | City Coolies",
  description:
    "Book professional painters for interior, exterior, waterproofing, decorative and specialized painting services with City Coolies.",
  alternates: {
    canonical: "/services/painting-services",
  },
};

export default function PaintingServicesPage() {
  return (
    <main>
      <PaintingHeroMotion />
      <PaintingWorksCommerce />
    </main>
  );
}