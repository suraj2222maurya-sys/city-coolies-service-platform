"use client";

import dynamic from "next/dynamic";

const GardeningMarketplace = dynamic(
  () => import("./GardeningMarketplace"),
  {
    ssr: false,
    loading: () => (
      <section
        aria-label="Loading gardening services"
        style={{
          minHeight: "420px",
          background: "#fffafb",
        }}
      />
    ),
  },
);

export default function GardeningMarketplaceClient() {
  return <GardeningMarketplace />;
}