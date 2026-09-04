"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";

import styles from "./PestControlMarketplace.module.css";

type Category =
  | "all"
  | "home"
  | "termite"
  | "bed"
  | "rodent"
  | "insects"
  | "commercial";

type IconName =
  | "cockroach"
  | "house"
  | "shield"
  | "ant"
  | "bed"
  | "rat"
  | "mosquito"
  | "termite"
  | "lizard"
  | "spider"
  | "flea"
  | "office"
  | "restaurant"
  | "warehouse"
  | "calendar";

type PestService = {
  id: string;
  packageId: string;
  name: string;
  category: Exclude<Category, "all">;
  icon: IconName;
  description: string;
  displayPrice: string;
  bookingPrice: number;
  inspection: boolean;
  features: readonly string[];
};

const categories: ReadonlyArray<{
  id: Category;
  label: string;
  icon: IconName;
}> = [
  { id: "all", label: "All Services", icon: "shield" },
  { id: "home", label: "Home Pest Control", icon: "house" },
  { id: "termite", label: "Termite Control", icon: "termite" },
  { id: "bed", label: "Bed Bugs", icon: "bed" },
  { id: "rodent", label: "Rodent Control", icon: "rat" },
  { id: "insects", label: "Mosquito & Insects", icon: "mosquito" },
  { id: "commercial", label: "Commercial & AMC", icon: "office" },
];

