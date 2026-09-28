import type { Metadata } from "next";
import GardeningMarketplace from "./GardeningMarketplace";

export const metadata: Metadata = {
  title: "Gardening & Landscaping | City Coolies",
  description: "Gardener visits, lawn care, landscaping, vertical gardens, nursery plants, pots and compost with City Coolies.",
};

export default function GardeningPage() {
  return <GardeningMarketplace />;
}
