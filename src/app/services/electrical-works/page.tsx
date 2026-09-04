import type { Metadata } from "next";

import ElectricalWorksHero from "./ElectricalWorksHero";
import ElectricalWorksCommerce from "./ElectricalWorksCommerce";
import ElectricalBookingWorks from "./ElectricalBookingWorks";
import ElectricalTrustStrip from "./ElectricalTrustStrip";

import ElectricalPageMotion from "./ElectricalPageMotion";

export const metadata: Metadata = {
  title: "Electrical Works Services in Chennai | City Coolies",
  description:
    "Book professional electrical wiring, sockets, fans, lights, MCB, earthing, inverter installation and electrical repair services with City Coolies.",
};

export default function ElectricalWorksPage() {
  return (
    <main data-electrical-page>
      <ElectricalPageMotion />
      <ElectricalWorksHero />
        <ElectricalWorksCommerce />
      <ElectricalBookingWorks />
      <ElectricalTrustStrip />
    </main>
  );
}