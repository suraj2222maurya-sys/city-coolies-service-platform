import styles from "./RenovationTrustStrip.module.css";

function VerifiedTeamIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={styles.iconSvg}
    >
      <g className={styles.verifiedPerson}>
        <circle cx="17" cy="15" r="6" />
        <path d="M7 34c1.4-8 5-12 10-12 4 0 7 2.4 9 7" />
      </g>

      <g className={styles.verifiedBadge}>
        <circle cx="29" cy="14" r="8" />
        <path d="m25.5 14 2.4 2.4 5-5.2" />
      </g>

      <g className={styles.verifiedSecond}>
        <circle cx="34" cy="31" r="5" />
        <path d="M26 43c1-6 3.6-9 8-9 4.3 0 7 3 8 9" />
      </g>
    </svg>
  );
}

function MeasuredPlanningIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={styles.iconSvg}
    >
      <path d="M8 7v32h31" />

      <path d="M8 13h7M8 19h4M8 25h7M8 31h4" />

      <path
        className={styles.measureLine}
        d="m15 33 7-10 6 5 9-14"
      />

      <circle
        className={styles.measurePointOne}
        cx="22"
        cy="23"
        r="2.2"
      />

      <circle
        className={styles.measurePointTwo}
        cx="28"
        cy="28"
        r="2.2"
      />

      <circle
        className={styles.measurePointThree}
        cx="37"
        cy="14"
        r="2.2"
      />

      <path d="M15 39v-5M21 39v-3M27 39v-5M33 39v-3" />
    </svg>
  );
}

function QualityMaterialsIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={styles.iconSvg}
    >
      <g className={styles.materialTop}>
        <path d="m24 6 15 9-15 9L9 15 24 6Z" />
      </g>

      <g className={styles.materialMiddle}>
        <path d="m9 23 15 9 15-9" />
      </g>

      <g className={styles.materialBottom}>
        <path d="m9 31 15 9 15-9" />
      </g>

      <path
        className={styles.materialAccent}
        d="m13 25 11 7"
      />
    </svg>
  );
}

function OnTimeIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={styles.iconSvg}
    >
      <path d="M19 5h10" />
      <path d="M24 5v5" />

      <circle
        cx="24"
        cy="27"
        r="15"
      />

      <circle
        cx="24"
        cy="27"
        r="11"
      />

      <g className={styles.clockHand}>
        <path d="M24 27V18" />
        <path d="M24 27l5 3" />
      </g>

      <circle
        className={styles.clockCenter}
        cx="24"
        cy="27"
        r="2.2"
      />

      <path d="m35 13 3-3" />
      <path d="m13 13-3-3" />
    </svg>
  );
}

const ITEMS = [
  {
    title: "Verified Team",
    lineOne: "Background verified",
    lineTwo: "skilled professionals",
    icon: <VerifiedTeamIcon />,
  },
  {
    title: "Measured Planning",
    lineOne: "Accurate measurement",
    lineTwo: "for precise estimation",
    icon: <MeasuredPlanningIcon />,
  },
  {
    title: "Quality Materials",
    lineOne: "Branded materials with",
    lineTwo: "assured quality",
    icon: <QualityMaterialsIcon />,
  },
  {
    title: "On-Time Execution",
    lineOne: "Committed timelines",
    lineTwo: "and timely delivery",
    icon: <OnTimeIcon />,
  },
] as const;

export default function RenovationTrustStrip() {
  return (
    <section
      className={styles.strip}
      aria-label="City Coolies renovation service benefits"
    >
      {ITEMS.map((item) => (
        <article
          key={item.title}
          className={styles.item}
        >
          <span className={styles.icon}>
            {item.icon}
          </span>

          <div className={styles.copy}>
            <strong>{item.title}</strong>

            <p>
              <span>{item.lineOne}</span>
              <span>{item.lineTwo}</span>
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}