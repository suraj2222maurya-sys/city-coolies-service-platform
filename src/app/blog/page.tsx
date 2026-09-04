import type { Metadata } from "next";

import BlogHeroSection from "./BlogHeroSection";
import BlogFeaturedSection from "./BlogFeaturedSection";
import BlogArticlesSection from "./BlogArticlesSection";
import BlogCTASection from "./BlogCTASection";

export const metadata: Metadata = {
  title:
    "City Coolies Blog | Property Care, Maintenance & Service Insights",

  description:
    "Explore practical property care, maintenance, cleaning, renovation and professional service insights from City Coolies.",

  alternates: {
    canonical: "/blog",
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

export default function BlogPage() {
  return (
    <main>
      <BlogHeroSection />
      <BlogFeaturedSection />
      <BlogArticlesSection />
      <BlogCTASection />
    </main>
  );
}