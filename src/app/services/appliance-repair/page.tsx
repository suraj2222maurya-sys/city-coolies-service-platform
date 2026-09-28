import type { Metadata } from "next";
import ApplianceRepairMarketplace from "./ApplianceRepairMarketplace";

export const metadata: Metadata = {
  title: "Appliance Repair & Installation | City Coolies",
  description: "Choose washing machine, refrigerator, cooler, geyser, TV, chimney, gas stove, gas pipe and exhaust fan service or installation.",
};

export default function ApplianceRepairPage() {
  return <ApplianceRepairMarketplace />;
}
