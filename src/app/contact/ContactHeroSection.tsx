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

        <div className="cc-kicker cc-contact-mobile-kicker">
          <i />

          <span>
            CITY COOLIES SUPPORT
          </span>
        </div>

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

      

      {/* CC_CONTACT_PHONE_BANNER_ORDER_START */}
      <style>{`
        /*
         * The duplicated kicker is hidden everywhere
         * except the phone layout.
         */
        .cc-contact-mobile-kicker {
          display: none;
        }

        /*
         * PHONE ONLY:
         * Kicker -> banner -> connected content.
         */
        @media (max-width: 700px) {
          .cc-contact-hero {
            width: 100% !important;
            overflow: hidden !important;

            background:
              #fff1f4 !important;
          }

          .cc-contact-hero,
          .cc-contact-hero * {
            box-sizing: border-box;
          }

          .cc-contact-hero .cc-hero-frame {
            position: relative !important;

            display: flex !important;
            flex-direction: column !important;

            width: 100% !important;
            min-height: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            overflow: hidden !important;

            border: 0 !important;
            border-radius: 0 !important;

            background:
              #fff1f4 !important;
          }

          /*
           * First item: support pill.
           */
          .cc-contact-hero
          .cc-contact-mobile-kicker {
            position: relative !important;

            inset: auto !important;
            z-index: 6 !important;

            display: inline-flex !important;
            align-items: center !important;
            align-self: flex-start !important;

            order: 1 !important;

            width: auto !important;
            min-height: 38px !important;

            margin:
              12px
              14px
              9px !important;

            padding:
              0
              14px !important;

            gap: 9px !important;

            border:
              1px solid
              rgba(242, 29, 50, 0.16) !important;

            border-radius:
              999px !important;

            color:
              #dc0b22 !important;

            background:
              rgba(255, 255, 255, 0.72) !important;

            box-shadow:
              0 10px 25px
              rgba(93, 14, 27, 0.06) !important;

            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
          }

          .cc-contact-hero
          .cc-contact-mobile-kicker i {
            display: block !important;

            width: 8px !important;
            height: 8px !important;

            flex:
              0
              0
              8px !important;

            border-radius: 50% !important;

            background:
              #f21d32 !important;

            box-shadow:
              0 0 0 5px
              rgba(242, 29, 50, 0.07) !important;
          }

          .cc-contact-hero
          .cc-contact-mobile-kicker span {
            font-size: 8.5px !important;
            font-weight: 900 !important;

            line-height: 1 !important;

            letter-spacing:
              0.12em !important;

            text-transform:
              uppercase !important;
          }

          /*
           * Hide the original kicker inside the content
           * only on phone.
           */
          .cc-contact-hero
          .cc-hero-content
          > .cc-kicker {
            display: none !important;
          }

          /*
           * Second item: complete responsive banner.
           */
          .cc-contact-hero .cc-hero-bg {
            position: relative !important;

            inset: auto !important;
            z-index: 2 !important;

            display: block !important;

            order: 2 !important;

            width: 100% !important;
            height: auto !important;

            flex:
              0
              0
              auto !important;

            aspect-ratio:
              946 / 652 !important;

            margin: 0 !important;
            padding: 0 !important;

            background-repeat:
              no-repeat !important;

            background-position:
              center center !important;

            background-size:
              100% 100% !important;

            border: 0 !important;
            border-radius: 0 !important;

            box-shadow: none !important;

            transform: none !important;
            filter: none !important;
            animation: none !important;
          }

          /*
           * Desktop overlay is unnecessary when the
           * phone banner is displayed separately.
           */
          .cc-contact-hero
          .cc-hero-video-veil,
          .cc-contact-hero
          .cc-frame-sweep {
            display: none !important;
          }

          /*
           * Third item: content directly joined
           * to the bottom of the banner.
           */
          .cc-contact-hero .cc-hero-content {
            position: relative !important;

            inset: auto !important;
            z-index: 4 !important;

            display: block !important;

            order: 3 !important;

            width: 100% !important;
            max-width: none !important;
            min-height: 0 !important;

            margin:
              -2px
              0
              0 !important;

            padding:
              10px
              16px
              27px !important;

            border: 0 !important;
            border-radius: 0 !important;

            background:
              #fff1f4 !important;

            box-shadow: none !important;
          }

          /*
           * Soft connection between banner and content.
           */
          .cc-contact-hero
          .cc-hero-content::before {
            position: absolute;

            top: -18px;
            right: 0;
            left: 0;
            z-index: -1;

            height: 20px;

            content: "";
            pointer-events: none;

            background:
              linear-gradient(
                180deg,
                rgba(255, 241, 244, 0),
                #fff1f4
              );
          }

          .cc-contact-hero
          .cc-hero-content h1 {
            width: 100% !important;
            max-width: 100% !important;

            margin:
              0 !important;

            color:
              #18191f !important;

            font-size:
              clamp(
                40px,
                11.7vw,
                54px
              ) !important;

            font-weight:
              850 !important;

            line-height:
              0.93 !important;

            letter-spacing:
              -0.052em !important;
          }

          .cc-contact-hero
          .cc-hero-content h1
          > span {
            display: block !important;
          }

          .cc-contact-hero
          .cc-hero-content
          .cc-red {
            color:
              #f21d32 !important;
          }

          .cc-contact-hero
          .cc-hero-description {
            width: 100% !important;
            max-width: 100% !important;

            margin:
              18px
              0
              0 !important;

            color:
              #5b6069 !important;

            font-size:
              13px !important;

            line-height:
              1.62 !important;
          }

          .cc-contact-hero
          .cc-hero-actions {
            display: grid !important;

            grid-template-columns:
              minmax(0, 1fr)
              minmax(0, 1fr) !important;

            width: 100% !important;
            max-width: 100% !important;

            gap: 8px !important;

            margin:
              22px
              0
              0 !important;
          }

          .cc-contact-hero .cc-action {
            display: inline-flex !important;
            align-items: center !important;
            justify-content:
              space-between !important;

            width: 100% !important;
            min-width: 0 !important;
            min-height: 47px !important;

            padding:
              0
              10px
              0
              14px !important;

            border-radius:
              999px !important;

            font-size:
              9.5px !important;

            white-space:
              nowrap !important;
          }

          .cc-contact-hero
          .cc-action-start {
            display: inline-flex !important;
            align-items: center !important;

            min-width: 0 !important;

            gap: 6px !important;
          }

          .cc-contact-hero
          .cc-whatsapp-icon {
            width: 25px !important;
            height: 25px !important;

            flex:
              0
              0
              25px !important;
          }

          .cc-contact-hero
          .cc-whatsapp-icon svg {
            width: 15px !important;
            height: 15px !important;
          }

          .cc-contact-hero
          .cc-action-arrow {
            width: 24px !important;
            height: 24px !important;

            flex:
              0
              0
              24px !important;
          }

          .cc-contact-hero
          .cc-action-arrow svg {
            width: 14px !important;
            height: 14px !important;
          }

          .cc-contact-hero
          .cc-hero-details {
            display: grid !important;

            grid-template-columns:
              1fr !important;

            width: 100% !important;
            max-width: 100% !important;

            gap: 8px !important;

            margin:
              18px
              0
              0 !important;
          }

          .cc-contact-hero
          .cc-detail-divider {
            display: none !important;
          }

          .cc-contact-hero
          .cc-hero-details a {
            display: flex !important;
            align-items: center !important;

            width: 100% !important;
            min-height: 43px !important;

            gap: 9px !important;

            padding:
              6px
              10px !important;

            border:
              1px solid
              rgba(242, 29, 50, 0.11) !important;

            border-radius:
              13px !important;

            color:
              #34363d !important;

            background:
              rgba(255, 255, 255, 0.46) !important;

            text-decoration:
              none !important;
          }

          .cc-contact-hero
          .cc-detail-icon {
            display: grid !important;

            width: 29px !important;
            height: 29px !important;

            flex:
              0
              0
              29px !important;

            place-items: center !important;
          }

          .cc-contact-hero
          .cc-detail-icon svg {
            width: 15px !important;
            height: 15px !important;
          }
        }

        @media (max-width: 370px) {
          .cc-contact-hero
          .cc-hero-content {
            padding-right:
              13px !important;

            padding-left:
              13px !important;
          }

          .cc-contact-hero
          .cc-hero-content h1 {
            font-size:
              clamp(
                37px,
                11.2vw,
                46px
              ) !important;
          }

          .cc-contact-hero
          .cc-action {
            padding:
              0
              8px !important;

            font-size:
              8.6px !important;
          }

          .cc-contact-hero
          .cc-action-arrow {
            display: none !important;
          }
        }
      `}</style>
      {/* CC_CONTACT_PHONE_BANNER_ORDER_END */}

      {/* CC_CONTACT_PHONE_SEAMLESS_CENTER_START */}
      <style>{`
        @media (max-width: 700px) {
          .cc-contact-hero {
            --cc-contact-phone-bg:
              #fde7ea;

            width: 100% !important;

            border: 0 !important;

            background:
              var(--cc-contact-phone-bg) !important;
          }

          .cc-contact-hero .cc-hero-frame {
            width: 100% !important;

            border: 0 !important;
            border-radius: 0 !important;

            background:
              var(--cc-contact-phone-bg) !important;
          }

          /*
           * Keep the complete top area on the
           * same background as the Hero.
           */
          .cc-contact-hero
          .cc-contact-mobile-kicker {
            margin:
              12px
              14px
              8px !important;

            background:
              rgba(255, 255, 255, 0.55) !important;
          }

          /*
           * Center and enlarge the main artwork.
           * Cover keeps its original proportions.
           */
          .cc-contact-hero .cc-hero-bg {
            position: relative !important;

            width: 100% !important;
            height: auto !important;

            aspect-ratio:
              1002 / 645 !important;

            margin: 0 !important;

            overflow: hidden !important;

            background-color:
              var(--cc-contact-phone-bg) !important;

            background-repeat:
              no-repeat !important;

            background-position:
              68% center !important;

            background-size:
              cover !important;

            border: 0 !important;
            border-radius: 0 !important;

            box-shadow: none !important;

            transform: none !important;
            filter: none !important;
            animation: none !important;
          }

          /*
           * Blend the image into the common pink
           * background at its top and bottom edges.
           */
          .cc-contact-hero
          .cc-hero-bg::before {
            position: absolute;
            inset: 0;
            z-index: 2;

            content: "";
            pointer-events: none;

            background:
              linear-gradient(
                180deg,
                var(--cc-contact-phone-bg) 0%,
                rgba(253, 231, 234, 0.18) 10%,
                transparent 22%,
                transparent 76%,
                rgba(253, 231, 234, 0.26) 88%,
                var(--cc-contact-phone-bg) 100%
              );
          }

          /*
           * Join the content directly with the banner.
           */
          .cc-contact-hero .cc-hero-content {
            width: 100% !important;
            max-width: none !important;

            margin:
              -12px
              0
              0 !important;

            padding:
              8px
              17px
              27px !important;

            border: 0 !important;
            border-radius: 0 !important;

            background:
              var(--cc-contact-phone-bg) !important;

            box-shadow: none !important;
          }

          .cc-contact-hero
          .cc-hero-content::before {
            top: -24px !important;
            right: 0 !important;
            left: 0 !important;

            height: 26px !important;

            background:
              linear-gradient(
                180deg,
                rgba(253, 231, 234, 0),
                var(--cc-contact-phone-bg)
              ) !important;
          }

          /*
           * Balanced phone typography.
           */
          .cc-contact-hero
          .cc-hero-content h1 {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            font-size:
              clamp(
                39px,
                10.4vw,
                46px
              ) !important;

            line-height:
              0.95 !important;

            letter-spacing:
              -0.047em !important;
          }

          .cc-contact-hero
          .cc-hero-description {
            margin-top:
              17px !important;
          }

          .cc-contact-hero
          .cc-hero-actions {
            margin-top:
              21px !important;
          }

          .cc-contact-hero
          .cc-hero-details {
            margin-top:
              17px !important;
          }
        }

        @media (max-width: 380px) {
          .cc-contact-hero .cc-hero-bg {
            background-position:
              67% center !important;
          }

          .cc-contact-hero
          .cc-hero-content {
            padding-right:
              14px !important;

            padding-left:
              14px !important;
          }

          .cc-contact-hero
          .cc-hero-content h1 {
            font-size:
              clamp(
                37px,
                10.2vw,
                42px
              ) !important;
          }
        }
      `}</style>
      {/* CC_CONTACT_PHONE_SEAMLESS_CENTER_END */}

      

      

      {/* CC_CONTACT_PHONE_ONE_BACKGROUND_START */}
      <style>{`
        @media (max-width: 700px) {
          .cc-contact-hero {
            --cc-contact-unified-bg:
              linear-gradient(
                90deg,
                #fddbdd 0%,
                #f9d0d4 52%,
                #fcc9cd 100%
              );

            background:
              var(--cc-contact-unified-bg) !important;
          }

          /*
           * Use exactly the same background behind
           * the kicker, banner and content.
           */
          .cc-contact-hero .cc-hero-frame,
          .cc-contact-hero .cc-hero-content {
            border: 0 !important;

            background:
              var(--cc-contact-unified-bg) !important;

            box-shadow:
              none !important;
          }

          .cc-contact-hero
          .cc-contact-mobile-kicker {
            background:
              rgba(255, 255, 255, 0.58) !important;
          }

          /*
           * Keep the centered banner sharp
           * and at its natural phone scale.
           */
          .cc-contact-hero .cc-hero-bg {
            background-color:
              #f9d0d4 !important;

            background-position:
              right center !important;

            background-size:
              auto 100% !important;

            opacity: 1 !important;

            filter:
              none !important;

            backdrop-filter:
              none !important;

            transform:
              none !important;

            scale:
              1 !important;

            animation:
              none !important;
          }

          /*
           * Blend only the top 22px of the banner.
           * The remaining artwork stays completely clear.
           */
          .cc-contact-hero
          .cc-hero-bg::before {
            position: absolute !important;

            top: 0 !important;
            right: 0 !important;
            left: 0 !important;
            bottom: auto !important;
            z-index: 3 !important;

            display: block !important;

            width: 100% !important;
            height: 22px !important;

            content: "" !important;
            pointer-events: none !important;

            background:
              var(--cc-contact-unified-bg) !important;

            opacity: 1 !important;

            mask-image:
              linear-gradient(
                to bottom,
                black 0%,
                transparent 100%
              );

            -webkit-mask-image:
              linear-gradient(
                to bottom,
                black 0%,
                transparent 100%
              );
          }

          /*
           * Blend only the bottom 22px into
           * the identical content background.
           */
          .cc-contact-hero
          .cc-hero-bg::after {
            position: absolute !important;

            top: auto !important;
            right: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            z-index: 3 !important;

            display: block !important;

            width: 100% !important;
            height: 22px !important;

            content: "" !important;
            pointer-events: none !important;

            background:
              var(--cc-contact-unified-bg) !important;

            opacity: 1 !important;

            mask-image:
              linear-gradient(
                to top,
                black 0%,
                transparent 100%
              );

            -webkit-mask-image:
              linear-gradient(
                to top,
                black 0%,
                transparent 100%
              );
          }

          /*
           * Remove the older content joining layer.
           * The banner bottom fade now handles the join.
           */
          .cc-contact-hero
          .cc-hero-content::before {
            display: none !important;
            content: none !important;
          }

          .cc-contact-hero
          .cc-hero-content {
            margin:
              -2px
              0
              0 !important;

            padding-top:
              8px !important;
          }

          .cc-contact-hero
          .cc-hero-video-veil {
            display: none !important;
          }
        }
      `}</style>
      {/* CC_CONTACT_PHONE_ONE_BACKGROUND_END */}
    </section>
  );
}