const SERVICES: readonly PestService[] = [
  {
    id: "kitchen-cockroach",
    packageId: "pest-kitchen-cockroach",
    name: "Kitchen Cockroach Control",
    category: "home",
    icon: "cockroach",
    description:
      "Inspection ? targeted spray ? gel bait ? second visit",
    displayPrice: "\u20B9899",
    bookingPrice: 899,
    inspection: false,
    features: [
      "Targeted spray treatment",
      "Gel bait application",
      "Second visit",
    ],
  },
  {
    id: "full-home-cockroach",
    packageId: "pest-full-home-cockroach",
    name: "Full Home Cockroach Control",
    category: "home",
    icon: "house",
    description:
      "Kitchen, bathroom, drains, cupboards & hiding points; spray + gel",
    displayPrice: "\u20B91,299",
    bookingPrice: 1299,
    inspection: false,
    features: [
      "Full-home treatment",
      "Spray + gel application",
      "Key hiding zones",
    ],
  },
  {
    id: "general-pest",
    packageId: "pest-general-control",
    name: "General Pest Control",
    category: "home",
    icon: "shield",
    description:
      "Cockroach + ants + spiders/silverfish; targeted indoor treatment",
    displayPrice: "\u20B9999",
    bookingPrice: 999,
    inspection: false,
    features: [
      "Multi-pest treatment",
      "Indoor target zones",
      "Common entry points",
    ],
  },
  {
    id: "ant-control",
    packageId: "pest-ant-control",
    name: "Ant Control",
    category: "insects",
    icon: "ant",
    description:
      "Nest/entry inspection ? spray/bait ? cracks/holes treatment",
    displayPrice: "\u20B9899",
    bookingPrice: 899,
    inspection: false,
    features: [
      "Nest & trail inspection",
      "Targeted bait",
      "Crack treatment",
    ],
  },
  {
    id: "bed-bug",
    packageId: "pest-bed-bug-control",
    name: "Bed Bug Control",
    category: "bed",
    icon: "bed",
    description:
      "Mattress/bed inspection ? targeted treatment ? repeat visit",
    displayPrice: "\u20B91,499",
    bookingPrice: 1499,
    inspection: false,
    features: [
      "Mattress inspection",
      "Bed-frame treatment",
      "Repeat visit",
    ],
  },
  {
    id: "rodent-control",
    packageId: "pest-rodent-control",
    name: "Rodent / Rat Control",
    category: "rodent",
    icon: "rat",
    description:
      "Entry-point inspection ? traps ? bait stations ? monitoring",
    displayPrice: "\u20B9999",
    bookingPrice: 999,
    inspection: false,
    features: [
      "Entry-point inspection",
      "Trap / bait strategy",
      "Activity monitoring",
    ],
  },
  {
    id: "mosquito-control",
    packageId: "pest-mosquito-control",
    name: "Mosquito Control",
    category: "insects",
    icon: "mosquito",
    description:
      "Indoor residual spray / outdoor fogging + breeding-area treatment",
    displayPrice: "\u20B9999",
    bookingPrice: 999,
    inspection: false,
    features: [
      "Breeding-area check",
      "Targeted treatment",
      "Indoor / outdoor planning",
    ],
  },
  {
    id: "post-termite",
    packageId: "pest-post-termite-survey",
    name: "Post-Construction Termite Control",
    category: "termite",
    icon: "termite",
    description:
      "Drill points ? chemical injection ? sealing ? wood treatment",
    displayPrice: "\u20B96 / sq ft",
    bookingPrice: 500,
    inspection: true,
    features: [
      "On-site termite survey",
      "Affected-area assessment",
      "Final quote after survey",
    ],
  },
  {
    id: "pre-termite",
    packageId: "pest-pre-termite-survey",
    name: "Pre-Construction Anti-Termite Treatment",
    category: "termite",
    icon: "termite",
    description:
      "Soil/foundation treatment before flooring/construction",
    displayPrice: "\u20B98 / sq ft",
    bookingPrice: 500,
    inspection: true,
    features: [
      "Construction-site survey",
      "Area assessment",
      "Final quote after survey",
    ],
  },
  {
    id: "lizard-control",
    packageId: "pest-lizard-control",
    name: "Lizard Control",
    category: "insects",
    icon: "lizard",
    description:
      "Inspection ? repellent treatment ? entry-point prevention",
    displayPrice: "\u20B9799",
    bookingPrice: 799,
    inspection: false,
    features: [
      "Entry-zone inspection",
      "Targeted treatment",
      "Problem-area focus",
    ],
  },
  {
    id: "spider-silverfish",
    packageId: "pest-spider-silverfish",
    name: "Spider & Silverfish Control",
    category: "insects",
    icon: "spider",
    description:
      "Corners, ceilings, cupboards, damp areas targeted spray",
    displayPrice: "\u20B9799",
    bookingPrice: 799,
    inspection: false,
    features: [
      "Corner treatment",
      "Cupboard treatment",
      "Damp-area focus",
    ],
  },
  {
    id: "flea-tick",
    packageId: "pest-flea-tick",
    name: "Flea & Tick Control",
    category: "insects",
    icon: "flea",
    description:
      "Pet/resting zones + floor edges + infestation areas treatment",
    displayPrice: "\u20B9899",
    bookingPrice: 899,
    inspection: false,
    features: [
      "Pet-zone assessment",
      "Floor-edge treatment",
      "Infestation-zone treatment",
    ],
  },
  {
    id: "office-shop",
    packageId: "pest-office-shop-survey",
    name: "Office / Shop Pest Control",
    category: "commercial",
    icon: "office",
    description:
      "Commercial inspection + pantry/workstation/store treatment",
    displayPrice: "\u20B91,499 onwards",
    bookingPrice: 500,
    inspection: true,
    features: [
      "Commercial site survey",
      "Risk-zone assessment",
      "Final treatment quote",
    ],
  },
  {
    id: "restaurant",
    packageId: "pest-restaurant-survey",
    name: "Restaurant Pest Control",
    category: "commercial",
    icon: "restaurant",
    description:
      "Kitchen, drains, storage, cockroach/rodent/fly management",
    displayPrice: "Site inspection / quote",
    bookingPrice: 500,
    inspection: true,
    features: [
      "Kitchen & drain survey",
      "Storage assessment",
      "Final treatment quote",
    ],
  },
  {
    id: "warehouse",
    packageId: "pest-warehouse-survey",
    name: "Warehouse Pest Control",
    category: "commercial",
    icon: "warehouse",
    description:
      "Rodent, crawling pest & stored-area monitoring",
    displayPrice: "Site inspection / quote",
    bookingPrice: 500,
    inspection: true,
    features: [
      "Warehouse survey",
      "Stored-area assessment",
      "Final treatment quote",
    ],
  },
  {
    id: "amc",
    packageId: "pest-amc-survey",
    name: "Annual Pest Control AMC",
    category: "commercial",
    icon: "calendar",
    description:
      "Scheduled quarterly/periodic treatments + monitoring",
    displayPrice: "\u20B93,999 / year onwards",
    bookingPrice: 500,
    inspection: true,
    features: [
      "Property requirement survey",
      "Treatment-frequency planning",
      "Final AMC quote",
    ],
  },
];

