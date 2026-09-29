import Image from "next/image";
import Link from "next/link";
import styles from "./ServiceCategoryGrid.module.css";

const services = [
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    icon: "/service-icons/deep-cleaning-display.webp",
  },
  {
    slug: "renovation",
    name: "Renovation",
    icon: "/service-icons/renovation-display.webp",
  },
  {
    slug: "electrical-works",
    name: "Electrical Works",
    icon: "/service-icons/electrical-works-display.webp",
  },
  {
    slug: "plumbing-works",
    name: "Plumbing Works",
    icon: "/service-icons/plumbing-works-display.webp",
  },
  {
    slug: "painting-services",
    name: "Painting Services",
    icon: "/service-icons/painting-services-display.webp",
  },
  {
    slug: "civil-construction-maintenance",
    name: "Civil Construction & Maintenance",
    icon: "/service-icons/civil-construction-maintenance-display.webp",
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    icon: "/service-icons/appliance-repair-display.webp",
  },
  {
    slug: "carpentry-interior-works",
    name: "Carpentry & Interior Works",
    icon: "/service-icons/carpentry-interior-works-display.webp",
  },
  {
    slug: "packers-movers",
    name: "Packers & Movers",
    icon: "/service-icons/packers-movers-display.webp",
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    icon: "/service-icons/pest-control-display.webp",
  },
  {
    slug: "spa-salon-services",
    name: "Spa & Salon Services",
    icon: "/service-icons/spa-salon-services-display.webp",
  },
  {
    slug: "fabrication-works",
    name: "Fabrication Works",
    icon: "/service-icons/fabrication-works-display.webp",
  },
  {
    slug: "gardening-landscaping",
    name: "Gardening & Landscaping",
    icon: "/service-icons/gardening-landscaping-display.webp",
  },
] as const;

function ServiceVisual({
  icon,
}: {
  icon: string;
}) {
  return (
    <span
      className={styles.cleaningIconSlot}
      aria-hidden="true"
    >
      <Image
        unoptimized
        src={icon}
        alt=""
        width={80}
        height={80}
        sizes="(max-width: 639px) 64px, 80px"
        className={styles.cleaningIconImage}
      />
    </span>
  );
}

function getServiceHref(slug: string): string {
  if (slug === "deep-cleaning") {
    return "/services/deep-cleaning?category=full-home-by-room";
  }

  return `/services/${slug}`;
}

export default function ServiceCategoryGrid() {
  return (
    <section
      className={styles.section}
      aria-label="Browse all services"
    >
      <div className={styles.container}>
        <nav
          className={styles.panel}
          aria-label="Service categories"
        >
          <ul className={styles.grid}>
            {services.map((service) => (
              <li
                key={service.slug}
                className={styles.item}
              >
                <Link
                  href={getServiceHref(service.slug)}
                  className={styles.card}
                >
                  <ServiceVisual icon={service.icon} />

                  <span className={styles.name}>
                    {service.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}