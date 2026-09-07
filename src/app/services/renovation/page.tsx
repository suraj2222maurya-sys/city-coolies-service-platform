import type { Metadata } from "next";

import RenovationHero from "./RenovationHero";
import RenovationMarketplace from "./RenovationMarketplace";
import RenovationCoverageSection from "./RenovationCoverageSection";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title:
    "Renovation Services in Chennai | Home & Property Renovation | City Coolies",
  description:
    "Professional renovation services for homes, apartments, villas and commercial properties. Select renovation work and book a ₹500 site survey with City Coolies.",
  alternates: {
    canonical: "/services/renovation",
  },
  openGraph: {
    title:
      "Professional Renovation Services in Chennai | City Coolies",
    description:
      "Professional home and property renovation with measurement, planning, quality materials and skilled execution.",
    url: "/services/renovation",
    type: "website",
    images: [
      {
        url: "/city-coolies-renovation-hero-banner.png",
        width: 2048,
        height: 1152,
        alt: "City Coolies professional renovation services",
      },
    ],
  },
};

export default function RenovationPage() {
  return (
    <main>
      <RenovationHero />
      <RenovationMarketplace />
      <RenovationCoverageSection />
    </main>
  );
}