import type { Metadata } from "next";
import RenovationMarketplace from "./RenovationMarketplace";

export const metadata: Metadata = {
  title: "Renovation Services | City Coolies",
  description:
    "Explore home, kitchen, bathroom, villa, electrical, office and showroom renovation services. Book a site survey with City Coolies.",
};

export default function RenovationPage() {
  return <RenovationMarketplace />;
}