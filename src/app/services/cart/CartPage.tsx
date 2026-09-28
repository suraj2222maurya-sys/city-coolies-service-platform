"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import {
  getCommittedServicesServerSnapshot,
  getCommittedServicesSnapshot,
  parseDeepCleaningCartSnapshot,
  removeDeepCleaningCartItem,
  subscribeDeepCleaningCart,
} from "../deep-cleaning/deepCleaningCart";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getCommittedServicesSnapshot,
    getCommittedServicesServerSnapshot,
  );
  const items = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>Your services</h1>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>No services selected yet.</p>
            <Link href="/services" className={styles.action}>Browse Services</Link>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.list}>
              {items.map((item) => (
                <article key={item.id} className={styles.item}>
                  <div>
                    <h2>{item.serviceTitle}</h2>
                    <p>{item.optionLabel}{item.duration ? ` · ${item.duration}` : ""}</p>
                  </div>
                  <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                  <button type="button" onClick={() => removeDeepCleaningCartItem(item.id)}
                    aria-label={`Remove ${item.optionLabel || item.serviceTitle}`}>×</button>
                </article>
              ))}
            </div>
            <div className={styles.total}><span>Estimated total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
            <Link href="/services" className={styles.action}>Add More Services</Link>
          </div>
        )}
      </div>
    </main>
  );
}
