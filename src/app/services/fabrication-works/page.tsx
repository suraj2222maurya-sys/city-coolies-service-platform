import type { Metadata } from "next";
import FabricationWorksMarketplace from "./FabricationWorksMarketplace";

export const metadata: Metadata = {
  title: "Fabrication Works | City Coolies",
  description: "Browse gate fabrication, grills, railings, sheds, steel frames, welding repair and commercial fabrication site surveys with City Coolies.",
};

export default function FabricationWorksPage() {
  return <FabricationWorksMarketplace />;
}
