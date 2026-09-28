import type { Metadata } from "next";
import PlumbingWorksMarketplace from "./PlumbingWorksMarketplace";

export const metadata: Metadata = {
  title: "Plumbing Works | City Coolies",
  description: "Book plumbing services for homes, apartments, villas, schools and commercial properties. Choose pipe work and fitting services or arrange a site survey.",
};

export default function PlumbingWorksPage() {
  return <PlumbingWorksMarketplace />;
}
