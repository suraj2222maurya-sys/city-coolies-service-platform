import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spa & Salon Services in Chennai | City Coolies",
  description:
    "Book professional spa and salon services in Chennai with City Coolies for premium beauty, grooming, wellness and personal care experiences.",
  alternates: {
    canonical: "/services/spa-salon-services",
  },
};

export default function SpaSalonServicesPage() {
  return (
    <main
      style={{
        minHeight: "70vh",
        background:
          "linear-gradient(145deg, #ffffff 0%, #fff7f8 50%, #ffe8ec 100%)",
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
          City Coolies Spa & Salon
        </p>

        <h1
          style={{
            maxWidth: "920px",
            margin: 0,
            color: "#171923",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
          }}
        >
          Premium Spa & Salon Care, Made Easy
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "28px 0 0",
            color: "#5c6372",
            fontSize: "1.1rem",
            lineHeight: 1.8,
          }}
        >
          Enjoy professional beauty, grooming and wellness care with a
          comfortable, hygienic and premium service experience designed
          around your personal needs.
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
