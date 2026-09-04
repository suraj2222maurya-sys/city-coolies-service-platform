import type { Metadata } from "next";
import ApplianceRepairMarketplace from "./ApplianceRepairMarketplace";

export const metadata: Metadata = {
  title: "Appliance Repair Services in Chennai | City Coolies",
  description:
    "Book AC, refrigerator, washing machine, microwave, RO, geyser, television and commercial appliance repair services with City Coolies.",
  alternates: { canonical: "/services/appliance-repair" },
};

export default function ApplianceRepairPage() {
  return <ApplianceRepairMarketplace />;
}
