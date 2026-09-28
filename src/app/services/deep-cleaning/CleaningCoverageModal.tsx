"use client";

import { createPortal } from "react-dom";

import styles from "./CleaningCoverageModal.module.css";

type CleaningCoverageModalProps = {
  open: boolean;
  onClose: () => void;
};

const coverageRows = [
  {
    home: "1 BHK",
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
  },
  {
    home: "2 BHK",
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
  },
  {
    home: "3 BHK",
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
  },
  {
    home: "4 BHK",
    bedrooms: 4,
    bathrooms: 4,
    balconies: 4,
  },
  {
    home: "5 BHK",
    bedrooms: 5,
    bathrooms: 5,
    balconies: 5,
  },
] as const;

export default function CleaningCoverageModal({
  open,
  onClose,
}: CleaningCoverageModalProps) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cleaning-coverage-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close cleaning coverage"
          onClick={onClose}
        >
          ×
        </button>

        <div className={styles.scrollArea}>
          <header className={styles.header}>
            <h2
              id="cleaning-coverage-title"
              className={styles.title}
            >
              What does your cleaning cover?
            </h2>

            <p className={styles.subtitle}>
              Along with living and kitchen areas
            </p>
          </header>

          <div className={styles.tableWrapper}>
            <table className={styles.coverageTable}>
              <thead>
                <tr>
                  <th aria-label="Home size" />

                  <th>
                    <span>Number of</span>
                    <strong>Bedrooms</strong>
                  </th>

                  <th>
                    <span>Number of</span>
                    <strong>Bathrooms</strong>
                  </th>

                  <th>
                    <span>Number of</span>
                    <strong>Balconies</strong>
                  </th>
                </tr>
              </thead>

              <tbody>
                {coverageRows.map((row) => (
                  <tr key={row.home}>
                    <th scope="row">
                      {row.home}
                    </th>

                    <td>{row.bedrooms}</td>

                    <td>{row.bathrooms}</td>

                    <td>{row.balconies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
