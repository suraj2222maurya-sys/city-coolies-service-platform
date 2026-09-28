import styles from "./ServicesIntro.module.css";

export default function ServicesIntro() {
  return (
    <section
      className={styles.section}
      aria-labelledby="services-intro-title"
    >
      <div className={styles.container}>
        <h1 id="services-intro-title" className={styles.title}>
          Find &amp; Book Services
          <span className={styles.accent}>
            For Homes, Businesses &amp; Industries
          </span>
        </h1>
      </div>
    </section>
  );
}
