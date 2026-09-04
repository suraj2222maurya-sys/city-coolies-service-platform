"use client";

import { useContactReveal } from "./useContactReveal";

function CertifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.8 18.5c.7-3 2.4-4.6 5.2-4.6 1.4 0 2.6.4 3.5 1.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m16 14 1.5 1.5L21 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 8.8 20.4 10v2.8c0 2.4-1 4-2.4 5-1.4-1-2.4-2.6-2.4-5V10L18 8.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m12 3 2 2 2.8-.3.7 2.7L20 9l-1.2 2.5L20 14l-2.5 1.6-.7 2.7-2.8-.3-2 2-2-2-2.8.3-.7-2.7L4 14l1.2-2.5L4 9l2.5-1.6.7-2.7L10 5l2-2Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 11.9 1.8 1.8 3.8-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4.2c-3.8 0-6.8 3-6.8 6.8 0 5.2 6.8 9 6.8 9s6.8-3.8 6.8-9c0-3.8-3-6.8-6.8-6.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 9.4V11l1.2.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PricingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 7.2v9.6M14.3 9.1c-.5-.7-1.3-1-2.2-1-1.3 0-2.2.7-2.2 1.7 0 2.8 4.7 1.3 4.7 4 0 1.1-1 1.9-2.5 1.9-1 0-1.9-.4-2.5-1.1"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="m17.2 4.7 1.2 1.2 2.1-2.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const features = [
  {
    title: "Certified Professionals",
    description: "Background verified experts",
    icon: <CertifiedIcon />,
  },
  {
    title: "Quality Assurance",
    description: "100% quality service guaranteed",
    icon: <QualityIcon />,
  },
  {
    title: "On-Time Service",
    description: "We respect your valuable time",
    icon: <TimeIcon />,
  },
  {
    title: "Fair Pricing",
    description: "Transparent pricing, no hidden charges",
    icon: <PricingIcon />,
  },
];

export default function ContactFeaturesSection() {
  const sectionRef = useContactReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="cc-contact-section cc-contact-features"
      aria-label="City Coolies service benefits"
    >
      <div className="cc-contact-features-frame">

        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`cc-contact-feature cc-step cc-delay-${Math.min(index + 1, 4)}`}
          >
            <span className="cc-contact-feature-icon">
              {feature.icon}
            </span>

            <div className="cc-contact-feature-copy">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}

      </div>
    </section>
  );
}