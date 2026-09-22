"use client";

import Image from "next/image";


import ServiceBookingModal from "@/components/booking/ServiceBookingModal";

import {
  INDUSTRIAL_CLEANING_SERVICES,
  INDUSTRIAL_SITE_SURVEY_FEE,
  type IndustrialCleaningService,
} from "@/lib/services/industrialCleaningCatalog";

const FEATURED_SERVICE_ID = "factory-plant-deep-cleaning";

function ServiceImage({
  service,
  priority = false,
}: {
  service: IndustrialCleaningService;
  priority?: boolean;
}) {
  return (
    <Image
      className="cc-industrial__image"
      src={service.image}
      alt={`City Coolies ${service.name}`}
      fill
      priority={priority}
      sizes={
        priority
          ? "(max-width: 1020px) calc(100vw - 32px), 40vw"
          : "(max-width: 760px) 42vw, 190px"
      }
    />
  );
}

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
      <path d="M12 2.7v2M12 19.3v2M2.7 12h2M19.3 12h2M5.4 5.4l1.4 1.4M17.2 17.2l1.4 1.4M18.6 5.4l-1.4 1.4M6.8 17.2l-1.4 1.4" />
      <circle cx="12" cy="12" r="7.2" />
    </svg>
  );
}

function RupeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 7h8M8 10h8M9 7c4 0 4 6 0 6l6 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function CrewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3.5 19c.5-4 2.3-6 5.5-6s5 2 5.5 6M14 14c3.5-.8 5.5.9 6.2 4" />
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

export default function IndustrialCleaningSection() {
  const featuredService =
    INDUSTRIAL_CLEANING_SERVICES.find(
      (service) => service.id === FEATURED_SERVICE_ID,
    ) ?? INDUSTRIAL_CLEANING_SERVICES[0];

  const secondaryServices = INDUSTRIAL_CLEANING_SERVICES.filter(
    (service) => service.id !== featuredService.id,
  );

 const surveyFeeLabel = `Rs. ${INDUSTRIAL_SITE_SURVEY_FEE.toLocaleString(
  "en-IN",
)}`;

  return (
    <section className="cc-industrial" aria-labelledby="industrial-title">
      <div className="cc-industrial__container">
        <header className="cc-industrial__header">
          <div>
            <p className="cc-industrial__eyebrow">Industrial Cleaning</p>
            <h2 id="industrial-title" className="cc-industrial__title">
              Powerful cleaning for demanding spaces.
            </h2>
            <p className="cc-industrial__subtitle">
            Choose your industrial cleaning requirement and book a Rs. 500 site survey. Final cleaning price is confirmed after inspection.
            </p>

            <div className="cc-industrial__benefits" aria-label="Service benefits">
              <span><ShieldIcon />Verified industrial crew</span>
              <span><EquipmentIcon />Professional equipment</span>
            <span><RupeeIcon />Final quote after inspection</span>
            </div>
          </div>

<div className="cc-industrial__cart" aria-live="polite">
  <BagIcon />
  <strong>{surveyFeeLabel}</strong>
  <span>site survey</span>
</div>
        </header>

        <div className="cc-industrial__marketplace">
          <article className="cc-industrial__featured">
            <div className="cc-industrial__featured-media">
              <ServiceImage service={featuredService} priority />
             <span className="cc-industrial__most-booked">★ Most Booked</span>
            </div>

            <div className="cc-industrial__featured-content">
              <h3>{featuredService.name}</h3>

              <div className="cc-industrial__meta">
                <span className="cc-industrial__rating">
                 <b>★</b> {featuredService.rating} ({featuredService.reviewCount.toLocaleString("en-IN")})
                </span>
               <span><ShieldIcon />Rs. 500 site survey</span>
                <span><ClockIcon />{featuredService.duration}</span>
                <span><CrewIcon />4+ professionals</span>
              </div>

              <div className="cc-industrial__includes">
                {featuredService.includes.map((item) => (
                  <span key={item}><CheckIcon />{item}</span>
                ))}
              </div>

             <div className="cc-industrial__estimate-box">
  <div className="cc-industrial__estimate-total">
    <span>Site survey charge</span>
    <strong>{surveyFeeLabel}</strong>
    <small>
      Final cleaning price will be confirmed after site inspection.
    </small>
  </div>

  <div className="cc-industrial__booking">
    <ServiceBookingModal
      packageId="industrial-cleaning-plan"
      serviceName={`${featuredService.name} - Site Survey`}
      originalPrice={INDUSTRIAL_SITE_SURVEY_FEE}
      offerPrice={INDUSTRIAL_SITE_SURVEY_FEE}
      triggerLabel="Book Rs. 500 Site Survey"
      fullPayment
      customServices={[
        {
          id: featuredService.id,
          name: featuredService.name,
          quantity: 1,
          unitPrice: INDUSTRIAL_SITE_SURVEY_FEE,
          lineTotal: INDUSTRIAL_SITE_SURVEY_FEE,
        },
      ]}
    />
  </div>
</div>
                     
            </div>
          </article>

          <div className="cc-industrial__services-column">
            <h3 className="cc-industrial__choice-title">Choose by need</h3>
<div className="cc-industrial__service-grid">
{secondaryServices.map((service) => (
  <article
    className="cc-industrial__service-card"
    key={service.id}
  >
    <div className="cc-industrial__service-media">
      <ServiceImage service={service} />
    </div>

    <div className="cc-industrial__service-content">
      <h4>{service.name}</h4>

      <p>{service.description}</p>

      <span className="cc-industrial__pricing-badge">
        Site Survey
      </span>

      <div className="cc-industrial__service-footer">
        <div>
          <strong>{surveyFeeLabel}</strong>
          <small>Final quote after inspection</small>
        </div>

        <div className="cc-industrial__service-controls">
          <ServiceBookingModal
            packageId="industrial-cleaning-plan"
            serviceName={`${service.name} - Site Survey`}
            originalPrice={INDUSTRIAL_SITE_SURVEY_FEE}
            offerPrice={INDUSTRIAL_SITE_SURVEY_FEE}
            triggerLabel="Book Survey"
            fullPayment
            customServices={[
              {
                id: service.id,
                name: service.name,
                quantity: 1,
                unitPrice: INDUSTRIAL_SITE_SURVEY_FEE,
                lineTotal: INDUSTRIAL_SITE_SURVEY_FEE,
              },
            ]}
          />
        </div>
      </div>
    </div>
  </article>
))}

            </div>
          </div>
        </div>

        <p className="cc-industrial__estimate-note">
Rs. 500 site survey charge • Final cleaning price confirmed after site inspection.
        </p>

       
        <div className="cc-industrial__assurance" aria-label="Booking assurances">
            <span><ShieldIcon />Rs. 500 Site Survey</span>
            <span><WalletIcon />Full Rs. 500 Online Payment</span>
          <span><WhatsAppIcon />Easy WhatsApp confirmation</span>
        </div>
      </div>

      <style>{INDUSTRIAL_CLEANING_STYLES}</style>
    </section>
  );
}

