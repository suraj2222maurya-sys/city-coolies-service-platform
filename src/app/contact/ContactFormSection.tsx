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

          <article className="cc-contact-mini-card cc-step cc-delay-3 cc-contact-trusted-support">
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

          <article className="cc-contact-mini-card cc-step cc-delay-5 cc-contact-all-services">
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

      {/* CC_CONTACT_QUICK_CONTENT_SIZE_START */}
      <style>{`
        .cc-contact-features-frame
        + *,
        .cc-contact-form-section
        .cc-contact-quick {
          box-sizing: border-box;
        }

        /*
         * Increase only the content inside
         * the red Quick Response box.
         */
        .cc-contact-form-section
        .cc-contact-quick {
          display: flex !important;
          align-items: flex-start !important;

          gap:
            clamp(
              15px,
              1.2vw,
              20px
            ) !important;

          padding:
            clamp(
              25px,
              2.1vw,
              38px
            ) !important;
        }

        .cc-contact-form-section
        .cc-contact-quick-icon {
          display: grid !important;

          width:
            clamp(
              42px,
              3.2vw,
              50px
            ) !important;

          height:
            clamp(
              42px,
              3.2vw,
              50px
            ) !important;

          flex:
            0
            0
            clamp(
              42px,
              3.2vw,
              50px
            ) !important;

          place-items:
            center !important;
        }

        .cc-contact-form-section
        .cc-contact-quick-icon svg {
          width:
            clamp(
              26px,
              1.8vw,
              31px
            ) !important;

          height:
            clamp(
              26px,
              1.8vw,
              31px
            ) !important;
        }

        .cc-contact-form-section
        .cc-contact-quick > div {
          display: flex !important;

          min-width: 0 !important;

          flex-direction:
            column !important;

          gap:
            9px !important;
        }

        .cc-contact-form-section
        .cc-contact-quick strong {
          font-size:
            clamp(
              14px,
              1.08vw,
              17px
            ) !important;

          font-weight:
            850 !important;

          line-height:
            1.2 !important;

          letter-spacing:
            -0.015em !important;
        }

        .cc-contact-form-section
        .cc-contact-quick p {
          margin: 0 !important;

          font-size:
            clamp(
              10.5px,
              0.75vw,
              12px
            ) !important;

          font-weight:
            600 !important;

          line-height:
            1.55 !important;
        }

        /*
         * Maintain balanced sizing on phones.
         */
        @media (max-width: 700px) {
          .cc-contact-form-section
          .cc-contact-quick {
            gap:
              12px !important;

            padding:
              18px
              15px !important;
          }

          .cc-contact-form-section
          .cc-contact-quick-icon {
            width:
              36px !important;

            height:
              36px !important;

            flex:
              0
              0
              36px !important;
          }

          .cc-contact-form-section
          .cc-contact-quick-icon svg {
            width:
              23px !important;

            height:
              23px !important;
          }

          .cc-contact-form-section
          .cc-contact-quick > div {
            gap:
              6px !important;
          }

          .cc-contact-form-section
          .cc-contact-quick strong {
            font-size:
              12px !important;
          }

          .cc-contact-form-section
          .cc-contact-quick p {
            font-size:
              9px !important;

            line-height:
              1.5 !important;
          }
        }
      `}</style>
      {/* CC_CONTACT_QUICK_CONTENT_SIZE_END */}

      {/* CC_TRUSTED_SUPPORT_TEXT_SIZE_START */}
      <style>{`
        /*
         * Increase only the Trusted Support text.
         * The box and icon remain unchanged.
         */
        .cc-contact-form-section
        .cc-contact-trusted-support strong {
          font-size:
            clamp(
              14px,
              1.05vw,
              17px
            ) !important;

          font-weight:
            850 !important;

          line-height:
            1.25 !important;

          letter-spacing:
            -0.015em !important;
        }

        .cc-contact-form-section
        .cc-contact-trusted-support p {
          margin-top:
            8px !important;

          font-size:
            clamp(
              10.5px,
              0.76vw,
              12px
            ) !important;

          font-weight:
            550 !important;

          line-height:
            1.55 !important;
        }

        @media (max-width: 700px) {
          .cc-contact-form-section
          .cc-contact-trusted-support strong {
            font-size:
              13px !important;
          }

          .cc-contact-form-section
          .cc-contact-trusted-support p {
            margin-top:
              7px !important;

            font-size:
              9.5px !important;

            line-height:
              1.5 !important;
          }
        }
      `}</style>
      {/* CC_TRUSTED_SUPPORT_TEXT_SIZE_END */}

      {/* CC_ALL_SERVICES_TEXT_SIZE_START */}
      <style>{`
        /*
         * Increase only the All Services text.
         * The box and icon remain unchanged.
         */
        .cc-contact-form-section
        .cc-contact-all-services strong {
          font-size:
            clamp(
              14px,
              1.05vw,
              17px
            ) !important;

          font-weight:
            850 !important;

          line-height:
            1.25 !important;

          letter-spacing:
            -0.015em !important;
        }

        .cc-contact-form-section
        .cc-contact-all-services p {
          margin-top:
            8px !important;

          font-size:
            clamp(
              10.5px,
              0.76vw,
              12px
            ) !important;

          font-weight:
            550 !important;

          line-height:
            1.55 !important;
        }

        @media (max-width: 700px) {
          .cc-contact-form-section
          .cc-contact-all-services strong {
            font-size:
              13px !important;
          }

          .cc-contact-form-section
          .cc-contact-all-services p {
            margin-top:
              7px !important;

            font-size:
              9.5px !important;

            line-height:
              1.5 !important;
          }
        }
      `}</style>
      {/* CC_ALL_SERVICES_TEXT_SIZE_END */}
    </section>
  );
}