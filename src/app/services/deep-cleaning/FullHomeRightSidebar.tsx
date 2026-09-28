"use client";

import Link from "next/link";

import {
  useEffect,
  useRef,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  getDeepCleaningCartServerSnapshot,
  getDeepCleaningCartSnapshot,
  parseDeepCleaningCartSnapshot,
  removeDeepCleaningCartItem,
  commitDeepCleaningCart,
  subscribeDeepCleaningCart,
} from "./deepCleaningCart";

import styles from "./FullHomeRightSidebar.module.css";

type FullHomeRightSidebarProps = {
  cartCount?: number;
};

export default function FullHomeRightSidebar(
  props: FullHomeRightSidebarProps,
) {
  void props.cartCount;

  
  // CITY_COOLIES_MOBILE_CART_SCROLL_START

  const cartRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let scrollTimer: number | undefined;

    const handleCartAdded = () => {
      // Never change desktop or laptop scrolling.
      if (!window.matchMedia("(max-width: 760px)").matches) {
        return;
      }

      // Wait for the popup to close and the cart to update.
      if (scrollTimer !== undefined) {
        window.clearTimeout(scrollTimer);
      }

      scrollTimer = window.setTimeout(() => {
        const cart = cartRef.current;

        if (!cart) {
          return;
        }

        const topOffset = Math.max(190, (document.querySelector("header")?.getBoundingClientRect().bottom ?? 0) + 16);

        const targetTop = Math.max(
          0,
          cart.getBoundingClientRect().top +
            window.scrollY -
            topOffset,
        );

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
          top: targetTop,
          behavior: reduceMotion ? "instant" : "smooth",
        });
      }, 250);
    };

    window.addEventListener(
      "citycoolies:deep-cleaning-cart-added",
      handleCartAdded,
    );

    return () => {
      window.removeEventListener(
        "citycoolies:deep-cleaning-cart-added",
        handleCartAdded,
      );

      if (scrollTimer !== undefined) {
        window.clearTimeout(scrollTimer);
      }
    };
  }, []);

  // CITY_COOLIES_MOBILE_CART_SCROLL_END
const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );

  const items = useMemo(
    () =>
      parseDeepCleaningCartSnapshot(
        snapshot,
      ),
    [snapshot],
  );

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  return (
    <aside className={styles.sidebar}>
      <section
        ref={cartRef}
        className={styles.cartCard}
        aria-label="Selected services"
      >
        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <span
              className={styles.cartIcon}
              aria-hidden="true"
            >
              🛒
            </span>

            <p>No items in your cart</p>
          </div>
        ) : (
          <>
            <div className={styles.cartHeader}>
              <h2>Your services</h2>

              <span>
                {items.length}
              </span>
            </div>

            <div className={styles.cartItems}>
              {items.map((item) => (
                <article
                  key={item.id}
                  className={styles.cartItem}
                >
                  <div
                    className={
                      styles.cartItemContent
                    }
                  >
                    <div className={styles.cartItemHeading}>
                      <h3>{item.serviceTitle}</h3>
                      <strong>{item.priceLabel}</strong>
                    </div>

                    <p>
                      {item.optionLabel}
                      {" · "}
                      {item.duration}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={
                      styles.removeButton
                    }
                    aria-label={`Remove ${item.serviceTitle}`}
                    title="Remove service"
                    onClick={() =>
                      removeDeepCleaningCartItem(
                        item.id,
                      )
                    }
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>

            <div className={styles.cartTotal}>
              <span>Estimated total</span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN",
                )}
              </strong>
            </div>

            <Link href="/services" className={styles.addMoreServices} onClick={commitDeepCleaningCart}>
              Add More Services
            </Link>

            <p className={styles.bookingNote}>
              Final booking and payment will be
              connected with the backend later.
            </p>
          </>
        )}
      </section>
    </aside>
  );
}
