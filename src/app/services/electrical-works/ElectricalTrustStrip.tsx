import styles from "./ElectricalTrustStrip.module.css";

type TrustIconProps = {
  type: "verified" | "quality" | "ontime" | "support";
};

function TrustIcon({ type }: TrustIconProps) {
  if (type === "verified") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="13" r="6" />
        <path d="M11 29c1.8-6 5-9 9-9s7.2 3 9 9" />
        <path d="m13 27-3 9 6-3 4 4 2-8" />
        <path d="m27 27 3 9-6-3" />
        <path d="m17 13 2 2 4-5" />
      </svg>
    );
  }

  if (type === "quality") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 4 31 9v9c0 8-4.6 13.8-11 17-6.4-3.2-11-9-11-17V9l11-5Z" />
        <path d="M20 11.5 24 14v5c0 3-1.5 5.5-4 7-2.5-1.5-4-4-4-7v-5l4-2.5Z" />
      </svg>
    );
  }

  if (type === "ontime") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="21" r="11" />
        <circle cx="20" cy="21" r="7" />
        <path d="M20 14v7l4 3" />
        <path d="M13 6h14M16 3v4M24 3v4" />
        <path d="m9 10-3-3M31 10l3-3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 21v-4C8 10 13.4 5 20 5s12 5 12 12v4" />
      <path d="M8 20H6.5A3.5 3.5 0 0 0 3 23.5v4A3.5 3.5 0 0 0 6.5 31H10V20H8Z" />
      <path d="M32 20h1.5a3.5 3.5 0 0 1 3.5 3.5v4a3.5 3.5 0 0 1-3.5 3.5H30V20h2Z" />
      <path d="M30 31c-1.5 3-4.7 4-9 4" />
      <circle cx="19" cy="35" r="1.5" />
    </svg>
  );
}

const trustItems = [
  {
    title: "Verified Electricians",
    description: (
      <>
        Trained & background
        <br />
        verified professionals
      </>
    ),
    icon: "verified" as const,
  },
  {
    title: "Quality Assurance",
    description: (
      <>
        Premium materials &
        <br />
        quality workmanship
      </>
    ),
    icon: "quality" as const,
  },
  {
    title: "On-time Service",
    description: (
      <>
        Punctual, reliable &
        <br />
        professional
      </>
    ),
    icon: "ontime" as const,
  },
  {
    title: "Customer Support",
    description: (
      <>
        We&apos;re here to help you
        <br />
        at every step
      </>
    ),
    icon: "support" as const,
  },
];

export default function ElectricalTrustStrip() {
  return (
    <section
      className={styles.section}
      aria-label="Electrical service trust benefits"
    >
      <div className={styles.strip}>
        {trustItems.map((item, index) => (
          <div className={styles.group} key={item.title}>
            <article className={styles.item}>
              <div className={styles.icon}>
                <TrustIcon type={item.icon} />
              </div>

              <div className={styles.copy}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>

            {index < trustItems.length - 1 && (
              <span className={styles.separator} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}