"use client";

import { useContactReveal } from "./useContactReveal";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.1 3.8 9.4 7c.4.6.3 1.3-.2 1.8L8 10c1.2 2.5 3.5 4.7 6 6l1.2-1.2c.5-.5 1.2-.6 1.8-.2l3.2 2.3c.7.5.9 1.4.5 2.1-.7 1.3-2.2 2-3.7 1.8C9.8 19.8 4.2 14.2 3.2 7c-.2-1.5.5-3 1.8-3.7.7-.4 1.6-.2 2.1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13M14 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactMapSection() {
  const sectionRef =
    useContactReveal<HTMLElement>();

  const directionsUrl =
    "https://maps.google.com/?q=No.+117,+Village+High+Road,+Sholinganallur,+Chennai+600119";

  const embedUrl =
    "https://maps.google.com/maps?q=No.%20117%2C%20Village%20High%20Road%2C%20Sholinganallur%2C%20Chennai%20600119&t=k&z=17&ie=UTF8&iwloc=&output=embed";

  return (
    <section
      ref={sectionRef}
      className="cc-contact-section cc-map-final-section"
      aria-labelledby="cc-map-final-heading"
    >
      <div className="cc-map-final-frame">

        <div className="cc-map-final-map">
          <iframe
            src={embedUrl}
            title="City Coolies location - No. 117, Village High Road, Sholinganallur, Chennai-600119"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div
          className="cc-map-final-fade"
          aria-hidden="true"
        />

        <div className="cc-map-final-content">

          <div className="cc-kicker cc-step cc-delay-1">
            <i />

            <span>
              FIND / CONNECT WITH US
            </span>
          </div>

          <h2
            id="cc-map-final-heading"
            className="cc-map-final-heading cc-step cc-delay-2"
          >
            <span>
              Property Support
            </span>

            <span className="cc-map-final-red">
              Wherever You Need It.
            </span>
          </h2>

          <p className="cc-map-final-copy cc-step cc-delay-3">
            Our team is available across Chennai
            and surrounding areas to help you
            with all your property needs.
          </p>

          <div className="cc-map-final-actions cc-step cc-delay-4">

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="cc-map-final-button cc-map-final-primary"
            >
              <span className="cc-map-final-icon">
                <LocationIcon />
              </span>

              <span>
                Get Directions
              </span>

              <span className="cc-map-final-arrow">
                <ArrowIcon />
              </span>
            </a>

            <a
              href="tel:+918693986939"
              className="cc-map-final-button cc-map-final-secondary"
            >
              <span className="cc-map-final-icon">
                <PhoneIcon />
              </span>

              <span>
                Call City Coolies
              </span>

              <span className="cc-map-final-arrow">
                <ArrowIcon />
              </span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}