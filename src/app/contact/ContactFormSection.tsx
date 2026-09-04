"use client";

import Image from "next/image";

import QuoteForm from "./QuoteForm";
import { useContactReveal } from "./useContactReveal";

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.5 2 6.8 12h4.7L10.6 22 17.2 11h-4.6L13.5 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="8"
        r="3.1"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M6.4 19v-1.5c0-3 2.3-5.2 5.6-5.2s5.6 2.2 5.6 5.2V19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M4 11.4v3.4M20 11.4v3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="5"
        y="4"
        width="10"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M9 8h7.2a2.8 2.8 0 0 1 2.8 2.8v5.4A2.8 2.8 0 0 1 16.2 19H12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="m8 13 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactFormSection() {
  const sectionRef =
    useContactReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="cc-contact-section cc-contact-form-section"
      aria-labelledby="contact-form-heading"
    >
      <div className="cc-frame cc-contact-form-frame">

        <span
          className="cc-frame-sweep"
          aria-hidden="true"
        />

        <div className="cc-contact-form-gallery">

          <div className="cc-contact-room cc-step cc-delay-1">
            <Image
              src="/serene_scandinavian_living_room.png"
              alt="Clean modern living room"
              fill
              sizes="(max-width: 760px) 52vw, 250px"
            />
          </div>

          <article className="cc-contact-quick cc-step cc-delay-2">
            <span className="cc-contact-quick-icon">
              <BoltIcon />
            </span>

            <div>
              <strong>
                Quick Response
              </strong>

              <p>
                We typically reply
                <br />
                within a few minutes.
              </p>
            </div>
          </article>

          <article className="cc-contact-mini-card cc-step cc-delay-3">
            <span className="cc-contact-mini-icon">
              <SupportIcon />
            </span>

            <strong>
              Trusted Support
            </strong>

            <p>
              Professional team
              <br />
              ready to assist you.
            </p>
          </article>

          <div className="cc-contact-worker cc-step cc-delay-4">
            <Image
              src="/friendly_service_worker_in_modern_interior.png"
              alt="City Coolies service professional"
              fill
              sizes="(max-width: 760px) 34vw, 145px"
            />
          </div>

          <article className="cc-contact-mini-card cc-step cc-delay-5">
            <span className="cc-contact-mini-icon">
              <ServicesIcon />
            </span>

            <strong>
              All Services
            </strong>

            <p>
              Cleaning, maintenance,
              <br />
              renovation &amp; more.
            </p>
          </article>

        </div>

        <div className="cc-contact-form-content">

          <div className="cc-kicker cc-step cc-delay-2">
            <i />

            <span>
              SEND US A MESSAGE
            </span>
          </div>

          <h2
            id="contact-form-heading"
            className="cc-contact-form-heading cc-step cc-delay-3"
          >
            We&apos;re Here To Help
          </h2>

          <div className="cc-step cc-delay-4">
            <QuoteForm />
          </div>

        </div>

      </div>
    </section>
  );
}