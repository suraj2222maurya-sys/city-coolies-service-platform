import type { Metadata } from "next";

import PestControlMarketplace from "./PestControlMarketplace";

export const metadata: Metadata = {
  title: "Professional Pest Control Services Across India | City Coolies",
  description:
    "Book City Coolies pest control for cockroaches, termites, bed bugs, rodents, mosquitoes, ants, commercial properties and annual pest management across India.",
  alternates: {
    canonical: "/services/pest-control",
  },
};

export default function PestControlPage() {
  return <PestControlMarketplace />;
}
