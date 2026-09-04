import type { Metadata } from "next";

import "./contact.css";

import ContactHeroSection from "./ContactHeroSection";
import ContactFormSection from "./ContactFormSection";
import ContactReviewsSection from "./ContactReviewsSection";
import ContactMapSection from "./ContactMapSection";
import ContactFeaturesSection from "./ContactFeaturesSection";

export const metadata: Metadata = {
  title:
    "Contact City Coolies | Property Services & Support",

  description:
    "Contact City Coolies for professional cleaning, maintenance, renovation and property services in Chennai and across India.",

  alternates: {
    canonical: "/contact",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="cc-contact-page">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactReviewsSection />
      <ContactMapSection />
      <ContactFeaturesSection />
    </main>
  );
}