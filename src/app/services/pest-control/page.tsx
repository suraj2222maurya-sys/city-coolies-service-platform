import type { Metadata } from "next";
import PestControlMarketplace from "./PestControlMarketplace";

export const metadata: Metadata = {
  title: "Pest Control | City Coolies",
  description: "Explore home, apartment, cockroach, termite, bed bug, rodent and commercial pest control services with City Coolies.",
};

export default function PestControlPage() {
  return <PestControlMarketplace />;
}
