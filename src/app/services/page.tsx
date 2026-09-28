import type { Metadata } from "next";
import ServicesMarketplaceHero from "./ServicesMarketplaceHero";

export const metadata: Metadata = {
  title: "Services | City Coolies",
  description:
    "Find and book professional City Coolies services for homes, businesses and industries.",
};

export default function ServicesPage() {
  return (
    <main aria-label="City Coolies services">
      <ServicesMarketplaceHero />
    </main>
  );
}
