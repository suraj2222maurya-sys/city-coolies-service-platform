"use client";

import { useEffect } from "react";

const SEARCH_TARGET_PARAM = "ccTarget";

const SEARCH_TARGET_EVENT =
  "citycoolies:service-search-target";

function normalizeSearchText(
  value: string,
): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isElementVisible(
  element: HTMLElement,
): boolean {
  const style =
    window.getComputedStyle(element);

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0" &&
    element.getClientRects().length > 0
  );
}

function findNearbyViewDetailsButton(
  element: HTMLElement,
): HTMLButtonElement | null {
  let current: HTMLElement | null =
    element;

  for (
    let depth = 0;
    current && depth < 5;
    depth += 1
  ) {
    const buttons = Array.from(
      current.querySelectorAll<HTMLButtonElement>(
        "button",
      ),
    );

    const button = buttons.find(
      (candidate) => {
        if (!isElementVisible(candidate)) {
          return false;
        }

        const text =
          normalizeSearchText(
            candidate.textContent ?? "",
          );

        const label =
          normalizeSearchText(
            candidate.getAttribute(
              "aria-label",
            ) ?? "",
          );

        return (
          text === "view details" ||
          text === "details" ||
          label.includes("view details")
        );
      },
    );

    if (button) {
      return button;
    }

    current = current.parentElement;
  }

  return null;
}

function findTargetCard(
  element: HTMLElement,
): HTMLElement | null {
  let current: HTMLElement | null =
    element;

  for (
    let depth = 0;
    current && depth < 5;
    depth += 1
  ) {
    if (
      current.querySelector("img") &&
      current.querySelector("button")
    ) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}

function findBestExactTextElement(
  root: ParentNode,
  target: string,
): HTMLElement | null {
  const normalizedTarget =
    normalizeSearchText(target);

  if (!normalizedTarget) {
    return null;
  }

  const matches = Array.from(
    root.querySelectorAll<HTMLElement>("*"),
  ).filter((element) => {
    if (!isElementVisible(element)) {
      return false;
    }

    if (
      normalizeSearchText(
        element.textContent ?? "",
      ) !== normalizedTarget
    ) {
      return false;
    }

    return !Array.from(
      element.children,
    ).some(
      (child) =>
        normalizeSearchText(
          child.textContent ?? "",
        ) === normalizedTarget,
    );
  });

  if (matches.length === 0) {
    return null;
  }

  matches.sort((left, right) => {
    const leftDetails =
      findNearbyViewDetailsButton(left)
        ? 1
        : 0;

    const rightDetails =
      findNearbyViewDetailsButton(right)
        ? 1
        : 0;

    if (
      leftDetails !== rightDetails
    ) {
      return (
        rightDetails -
        leftDetails
      );
    }

    const leftCard =
      findTargetCard(left)
        ? 1
        : 0;

    const rightCard =
      findTargetCard(right)
        ? 1
        : 0;

    if (leftCard !== rightCard) {
      return rightCard - leftCard;
    }

    return (
      left.childElementCount -
      right.childElementCount
    );
  });

  return matches[0] ?? null;
}

function revealTarget(
  element: HTMLElement,
): void {
  const target =
    findTargetCard(element) ??
    element;

  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

function getVisibleDialog():
  HTMLElement | null {
  const dialogs = Array.from(
    document.querySelectorAll<HTMLElement>(
      '[role="dialog"]',
    ),
  ).filter(isElementVisible);

  return dialogs.at(-1) ?? null;
}

function closeDialog(
  dialog: HTMLElement,
): void {
  const buttons = Array.from(
    dialog.querySelectorAll<HTMLButtonElement>(
      "button",
    ),
  );

  const closeButton = buttons.find(
    (button) => {
      const label =
        normalizeSearchText(
          button.getAttribute(
            "aria-label",
          ) ?? "",
        );

      const text =
        normalizeSearchText(
          button.textContent ?? "",
        );

      return (
        label.includes("close") ||
        text === "close" ||
        text === "x"
      );
    },
  );

  if (closeButton) {
    closeButton.click();
    return;
  }

  window.dispatchEvent(
    new KeyboardEvent(
      "keydown",
      {
        key: "Escape",
        bubbles: true,
      },
    ),
  );
}

function getViewDetailsButtons(
  root: ParentNode,
): HTMLButtonElement[] {
  return Array.from(
    root.querySelectorAll<HTMLButtonElement>(
      "button",
    ),
  ).filter((button) => {
    if (
      !isElementVisible(button) ||
      button.closest('[role="dialog"]')
    ) {
      return false;
    }

    const text =
      normalizeSearchText(
        button.textContent ?? "",
      );

    const label =
      normalizeSearchText(
        button.getAttribute(
          "aria-label",
        ) ?? "",
      );

    return (
      text === "view details" ||
      text === "details" ||
      label.includes("view details")
    );
  });
}

function pause(
  milliseconds: number,
): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(
      resolve,
      milliseconds,
    );
  });
}

