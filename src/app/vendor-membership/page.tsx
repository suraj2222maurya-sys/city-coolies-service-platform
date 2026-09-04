import type { Metadata } from "next";

import VendorMembershipForm from "./VendorMembershipForm";

export const metadata: Metadata = {
  title: "Vendor Membership | Join City Coolies",
  description:
    "Register as a City Coolies vendor partner and grow your service business with verified membership, secure payments and professional opportunities.",
  alternates: {
    canonical: "/vendor-membership",
  },
};

export default function VendorMembershipPage() {
  return <VendorMembershipForm />;
}