const INDUSTRIAL_CLEANING_STYLES = `
  .cc-industrial {
    display: none;
    padding: 18px 0 60px;
    color: #151821;
    background: #ffffff;
  }

  #cc-category-industrial:checked ~ .cc-full-home,
  #cc-category-industrial:checked ~ .cc-kitchen,
  #cc-category-industrial:checked ~ .cc-bathroom {
    display: none;
  }

  #cc-category-industrial:checked ~ .cc-industrial {
    display: block;
  }

  .cc-industrial * {
    box-sizing: border-box;
  }

  .cc-industrial__container {
    width: min(100% - 32px, 1680px);
    margin-inline: auto;
  }

  .cc-industrial__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding: 22px 24px 18px;
    overflow: hidden;
    border: 1px solid rgba(239, 31, 48, 0.13);
    border-radius: 16px;
    background:
      radial-gradient(circle at 88% 115%, rgba(242, 31, 47, 0.11), transparent 37%),
      linear-gradient(110deg, #fffdfd 0%, #fff4f6 100%);
  }

  .cc-industrial__eyebrow {
    margin: 0 0 5px;
    color: #ef1f30;
    font-size: 0.78rem;
    font-weight: 850;
    text-transform: uppercase;
  }

  .cc-industrial__title {
    margin: 0;
    font-size: clamp(1.65rem, 2.3vw, 2.55rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  .cc-industrial__subtitle {
    margin: 7px 0 0;
    color: #5f6571;
    font-size: 0.94rem;
  }

  .cc-industrial__benefits {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 14px;
  }

  .cc-industrial__benefits span,
  .cc-industrial__assurance span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .cc-industrial__benefits span {
    padding: 8px 11px;
    border: 1px solid rgba(239, 31, 48, 0.13);
    border-radius: 8px;
    color: #424854;
    background: rgba(255, 255, 255, 0.75);
    font-size: 0.77rem;
  }

  .cc-industrial svg {
    width: 20px;
    height: 20px;
    flex: 0 0 auto;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .cc-industrial__benefits svg,
  .cc-industrial__cart svg {
    color: #f21f2f;
  }

  .cc-industrial__cart {
    display: flex;
    min-width: 166px;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 15px 17px;
    border: 1px solid #dadde3;
    border-radius: 9px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(28, 31, 38, 0.06);
    font-size: 0.83rem;
  }

  .cc-industrial__cart strong {
    color: #ef1f30;
  }

  .cc-industrial__marketplace {
    display: grid;
    grid-template-columns: minmax(380px, 0.84fr) minmax(0, 1.26fr);
    gap: 16px;
    margin-top: 16px;
  }

  .cc-industrial__featured,
  .cc-industrial__service-card {
    overflow: hidden;
    border: 1px solid #e1e3e8;
    background: #ffffff;
  }

  .cc-industrial__featured {
    border-radius: 12px;
  }

  .cc-industrial__featured-media,
  .cc-industrial__service-media,
  .cc-industrial__custom-media {
    position: relative;
    overflow: hidden;
    background: #f4f5f7;
  }

  .cc-industrial__featured-media {
    width: 100%;
    height: clamp(245px, 24vw, 330px);
    border-bottom: 1px solid #e1e3e8;
  }

  .cc-industrial__image {
    object-fit: contain;
    object-position: center;
  }

  .cc-industrial__most-booked {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 1;
    padding: 7px 13px;
    border-radius: 999px;
    color: #ffffff;
    background: #ef1f30;
    font-size: 0.75rem;
    font-weight: 850;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .cc-industrial__featured-content {
    padding: 15px 18px 16px;
  }

  .cc-industrial__featured-content h3 {
    margin: 0;
    font-size: clamp(1.35rem, 1.8vw, 1.8rem);
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .cc-industrial__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 9px 18px;
    margin-top: 12px;
    color: #555c68;
    font-size: 0.78rem;
  }

  .cc-industrial__meta span,
  .cc-industrial__includes span,
  .cc-industrial__custom-copy span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .cc-industrial__meta svg,
  .cc-industrial__includes svg,
  .cc-industrial__custom-copy svg {
    width: 17px;
    height: 17px;
  }

  .cc-industrial__rating b {
    color: #f21f2f;
  }

  .cc-industrial__includes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .cc-industrial__includes span,
  .cc-industrial__custom-copy span {
    padding: 6px 10px;
    border: 1px solid rgba(239, 31, 48, 0.13);
    border-radius: 7px;
    color: #484f5b;
    background: #fff7f8;
    font-size: 0.74rem;
  }

  .cc-industrial__includes svg,
  .cc-industrial__custom-copy svg {
    color: #ef1f30;
  }

  .cc-industrial__estimate-box {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(150px, 0.85fr);
    gap: 12px 20px;
    margin-top: 13px;
    padding: 12px;
    border: 1px solid rgba(239, 31, 48, 0.22);
    border-radius: 9px;
    background: linear-gradient(135deg, #fff9fa, #fff3f5);
  }

  .cc-industrial__area-field,
  .cc-industrial__estimate-total {
    display: flex;
    flex-direction: column;
  }

  .cc-industrial__area-field strong,
  .cc-industrial__estimate-total > span {
    margin-bottom: 5px;
    font-size: 0.78rem;
    font-style: normal;
    font-weight: 750;
  }

  .cc-industrial__area-field > span {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    overflow: hidden;
    border: 1px solid #ced2d9;
    border-radius: 6px;
    background: #ffffff;
  }

  .cc-industrial__area-field input {
    min-width: 0;
    padding: 8px 10px;
    border: 0;
    outline: 0;
    color: #1e222b;
    background: transparent;
    font: inherit;
    font-weight: 700;
  }

  .cc-industrial__area-field > span small {
    display: grid;
    place-items: center;
    padding: 0 10px;
    border-left: 1px solid #d7dae0;
    color: #4d5360;
    font-size: 0.72rem;
  }

  .cc-industrial__area-field em,
  .cc-industrial__estimate-total small {
    margin-top: 5px;
    color: #555c68;
    font-size: 0.68rem;
    font-style: normal;
  }

  .cc-industrial__estimate-total strong {
    font-size: clamp(1.2rem, 1.6vw, 1.7rem);
    line-height: 1.1;
  }

  .cc-industrial__primary-button {
    grid-column: 1 / -1;
    width: 100%;
    padding: 10px 16px;
    border: 0;
    border-radius: 6px;
    color: #ffffff;
    background: linear-gradient(90deg, #e71928, #ff1428);
    box-shadow: 0 9px 18px rgba(231, 25, 40, 0.2);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 800;
    cursor: pointer;
  }

  .cc-industrial__booking {
    grid-column: 1 / -1;
  }

  .cc-industrial__booking .cc-booking-trigger {
    min-height: 44px;
    border: 0;
    border-radius: 6px;
    color: #ffffff;
    background: linear-gradient(90deg, #e71928, #ff1428);
    box-shadow: 0 9px 18px rgba(231, 25, 40, 0.2);
    font-size: 0.86rem;
  }

  .cc-industrial__booking .cc-booking-trigger:hover {
    color: #ffffff;
    background: linear-gradient(90deg, #d91424, #ef1022);
  }

  .cc-industrial__booking .cc-booking-trigger span {
    display: none;
  }

  .cc-industrial__primary-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .cc-industrial__choice-title {
    margin: 0 0 9px 5px;
    font-size: 1rem;
  }

  .cc-industrial__service-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .cc-industrial__service-card {
    display: grid;
    grid-template-columns: minmax(125px, 43%) minmax(0, 1fr);
    min-height: 150px;
    border-radius: 9px;
  }

  .cc-industrial__service-media {
    min-height: 150px;
    border-right: 1px solid #e1e3e8;
  }

  .cc-industrial__service-content {
    display: flex;
    min-width: 0;
    flex-direction: column;
    padding: 10px;
  }

  .cc-industrial__service-content h4 {
  margin: 0;
  color: #171922;
  font-size: 0.91rem;
  font-weight: 800;
  line-height: 1.17;
  letter-spacing: -0.015em;
}

  .cc-industrial__service-content p {
    display: -webkit-box;
    margin: 5px 0 7px;
    overflow: hidden;
    color: #666c77;
    font-size: 0.7rem;
    line-height: 1.35;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .cc-industrial__pricing-badge {
    align-self: flex-start;
    padding: 4px 8px;
    border: 1px solid #e2d9db;
    border-radius: 999px;
    color: #4f555f;
    background: #fff7f8;
    font-size: 0.64rem;
  }

  .cc-industrial__service-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    margin-top: auto;
  }

  .cc-industrial__service-footer > div {
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  .cc-industrial__service-footer strong {
    font-size: 0.7rem;
    line-height: 1.25;
  }

  .cc-industrial__service-footer small {
    margin-top: 3px;
    overflow: hidden;
    color: #777d87;
    font-size: 0.61rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cc-industrial__add-button,
  .cc-industrial__customize-button {
    border: 1px solid #f21f2f;
    border-radius: 7px;
    color: #e71928;
    background: #ffffff;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
  }
.cc-industrial__service-controls {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 7px;
}

.cc-industrial__quantity-field {
  display: flex;
  width: 105px;
  min-height: 34px;
  overflow: hidden;
  border: 1px solid #d9dde4;
  border-radius: 7px;
  background: #ffffff;
}

.cc-industrial__quantity-field:focus-within {
  border-color: #f21f2f;
  box-shadow: 0 0 0 3px rgba(242, 31, 47, 0.1);
}

.cc-industrial__quantity-field input {
  width: 55px;
  min-width: 0;
  border: 0;
  outline: 0;
  padding: 7px 6px;
  color: #171922;
  background: transparent;
  font: inherit;
  font-size: 0.7rem;
  font-weight: 750;
}

.cc-industrial__quantity-field span {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  border-left: 1px solid #e1e4e9;
  color: #68707d;
  background: #fafbfc;
  font-size: 0.55rem;
  white-space: nowrap;
}

.cc-industrial__add-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cc-industrial__service-controls .cc-booking-trigger {
  min-height: 34px;
  padding: 7px 12px;
  border: 1px solid #f21f2f;
  border-radius: 7px;
  color: #ffffff;
  background: #f21f2f;
  font: inherit;
  font-size: 0.73rem;
  font-weight: 800;
  cursor: pointer;
}

.cc-industrial__service-controls .cc-booking-trigger:hover {
  background: #dc1827;
}
  .cc-industrial__add-button {
    flex: 0 0 auto;
    padding: 7px 12px;
    font-size: 0.73rem;
  }

  .cc-industrial__add-button--selected {
    color: #ffffff;
    background: #ef1f30;
  }

  .cc-industrial__estimate-note {
    margin: 7px 2px 10px;
    color: #555c68;
    font-size: 0.69rem;
  }

  .cc-industrial__custom-plan {
    display: grid;
    grid-template-columns: minmax(260px, 36%) minmax(0, 1fr) 170px;
    align-items: center;
    min-height: 116px;
    overflow: hidden;
    border: 1px solid rgba(239, 31, 48, 0.35);
    border-radius: 10px;
    background: linear-gradient(100deg, #ffffff, #fff4f6);
  }

  .cc-industrial__custom-media {
    align-self: stretch;
    min-height: 116px;
    border-right: 1px solid rgba(239, 31, 48, 0.15);
  }

  .cc-industrial__custom-copy {
    padding: 13px 18px;
  }

  .cc-industrial__custom-copy h3 {
    margin: 0;
    font-size: clamp(1.2rem, 1.8vw, 1.75rem);
    letter-spacing: -0.025em;
  }

  .cc-industrial__custom-copy p {
    margin: 4px 0 7px;
    color: #606672;
    font-size: 0.79rem;
  }

  .cc-industrial__customize-button {
    min-width: 145px;
    margin-right: 22px;
    padding: 12px 18px;
    font-size: 0.8rem;
  }

.cc-industrial__assurance {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 16px;
  overflow: hidden;
  border: 1px solid rgba(242, 31, 47, 0.2);
  border-radius: 14px;
  background:
    linear-gradient(
      90deg,
      #ffedf0 0%,
      #fff8f9 50%,
      #ffedf0 100%
    );
  box-shadow: 0 10px 28px rgba(76, 27, 35, 0.06);
}

.cc-industrial__assurance span {
  justify-content: center;
  gap: 11px;
  min-height: 72px;
  padding: 14px 18px;
  color: #292d36;
  font-size: 0.76rem;
  font-weight: 750;
  line-height: 1.35;
  text-align: left;
}

.cc-industrial__assurance span > svg {
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  padding: 9px;
  border: 1px solid rgba(242, 31, 47, 0.14);
  border-radius: 50%;
  color: #f21f2f;
  background: #ffffff;
  box-shadow: 0 5px 14px rgba(242, 31, 47, 0.08);
}

.cc-industrial__assurance span + span {
  border-left: 1px solid rgba(242, 31, 47, 0.14);
}

  @media (max-width: 1180px) {
    .cc-industrial__marketplace {
      grid-template-columns: 1fr;
    }

    .cc-industrial__featured-media {
      height: clamp(280px, 50vw, 500px);
    }
  }

  @media (max-width: 760px) {
    .cc-industrial {
      padding-top: 12px;
    }

    .cc-industrial__container {
      width: min(100% - 24px, 680px);
    }

    .cc-industrial__header {
      align-items: stretch;
      flex-direction: column;
      padding: 18px 16px;
    }

    .cc-industrial__cart {
      align-self: flex-start;
    }

    .cc-industrial__service-grid,
    .cc-industrial__assurance {
      grid-template-columns: 1fr;
    }

    .cc-industrial__featured-media {
      height: 64vw;
      min-height: 220px;
      max-height: 380px;
    }

    .cc-industrial__service-card {
      grid-template-columns: minmax(112px, 39%) minmax(0, 1fr);
    }

    .cc-industrial__estimate-box {
      grid-template-columns: 1fr;
    }

    .cc-industrial__estimate-total,
    .cc-industrial__primary-button {
      grid-column: 1;
    }

    .cc-industrial__custom-plan {
      grid-template-columns: 1fr;
    }

    .cc-industrial__custom-media {
      min-height: 210px;
      border-right: 0;
      border-bottom: 1px solid rgba(239, 31, 48, 0.15);
    }

    .cc-industrial__customize-button {
      width: calc(100% - 32px);
      margin: 0 16px 16px;
    }

   .cc-industrial__assurance span + span {
  border-top: 1px solid rgba(242, 31, 47, 0.14);
  border-left: 0;
}
  }

  @media (max-width: 430px) {
    .cc-industrial__service-card {
      grid-template-columns: 1fr;
    }

    .cc-industrial__service-media {
      min-height: 210px;
      border-right: 0;
      border-bottom: 1px solid #e1e3e8;
    }
  }
`;

