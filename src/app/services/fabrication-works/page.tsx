import type { Metadata } from "next";

import FabricationBenefits from "./FabricationBenefits";
import FabricationHero from "./FabricationHero";
import FabricationMarketplace from "./FabricationMarketplace";
import FabricationTrustStrip from "./FabricationTrustStrip";
import FabricationPageMotion from "./FabricationPageMotion";
import styles from "./FabricationWorks.module.css";

export const metadata: Metadata = {
  title: "Fabrication Works in Chennai | Gates, Grills & Steel Work | City Coolies",
  description:
    "Book professional fabrication works in Chennai for gates, grills, railings, staircases, roofing sheds, structural steel, shutters and custom welding. Fixed ₹500 site survey with final quotation after measurement.",
  keywords: [
    "fabrication works in Chennai",
    "MS gate fabrication Chennai",
    "SS gate fabrication Chennai",
    "grill fabrication Chennai",
    "steel railing Chennai",
    "roofing shed fabrication Chennai",
    "structural steel fabrication Chennai",
    "rolling shutter fabrication Chennai",
    "custom welding Chennai",
  ],
  alternates: {
    canonical: "/services/fabrication-works",
  },
  openGraph: {
    title: "Professional Fabrication Works in Chennai | City Coolies",
    description:
      "Custom gates, grills, railings, staircases, roofing sheds, shutters and structural fabrication with professional site measurement.",
    url: "/services/fabrication-works",
    type: "website",
    images: [
      {
        url: "/city-coolies-fabrication-hero.png",
        width: 1600,
        height: 900,
        alt: "City Coolies professional fabrication works",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fabrication Works in Chennai",
  serviceType:
    "Gates, grills, railings, staircases, roofing sheds, shutters, structural steel and custom metal fabrication",
  provider: {
    "@type": "LocalBusiness",
    name: "City Coolies",
  },
  areaServed: ["Chennai", "Tamil Nadu", "India"],
  offers: {
    "@type": "Offer",
    price: "500",
    priceCurrency: "INR",
    description:
      "Fixed site survey booking fee. Final fabrication quotation is confirmed after site measurement.",
  },
};

export default function FabricationWorksPage() {
  return (
    <main className={styles.page} data-fabrication-page>
      <FabricationPageMotion />
      <FabricationHero />
      <FabricationBenefits />
      <FabricationMarketplace />
      <FabricationTrustStrip />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </main>
  );
}

