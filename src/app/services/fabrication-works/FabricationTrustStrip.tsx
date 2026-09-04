import styles from "./FabricationWorks.module.css";

type TrustIconName =
  | "fabricator"
  | "delivery"
  | "quality"
  | "guarantee";

function TrustIcon({ name }: { name: TrustIconName }) {
  if (name === "fabricator") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M10 7 6 3 3 6l4 4" />
        <path d="m22 7 4-4 3 3-4 4" />
        <path d="M9 9 23 23" />
        <path d="M23 9 9 23" />
        <path d="M6 26h20" />
      </svg>
    );
  }

  if (name === "delivery") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 8h15v14H4z" />
        <path d="M19 13h5l4 5v4h-9z" />
        <circle cx="10" cy="24" r="3" />
        <circle cx="24" cy="24" r="3" />
        <path d="M7 13h8M7 17h6" />
      </svg>
    );
  }

  if (name === "quality") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m16 3 3 4 5-1 1 5 4 3-3 4 1 5-5 1-3 4-4-3-5 1-1-5-4-3 3-4-1-5 5-1z" />
        <path d="m11 16 3 3 7-7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3 27 7v8c0 7-4.8 11.5-11 14-6.2-2.5-11-7-11-14V7z" />
      <path d="m10 16 4 4 8-9" />
    </svg>
  );
}

const TRUST_ITEMS = [
  {
    icon: "fabricator",
    title: "Skilled Fabricators",
    text: "Trained & experienced team",
  },
  {
    icon: "delivery",
    title: "On-Time Delivery",
    text: "Committed to deadlines",
  },
  {
    icon: "quality",
    title: "Quality Materials",
    text: "High-grade & long-lasting",
  },
  {
    icon: "guarantee",
    title: "Workmanship Guarantee",
    text: "Reliable service you can trust",
  },
] as const;

export default function FabricationTrustStrip() {
  return (
    <section
      className={styles.trustStrip}
      aria-label="Why choose City Coolies fabrication"
      data-fab-reveal
    >
      {TRUST_ITEMS.map((item) => (
        <article key={item.title} className={styles.trustItem}>
          <span className={styles.trustIcon}>
            <TrustIcon name={item.icon} />
          </span>

          <div>
            <strong>{item.title}</strong>
            <small>{item.text}</small>
          </div>
        </article>
      ))}
    </section>
  );
}
