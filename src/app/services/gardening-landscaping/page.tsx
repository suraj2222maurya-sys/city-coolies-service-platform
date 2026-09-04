import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gardening & Landscaping Services in Chennai | City Coolies",
  description:
    "Book professional gardening and landscaping services in Chennai with City Coolies for homes, villas, offices and commercial properties.",
  alternates: {
    canonical: "/services/gardening-landscaping",
  },
};

export default function GardeningLandscapingPage() {
  return (
    <main
      style={{
        minHeight: "70vh",
        background:
          "linear-gradient(145deg, #ffffff 0%, #fff7f8 52%, #ffe8ec 100%)",
        padding: "80px 20px",
      }}
    >
      <section
        style={{
          width: "min(100%, 1180px)",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            margin: "0 0 14px",
            color: "#e71928",
            fontSize: "0.82rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          City Coolies Gardening & Landscaping
        </p>

        <h1
          style={{
            maxWidth: "950px",
            margin: 0,
            color: "#171923",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
          }}
        >
          Beautiful Outdoor Spaces, Professionally Created & Cared For
        </h1>

        <p
          style={{
            maxWidth: "780px",
            margin: "28px 0 0",
            color: "#5c6372",
            fontSize: "1.1rem",
            lineHeight: 1.8,
          }}
        >
          Transform and maintain your outdoor space with professional
          gardening and landscaping solutions designed around your property,
          preferences and everyday needs.
        </p>

        <Link
          href="/services"
          style={{
            display: "inline-flex",
            marginTop: "34px",
            color: "#e71928",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          ← Back to All Services
        </Link>
      </section>
    </main>
  );
}