function readSearchTarget(): string {
  try {
    return (
      new URL(window.location.href)
        .searchParams.get(
          SEARCH_TARGET_PARAM,
        )
        ?.trim() ?? ""
    );
  } catch {
    return "";
  }
}

async function openSearchTarget(
  target: string,
): Promise<void> {
  const normalizedTarget =
    normalizeSearchText(target);

  if (!normalizedTarget) {
    return;
  }

  /*
   * Give Next.js enough time to render
   * the destination marketplace page.
   */
  await pause(220);

  let main =
    document.querySelector<HTMLElement>(
      "main",
    );

  /*
   * A slower route can still be rendering.
   * Retry only until the page main exists.
   */
  for (
    let attempt = 0;
    !main && attempt < 8;
    attempt += 1
  ) {
    await pause(120);

    main =
      document.querySelector<HTMLElement>(
        "main",
      );
  }

  if (!main) {
    return;
  }

  /*
   * Case 1:
   * The searched service/product is already
   * visible on the destination page.
   */
  const directTarget =
    findBestExactTextElement(
      main,
      target,
    );

  if (directTarget) {
    const detailsButton =
      findNearbyViewDetailsButton(
        directTarget,
      );

    if (detailsButton) {
      detailsButton.click();

      await pause(90);

      const dialog =
        getVisibleDialog();

      const dialogTarget =
        dialog
          ? findBestExactTextElement(
              dialog,
              target,
            )
          : null;

      if (dialogTarget) {
        revealTarget(dialogTarget);
        return;
      }
    }

    revealTarget(directTarget);
    return;
  }

  /*
   * Case 2:
   * The searched item is inside one of the
   * existing service popups.
   *
   * We safely test View Details buttons only.
   * We never click Add automatically.
   */
  const detailButtons =
    getViewDetailsButtons(main);

  for (
    const button of detailButtons
  ) {
    if (
      !button.isConnected ||
      !isElementVisible(button)
    ) {
      continue;
    }

    button.click();

    await pause(90);

    const dialog =
      getVisibleDialog();

    if (dialog) {
      const dialogTarget =
        findBestExactTextElement(
          dialog,
          target,
        );

      if (dialogTarget) {
        revealTarget(
          dialogTarget,
        );

        return;
      }

      closeDialog(dialog);

      await pause(55);

      continue;
    }

    /*
     * Some marketplace sections can expand
     * inline instead of using a dialog.
     */
    const expandedTarget =
      findBestExactTextElement(
        main,
        target,
      );

    if (expandedTarget) {
      revealTarget(
        expandedTarget,
      );

      return;
    }
  }
}

export default function ServiceSearchAutoOpen() {
  useEffect(() => {
    let timer: number | null =
      null;

    let disposed = false;

    const schedule = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
      }

      timer =
        window.setTimeout(() => {
          if (disposed) {
            return;
          }

          const target =
            readSearchTarget();

          if (!target) {
            return;
          }

          void openSearchTarget(
            target,
          );
        }, 160);
    };

    /*
     * Handles a full refresh/direct URL.
     */
    schedule();

    /*
     * Handles search navigation while the
     * shared services layout stays mounted.
     */
    window.addEventListener(
      SEARCH_TARGET_EVENT,
      schedule,
    );

    window.addEventListener(
      "popstate",
      schedule,
    );

    return () => {
      disposed = true;

      if (timer !== null) {
        window.clearTimeout(timer);
      }

      window.removeEventListener(
        SEARCH_TARGET_EVENT,
        schedule,
      );

      window.removeEventListener(
        "popstate",
        schedule,
      );
    };
  }, []);

  return null;
}