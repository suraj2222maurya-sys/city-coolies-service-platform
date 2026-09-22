"use client";

import Image from "next/image";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";

import {
  COMMERCIAL_CLEANING_SERVICES,
  COMMERCIAL_SITE_SURVEY_FEE,
  type CommercialCleaningService,
} from "@/lib/services/commercialCleaningCatalog";

const FEATURED_SERVICE_ID = "office-corporate-deep-cleaning"

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.6 2.6L16.5 9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.8 20 6v5.8c0 5-3.2 8.2-8 10.4-4.8-2.2-8-5.4-8-10.4V6l8-3.2Z" />
      <path d="m8.7 12 2.1 2.1 4.7-5" />
    </svg>
  );
}

function EquipmentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.7v2M12 19.3v2M2.7 12h2M19.3 12h2" />
      <path d="m5.4 5.4 1.4 1.4M17.2 17.2l1.4 1.4" />
      <path d="m18.6 5.4-1.4 1.4M6.8 17.2l-1.4 1.4" />
      <circle cx="12" cy="12" r="7.2" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6.5h14.5A1.5 1.5 0 0 1 20 8v11H5.5A2.5 2.5 0 0 1 3 16.5V7a3 3 0 0 1 3-3h11" />
      <path d="M15 11h6v5h-6a2.5 2.5 0 0 1 0-5Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" />
      <path d="M9 8.5c.5 2.7 2 4.2 4.7 4.9" />
    </svg>
  );
}

function ServiceImage({
  service,
  priority = false,
}: {
  service: CommercialCleaningService;
  priority?: boolean;
}) {
  return (
    <Image
      className="cc-commercial__image"
      src={service.image}
      alt={`City Coolies ${service.name} service`}
      fill
      priority={priority}
      sizes={
        priority
          ? "(max-width: 1100px) calc(100vw - 32px), 42vw"
          : "(max-width: 760px) calc(100vw - 32px), 250px"
      }
    />
  );
}
function CommercialBookingControl({
  service,
  featured = false,
}: {
  service: CommercialCleaningService;
  featured?: boolean;
}) {
  const siteSurveyLabel = `₹${COMMERCIAL_SITE_SURVEY_FEE.toLocaleString(
    "en-IN",
  )}`;

  return (
    <div
      className={
        featured
          ? "cc-commercial__booking-control cc-commercial__booking-control--featured"
          : "cc-commercial__booking-control"
      }
    >
      <div className="cc-commercial__calculation">
        <span>Site survey charge</span>

        <strong>{siteSurveyLabel}</strong>

        <small>
          Cleaning starts from ₹5 / sq. ft. Final price confirmed after inspection.
        </small>
      </div>

      <ServiceBookingModal
        packageId="commercial-cleaning-plan"
        serviceName={`${service.name} - Site Survey`}
        originalPrice={COMMERCIAL_SITE_SURVEY_FEE}
        offerPrice={COMMERCIAL_SITE_SURVEY_FEE}
        triggerLabel={featured ? "Book ₹500 Site Survey" : "Book Survey"}
        fullPayment
        customServices={[
          {
            id: service.id,
            name: service.name,
            quantity: 1,
            unitPrice: COMMERCIAL_SITE_SURVEY_FEE,
            lineTotal: COMMERCIAL_SITE_SURVEY_FEE,
          },
        ]}
      />
    </div>
  );
}

