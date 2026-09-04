"use client";

import { useContactReveal } from "./useContactReveal";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.3"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M9 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.3.2.1.4.2.6 0l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .5-.2 1.3-.6 1.7-.5.5-1.2.8-2 .8-1.1 0-2.7-.5-4.6-2.1-2.1-1.8-3.4-4.2-3.5-5.4 0-.5.1-.9.2-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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

export default function ContactHeroSection() {
  const sectionRef =
    useContactReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="cc-contact-section cc-contact-hero"
      aria-labelledby="contact-hero-heading"
    >
      <div className="cc-frame cc-hero-frame">

        <div
          className="cc-hero-bg"
          aria-hidden="true"
        />

        <div
          className="cc-hero-video-veil"
          aria-hidden="true"
        />

        <span
          className="cc-frame-sweep"
          aria-hidden="true"
        />

        <div className="cc-hero-content">

          <div className="cc-kicker cc-hero-seq cc-hero-seq-1">
            <i />

            <span>
              CITY COOLIES SUPPORT
            </span>
          </div>

          <h1 id="contact-hero-heading">

            <span className="cc-hero-seq cc-hero-seq-2">
              Need Help With
            </span>

            <span className="cc-hero-seq cc-hero-seq-3">
              Your Property?
            </span>

            <span className="cc-hero-seq cc-hero-seq-4 cc-red">
              Let&apos;s Get You
            </span>

            <span className="cc-hero-seq cc-hero-seq-5 cc-red">
              Connected.
            </span>

          </h1>

          <p className="cc-hero-description cc-hero-seq cc-hero-seq-6">
            Cleaning, maintenance, renovation or property support—
            reach City Coolies and connect with the right team.
          </p>

          <div className="cc-hero-actions">

            <a
              href="tel:+918693986939"
              className="cc-action cc-action-primary cc-hero-seq cc-hero-seq-7"
            >
              <span>
                Call Now
              </span>

              <span className="cc-action-arrow">
                <ArrowIcon />
              </span>
            </a>

            <a
              href="https://wa.me/918693986939"
              target="_blank"
              rel="noreferrer"
              className="cc-action cc-action-secondary cc-hero-seq cc-hero-seq-8"
            >
              <span className="cc-action-start">

                <span className="cc-whatsapp-icon">
                  <WhatsAppIcon />
                </span>

                <span>
                  WhatsApp Us
                </span>

              </span>

              <span className="cc-action-arrow">
                <ArrowIcon />
              </span>
            </a>

          </div>

          <div className="cc-hero-details">

            <a
              href="tel:+918693986939"
              className="cc-hero-seq cc-hero-seq-9"
            >
              <span className="cc-detail-icon">
                <PhoneIcon />
              </span>

              <strong>
                +91 86939 86939
              </strong>
            </a>

            <span
              className="cc-detail-divider cc-hero-seq cc-hero-seq-10"
            />

            <a
              href="mailto:citycooliescrm@gmail.com"
              className="cc-hero-seq cc-hero-seq-11"
            >
              <span className="cc-detail-icon">
                <MailIcon />
              </span>

              <strong>
                citycooliescrm@gmail.com
              </strong>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}