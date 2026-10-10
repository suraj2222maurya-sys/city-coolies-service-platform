"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import {
  getCommittedServicesServerSnapshot,
  getCommittedServicesSnapshot,
  appendCommittedService,
  parseDeepCleaningCartSnapshot,
  removeDeepCleaningCartItem,
  subscribeDeepCleaningCart,
  upsertDeepCleaningCartItem,
  type DeepCleaningCartItem,
} from "./deep-cleaning/deepCleaningCart";
import styles from "./SelectedServicesSummary.module.css";

const copyMarker = "::city-coolies-copy::";

function originalId(id: string): string {
  return id.split(copyMarker)[0];
}

type Group = {
  id: string;
  title: string;
  option: string;
  items: DeepCleaningCartItem[];
};

export default function SelectedServicesSummary() {

  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const barRef = useRef<HTMLElement>(null);
  const suppressClickRef = useRef(false);
  const summaryPointerDownRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
    width: number;
    height: number;
    moved: boolean;
  } | null>(null);

  function startDrag(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as Element).closest("a")) return;

    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return;

    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      moved: false,
    };
  }

  function moveDrag(event: ReactPointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;

    if (!drag.moved) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    setDragPosition({
      x: Math.min(Math.max(8, window.innerWidth - drag.width - 8), Math.max(8, drag.x + dx)),
      y: Math.min(Math.max(8, window.innerHeight - drag.height - 8), Math.max(8, drag.y + dy)),
    });
  }

  function stopDrag(event: ReactPointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }

    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }
  useEffect(() => {
    const keepInsideScreen = () => {
      setDragPosition((current) => {
        if (!current) return null;
        const rect = barRef.current?.getBoundingClientRect();
        if (!rect) return current;
        return {
          x: Math.min(Math.max(8, window.innerWidth - rect.width - 8), Math.max(8, current.x)),
          y: Math.min(Math.max(8, window.innerHeight - rect.height - 8), Math.max(8, current.y)),
        };
      });
    };
    window.addEventListener("resize", keepInsideScreen);
    return () => window.removeEventListener("resize", keepInsideScreen);
  }, []);
  const pathname = usePathname();

  const [openState, setOpenState] = useState<{
    pathname: string;
    open: boolean;
  }>(() => ({
    pathname,
    open: false,
  }));

  if (openState.pathname !== pathname) {
    setOpenState({
      pathname,
      open: false,
    });
  }

  const open =
    openState.pathname === pathname &&
    openState.open;

  function setOpen(
    next:
      | boolean
      | ((current: boolean) => boolean),
  ) {
    setOpenState((current) => {
      const currentOpen =
        current.pathname === pathname
          ? current.open
          : false;

      return {
        pathname,
        open:
          typeof next === "function"
            ? next(currentOpen)
            : next,
      };
    });
  }
  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getCommittedServicesSnapshot,
    getCommittedServicesServerSnapshot,
  );
  const items = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const groups = useMemo(() => {
    const result = new Map<string, Group>();
    for (const item of items) {
      const id = originalId(item.id);
      const existing = result.get(id);
      if (existing) existing.items.push(item);
      else result.set(id, {
        id,
        title: item.serviceTitle,
        option: item.optionLabel,
        items: [item],
      });
    }
    return [...result.values()];
  }, [items]);

  if (items.length === 0 || pathname === "/services/cart") return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  function decrease(group: Group) {
    const extra = [...group.items].reverse().find((item) => item.id !== group.id);
    removeDeepCleaningCartItem(extra?.id ?? group.items[0].id);
  }

  function increase(group: Group) {
    const source = group.items[0];
    let copy = 1;
    while (items.some((item) => item.id === `${group.id}${copyMarker}${copy}`)) copy++;
    const next = { ...source, id: `${group.id}${copyMarker}${copy}` };
    upsertDeepCleaningCartItem(next);
    appendCommittedService(next);
  }

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <aside
        ref={barRef}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onClickCapture={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }
        }}
        className={styles.bar}
        aria-label="Selected services summary"
        data-dragged={dragPosition ? "true" : undefined}
        style={dragPosition ? ({
          "--drag-x": `${dragPosition.x}px`,
          "--drag-y": `${dragPosition.y}px`,
        } as CSSProperties) : undefined}
      >
        <button
          type="button"
          className={styles.summary}
          onPointerDown={(event) => {
            summaryPointerDownRef.current = true;
            event.stopPropagation();
          }}
          onPointerCancel={() => {
            summaryPointerDownRef.current = false;
          }}
          onClick={(event) => {
            const keyboardActivation = event.detail === 0;

            if (!keyboardActivation && !summaryPointerDownRef.current) {
              return;
            }

            summaryPointerDownRef.current = false;
            setOpen((current) => !current);
          }}
          aria-expanded={open}
          aria-controls="selected-services-popup"
          aria-label={`${open ? "Close" : "View"} ${items.length} selected services`}
        >
          <span className={styles.icon} aria-hidden="true">✓</span>
          <span>
            <strong>
              {items.length} {items.length === 1 ? "service" : "services"} selected
            </strong>
            <small>
              Estimated total ₹{total.toLocaleString("en-IN")}
            </small>
          </span>
          <span className={styles.chevron} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d={open ? "M3 10L8 5L13 10" : "M3 6L8 11L13 6"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button><Link href="/login" className={styles.viewButton}>
          Go to Cart
        </Link>
      </aside>

      {open && (
        <div className={styles.backdrop} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <section id="selected-services-popup" className={styles.panel} role="dialog" aria-modal="true"
            aria-labelledby="selected-services-heading">
            <header className={styles.heading}>
              <h2 id="selected-services-heading">Your services ({items.length})</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close cart">×</button>
            </header>
            <div className={styles.list}>
              {groups.map((group) => (
                <div key={group.id} className={styles.item}>
                  <div className={styles.itemText}>
                    <strong>{group.title}</strong>
                    <span>{group.option}</span>
                    <b>₹{(group.items.reduce((sum, item) => sum + item.price, 0)).toLocaleString("en-IN")}</b>
                  </div>
                  <div className={styles.quantity} aria-label={`${group.title} quantity`}>
                    <button type="button" onClick={() => decrease(group)}
                      aria-label={`Remove one ${group.title}`}>−</button>
                    <span>{group.items.length}</span>
                    <button type="button" onClick={() => increase(group)}
                      aria-label={`Add one ${group.title}`}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <footer className={styles.footer}>
              <div className={styles.footerTotal}>
                <span>Estimated total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
              <Link href="/login" className={styles.panelCartLink}>Go to Cart</Link>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
