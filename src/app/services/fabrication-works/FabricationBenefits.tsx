import styles from "./FabricationWorks.module.css";

const BENEFITS = [
  {
    key: "measure",
    title: "Site Measurement",
    text: "Accurate dimensions",
  },
  {
    key: "material",
    title: "Material Choice",
    text: "MS, SS, GI & more",
  },
  {
    key: "custom",
    title: "Custom Build",
    text: "Made for your site",
  },
  {
    key: "install",
    title: "Installation",
    text: "Professional fitting",
  },
] as const;

function BenefitIcon({
  name,
}: {
  name: (typeof BENEFITS)[number]["key"];
}) {
  if (name === "measure") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 24 23 6l4 4L9 28H5v-4Z" />
        <path d="m10 19 3 3m1-7 3 3m1-7 3 3" />
      </svg>
    );
  }

  if (name === "material") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m16 4 11 6-11 6L5 10l11-6Z" />
        <path d="m5 16 11 6 11-6M5 22l11 6 11-6" />
      </svg>
    );
  }

  if (name === "custom") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 26 24 8l3 3L9 29H6v-3Z" />
        <path d="M5 7h12M5 12h7M21 5l6 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="m18 5 3-3 4 4-3 3M4 28l12-12" />
      <path d="m13 13 6 6M5 5l7 7-4 4-7-7 4-4Z" />
      <path d="m19 19 9 9" />
    </svg>
  );
}

export default function FabricationBenefits() {
  return (
    <section
      className={styles.benefits}
      aria-label="Fabrication service highlights"
      data-fab-reveal
    >
      {BENEFITS.map((item) => (
        <article key={item.key}>
          <span className={styles.benefitIcon}>
            <BenefitIcon name={item.key} />
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
