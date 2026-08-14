import Image from "next/image";
import Link from "next/link";
const ALL_SERVICES_STYLES = `
  .cc-all-services {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-height: 720px;
    overflow: hidden;
    background:
      radial-gradient(
        circle at 8% 12%,
        rgba(242, 31, 47, 0.13),
        transparent 42%
      ),
      radial-gradient(
        circle at 92% 84%,
        rgba(255, 76, 92, 0.14),
        transparent 44%
      ),
      linear-gradient(
        145deg,
        #ffffff 0%,
        #fff7f8 48%,
        #ffe8ec 100%
      );
  }

  .cc-all-services::before {
    position: absolute;
    z-index: -2;
    top: -210px;
    right: -160px;
    width: 540px;
    height: 540px;
    border: 1px solid rgba(242, 31, 47, 0.11);
    border-radius: 50%;
    content: "";
    box-shadow:
      0 0 0 54px rgba(242, 31, 47, 0.025),
      0 0 0 108px rgba(242, 31, 47, 0.018);
    pointer-events: none;
  }

  .cc-all-services::after {
    position: absolute;
    z-index: -2;
    bottom: -270px;
    left: -190px;
    width: 590px;
    height: 590px;
    border: 1px solid rgba(242, 31, 47, 0.1);
    border-radius: 50%;
    content: "";
    box-shadow:
      0 0 0 62px rgba(242, 31, 47, 0.025),
      0 0 0 124px rgba(242, 31, 47, 0.016);
    pointer-events: none;
  }

  .cc-all-services__pattern {
    position: absolute;
    z-index: -1;
    inset: 0;
    opacity: 0.38;
    background-image: radial-gradient(
      circle,
      rgba(226, 22, 38, 0.15) 1px,
      transparent 1.5px
    );
    background-size: 28px 28px;
    mask-image: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.55) 20%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.55) 80%,
      transparent
    );
    pointer-events: none;
  }

  .cc-all-services__glow {
    position: absolute;
    z-index: -1;
    top: 48%;
    left: 50%;
    width: min(75vw, 1120px);
    height: 320px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.84);
    filter: blur(72px);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .cc-all-services__inner {
    position: relative;
    width: min(100% - 40px, 1680px);
    min-height: 720px;
    margin-inline: auto;
    padding: clamp(36px, 4vw, 52px) 0 clamp(72px, 8vw, 120px);
    box-sizing: border-box;
  }
.cc-all-services__header {
  width: min(100%, 920px);
  margin: 0 auto;
  text-align: center;
}

.cc-all-services__eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 18px;
  color: #e71928;
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.cc-all-services__eyebrow::before,
.cc-all-services__eyebrow::after {
  width: 32px;
  height: 2px;
  border-radius: 999px;
  content: "";
  background: linear-gradient(90deg, #ff6673, #e71928);
}

.cc-all-services__title {
  margin: 0;
  color: #171923;
  font-size: clamp(2.2rem, 3.5vw, 3.8rem);
  font-weight: 720;
  line-height: 1.02;
  letter-spacing: -0.052em;
  text-wrap: balance;
}

.cc-all-services__title-accent {
  color: #f21f2f;
}

.cc-all-services__description {
  max-width: 760px;
  margin: 24px auto 0;
  color: #5c6372;
  font-size: clamp(1rem, 1.25vw, 1.16rem);
  line-height: 1.75;
  text-wrap: balance;
}
  .cc-all-services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 332px));
  justify-content: start;
  gap: 28px;
  margin-top: 54px;
}

.cc-service-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 332px;
  height: 400px;
  overflow: hidden;
  border: 1px solid rgba(231, 25, 40, 0.13);
  border-radius: 26px;
  color: inherit;
  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.98),
      rgba(255, 246, 248, 0.98)
    );
  box-shadow:
    0 18px 45px rgba(42, 25, 29, 0.09),
    0 3px 10px rgba(231, 25, 40, 0.05);
  text-decoration: none;
  transition:
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 350ms ease,
    box-shadow 350ms ease;
}

.cc-service-card:hover {
  border-color: rgba(231, 25, 40, 0.3);
  box-shadow:
    0 26px 58px rgba(42, 25, 29, 0.14),
    0 8px 20px rgba(231, 25, 40, 0.1);
  transform: translateY(-8px);
}

.cc-service-card:focus-visible {
  outline: 3px solid rgba(242, 31, 47, 0.26);
  outline-offset: 5px;
}

.cc-service-card__media {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 205px;
  overflow: hidden;
  background: #ffecef;
}

.cc-service-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.cc-service-card:hover .cc-service-card__image {
  transform: scale(1.055);
}

.cc-service-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 21px 22px 20px;
}

.cc-service-card__title {
  margin: 0;
  color: #181a24;
  font-size: 1.38rem;
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.cc-service-card__description {
  margin: 10px 0 0;
  color: #626978;
  font-size: 0.88rem;
  line-height: 1.58;
}

.cc-service-card__action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  color: #e71928;
  font-size: 0.86rem;
  font-weight: 800;
}

.cc-service-card__arrow {
  transition: transform 250ms ease;
}

.cc-service-card:hover .cc-service-card__arrow {
  transform: translateX(5px);
}
  @media (max-width: 760px) {
    .cc-all-services,
    .cc-all-services__inner {
      min-height: 560px;
      .cc-all-services__grid {
  grid-template-columns: minmax(0, 332px);
  justify-content: center;
  gap: 22px;
  margin-top: 40px;
}

.cc-service-card {
  width: 100%;
  height: 400px;
}
    }

    .cc-all-services {
      background:
        radial-gradient(
          circle at 90% 8%,
          rgba(242, 31, 47, 0.13),
          transparent 38%
        ),
        linear-gradient(
          155deg,
          #ffffff 0%,
          #fff5f7 55%,
          #ffe6ea 100%
        );
    }

    .cc-all-services::before {
      top: -140px;
      right: -190px;
      width: 390px;
      height: 390px;
    }

    .cc-all-services::after {
      bottom: -190px;
      left: -180px;
      width: 410px;
      height: 410px;
    }

    .cc-all-services__pattern {
      opacity: 0.25;
      background-size: 24px 24px;
    }

    .cc-all-services__inner {
      width: min(100% - 32px, 680px);
      padding: 32px 0 64px;
    }
  }
`;

