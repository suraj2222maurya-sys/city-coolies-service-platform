import SpaSalonAudienceSelector from "./SpaSalonAudienceSelector";
import type { Metadata } from "next";

import SpaSalonHero from "./SpaSalonHero";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Spa & Salon Services at Home in Chennai | City Coolies",
  description:
    "Book premium at-home spa, salon, beauty and wellness services in Chennai with trained City Coolies professionals.",
  alternates: {
    canonical: "/services/spa-salon-services",
  },
  openGraph: {
    title: "Premium At-Home Spa & Salon Services | City Coolies",
    description:
      "Salon-quality beauty and wellness care delivered to your home.",
    url: "/services/spa-salon-services",
    type: "website",
    images: [
      {
        url: "/spa-salon-hero-banner-v3.png",
        width: 2048,
        height: 682,
        alt: "City Coolies professional providing a premium facial spa service at home",
      },
    ],
  },
};

export default function SpaSalonServicesPage() {
  return (
    <main>
      <SpaSalonHero />
      <SpaSalonAudienceSelector />
    </main>
  );
}