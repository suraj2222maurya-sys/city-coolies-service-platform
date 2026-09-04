import type { Metadata } from "next";

import PlumbingWorksCommerce from "./PlumbingWorksCommerce";
import PlumbingHeroMotion from "./PlumbingHeroMotion";
import PlumbingWorksHero from "./PlumbingWorksHero";

export const metadata: Metadata = {
  title: "Professional Plumbing Services in Chennai | City Coolies",
  description:
    "Book verified plumbers for professional plumbing installation, repair and maintenance services with City Coolies.",
  alternates: {
    canonical: "/services/plumbing-works",
  },
};

export default function PlumbingWorksPage() {
  return (
    <div data-plumbing-works-page>
      <PlumbingHeroMotion />
      <PlumbingWorksHero />
      <PlumbingWorksCommerce />
    </div>
  );
}