export default function AllServicesSection() {
  return (
    <section
      className="cc-all-services"
      aria-label="All City Coolies property services"
    >
      <div className="cc-all-services__pattern" aria-hidden="true" />
      <div className="cc-all-services__glow" aria-hidden="true" />

      <div className="cc-all-services__inner">
  <header className="cc-all-services__header">
    <p className="cc-all-services__eyebrow">Explore Our Services</p>

    <h2 className="cc-all-services__title">
      Professional services for{" "}
      <span className="cc-all-services__title-accent">
        every property.
      </span>
    </h2>

    <p className="cc-all-services__description">
      Explore our complete range of cleaning, repair, renovation and
      maintenance services. Choose a service below to discover the right
      solution for your home or business.
    </p>
  </header>
<div className="cc-all-services__grid">
  <Link
    className="cc-service-card"
    href="/services/deep-cleaning"
    aria-label="View Deep Cleaning service"
  >
    <div className="cc-service-card__media">
      <Image
        className="cc-service-card__image"
        src="/deep-cleaning-service.png"
        alt="Professional deep cleaning service for homes and businesses"
        width={1448}
        height={1086}
        sizes="(max-width: 760px) calc(100vw - 32px), 332px"
      />
    </div>

    <div className="cc-service-card__content">
      <h3 className="cc-service-card__title">Deep Cleaning</h3>

      <p className="cc-service-card__description">
        Professional deep cleaning for healthier, fresher and spotless homes
        and business spaces.
      </p>

      <span className="cc-service-card__action">
        View Service
        <span className="cc-service-card__arrow" aria-hidden="true">
          →
        </span>
      </span>
    </div>
  </Link>
</div>
  {/* Service cards will be added here next. */}
</div>

      <style>{ALL_SERVICES_STYLES}</style>
    </section>
  );
}
