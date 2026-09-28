import type { Metadata } from "next";
import ElectricalWorksMarketplace from "./ElectricalWorksMarketplace";

export const metadata: Metadata = {
  title: "Electrical Works | City Coolies",
  description: "Explore home wiring, electrical installation, smart switches, doorbells and meter panel services with City Coolies.",
};

export default function ElectricalWorksPage() {
  return <ElectricalWorksMarketplace />;
}