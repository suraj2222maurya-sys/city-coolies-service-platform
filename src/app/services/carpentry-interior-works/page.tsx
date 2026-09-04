import type { Metadata } from "next";
import CarpentryInteriorMarketplace from "./CarpentryInteriorMarketplace";

export const metadata: Metadata = {
  title: "Carpentry & Interior Works in Chennai | City Coolies",
  description: "Book professional carpentry and interior site surveys in Chennai. Select your requirements, pay ₹500 survey fee, and receive a final quotation after inspection.",
  alternates: { canonical: "/services/carpentry-interior-works" },
};

export default function CarpentryInteriorWorksPage() {
  return <CarpentryInteriorMarketplace />;
}