export default function CommercialCleaningSection() {
  const featuredService =
    COMMERCIAL_CLEANING_SERVICES.find(
      (service) => service.id === FEATURED_SERVICE_ID,
    )!;

  const secondaryServices =
    COMMERCIAL_CLEANING_SERVICES.filter(
      (service) => service.id !== FEATURED_SERVICE_ID,
    );

 

  return (
    <section
      className="cc-commercial"
      aria-labelledby="commercial-cleaning-title"
    >
      <div className="cc-commercial__container">
        <header className="cc-commercial__header">
          <div>
            <p className="cc-commercial__eyebrow">
              Commercial Cleaning
            </p>

            <h2
              id="commercial-cleaning-title"
              className="cc-commercial__title"
            >
              Premium care for every business space.
            </h2>

           <p className="cc-commercial__subtitle">
  Choose your commercial space and book a ₹500 site survey.
  Cleaning starts from ₹5 / sq. ft., with final pricing confirmed after inspection.
</p>
          </div>

          <div className="cc-commercial__trust">
            <span>
              <ShieldIcon />
              Verified commercial crew
            </span>

            <span>
              <EquipmentIcon />
              Professional equipment
            </span>
          </div>
        </header>

        <div className="cc-commercial__marketplace">
          <article className="cc-commercial__featured">
            <div className="cc-commercial__featured-media">
              <ServiceImage
                service={featuredService}
                priority
              />

              <span className="cc-commercial__popular">
                ★ Most Booked
              </span>
            </div>

            <div className="cc-commercial__featured-content">
              <h3>{featuredService.name}</h3>

              <p>{featuredService.description}</p>

              <div className="cc-commercial__meta">
                <span>
                  ★ {featuredService.rating}
                </span>

                <span>
                  (
                  {featuredService.reviewCount.toLocaleString(
                    "en-IN",
                  )}
                  )
                </span>

              <span>₹500 site survey</span>

                <span>{featuredService.duration}</span>

                <span>4+ professionals</span>
              </div>

              <ul className="cc-commercial__includes">
                {featuredService.includes.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>

             <CommercialBookingControl
  service={featuredService}
  featured
/>
            </div>
          </article>

          <div className="cc-commercial__services">
            <h3>Choose by business type</h3>

            <div className="cc-commercial__service-grid">
              {secondaryServices.map((service) => (
                <article
                  className="cc-commercial__service-card"
                  key={service.id}
                >
                  <div className="cc-commercial__service-media">
                    <ServiceImage service={service} />
                  </div>

                  <div className="cc-commercial__service-content">
                    <h4>{service.name}</h4>

                    <p>{service.description}</p>

                    <div className="cc-commercial__card-meta">
                      <span>
                        ★ {service.rating}
                      </span>

                    <span>
  Starts from ₹5 / sq. ft.
</span>
                    </div>

                  <CommercialBookingControl
  service={service}
/>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div
          className="cc-commercial__assurance"
          aria-label="Commercial booking benefits"
        >
          <span>
            <ShieldIcon />
           <strong>₹500 Site Survey</strong>
          </span>

          <span>
            <WalletIcon />
           <strong>
  Full ₹500 Online Payment
</strong>
          </span>

          <span>
            <WhatsAppIcon />
            <strong>Easy WhatsApp confirmation</strong>
          </span>
        </div>
      </div>

      <style>{COMMERCIAL_CLEANING_STYLES}</style>
    </section>
  );
}

const COMMERCIAL_CLEANING_STYLES = `
  .cc-commercial {
    display: none;
    padding: 20px 0 60px;
    color: #171922;
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(242, 31, 47, 0.075),
        transparent 32%
      ),
      linear-gradient(
        180deg,
        #ffffff 0%,
        #fff8fa 100%
      );
  }

  #cc-category-commercial:checked
    ~ .cc-deep-hero
    label[for="cc-category-commercial"] {
    border-color: #f21f2f;
    color: #e81929;
    background: #fff7f9;
    box-shadow: 0 10px 27px rgba(239, 31, 48, 0.1);
  }

  #cc-category-commercial:checked ~ .cc-full-home,
  #cc-category-commercial:checked ~ .cc-kitchen,
  #cc-category-commercial:checked ~ .cc-bathroom,
  #cc-category-commercial:checked ~ .cc-industrial {
    display: none;
  }

  #cc-category-commercial:checked ~ .cc-commercial {
    display: block;
  }

  .cc-commercial * {
    box-sizing: border-box;
  }

  .cc-commercial__container {
    width: min(100% - 40px, 1680px);
    margin-inline: auto;
  }

  .cc-commercial__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding: 23px 25px;
    border: 1px solid rgba(242, 31, 47, 0.17);
    border-radius: 18px;
    background:
      linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.98),
        rgba(255, 239, 242, 0.94)
      );
    box-shadow: 0 13px 36px rgba(66, 28, 35, 0.06);
  }

  .cc-commercial__eyebrow {
    margin: 0 0 7px;
    color: #ed1b2b;
    font-size: 0.75rem;
    font-weight: 850;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .cc-commercial__title {
    max-width: 760px;
    margin: 0;
    color: #171922;
    font-size: clamp(1.9rem, 3vw, 3rem);
    font-weight: 820;
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  .cc-commercial__subtitle {
    max-width: 720px;
    margin: 10px 0 0;
    color: #626a78;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .cc-commercial__trust {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 9px;
  }

  .cc-commercial__trust span {
    display: inline-flex;
    min-height: 39px;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid rgba(242, 31, 47, 0.14);
    border-radius: 9px;
    color: #343943;
    background: #ffffff;
    font-size: 0.7rem;
    font-weight: 750;
  }

  .cc-commercial svg {
    width: 19px;
    height: 19px;
    flex: 0 0 auto;
    color: #f21f2f;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .cc-commercial__marketplace {
    display: grid;
    grid-template-columns:
      minmax(390px, 0.88fr)
      minmax(0, 1.32fr);
    align-items: start;
    gap: 18px;
    margin-top: 18px;
  }

  .cc-commercial__featured {
    min-width: 0;
    overflow: hidden;
    border: 1px solid rgba(242, 31, 47, 0.2);
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 15px 40px rgba(53, 27, 33, 0.075);
  }

  .cc-commercial__featured-media {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-bottom: 1px solid rgba(242, 31, 47, 0.12);
    background: #fff5f7;
  }

  .cc-commercial__image {
    object-fit: contain;
    object-position: center;
    transform: none !important;
  }

  .cc-commercial__popular {
    position: absolute;
    z-index: 2;
    top: 14px;
    left: 14px;
    padding: 7px 12px;
    border-radius: 999px;
    color: #ffffff;
    background: #f21f2f;
    box-shadow: 0 8px 20px rgba(242, 31, 47, 0.22);
    font-size: 0.7rem;
    font-weight: 850;
    text-transform: uppercase;
  }

  .cc-commercial__featured-content {
    padding: 19px;
  }

  .cc-commercial__featured-content h3 {
    margin: 0;
    color: #171922;
    font-size: clamp(1.55rem, 2vw, 2rem);
    font-weight: 850;
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  .cc-commercial__featured-content > p {
    margin: 8px 0 0;
    color: #626a78;
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .cc-commercial__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 7px 12px;
    margin-top: 11px;
    color: #59616f;
    font-size: 0.68rem;
  }

  .cc-commercial__meta span:first-child {
    color: #ed1b2b;
    font-weight: 850;
  }

  .cc-commercial__includes {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin: 13px 0 0;
    padding: 0;
    list-style: none;
  }

  .cc-commercial__includes li {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 9px;
    border: 1px solid rgba(242, 31, 47, 0.12);
    border-radius: 7px;
    color: #4a515e;
    background: #fff5f7;
    font-size: 0.64rem;
    font-weight: 700;
  }

  .cc-commercial__includes svg {
    width: 15px;
    height: 15px;
  }

  .cc-commercial__services {
    min-width: 0;
  }

  .cc-commercial__services > h3 {
    margin: 0 0 12px;
    color: #171922;
    font-size: 1rem;
    font-weight: 850;
  }

  .cc-commercial__service-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .cc-commercial__service-card {
    display: grid;
    min-width: 0;
    grid-template-columns: minmax(130px, 41%) minmax(0, 1fr);
    overflow: hidden;
    border: 1px solid rgba(45, 50, 60, 0.11);
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 9px 25px rgba(49, 29, 34, 0.05);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      transform 220ms ease;
  }

  .cc-commercial__service-card:hover {
    border-color: rgba(242, 31, 47, 0.26);
    box-shadow: 0 14px 32px rgba(72, 28, 37, 0.085);
    transform: translateY(-2px);
  }

  .cc-commercial__service-media {
    position: relative;
    min-height: 195px;
    overflow: hidden;
    border-right: 1px solid rgba(242, 31, 47, 0.09);
    background: #fff6f8;
  }

  .cc-commercial__service-content {
    display: flex;
    min-width: 0;
    flex-direction: column;
    padding: 12px;
  }

  .cc-commercial__service-content h4 {
    margin: 0;
    color: #171922;
    font-size: 0.87rem;
    font-weight: 850;
    line-height: 1.18;
  }

  .cc-commercial__service-content > p {
    display: -webkit-box;
    margin: 6px 0 8px;
    overflow: hidden;
    color: #68717e;
    font-size: 0.64rem;
    line-height: 1.4;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .cc-commercial__card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 9px;
  }

  .cc-commercial__card-meta span {
    padding: 4px 7px;
    border-radius: 6px;
    color: #4d5561;
    background: #fff1f3;
    font-size: 0.58rem;
    font-weight: 750;
  }

  .cc-commercial__card-meta span:first-child {
    color: #e71928;
  }

  .cc-commercial__booking-control {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 7px;
    margin-top: auto;
  }

  .cc-commercial__booking-control--featured {
    grid-template-columns:
      minmax(170px, 1fr)
      minmax(150px, 0.8fr);
    margin-top: 15px;
    padding: 13px;
    border: 1px solid rgba(242, 31, 47, 0.17);
    border-radius: 12px;
    background: #fff5f7;
  }

  .cc-commercial__quantity {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 4px;
  }

  .cc-commercial__quantity > span,
  .cc-commercial__calculation > span {
    color: #303641;
    font-size: 0.61rem;
    font-weight: 800;
  }

  .cc-commercial__quantity > div {
    display: flex;
    min-width: 0;
    height: 35px;
    overflow: hidden;
    border: 1px solid #d7dbe2;
    border-radius: 7px;
    background: #ffffff;
  }

  .cc-commercial__quantity > div:focus-within {
    border-color: #f21f2f;
    box-shadow: 0 0 0 3px rgba(242, 31, 47, 0.09);
  }

  .cc-commercial__quantity input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    padding: 8px;
    color: #171922;
    background: transparent;
    font: inherit;
    font-size: 0.67rem;
    font-weight: 750;
  }

  .cc-commercial__quantity small {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    padding: 0 7px;
    border-left: 1px solid #e0e3e8;
    color: #69717e;
    background: #fafbfc;
    font-size: 0.55rem;
    white-space: nowrap;
  }

  .cc-commercial__calculation {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 3px;
  }

  .cc-commercial__calculation strong {
    color: #171922;
    font-size: 0.76rem;
    line-height: 1.2;
  }

  .cc-commercial__calculation small {
    display: none;
    color: #747c89;
    font-size: 0.56rem;
  }

  .cc-commercial__booking-control--featured
    .cc-commercial__calculation small {
    display: block;
  }

  .cc-commercial__booking-control
    > .cc-booking-trigger,
  .cc-commercial__disabled-button {
    min-height: 35px;
    padding: 8px 12px;
    border: 1px solid #f21f2f;
    border-radius: 7px;
    color: #ffffff;
    background: #f21f2f;
    font: inherit;
    font-size: 0.66rem;
    font-weight: 850;
    white-space: nowrap;
    cursor: pointer;
  }

  .cc-commercial__booking-control
    > .cc-booking-trigger:hover {
    background: #d91827;
  }

  .cc-commercial__disabled-button:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }

  .cc-commercial__booking-control--featured
    > .cc-booking-trigger,
  .cc-commercial__booking-control--featured
    > .cc-commercial__disabled-button {
    grid-column: 1 / -1;
    width: 100%;
    min-height: 42px;
    font-size: 0.75rem;
  }

  .cc-commercial__assurance {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 17px;
    overflow: hidden;
    border: 1px solid rgba(242, 31, 47, 0.19);
    border-radius: 14px;
    background:
      linear-gradient(
        90deg,
        #ffedf0 0%,
        #fff9fa 50%,
        #ffedf0 100%
      );
    box-shadow: 0 10px 28px rgba(76, 27, 35, 0.06);
  }

  .cc-commercial__assurance span {
    display: flex;
    min-height: 72px;
    align-items: center;
    justify-content: center;
    gap: 11px;
    padding: 14px 18px;
    color: #292d36;
    font-size: 0.73rem;
  }

  .cc-commercial__assurance span + span {
    border-left: 1px solid rgba(242, 31, 47, 0.14);
  }

  .cc-commercial__assurance svg {
    width: 38px;
    height: 38px;
    padding: 9px;
    border: 1px solid rgba(242, 31, 47, 0.14);
    border-radius: 50%;
    background: #ffffff;
  }

  @media (max-width: 1180px) {
    .cc-commercial__marketplace {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 820px) {
    .cc-commercial__header {
      align-items: flex-start;
      flex-direction: column;
    }

    .cc-commercial__trust {
      justify-content: flex-start;
    }

    .cc-commercial__service-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 760px) {
    .cc-commercial {
      padding: 14px 0 42px;
    }

    .cc-commercial__container {
      width: min(100% - 24px, 680px);
    }

    .cc-commercial__header {
      padding: 18px 16px;
      border-radius: 15px;
    }

    .cc-commercial__featured {
      border-radius: 15px;
    }

    .cc-commercial__service-card {
      grid-template-columns: minmax(118px, 39%) minmax(0, 1fr);
    }

    .cc-commercial__booking-control--featured {
      grid-template-columns: 1fr;
    }

    .cc-commercial__assurance {
      grid-template-columns: 1fr;
    }

    .cc-commercial__assurance span {
      justify-content: flex-start;
    }

    .cc-commercial__assurance span + span {
      border-top: 1px solid rgba(242, 31, 47, 0.14);
      border-left: 0;
    }
  }

  @media (max-width: 480px) {
    .cc-commercial__service-card {
      grid-template-columns: 1fr;
    }

    .cc-commercial__service-media {
      min-height: 210px;
      border-right: 0;
      border-bottom: 1px solid rgba(242, 31, 47, 0.09);
    }

    .cc-commercial__booking-control {
      grid-template-columns: 1fr;
    }

    .cc-commercial__booking-control
      > .cc-booking-trigger,
    .cc-commercial__disabled-button {
      width: 100%;
    }
  }
`;


