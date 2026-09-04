import type { Metadata } from "next";

import PackersMoversMarketplace from "./PackersMoversMarketplace";

export const metadata: Metadata = {
  title: "Packers & Movers in Chennai | City Coolies",
  description: "Book verified packers and movers for local, intercity, office, vehicle and special-item relocation. Transparent estimate and secure online booking.",
  alternates: { canonical: "/services/packers-movers" },
};

export default function PackersMoversPage() {
  return <PackersMoversMarketplace />;
}
