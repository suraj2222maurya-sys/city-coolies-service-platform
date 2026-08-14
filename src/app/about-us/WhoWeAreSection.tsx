import Link from "next/link";

const WHO_WE_ARE_STYLES = `
  .cc-about,
  .cc-about * {
    box-sizing: border-box;
  }

  .cc-about {
    --red: #f51b28;
    --red-dark: #d80c19;
    --red-deep: #ad0712;
    --pink: #fff0f2;
    --pink-soft: #fff8f9;
    --ink: #151823;
    --muted: #626b7b;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    scroll-margin-top: 170px;
    padding: clamp(72px, 7vw, 104px) 20px;
    background:
      radial-gradient(circle at 4% 14%, rgba(245, 27, 40, 0.09), transparent 24%),
      radial-gradient(circle at 94% 88%, rgba(245, 27, 40, 0.08), transparent 23%),
      linear-gradient(135deg, #ffffff 0%, #fffafa 52%, #fff1f3 100%);
    color: var(--ink);
  }

  .cc-about::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 38px;
    right: -76px;
    width: 226px;
    height: 226px;
    border: 1px solid rgba(245, 27, 40, 0.1);
    border-radius: 50%;
    box-shadow:
      0 0 0 36px rgba(245, 27, 40, 0.025),
      0 0 0 72px rgba(245, 27, 40, 0.018);
  }

  .cc-about::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 26px;
    left: 3%;
    width: 128px;
    height: 128px;
    opacity: 0.24;
    background-image: radial-gradient(rgba(245, 27, 40, 0.72) 1.4px, transparent 1.4px);
    background-size: 14px 14px;
  }

  .cc-about__container {
    width: min(100%, 1180px);
    margin-inline: auto;
    display: grid;
    grid-template-columns: minmax(0, 0.93fr) minmax(0, 1.07fr);
    align-items: center;
    gap: clamp(44px, 5.6vw, 76px);
  }

  .cc-about__visual {
    position: relative;
    min-width: 0;
  }

  .cc-about__visual-card {
    position: relative;
    min-height: 520px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 34px;
    background:
      radial-gradient(circle at 84% 11%, rgba(255, 255, 255, 0.22), transparent 28%),
      radial-gradient(circle at 2% 96%, rgba(255, 255, 255, 0.14), transparent 31%),
      linear-gradient(145deg, #ff2a37 0%, var(--red) 41%, var(--red-deep) 100%);
    box-shadow:
      0 30px 74px rgba(154, 9, 20, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.34);
    color: #ffffff;
  }

  .cc-about__visual-card::before {
    content: "";
    position: absolute;
    top: -105px;
    right: -84px;
    width: 288px;
    height: 288px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    box-shadow:
      0 0 0 34px rgba(255, 255, 255, 0.045),
      0 0 0 68px rgba(255, 255, 255, 0.03);
  }

  .cc-about__visual-card::after {
    content: "";
    position: absolute;
    right: 18px;
    bottom: 12px;
    width: 126px;
    height: 126px;
    opacity: 0.22;
    background-image: radial-gradient(#ffffff 1.3px, transparent 1.3px);
    background-size: 13px 13px;
  }

  .cc-about__visual-content {
    position: relative;
    z-index: 2;
    min-height: 520px;
    padding: 30px;
    display: flex;
    flex-direction: column;
  }

  .cc-about__brand-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }

  .cc-about__brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .cc-about__brand-icon {
    width: 37px;
    height: 37px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
  }

  .cc-about__brand-icon svg {
    width: 21px;
    height: 21px;
  }

  .cc-about__india {
    min-height: 34px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.13);
    color: rgba(255, 255, 255, 0.94);
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    backdrop-filter: blur(8px);
  }

  .cc-about__india-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.13);
  }

  .cc-about__visual-main {
    margin-top: 55px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 23px;
  }

  .cc-about__ten {
    color: #ffffff;
    font-size: clamp(84px, 8vw, 118px);
    font-weight: 900;
    line-height: 0.78;
    letter-spacing: -0.075em;
    text-shadow: 0 14px 34px rgba(104, 0, 8, 0.18);
  }

  .cc-about__years {
    padding-left: 22px;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
  }

  .cc-about__years strong {
    display: block;
    color: #ffffff;
    font-size: clamp(24px, 2.3vw, 32px);
    font-weight: 850;
    line-height: 1.05;
    letter-spacing: -0.035em;
  }

  .cc-about__years span {
    display: block;
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.76);
    font-size: 12px;
    line-height: 1.5;
  }

  .cc-about__visual-line {
    width: 100%;
    height: 1px;
    margin: 30px 0 21px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.46), transparent);
  }

  .cc-about__visual-label {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .cc-about__visual-title {
    max-width: 370px;
    margin: 10px 0 0;
    color: #ffffff;
    font-size: clamp(25px, 2.3vw, 34px);
    font-weight: 850;
    line-height: 1.13;
    letter-spacing: -0.038em;
    text-wrap: balance;
  }

  .cc-about__service-pills {
    margin: auto 0 0;
    padding: 24px 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
  }

  .cc-about__service-pills li {
    min-height: 32px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.23);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.92);
    font-size: 10px;
    font-weight: 750;
    letter-spacing: 0.025em;
    backdrop-filter: blur(8px);
  }

  .cc-about__content {
    position: relative;
    z-index: 2;
    min-width: 0;
  }

  .cc-about__eyebrow {
    width: fit-content;
    margin: 0 0 17px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--red-dark);
    font-size: 12px;
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0.17em;
    text-transform: uppercase;
  }

  .cc-about__eyebrow::before {
    content: "";
    width: 30px;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--red), #ff6872);
  }

  .cc-about__title {
    max-width: 610px;
    margin: 0;
    color: var(--ink);
    font-size: clamp(38px, 3.5vw, 52px);
    font-weight: 850;
    line-height: 1.08;
    letter-spacing: -0.043em;
    text-wrap: balance;
  }

  .cc-about__title span {
    color: var(--red);
  }

  .cc-about__copy {
    max-width: 625px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: clamp(15px, 1.15vw, 17px);
    line-height: 1.74;
  }

  .cc-about__copy strong {
    color: var(--ink);
    font-weight: 800;
  }

  .cc-about__points {
    margin: 26px 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 11px;
    list-style: none;
  }

  .cc-about__point {
    min-height: 64px;
    padding: 12px 13px;
    display: flex;
    align-items: center;
    gap: 11px;
    border: 1px solid rgba(245, 27, 40, 0.11);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0 10px 30px rgba(116, 16, 26, 0.05);
    transition:
      transform 200ms ease,
      border-color 200ms ease,
      box-shadow 200ms ease;
  }

  .cc-about__point:hover {
    transform: translateY(-3px);
    border-color: rgba(245, 27, 40, 0.27);
    box-shadow: 0 15px 34px rgba(116, 16, 26, 0.09);
  }

  .cc-about__point-icon {
    flex: 0 0 38px;
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    background: var(--pink);
    color: var(--red);
  }

  .cc-about__point-icon svg {
    width: 19px;
    height: 19px;
  }

  .cc-about__point strong {
    display: block;
    color: var(--ink);
    font-size: 12px;
    font-weight: 820;
    line-height: 1.3;
  }

  .cc-about__location {
    margin: 24px 0 0;
    padding: 13px 15px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    border-left: 3px solid var(--red);
    border-radius: 0 12px 12px 0;
    background: linear-gradient(90deg, rgba(245, 27, 40, 0.075), transparent);
    color: #666f7e;
    font-size: 12px;
    line-height: 1.55;
  }

  .cc-about__location svg {
    flex: 0 0 17px;
    width: 17px;
    height: 17px;
    margin-top: 1px;
    color: var(--red);
  }

  .cc-about__actions {
    margin-top: 27px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .cc-about__button {
    min-height: 50px;
    padding: 0 21px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 850;
    line-height: 1;
    text-decoration: none;
    transition:
      transform 210ms ease,
      box-shadow 210ms ease,
      background-color 210ms ease,
      border-color 210ms ease;
  }

  .cc-about__button svg {
    width: 17px;
    height: 17px;
    transition: transform 210ms ease;
  }

  .cc-about__button--primary {
    background: linear-gradient(135deg, #ff2b38, var(--red-dark));
    color: #ffffff;
    box-shadow: 0 14px 30px rgba(245, 27, 40, 0.24);
  }

  .cc-about__button--primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 36px rgba(245, 27, 40, 0.33);
  }

  .cc-about__button--primary:hover svg {
    transform: translateX(3px);
  }

  .cc-about__button--secondary {
    border-color: rgba(245, 27, 40, 0.2);
    background: rgba(255, 255, 255, 0.82);
    color: var(--red-dark);
  }

  .cc-about__button--secondary:hover {
    transform: translateY(-3px);
    border-color: rgba(245, 27, 40, 0.42);
    background: #ffffff;
    box-shadow: 0 13px 28px rgba(116, 16, 26, 0.09);
  }

  @keyframes ccAboutReveal {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @supports (animation-timeline: view()) {
    .cc-about__reveal {
      animation: ccAboutReveal linear both;
      animation-timeline: view();
      animation-range: entry 7% cover 27%;
    }
  }

  @media (max-width: 1040px) {
    .cc-about__container {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 42px;
    }

    .cc-about__visual-card,
    .cc-about__visual-content {
      min-height: 500px;
    }

    .cc-about__visual-main {
      gap: 17px;
    }

  }

  @media (max-width: 900px) {
    .cc-about__container {
      max-width: 720px;
      grid-template-columns: 1fr;
      gap: 52px;
    }

    .cc-about__content {
      order: 1;
      text-align: center;
    }

    .cc-about__visual {
      order: 2;
      width: min(100%, 590px);
      margin-inline: auto;
    }

    .cc-about__eyebrow {
      margin-inline: auto;
    }

    .cc-about__title,
    .cc-about__copy {
      margin-inline: auto;
    }

    .cc-about__location {
      text-align: left;
    }

    .cc-about__actions {
      justify-content: center;
    }
  }

  @media (max-width: 600px) {
    .cc-about {
      padding-inline: 15px;
    }

    .cc-about__title {
      font-size: clamp(34px, 10vw, 43px);
    }

    .cc-about__copy {
      font-size: 15px;
      line-height: 1.68;
    }

    .cc-about__points {
      grid-template-columns: 1fr;
    }

    .cc-about__actions {
      width: 100%;
      flex-direction: column;
    }

    .cc-about__button {
      width: 100%;
    }

    .cc-about__visual-card,
    .cc-about__visual-content {
      min-height: 492px;
    }

    .cc-about__visual-card {
      border-radius: 27px;
    }

    .cc-about__visual-content {
      padding: 23px;
    }

    .cc-about__india {
      font-size: 9px;
    }

    .cc-about__visual-main {
      margin-top: 48px;
    }

    .cc-about__ten {
      font-size: 82px;
    }

    .cc-about__years {
      padding-left: 16px;
    }

    .cc-about__years strong {
      font-size: 24px;
    }

  }

  @media (max-width: 390px) {
    .cc-about__brand {
      font-size: 10px;
    }

    .cc-about__brand-icon {
      width: 34px;
      height: 34px;
    }

    .cc-about__visual-main {
      grid-template-columns: 1fr;
      gap: 19px;
    }

    .cc-about__years {
      padding: 14px 0 0;
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-left: 0;
    }

    .cc-about__visual-title {
      font-size: 25px;
    }

    .cc-about__service-pills li:nth-child(n + 5) {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cc-about *,
    .cc-about *::before,
    .cc-about *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default function WhoWeAreSection() {
  return (
    <section
      className="cc-about"
      id="who-we-are"
      aria-labelledby="who-we-are-title"
    >
      <div className="cc-about__container">
        <div className="cc-about__visual cc-about__reveal">
          <div className="cc-about__visual-card">
            <div className="cc-about__visual-content">
              <div className="cc-about__brand-row">
                <span className="cc-about__brand">
                  <span className="cc-about__brand-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 11 9-8 9 8" />
                      <path d="M5 10v10h14V10M9 20v-6h6v6" />
                    </svg>
                  </span>
                  City Coolies
                </span>

                <span className="cc-about__india">
                  <span className="cc-about__india-dot" aria-hidden="true" />
                  Across India
                </span>
              </div>

              <div className="cc-about__visual-main">
                <span className="cc-about__ten">10</span>
                <div className="cc-about__years">
                  <strong>
                    Years of
                    <br />
                    experience
                  </strong>
                  <span>Professional service. Trusted results.</span>
                </div>
              </div>

              <div className="cc-about__visual-line" aria-hidden="true" />

              <p className="cc-about__visual-label">Complete property care</p>
              <p className="cc-about__visual-title">
                One reliable company for every property need.
              </p>

              <ul
                className="cc-about__service-pills"
                aria-label="City Coolies service categories"
              >
                <li>Cleaning</li>
                <li>Renovation</li>
                <li>Electrical</li>
                <li>Plumbing</li>
                <li>Painting</li>
                <li>Maintenance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="cc-about__content cc-about__reveal">
          <p className="cc-about__eyebrow">Who We Are</p>

          <h2 className="cc-about__title" id="who-we-are-title">
            Your property deserves <span>professional care.</span>
          </h2>

          <p className="cc-about__copy">
            <strong>City Coolies Pvt. Ltd.</strong> is a professional property
            care and maintenance company based in Sholinganallur, Chennai. For
            10 years, we have supported homes, apartments, hotels, schools,
            offices, businesses and industrial properties across India.
          </p>

          <p className="cc-about__copy">
            Our coordinated teams handle deep cleaning, renovation, electrical,
            plumbing, painting, civil maintenance, appliance repair, carpentry,
            interiors, moving, pest control, fabrication, landscaping, spa and
            salon services, and complete property maintenance—all through one
            dependable company.
          </p>

          <ul
            className="cc-about__points"
            aria-label="City Coolies service strengths"
          >
            <li className="cc-about__point">
              <span className="cc-about__point-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="m17 11 2 2 4-4" />
                </svg>
              </span>
              <strong>Skilled service teams</strong>
            </li>

            <li className="cc-about__point">
              <span className="cc-about__point-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
                  <path d="M17 14v6M14 17h6" />
                </svg>
              </span>
              <strong>Complete service range</strong>
            </li>

            <li className="cc-about__point">
              <span className="cc-about__point-icon" aria-hidden="true">
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
              <strong>Clear communication</strong>
            </li>

            <li className="cc-about__point">
              <span className="cc-about__point-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <strong>Quality-focused work</strong>
            </li>
          </ul>

          <p className="cc-about__location">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            No. 117, Village High Road, Sholinganallur, Chennai – 600119
          </p>

          <div className="cc-about__actions">
            <Link
              className="cc-about__button cc-about__button--primary"
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
              className="cc-about__button cc-about__button--secondary"
              href="tel:+918693986939"
              aria-label="Call City Coolies at plus 91 86939 86939"
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
              +91 86939 86939
            </a>
          </div>
        </div>
      </div>

      <style>{WHO_WE_ARE_STYLES}</style>
    </section>
  );
}
