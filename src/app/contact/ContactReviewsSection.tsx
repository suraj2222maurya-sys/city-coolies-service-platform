"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useContactReveal } from "./useContactReveal";

type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

type GoogleReviewData = {
  configured: boolean;
  source:
    | "business-profile"
    | "places"
    | "none";
  allReviews: boolean;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews: GoogleReview[];
};

function GoogleMark() {
  return (
    <span
      className="cc-ready-google-mark"
      aria-label="Google"
    >
      G
    </span>
  );
}

function Stars({
  rating,
  preview = false,
}: {
  rating?: number;
  preview?: boolean;
}) {
  const rounded =
    typeof rating === "number"
      ? Math.max(
          0,
          Math.min(
            5,
            Math.round(rating),
          ),
        )
      : 0;

  return (
    <span
      className={
        preview
          ? "cc-ready-stars cc-ready-stars-preview"
          : "cc-ready-stars"
      }
    >
      {Array.from(
        { length: 5 },
        (_, index) => (
          <span
            key={index}
            className={
              !preview &&
              index < rounded
                ? "cc-ready-star cc-ready-star-on"
                : "cc-ready-star"
            }
          >
            ★
          </span>
        ),
      )}
    </span>
  );
}

function Arrow({
  side,
}: {
  side: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          side === "left"
            ? "m15 6-6 6 6 6"
            : "m9 6 6 6-6 6"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReadyReviewSlot() {
  return (
    <article
      className="cc-ready-review-card cc-ready-review-placeholder"
      aria-hidden="true"
    >
      <div className="cc-ready-review-user">
        <GoogleMark />

        <div>
          <span className="cc-ready-skeleton cc-ready-skeleton-name" />
          <span className="cc-ready-skeleton cc-ready-skeleton-time" />
        </div>
      </div>

      <Stars preview />

      <div className="cc-ready-review-lines">
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

export default function ContactReviewsSection() {
  const sectionRef =
    useContactReveal<HTMLElement>();

  const [data, setData] =
    useState<GoogleReviewData | null>(
      null,
    );

  const [activeIndex, setActiveIndex] =
    useState(0);

  const loadReviews =
    useCallback(
      async () => {
        try {
          const response =
            await fetch(
              "/api/google-rating",
              {
                cache: "no-store",
              },
            );

          if (!response.ok) {
            return;
          }

          const result =
            (await response.json()) as GoogleReviewData;

          setData(result);

          setActiveIndex(
            (current) => {
              if (
                result.reviews.length === 0
              ) {
                return 0;
              }

              return Math.min(
                current,
                result.reviews.length - 1,
              );
            },
          );
        } catch {
          /*
           * Keep the ready layout.
           * Never create fake Google data.
           */
        }
      },
      [],
    );

  useEffect(() => {
    void loadReviews();

    const refreshTimer =
      window.setInterval(
        () => {
          void loadReviews();
        },
        60000,
      );

    return () => {
      window.clearInterval(
        refreshTimer,
      );
    };
  }, [loadReviews]);

  const reviews =
    data?.reviews ?? [];

  const hasRealRating =
    typeof data?.rating ===
      "number" &&
    typeof data?.userRatingCount ===
      "number";

  const hasRealReviews =
    reviews.length > 0;

  /*
   * Before Google is connected we still keep
   * five functional preview positions so the
   * arrows, dots and auto-slide can be tested now.
   */
  const carouselLength =
    hasRealReviews
      ? reviews.length
      : 5;

  const previous =
    useCallback(
      () => {
        if (
          carouselLength <= 1
        ) {
          return;
        }

        setActiveIndex(
          (current) =>
            (
              current -
              1 +
              carouselLength
            ) %
            carouselLength,
        );
      },
      [carouselLength],
    );

  const next =
    useCallback(
      () => {
        if (
          carouselLength <= 1
        ) {
          return;
        }

        setActiveIndex(
          (current) =>
            (current + 1) %
            carouselLength,
        );
      },
      [carouselLength],
    );

  useEffect(() => {
    if (
      carouselLength <= 1
    ) {
      return;
    }

    const timer =
      window.setInterval(
        next,
        5200,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, [
    next,
    carouselLength,
  ]);

  const visibleReviews =
    useMemo(
      () => {
        if (
          reviews.length === 0
        ) {
          return [];
        }

        return Array.from(
          {
            length:
              Math.min(
                3,
                reviews.length,
              ),
          },
          (_, offset) =>
            reviews[
              (
                activeIndex +
                offset
              ) %
                reviews.length
            ],
        );
      },
      [
        activeIndex,
        reviews,
      ],
    );

  const dots =
    useMemo(
      () => {
        if (
          reviews.length <= 1
        ) {
          return [];
        }

        if (
          reviews.length <= 7
        ) {
          return reviews.map(
            (_, index) =>
              index,
          );
        }

        return Array.from(
          { length: 7 },
          (_, index) =>
            Math.round(
              (
                index /
                6
              ) *
                (
                  reviews.length -
                  1
                ),
            ),
        );
      },
      [reviews],
    );

  const googleUrl =
    data?.googleMapsUri ??
    "https://www.google.com/maps/search/?api=1&query=City+Coolies+Chennai";

  return (
    <section
      ref={sectionRef}
      className="cc-contact-section cc-ready-review-section"
      aria-labelledby="cc-ready-review-heading"
    >
      <div className="cc-ready-review-frame">

        <span
          className="cc-frame-sweep"
          aria-hidden="true"
        />

        <div className="cc-ready-review-intro">

          <div className="cc-kicker cc-step cc-delay-1">
            <i />

            <span>
              CUSTOMER EXPERIENCE
            </span>
          </div>

          <h2
            id="cc-ready-review-heading"
            className="cc-ready-review-heading cc-step cc-delay-2"
          >
            <span>
              See What Customers Say
            </span>

            <span>
              About{" "}
              <em>
                City Coolies.
              </em>
            </span>
          </h2>

          <div className="cc-ready-rating-block cc-step cc-delay-3">

            {hasRealRating ? (
              <>
                <div className="cc-ready-rating-line">
                  <strong>
                    {data.rating!.toFixed(
                      1,
                    )}
                  </strong>

                  <Stars
                    rating={
                      data.rating!
                    }
                  />
                </div>

                <p>
                  Based on{" "}
                  <strong>
                    {data.userRatingCount!.toLocaleString()}
                  </strong>{" "}
                  Google Reviews
                </p>
              </>
            ) : (
              /*
               * FUNCTION READY PREVIEW.
               * No fake number.
               */
              <>
                <div className="cc-ready-rating-line cc-ready-rating-preview">
                  <strong>
                    —
                  </strong>

                  <Stars preview />
                </div>

                <p className="cc-ready-count-preview">
                  Google Reviews
                </p>
              </>
            )}

          </div>

          <a
            href={googleUrl}
            target="_blank"
            rel="noreferrer"
            className="cc-ready-google-button cc-step cc-delay-4"
          >
            <GoogleMark />

            <span>
              View on Google
            </span>

            <i>
              →
            </i>
          </a>

        </div>


        <div className="cc-ready-carousel cc-step cc-delay-4">

          <button
            type="button"
            onClick={previous}
            disabled={
              carouselLength <= 1
            }
            className="cc-ready-nav cc-ready-nav-left"
            aria-label="Previous Google review"
          >
            <Arrow side="left" />
          </button>

          {hasRealReviews ? (
            <div
              className={`cc-ready-review-cards cc-ready-review-count-${visibleReviews.length}`}
            >

              {visibleReviews.map(
                (
                  review,
                  cardIndex,
                ) => (
                  <article
                    key={`${review.id}-${cardIndex}`}
                    className="cc-ready-review-card"
                  >

                    <div className="cc-ready-review-user">

                      <GoogleMark />

                      <div>
                        <strong>
                          {review.author}
                        </strong>

                        <small>
                          {review.relativeTime}
                        </small>
                      </div>

                    </div>

                    <Stars
                      rating={
                        review.rating
                      }
                    />

                    <p>
                      {review.text ||
                        `Rated ${review.rating} out of 5 on Google.`}
                    </p>

                  </article>
                ),
              )}

            </div>
          ) : (
            /*
             * Visible final design slots.
             * No fake names, ratings or reviews.
             */
            <div
              key={`preview-slide-${activeIndex}`}
              className="cc-ready-review-cards cc-ready-review-count-3"
            >
              <ReadyReviewSlot />
              <ReadyReviewSlot />
              <ReadyReviewSlot />
            </div>
          )}

          <button
            type="button"
            onClick={next}
            disabled={
              carouselLength <= 1
            }
            className="cc-ready-nav cc-ready-nav-right"
            aria-label="Next Google review"
          >
            <Arrow side="right" />
          </button>


          <div className="cc-ready-dots">

            {hasRealReviews &&
            dots.length > 0 ? (
              dots.map(
                (
                  reviewIndex,
                  dotIndex,
                ) => (
                  <button
                    key={`${reviewIndex}-${dotIndex}`}
                    type="button"
                    aria-label={`Show review ${
                      reviewIndex + 1
                    }`}
                    onClick={() =>
                      setActiveIndex(
                        reviewIndex,
                      )
                    }
                    className={
                      activeIndex ===
                      reviewIndex
                        ? "cc-ready-dot cc-ready-dot-active"
                        : "cc-ready-dot"
                    }
                  />
                ),
              )
            ) : (
              <>
                {Array.from(
                  { length: 5 },
                  (_, previewIndex) => (
                    <button
                      key={previewIndex}
                      type="button"
                      aria-label={`Preview review position ${
                        previewIndex + 1
                      }`}
                      onClick={() =>
                        setActiveIndex(
                          previewIndex,
                        )
                      }
                      className={
                        activeIndex ===
                        previewIndex
                          ? "cc-ready-dot cc-ready-dot-active"
                          : "cc-ready-dot"
                      }
                    />
                  ),
                )}
              </>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}