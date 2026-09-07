import styles from "./GardeningTrustStrip.module.css";

function VerifiedGardenerIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className={styles.iconSvg}
      aria-hidden="true"
    >
      <circle cx="21" cy="15" r="7" />

      <path d="M8 40c1.5-10 5.8-15 13-15s11.5 5 13 15" />

      <g className={styles.verifiedBadge}>
        <circle cx="36" cy="13" r="8" />
        <path
          className={styles.verifiedCheck}
          d="m32.5 13 2.3 2.4 4.7-5"
        />
      </g>
    </svg>
  );
}

function ToolsOptionIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className={styles.iconSvg}
      aria-hidden="true"
    >
      <g className={styles.toolLeft}>
        <path d="m10 38 25-25" />
        <path d="M31 8a8 8 0 0 0 9 9l-7 7-9-9 7-7Z" />
        <path d="m7 41 5-1-4-4-1 5Z" />
      </g>

      <g className={styles.toolRight}>
        <circle cx="14" cy="13" r="5" />
        <circle cx="30" cy="35" r="5" />
        <path d="m17.5 16.5 9 14" />
        <path d="m10.5 17 19 13" />
      </g>
    </svg>
  );
}

function HealthyPlantIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className={styles.iconSvg}
      aria-hidden="true"
    >
      <path
        className={styles.plantStem}
        d="M24 41V14"
      />

      <path
        className={styles.leafLeft}
        d="M23 27C14 28 9 23 9 15c8-1 14 4 14 12Z"
      />

      <path
        className={styles.leafRight}
        d="M25 21c1-9 7-14 15-13 0 8-6 14-15 13Z"
      />

      <path d="M16 41h16" />

      <path
        className={styles.plantShine}
        d="m35 25 1.4 2.7L39 29l-2.6 1.3L35 33l-1.3-2.7L31 29l2.7-1.3L35 25Z"
      />
    </svg>
  );
}

function CustomPotIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className={styles.iconSvg}
      aria-hidden="true"
    >
      <g className={styles.potPlant}>
        <path d="M24 18V9" />
        <path d="M24 13c-7 0-10-4-10-9 7 0 10 4 10 9Z" />
        <path d="M24 13c7 0 10-4 10-9-7 0-10 4-10 9Z" />
      </g>

      <path
        className={styles.potTop}
        d="M10 19h28v7H10z"
      />

      <path
        className={styles.potBody}
        d="m13 26 3 16h16l3-16"
      />

      <path
        className={styles.potPattern}
        d="m18 31 6 5 6-5"
      />

      <path
        className={styles.potSparkle}
        d="m39 8 1.2 2.5L43 12l-2.8 1.5L39 16l-1.3-2.5L35 12l2.7-1.5L39 8Z"
      />
    </svg>
  );
}

const TRUST_ITEMS = [
  {
    title: "Verified Gardeners",
    description: "Trained & background checked",
    icon: <VerifiedGardenerIcon />,
  },
  {
    title: "Choose Tools Option",
    description: "Labour only or tools included",
    icon: <ToolsOptionIcon />,
  },
  {
    title: "Healthy Plants",
    description: "Fresh. Quality. Home delivered.",
    icon: <HealthyPlantIcon />,
  },
  {
    title: "Custom Pots & Decor",
    description: "Unique designs for every space",
    icon: <CustomPotIcon />,
  },
] as const;

export default function GardeningTrustStrip() {
  return (
    <section
      className={styles.section}
      aria-label="City Coolies gardening benefits"
    >
      <div className={styles.shine} aria-hidden="true" />

      {TRUST_ITEMS.map((item, index) => (
        <article
          key={item.title}
          className={styles.item}
          style={{
            animationDelay: `${100 + index * 130}ms`,
          }}
        >
          <span className={styles.icon}>
            <span className={styles.iconGlow} />
            {item.icon}
          </span>

          <div className={styles.copy}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}