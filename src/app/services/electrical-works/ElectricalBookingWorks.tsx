import styles from "./ElectricalBookingWorks.module.css";

type StepIconProps = {
  type: "service" | "booking" | "schedule" | "confirm" | "payment";
};

function StepIcon({ type }: StepIconProps) {
  if (type === "service") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="14" cy="14" r="8" />
        <path d="M19.5 19.5 25 25" />
        <path d="M10.5 11.5h7M10.5 14.5h5M10.5 17.5h6" />
      </svg>
    );
  }

  if (type === "booking") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="5.3" />
        <path d="M16 3.5v4M16 24.5v4M3.5 16h4M24.5 16h4" />
        <path d="m7.2 7.2 2.8 2.8M22 22l2.8 2.8M24.8 7.2 22 10M10 22l-2.8 2.8" />
        <path d="M16 12.8v6.4M12.8 16h6.4" />
      </svg>
    );
  }

  if (type === "schedule") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="7.5" width="22" height="19" rx="3" />
        <path d="M10 4.5v6M22 4.5v6M5 12.5h22" />
        <circle cx="20.5" cy="20" r="4.5" />
        <path d="M20.5 17.5V20l2 1.3" />
      </svg>
    );
  }

  if (type === "confirm") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="7" y="5.5" width="18" height="22" rx="2.5" />
        <path d="M12 5.5V3.8h8v1.7M11.5 12h9" />
        <path d="m11.5 19 3 3 6.5-7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="11" />
      <path d="M16 8v13" />
      <path d="m11.5 17 4.5 4.5 4.5-4.5" />
      <path d="M10.5 25h11" />
    </svg>
  );
}

const steps = [
  {
    number: "1",
    title: "Choose Service",
    description: "Browse and select the service you need.",
    icon: "service" as const,
  },
  {
    number: "2",
    title: "Add to Booking / Book Survey",
    description: "Add services or book the site survey.",
    icon: "booking" as const,
  },
  {
    number: "3",
    title: "Select Schedule",
    description: "Choose your preferred date and time.",
    icon: "schedule" as const,
  },
  {
    number: "4",
    title: "Confirm Details",
    description: "Review your details and address carefully.",
    icon: "confirm" as const,
  },
  {
    number: "5",
    title: "Secure Payment",
    description: "Pay securely online and we'll take care of the rest.",
    icon: "payment" as const,
  },
];

export default function ElectricalBookingWorks() {
  return (
    <section
      className={styles.section}
      aria-labelledby="electrical-booking-works-title"
    >
      <div className={styles.container}>
        <h2
          id="electrical-booking-works-title"
          className={styles.title}
        >
          How Booking Works
        </h2>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div className={styles.stepGroup} key={step.number}>
              <article className={styles.step}>
                <div className={styles.iconWrap}>
                  <StepIcon type={step.icon} />
                </div>

                <div className={styles.copy}>
                  <span className={styles.number}>{step.number}</span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </article>

              {index < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <span />
                  <svg viewBox="0 0 16 16">
                    <path d="m5 3 5 5-5 5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}