function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  if (name === "cockroach") {
    return (
      <svg {...common}>
        <ellipse cx="24" cy="27" rx="8" ry="12" />
        <ellipse cx="24" cy="14" rx="5" ry="5" />
        <path d="M20 11 16 6M28 11l4-5" />
        <path d="M16 21 8 15M15 27H6M16 33l-8 7" />
        <path d="m32 21 8-6M33 27h9M32 33l8 7" />
        <path d="M24 19v20" />
        <path d="M20 25h8M19 31h10" />
      </svg>
    );
  }

  if (name === "house") {
    return (
      <svg {...common}>
        <path d="M7 22 24 8l17 14" />
        <path d="M11 20v20h26V20" />
        <path d="M19 40V28h10v12" />
        <path d="M16 18h16" />
        <circle cx="34" cy="14" r="4" />
        <path d="m32.5 14 1 1 2-2" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M24 5 39 11v11c0 10-6.4 16.3-15 20-8.6-3.7-15-10-15-20V11l15-6Z" />
        <path d="M18 24h12M24 18v12" />
        <path d="m18 31 12-14" />
      </svg>
    );
  }

  if (name === "ant") {
    return (
      <svg {...common}>
        <circle cx="24" cy="11" r="4" />
        <ellipse cx="24" cy="22" rx="5" ry="6" />
        <ellipse cx="24" cy="35" rx="6" ry="8" />
        <path d="M20 8 15 3M28 8l5-5" />
        <path d="M19 19 11 14M18 24H8M19 29 11 35" />
        <path d="m29 19 8-5M30 24h10M29 29l8 6" />
      </svg>
    );
  }

  if (name === "bed") {
    return (
      <svg {...common}>
        <path d="M6 39V20M42 39V27" />
        <path d="M6 31h36" />
        <path d="M10 20h13a8 8 0 0 1 8 8v3" />
        <path d="M10 20v11" />
        <rect x="12" y="23" width="10" height="5" rx="2" />
        <path d="M11 39v-4M37 39v-4" />
      </svg>
    );
  }

  if (name === "rat") {
    return (
      <svg {...common}>
        <path d="M10 30c0-10 8-17 19-17 8 0 13 4 13 10 0 8-10 14-21 14-7 0-11-2-11-7Z" />
        <circle cx="33" cy="19" r="1.5" />
        <path d="M28 14c-1-6-7-7-9-2" />
        <path d="M39 24h6M39 27h5" />
        <path d="M12 34C3 34 2 43 7 44" />
        <path d="M19 37v4M30 35v4" />
      </svg>
    );
  }

  if (name === "mosquito") {
    return (
      <svg {...common}>
        <ellipse cx="24" cy="24" rx="4" ry="7" />
        <circle cx="24" cy="14" r="3" />
        <path d="M24 11V4M24 31v13" />
        <path d="m20 19-9-9M28 19l9-9" />
        <path d="m20 27-12 8M28 27l12 8" />
        <path d="M19 20C11 14 6 16 5 22c7 2 11 0 14-2Z" />
        <path d="M29 20c8-6 13-4 14 2-7 2-11 0-14-2Z" />
      </svg>
    );
  }

  if (name === "termite") {
    return (
      <svg {...common}>
        <ellipse cx="24" cy="28" rx="7" ry="11" />
        <circle cx="24" cy="13" r="5" />
        <path d="M20 10 15 5M28 10l5-5" />
        <path d="M17 22 9 17M17 28H7M18 34l-9 7" />
        <path d="m31 22 8-5M31 28h10M30 34l9 7" />
        <path d="M20 25h8M19 31h10" />
      </svg>
    );
  }

  if (name === "lizard") {
    return (
      <svg {...common}>
        <path d="M11 28c6-12 17-15 27-8 5 4 4 10 0 13-5 4-12 0-17 1-5 1-8 5-10 10" />
        <circle cx="35" cy="22" r="1.5" />
        <path d="M18 23 11 16M23 18l-1-9M20 31l-7 7M28 32l2 9" />
        <path d="M38 26h6" />
      </svg>
    );
  }

  if (name === "spider") {
    return (
      <svg {...common}>
        <circle cx="24" cy="25" r="7" />
        <circle cx="24" cy="14" r="5" />
        <path d="M18 19 10 12M17 24H6M18 30 9 38" />
        <path d="m30 19 8-7M31 24h11M30 30l9 8" />
        <path d="M20 10 17 5M28 10l3-5" />
      </svg>
    );
  }

  if (name === "flea") {
    return (
      <svg {...common}>
        <ellipse cx="24" cy="25" rx="7" ry="12" />
        <path d="M20 15 15 7M28 15l5-8" />
        <path d="M18 20 8 14M17 26H6M18 32 9 40" />
        <path d="m30 20 10-6M31 26h11M30 32l9 8" />
        <path d="M21 19h6M20 25h8M21 31h6" />
      </svg>
    );
  }

  if (name === "office") {
    return (
      <svg {...common}>
        <path d="M7 42V8h22v34M29 19h12v23" />
        <path d="M12 14h5M20 14h4M12 21h5M20 21h4M12 28h5M20 28h4" />
        <path d="M33 25h4M33 32h4" />
        <path d="M16 42V35h6v7M4 42h40" />
      </svg>
    );
  }

  if (name === "restaurant") {
    return (
      <svg {...common}>
        <path d="M13 6v17M7 6v10c0 5 2 7 6 7s6-2 6-7V6" />
        <path d="M13 23v19" />
        <path d="M31 6v36" />
        <path d="M31 6c9 4 11 13 6 22h-6" />
        <circle cx="24" cy="30" r="8" />
        <path d="m20 30 3 3 6-7" />
      </svg>
    );
  }

  if (name === "warehouse") {
    return (
      <svg {...common}>
        <path d="m5 17 19-10 19 10v25H5V17Z" />
        <path d="M12 42V27h24v15" />
        <path d="M12 22h24M16 31h16M16 36h16" />
        <path d="M5 17h38" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="6" y="9" width="36" height="33" rx="5" />
        <path d="M14 5v8M34 5v8M6 18h36" />
        <path d="m15 29 5 5 12-13" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <ellipse cx="24" cy="27" rx="8" ry="12" />
      <circle cx="24" cy="13" r="5" />
      <path d="M19 10 14 5M29 10l5-5" />
      <path d="M17 22 8 16M16 28H5M17 34l-9 7" />
      <path d="m31 22 9-6M32 28h11M31 34l9 7" />
    </svg>
  );
}

