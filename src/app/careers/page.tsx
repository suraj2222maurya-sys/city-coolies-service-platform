import type { Metadata } from "next";

import CareersHeroSection from "./CareersHeroSection";
import CareersCultureSection from "./CareersCultureSection";
import CareersOpportunitiesSection from "./CareersOpportunitiesSection";
import CareersCTASection from "./CareersCTASection";

export const metadata: Metadata = {
  title:
    "Careers at City Coolies | Jobs & Career Opportunities",
  description:
    "Explore careers at City Coolies and discover opportunities to grow with a modern professional services team built around skill, ownership, customer experience and meaningful work.",
  keywords: [
    "City Coolies careers",
    "careers at City Coolies",
    "City Coolies jobs",
    "career opportunities",
    "service industry careers",
    "professional services jobs",
    "jobs in Chennai",
  ],
  alternates: {
    canonical: "/careers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function CareersPage() {
  return (
    <main>
      <CareersHeroSection />
      <CareersCultureSection />
      <CareersOpportunitiesSection />
      <CareersCTASection />
    </main>
  );
}
