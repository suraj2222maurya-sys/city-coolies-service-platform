import type { Metadata } from "next";
import RentalMarketplace from "./RentalMarketplace";

export const metadata: Metadata = {
  title: "Rental Services | City Coolies",
  description: "Explore City Coolies rental services.",
};

export default function RentalServicesPage() {
  return <RentalMarketplace />;
}