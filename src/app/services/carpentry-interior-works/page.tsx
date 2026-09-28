import type { Metadata } from "next";
import CarpentryInteriorMarketplace from "./CarpentryInteriorMarketplace";

export const metadata: Metadata = {
  title: "Carpentry & Interior Works | City Coolies",
  description: "Book a carpentry or interior design site survey. Explore furniture, doors, wardrobes, modular kitchens and home or commercial interior planning.",
};

export default function CarpentryInteriorPage() {
  return <CarpentryInteriorMarketplace />;
}
