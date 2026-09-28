import type { Metadata } from "next";
import PackersMoversMarketplace from "./PackersMoversMarketplace";

export const metadata: Metadata = {
  title: "Packers & Movers | City Coolies",
  description: "Get a free moving quote for local home shifting, intercity relocation, office moving, vehicle transport, packing and loading in Chennai and beyond.",
};

export default function PackersMoversPage() {
  return <PackersMoversMarketplace />;
}
