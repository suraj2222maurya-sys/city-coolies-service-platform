import type { Metadata } from "next";

import AboutCTASection from "./AboutCTASection";
import AboutHeroSection from "./AboutHeroSection";
import MissionVisionSection from "./MissionVisionSection";
import WhoWeAreSection from "./WhoWeAreSection";

export const metadata: Metadata = {
  title: "About Us | City Coolies",
  description:
    "Learn about City Coolies, a professional property care and maintenance service provider serving Chennai and customers across India.",
};

export default function AboutUsPage() {
  return (
    <main>
      <AboutHeroSection />
      <WhoWeAreSection />
      <MissionVisionSection />
      <AboutCTASection />
    </main>
  );
}
