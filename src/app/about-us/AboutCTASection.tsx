import Link from "next/link";

const ABOUT_CTA_STYLES = `
  .cc-about-cta,
  .cc-about-cta * {
    box-sizing: border-box;
  }

  .cc-about-cta {
    --cta-red: #f51b28;
    --cta-red-dark: #d80c19;
    --cta-red-deep: #a90713;
    --cta-pink: #fff0f2;
    --cta-ink: #161923;
    --cta-muted: #667080;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: clamp(68px, 6.5vw, 96px) 18px;
    background:
      radial-gradient(circle at 8% 18%, rgba(245, 27, 40, 0.08), transparent 23%),
      radial-gradient(circle at 92% 82%, rgba(245, 27, 40, 0.07), transparent 21%),
      linear-gradient(145deg, #ffffff 0%, #fffafa 52%, #fff1f3 100%);
  }

  .cc-about-cta::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 22px;
    right: 3%;
    width: 124px;
    height: 124px;
    opacity: 0.24;
    background-image: radial-gradient(rgba(245, 27, 40, 0.75) 1.4px, transparent 1.4px);
    background-size: 14px 14px;
  }

  .cc-about-cta__card {
    position: relative;
    width: min(100%, 1180px);
    margin-inline: auto;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1.16fr) minmax(320px, 0.84fr);
    align-items: stretch;
    border: 1px solid rgba(255, 255, 255, 0.32);
    border-radius: 34px;
    background:
      radial-gradient(circle at 10% 12%, rgba(255, 255, 255, 0.16), transparent 27%),
      radial-gradient(circle at 78% 110%, rgba(255, 255, 255, 0.12), transparent 35%),
      linear-gradient(135deg, #ff2b38 0%, var(--cta-red) 42%, var(--cta-red-deep) 100%);
    box-shadow:
      0 34px 78px rgba(143, 7, 18, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.32);
    color: #ffffff;
  }

  .cc-about-cta__card::before {
    content: "";
    position: absolute;
    top: -170px;
    right: 23%;
    width: 400px;
    height: 400px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    box-shadow:
      0 0 0 42px rgba(255, 255, 255, 0.035),
      0 0 0 84px rgba(255, 255, 255, 0.022);
    pointer-events: none;
  }

  .cc-about-cta__card::after {
    content: "";
    position: absolute;
    bottom: -55px;
    left: -42px;
    width: 176px;
    height: 176px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.075);
    pointer-events: none;
  }

  .cc-about-cta__content {
    position: relative;
    z-index: 2;
    padding: clamp(42px, 5.2vw, 66px);
  }

  .cc-about-cta__eyebrow {
    width: fit-content;
    margin: 0 0 16px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.78);
    font-size: 11px;
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0.17em;
    text-transform: uppercase;
  }

  .cc-about-cta__eyebrow::before {
    content: "";
    width: 29px;
    height: 3px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 5px 14px rgba(255, 255, 255, 0.18);
  }

  .cc-about-cta__title {
    max-width: 650px;
    margin: 0;
    color: #ffffff;
    font-size: clamp(37px, 4.2vw, 58px);
    font-weight: 870;
    line-height: 1.05;
    letter-spacing: -0.048em;
    text-wrap: balance;
  }

  .cc-about-cta__title span {
    color: #ffffff;
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.28);
    text-decoration-thickness: 6px;
    text-underline-offset: 7px;
  }

  .cc-about-cta__text {
    max-width: 660px;
    margin: 22px 0 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.72;
  }

  .cc-about-cta__proof {
    margin: 29px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    list-style: none;
  }

  .cc-about-cta__proof li {
    min-height: 37px;
    padding: 0 13px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.92);
    font-size: 10px;
    font-weight: 780;
    line-height: 1;
    letter-spacing: 0.025em;
    backdrop-filter: blur(8px);
  }

  .cc-about-cta__proof svg {
    width: 15px;
    height: 15px;
    color: #ffffff;
  }

  .cc-about-cta__action-wrap {
    position: relative;
    z-index: 2;
    padding: 24px 24px 24px 0;
    display: flex;
  }

  .cc-about-cta__action {
    width: 100%;
    min-height: 100%;
    padding: clamp(27px, 3vw, 38px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.65);
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow:
      0 22px 48px rgba(93, 4, 13, 0.19),
      inset 0 1px 0 #ffffff;
    color: var(--cta-ink);
    backdrop-filter: blur(16px);
  }

  .cc-about-cta__action-icon {
    width: 49px;
    height: 49px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(245, 27, 40, 0.13);
    border-radius: 15px;
    background: linear-gradient(145deg, #ffffff, #ffe4e7);
    color: var(--cta-red);
    box-shadow: inset 0 1px 0 #ffffff, 0 10px 22px rgba(245, 27, 40, 0.09);
  }

  .cc-about-cta__action-icon svg {
    width: 24px;
    height: 24px;
  }

  .cc-about-cta__action-label {
    margin: 20px 0 0;
    color: var(--cta-red-dark);
    font-size: 10px;
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .cc-about-cta__action-title {
    margin: 9px 0 0;
    color: var(--cta-ink);
    font-size: clamp(23px, 2.2vw, 30px);
    font-weight: 850;
    line-height: 1.15;
    letter-spacing: -0.034em;
    text-wrap: balance;
  }

  .cc-about-cta__action-text {
    margin: 12px 0 0;
    color: var(--cta-muted);
    font-size: 12px;
    line-height: 1.62;
  }

  .cc-about-cta__buttons {
    margin-top: 23px;
    display: grid;
    gap: 10px;
  }

  .cc-about-cta__button {
    min-height: 50px;
    padding: 0 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 850;
    line-height: 1;
    text-decoration: none;
    transition:
      transform 210ms ease,
      box-shadow 210ms ease,
      border-color 210ms ease,
      background-color 210ms ease;
  }

  .cc-about-cta__button svg {
    width: 17px;
    height: 17px;
    transition: transform 210ms ease;
  }

  .cc-about-cta__button--primary {
    background: linear-gradient(135deg, #ff2b38, var(--cta-red-dark));
    color: #ffffff;
    box-shadow: 0 14px 29px rgba(245, 27, 40, 0.24);
  }

  .cc-about-cta__button--primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 35px rgba(245, 27, 40, 0.33);
  }

  .cc-about-cta__button--primary:hover svg {
    transform: translateX(3px);
  }

  .cc-about-cta__button--secondary {
    border-color: rgba(245, 27, 40, 0.18);
    background: var(--cta-pink);
    color: var(--cta-red-dark);
  }

  .cc-about-cta__button--secondary:hover {
    transform: translateY(-3px);
    border-color: rgba(245, 27, 40, 0.38);
    background: #ffffff;
    box-shadow: 0 12px 26px rgba(117, 12, 22, 0.09);
  }

  .cc-about-cta__note {
    margin: 14px 0 0;
    color: #7a8290;
    font-size: 10px;
    line-height: 1.45;
    text-align: center;
  }

  @keyframes ccAboutCtaReveal {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes ccAboutCtaPanel {
    from {
      opacity: 0;
      transform: translateX(24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @supports (animation-timeline: view()) {
    .cc-about-cta__card {
      animation: ccAboutCtaReveal linear both;
      animation-timeline: view();
      animation-range: entry 7% cover 29%;
    }

    .cc-about-cta__action {
      animation: ccAboutCtaPanel linear both;
      animation-timeline: view();
      animation-range: entry 12% cover 34%;
    }
  }

  @media (max-width: 900px) {
    .cc-about-cta__card {
      max-width: 720px;
      grid-template-columns: 1fr;
    }

    .cc-about-cta__content {
      padding-bottom: 32px;
      text-align: center;
    }

    .cc-about-cta__eyebrow,
    .cc-about-cta__proof {
      margin-inline: auto;
    }

    .cc-about-cta__title,
    .cc-about-cta__text {
      margin-inline: auto;
    }

    .cc-about-cta__proof {
      justify-content: center;
    }

    .cc-about-cta__action-wrap {
      padding: 0 18px 18px;
    }

    .cc-about-cta__action {
      min-height: 0;
      text-align: center;
    }

    .cc-about-cta__action-icon {
      margin-inline: auto;
    }
  }

  @media (max-width: 560px) {
    .cc-about-cta {
      padding-inline: 14px;
    }

    .cc-about-cta__card {
      border-radius: 26px;
    }

    .cc-about-cta__content {
      padding: 40px 21px 29px;
    }

    .cc-about-cta__title {
      font-size: clamp(34px, 10vw, 43px);
    }

    .cc-about-cta__text {
      font-size: 14px;
      line-height: 1.66;
    }

    .cc-about-cta__proof {
      display: grid;
      grid-template-columns: 1fr;
      width: min(100%, 265px);
    }

    .cc-about-cta__proof li {
      justify-content: center;
    }

    .cc-about-cta__action-wrap {
      padding: 0 12px 12px;
    }

    .cc-about-cta__action {
      padding: 28px 20px;
      border-radius: 21px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cc-about-cta *,
    .cc-about-cta *::before,
    .cc-about-cta *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default function AboutCTASection() {
  return (
    <section className="cc-about-cta" aria-labelledby="about-cta-title">
      <div className="cc-about-cta__card">
        <div className="cc-about-cta__content">
          <p className="cc-about-cta__eyebrow">Let&apos;s Get Started</p>

          <h2 className="cc-about-cta__title" id="about-cta-title">
            Ready for property care <span>you can count on?</span>
          </h2>

          <p className="cc-about-cta__text">
            Book professional cleaning, repairs, renovation or complete
            maintenance for your home, business or industrial property. City
            Coolies brings experienced teams and dependable service across
            India.
          </p>

          <ul
            className="cc-about-cta__proof"
            aria-label="City Coolies service advantages"
          >
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
              10 Years of Experience
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
              Complete Property Solutions
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
              Service Across India
            </li>
          </ul>
        </div>

        <div className="cc-about-cta__action-wrap">
          <div className="cc-about-cta__action">
            <span className="cc-about-cta__action-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
                <path d="M8 9h8M8 13h5" />
              </svg>
            </span>

            <p className="cc-about-cta__action-label">Start Your Request</p>
            <h3 className="cc-about-cta__action-title">
              Tell us what your property needs.
            </h3>
            <p className="cc-about-cta__action-text">
              Our team will help you choose the right service and the next best
              step.
            </p>

            <div className="cc-about-cta__buttons">
              <Link
                className="cc-about-cta__button cc-about-cta__button--primary"
                href="/contact"
              >
                Get a Free Quote
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

              <a
                className="cc-about-cta__button cc-about-cta__button--secondary"
                href="tel:+918693986939"
                aria-label="Call City Coolies"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" />
                </svg>
                Call Now
              </a>
            </div>

            <p className="cc-about-cta__note">
              Simple request. Clear support. Professional service.
            </p>
          </div>
        </div>
      </div>

      <style>{ABOUT_CTA_STYLES}</style>
    </section>
  );
}
