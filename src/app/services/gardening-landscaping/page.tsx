import type { Metadata } from "next";

import GardeningHero from "./GardeningHero";
import GardeningTrustStrip from "./GardeningTrustStrip";
import GardeningMarketplace from "./GardeningMarketplaceClient";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title:
    "Gardening & Landscaping Services in Chennai | City Coolies",
  description:
    "Professional gardening and landscaping services in Chennai for homes, offices and commercial spaces, including garden maintenance, lawn care, plants, pots and landscape styling.",
  alternates: {
    canonical: "/services/gardening-landscaping",
  },
  openGraph: {
    title:
      "Professional Gardening & Landscaping Services | City Coolies",
    description:
      "Expert garden care, lawn maintenance, landscaping, plants and designer pots for beautiful green spaces.",
    url: "/services/gardening-landscaping",
    type: "website",
    images: [
      {
        url: "/city-coolies-gardening-hero-banner-v3.png",
        width: 2048,
        height: 768,
        alt: "City Coolies professional gardening and landscaping service",
      },
    ],
  },
};

export default function GardeningLandscapingPage() {
  return (
    <main>
      <GardeningHero />
      <GardeningTrustStrip />

      <GardeningMarketplace />
    </main>
  );
}