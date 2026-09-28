import type { Metadata } from "next";
import SpaSalonMarketplace from "./SpaSalonMarketplace";

export const metadata: Metadata = {
  title: "Spa & Salon | City Coolies",
  description: "Explore spa and salon services for women and men.",
};

export default function SpaSalonPage() {
  return <SpaSalonMarketplace />;
}