function IndiaCoverage() {
  // Simplified from @svg-maps/india 2.0.0 (CC BY 4.0), based on Natural Earth.
  const indiaPaths = [
    "M.5 328V321l9.5-1.5 2-8 26 3 10-6 4 5 6.5-3.5-7-29-10-3-3-5 2-13-13.5-4.5-.5-7.5 18.5-23.5h5l4 7 22.5-5.5 10-19 15-11 6-17 12-6-1-6 13-14 1-21 16-8-.5-4.5-12-3-2-6h-7l-15.5-9.5-3-36 13-8 1-7-8-5 .5-5.5-9-2-5-7-9.5-1.5 1-8 10-11 12.5-2.5 3-5 31-2 8 11 21.5 13.5 1.5 7.5 10 2 5 7 36-15 7 5 7-1 7.5 7.5-5 22-10 7-1 10-11 2v15l9 5 4 13-12.5 8.5-9-7-1.5 7.5 6 7 1.5 15.5 6-2 6 10 9 2 8.5 5.5.5 4.5 15.5 7.5-13 12-7 22 22.5 10.5 13 11 19 5 2 5 10 3 19-3 10 4 1.5 7.5 11.5 6.5 8-3 3 6 39 5 8-1 2.5-4.5-4-11 3-20 11.5-3.5 5.5 5.5-1 20 5.5 4.5 61-1 .5-12.5-10-3 .5-7.5h21l16-19 12-1 15-16 17 7 13-10 7.5 5.5-3 5 4.5-.5 2.5 5.5-4 9 20 6v8l-9 6 4.5 12.5-8-6-11 2-22.5 15.5v14l-11 15 2 10-12 25-16-1v18l-6 6 2 13-4.5 7.5-4-3-4.5 2.5-7-38-6 1-3 12-5.5 2.5-5.5-3.5-4-13 5.5-10.5 15.5-6.5 4.5-14.5-52-5-2-18-9 1-14-9-9.5 5.5-1 7 18 13-1.5 3.5-9-1-8.5 13.5 14 8-4 13 5 4-1 5 5 2-3 5 5 30-18.5 2.5-7-5-16 6-5.5 5.5 4 13-15.5 17.5-24 10.5-22 26-37.5 27.5-1.5 11.5-19 4-7 13-9-3-6.5 4.5-4 16 6 36-12 32 2 31-11.5.5-8.5 14.5 10.5 9.5-12-2-9 3-4.5 3.5-3 12-10.5 6.5-9-3-13.5-15.5-16-51-12-15-17-53-18-31-18-86 5-18-6-11-1-24-4 2v11l-5.5 10.5-26 11-13-7-27.5-29.5 2.5-4.5 5 3 13-3 7.5-4.5 1-5-11.5 3.5-12-2Z",
    "M508.5 593l3-30 7.5-15.5 1.5 40.5-5.5-5.5-2.5 14.5Z",
    "M531.5 684l2.5-3.5 3.5 4.5.5 9.5Z",
    "M525.5 671l4.5-7.5 1.5 6.5Z",
    "M505.5 615v-5l4.5-2.5.5 6.5Z",
  ] as const;

  return (
    <svg
      className={styles.indiaMap}
      viewBox="0 0 612 696"
      role="img"
      aria-label="Pan India service coverage"
    >
      <defs>
        <linearGradient id="indiaCoverageFill" x1="80" y1="20" x2="390" y2="665">
          <stop offset="0" stopColor="#fff7f8" />
          <stop offset="0.55" stopColor="#ffe5e9" />
          <stop offset="1" stopColor="#ffc9d1" />
        </linearGradient>
      </defs>

      <g className={styles.mapBody}>
        {indiaPaths.map((path) => (
          <path key={path} d={path} fill="url(#indiaCoverageFill)" />
        ))}
      </g>

      {[
        [197, 115],
        [310, 246],
        [100, 335],
        [420, 315],
        [245, 385],
        [300, 462],
        [205, 525],
      ].map(([cx, cy]) => (
        <g className={styles.mapPoint} key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="18" />
          <circle cx={cx} cy={cy} r="8" />
        </g>
      ))}

      <g className={styles.mapChennai}>
        <circle cx="292" cy="565" r="26" />
        <circle cx="292" cy="565" r="15" />
        <circle cx="292" cy="565" r="7" />
      </g>
    </svg>
  );
}

export default function PestControlMarketplace() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] =
    useState<Record<string, number>>({});

  useEffect(() => {
    const elements =
      document.querySelectorAll<HTMLElement>("[data-pest-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.dataset.visible = "true";
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const visibleServices = useMemo(() => {
    const search = query.trim().toLowerCase();

    return SERVICES.filter((service) => {
      const categoryMatch =
        category === "all" || service.category === category;

      const searchMatch =
        !search ||
        service.name.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search);

      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const cartItems = useMemo(
    () =>
      SERVICES.filter(
        (service) =>
          (cart[service.id] ?? 0) > 0,
      ).map((service) => ({
        ...service,
        quantity: cart[service.id] ?? 0,
      })),
    [cart],
  );

  const itemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const directTotal = cartItems
    .filter((item) => !item.inspection)
    .reduce(
      (sum, item) =>
        sum +
        item.bookingPrice * item.quantity,
      0,
    );

  const surveyTotal = cartItems
    .filter((item) => item.inspection)
    .reduce(
      (sum, item) =>
        sum +
        item.bookingPrice * item.quantity,
      0,
    );

  const bookingTotal =
    directTotal + surveyTotal;

  const payNow =
    Math.round(directTotal * 0.5) +
    surveyTotal;

  function changeQuantity(
    id: string,
    delta: number,
  ) {
    setCart((current) => {
      const nextQuantity = Math.max(
        0,
        Math.min(
          10,
          (current[id] ?? 0) + delta,
        ),
      );

      if (nextQuantity === 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }

      return {
        ...current,
        [id]: nextQuantity,
      };
    });
  }


  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/pest-control-hero-banner.webp.png"
          alt="City Coolies professional pest control technician"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <strong>Pest Control</strong>
          </nav>

          <div className={styles.heroMain}>
            <span className={styles.heroBadge}>
              SAFE. EFFECTIVE. RELIABLE.
            </span>

            <h1>
              Professional Pest
              <span>Control Services</span>
            </h1>

            <p>
              Advanced pest-control solutions for your home,
              business or property. Clear service options,
              professional treatment and Pan India support.
            </p>

            <div className={styles.heroTrust}>
              <span>
                <Icon name="shield" />
                Trained Professionals
              </span>

              <span>
                <Icon name="termite" />
                Targeted Treatment
              </span>

              <span>
                <Icon name="house" />
                Home & Business
              </span>

              <span>
                <Icon name="calendar" />
                Booking Support
              </span>
            </div>

            <div className={styles.heroActions}>
              <div>
                <strong>Pan India Service</strong>
                <small>Professional property pest control across India</small>
              </div>

              <div>
                <strong>{"\u20B9500 Site Inspection"}</strong>
                <small>Only for services that require an on-site survey</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.categoryRail}
        aria-label="Pest control categories"
      >
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              category === item.id ? styles.activeCategory : ""
            }
            onClick={() => setCategory(item.id)}
          >
            <span>
              <Icon name={item.icon} />
            </span>
            {item.label}
          </button>
        ))}
      </section>

      <section
        className={styles.marketplace}
        id="pest-marketplace"
      >
        <div className={styles.marketToolbar}>
          <label className={styles.searchBox}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4.5-4.5" />
            </svg>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for pest control services..."
            />
          </label>

          <div className={styles.marketMeta}>
            <span>{visibleServices.length} available options</span>
            <strong>Pan India</strong>
          </div>
        </div>

        <div className={styles.marketGrid}>
          <div className={styles.products}>
            {visibleServices.map((service, index) => (
              <article
                key={service.id}
                className={
                  (cart[service.id] ?? 0) > 0
                    ? `${styles.serviceCard} ${styles.selectedCard}`
                    : styles.serviceCard
                }
                style={
                  {
                    "--delay": `${(index % 8) * 45}ms`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.cardShine} />

                <div className={styles.serviceIcon}>
                  <Icon name={service.icon} />
                </div>

                {service.inspection && (
                  <span className={styles.surveyTag}>
                    SITE SURVEY
                  </span>
                )}

                <h2>{service.name}</h2>

                <p>{service.description}</p>

                <div className={styles.priceBlock}>
                  <strong>{service.displayPrice}</strong>

                  <small>
                    {service.inspection
                      ? "?500 inspection booking"
                      : "Starting price"}
                  </small>
                </div>

                <div className={styles.cartCardAction}>
                  {(cart[service.id] ?? 0) === 0 ? (
                    <button
                      type="button"
                      className={styles.addOnlyButton}
                      onClick={() =>
                        changeQuantity(
                          service.id,
                          1,
                        )
                      }
                    >
                      <span>+</span>
                      Add
                    </button>
                  ) : (
                    <div
                      className={styles.quantityControl}
                      aria-label={`${service.name} quantity`}
                    >
                      <button
                        type="button"
                        aria-label={`Remove one ${service.name}`}
                        onClick={() =>
                          setCart((currentCart) => ({
                            ...currentCart,
                            [service.id]: Math.max(
                              (currentCart[service.id] ?? 0) - 1,
                              0,
                            ),
                          }))
                        }
                      >
                        {"\u2212"}
                      </button>

                      <strong>
                        {cart[service.id] ?? 0}
                      </strong>

                      <button
                        type="button"
                        aria-label={`Add one more ${service.name}`}
                        onClick={() =>
                          changeQuantity(
                            service.id,
                            1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}

            {!visibleServices.length && (
              <div className={styles.emptyState}>
                <Icon name="shield" />
                <h3>No matching service found</h3>
                <p>Try another pest name or category.</p>
              </div>
            )}
          </div>

          <aside className={styles.bookingPanel}>
            <header className={styles.cartPanelHeader}>
              <div>
                <span>YOUR BOOKING</span>

                {itemCount > 0 && (
                  <b>{itemCount}</b>
                )}
              </div>

              {itemCount > 0 && (
                <button
                  type="button"
                  onClick={() => setCart({})}
                >
                  Clear All
                </button>
              )}
            </header>

            {cartItems.length === 0 ? (
              <div className={styles.emptyCartPanel}>
                <div className={styles.emptyCartIcon}>
                  <Icon name="shield" />
                </div>

                <h2>Select Services</h2>

                <p>
                  Click Add on any service.
                  Your selected services will
                  appear here.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.selectedCartItems}>
                  {cartItems.map((item) => (
                    <article
                      className={styles.selectedCartRow}
                      key={item.id}
                    >
                      <div className={styles.selectedCartIcon}>
                        <Icon name={item.icon} />
                      </div>

                      <div className={styles.selectedCartInfo}>
                        <strong>{item.name}</strong>

                        <small>
                          {item.inspection
                            ? `${"\u20B9"}500 Site Inspection`
                            : item.displayPrice}
                        </small>

                        <div className={styles.cartRowQuantity}>
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => changeQuantity(item.id, -1)}
                          >
                            {"\u2212"}
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => changeQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className={styles.selectedCartEnd}>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() =>
                            setCart((current) => {
                              const next = { ...current };
                              delete next[item.id];
                              return next;
                            })
                          }
                        >
                          {"\u00D7"}
                        </button>

                        <strong>
                          {"\u20B9"}
                          {(
                            item.bookingPrice * item.quantity
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </article>
                  ))}
                </div>

                <div className={styles.cartTotals}>
                  <div>
                    <span>Selected Items</span>
                    <strong>{itemCount}</strong>
                  </div>

                  <div>
                    <span>Booking Value</span>
                    <strong>
                          {"\u20B9"}
                      {bookingTotal.toLocaleString(
                        "en-IN",
                      )}
                    </strong>
                  </div>

                  {directTotal > 0 && (
                    <div className={styles.cartPaymentNote}>
                      <span>
                        Normal Services
                      </span>
                      <small>
                        Existing advance procedure
                      </small>
                    </div>
                  )}

                  {surveyTotal > 0 && (
                    <div className={styles.cartPaymentNote}>
                      <span>
                        Site Inspection
                      </span>
                      <small>
                        {"\u20B9"}500 each
                      </small>
                    </div>
                  )}

                  <div className={styles.cartPayNow}>
                    <span>Pay Now</span>

                    <strong>
                          {"\u20B9"}
                      {payNow.toLocaleString(
                        "en-IN",
                      )}
                    </strong>
                  </div>

                  <div className={styles.onlyBookButton}>
                    <ServiceBookingModal
                      packageId={
                        cartItems.length === 1
                          ? cartItems[0].packageId
                          : "pest-control-selection-plan"
                      }
                      serviceName={
                        cartItems.length === 1
                          ? cartItems[0].name
                          : "Pest Control Booking"
                      }
                      originalPrice={
                        bookingTotal
                      }
                      offerPrice={
                        bookingTotal
                      }
                      triggerLabel="Book Now"
                      customServices={cartItems.map(
                        (item) => ({
                          id: item.id,
                          name: item.name,
                          quantity: item.quantity,
                          unitPrice:
                            item.bookingPrice,
                          lineTotal:
                            item.bookingPrice *
                            item.quantity,
                        }),
                      )}
                    />
                  </div>

                  <p className={styles.cartHint}>
                    Use {"\u2212"} or + to change quantity.
                    Use {"\u00D7"} to remove a service.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>

      <section
        className={styles.supportGrid}
        data-pest-reveal
      >
        <article className={styles.whyCard}>
          <div className={styles.whyCopy}>
            <span>WHY CITY COOLIES?</span>

            <div className={styles.whyHeadingRow}>
              <div className={styles.whyPestIcon} aria-hidden="true">
                <Icon name="cockroach" />
              </div>

              <h2>Trusted Pest Protection</h2>
            </div>

            <p>
              Safe, professional pest care with clear pricing
              and dependable support.
            </p>

            <ul>
              <li>Trained pest specialists</li>
              <li>Safe treatment methods</li>
              <li>Clear service pricing</li>
            </ul>
          </div>

          <div className={styles.shieldArt} aria-hidden="true">
            <svg
              viewBox="0 0 180 210"
              role="presentation"
              focusable="false"
            >
              <defs>
                <clipPath id="shieldClip">
                  <path d="M90 5 165 34v61c0 50-28 88-75 110C43 183 15 145 15 95V34L90 5Z" />
                </clipPath>
                <linearGradient id="shieldOuter" x1="18" y1="10" x2="158" y2="198">
                  <stop offset="0" stopColor="#ff3048" />
                  <stop offset="0.48" stopColor="#ed0026" />
                  <stop offset="1" stopColor="#9f0017" />
                </linearGradient>
                <linearGradient id="shieldInner" x1="30" y1="20" x2="144" y2="183">
                  <stop offset="0" stopColor="#ff3b51" />
                  <stop offset="0.42" stopColor="#e90025" />
                  <stop offset="1" stopColor="#b0001b" />
                </linearGradient>
                <linearGradient id="shieldShine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.72" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                className={styles.shieldOuter}
                d="M90 5 165 34v61c0 50-28 88-75 110C43 183 15 145 15 95V34L90 5Z"
                fill="url(#shieldOuter)"
              />
              <path
                className={styles.shieldInner}
                d="M90 18 151 42v51c0 41-22 73-61 94-39-21-61-53-61-94V42L90 18Z"
                fill="url(#shieldInner)"
              />
              <path
                className={styles.shieldEdge}
                d="M90 27 143 48M90 27 37 48M90 187V29"
              />
              <circle
                className={styles.shieldRing}
                cx="90"
                cy="101"
                r="48"
              />
              <path
                className={styles.shieldCheck}
                d="m61 101 19 20 40-48"
              />
              <path
                className={styles.shieldGloss}
                d="M31 43 90 19l19 8c-22 18-39 45-48 78-7 26-5 52 3 72-24-20-35-48-35-84V43Z"
              />
              <path
                className={styles.shieldSweep}
                d="M-30 0h28l82 210H52L-30 0Z"
                fill="url(#shieldShine)"
                clipPath="url(#shieldClip)"
              />
            </svg>
          </div>
        </article>

        <article className={styles.complexCard}>
          <div className={styles.complexCopy}>
            <span>FOR COMPLEX PROPERTIES</span>
            <h2>Inspection Before Treatment</h2>

            <p>
              We inspect large or special properties before
              confirming the final treatment plan.
            </p>

            <div className={styles.complexPrice}>
              <div>
                <small>Site Inspection Fee</small>
                <strong>{"\u20B9"}500</strong>
              </div>

              <span>Adjusted in final bill</span>
            </div>
          </div>

          <div
            className={styles.technicianArt}
            aria-hidden="true"
          />
        </article>

        <article className={styles.coverageCard}>
          <div>
            <span>COVERAGE AREA</span>
            <h2>Pan India.</h2>
            <p>
              City Coolies supports property-service
              requirements across India.
            </p>

            <Link href="/contact">
              Contact City Coolies
              <b>{"\u2192"}</b>
            </Link>
          </div>

          <IndiaCoverage />
        </article>
      </section>

      <section className={styles.bottomStrip}>
        <span>
          <Icon name="shield" />
          Trained Professionals
        </span>

        <span>
          <Icon name="termite" />
          Modern Treatment
        </span>

        <span>
          <Icon name="house" />
          Home & Commercial
        </span>

        <span>
          <Icon name="calendar" />
          Clear Booking
        </span>

        <span>
          <Icon name="office" />
          Pan India Coverage
        </span>
      </section>
    </main>
  );
}
