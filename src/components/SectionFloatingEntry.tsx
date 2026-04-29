"use client";

import Link from "next/link";
import * as React from "react";

export type SectionFloatingEntryItem = {
  id: string;
  sectionId: string;
  /** 若设置，与 section 顶构成「本段有效高度」；按该高度的一半入视时即可触发（见 isPartAtLeastHalfInView） */
  triggerAnchorId?: string;
  label: string;
  href: string;
};

/** 与视口相交的纵长（px） */
function verticalOverlapInViewport(top: number, bottom: number, vh: number) {
  const v0 = Math.max(0, top);
  const v1 = Math.min(vh, bottom);
  return Math.max(0, v1 - v0);
}

/**
 * 「出现到一半」：有锚点时指 section 顶 → 锚点底 这一段；无锚点为整段 section。
 * 超高区块用 min(块高, 2vh) 作分母，避免整段比两屏还长时永远到不了 50%。
 */
function isPartAtLeastHalfInView(
  sectionEl: HTMLElement,
  endEl: HTMLElement | null,
  vh: number
): boolean {
  const sr = sectionEl.getBoundingClientRect();
  const top = sr.top;
  const bottom = endEl ? endEl.getBoundingClientRect().bottom : sr.bottom;
  const h = bottom - top;
  if (h < 1) return false;
  const vis = verticalOverlapInViewport(top, bottom, vh);
  const denom = Math.min(h, 2 * vh);
  return vis / denom >= 0.5;
}

export default function SectionFloatingEntry({ items }: { items: SectionFloatingEntryItem[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [displayId, setDisplayId] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    let frame = 0;
    const detectActive = () => {
      const vh = window.innerHeight;
      let best: { id: string; order: number } | null = null;

      for (let order = 0; order < items.length; order++) {
        const item = items[order]!;
        const sectionEl = document.getElementById(item.sectionId);
        if (!sectionEl) continue;
        const endEl = item.triggerAnchorId ? document.getElementById(item.triggerAnchorId) : null;
        if (item.triggerAnchorId && !endEl) continue;

        if (!isPartAtLeastHalfInView(sectionEl, endEl, vh)) continue;
        if (!best || order > best.order) {
          best = { id: item.id, order };
        }
      }

      setActiveId(best?.id ?? null);
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(detectActive);
    };

    detectActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  React.useEffect(() => {
    if (activeId) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      setDisplayId(activeId);
      setVisible(true);
      setExpanded(false);
      const openTimer = setTimeout(() => setExpanded(true), 220);
      return () => clearTimeout(openTimer);
    }
    setExpanded(false);
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      setDisplayId(null);
    }, 700);
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [activeId]);

  const activeItem = items.find((item) => item.id === displayId) ?? null;
  if (!visible || !activeItem) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[90] flex justify-center px-4">
      <Link
        href={activeItem.href}
        className={
          "pointer-events-auto group flex items-center overflow-hidden rounded-full bg-[#2f3136]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] " +
          (expanded
            ? "w-[min(92vw,620px)] translate-y-0 scale-100 justify-start px-5 py-3.5"
            : "h-14 w-14 translate-y-1.5 scale-[0.96] justify-center px-0 py-0")
        }
        aria-label={activeItem.label}
      >
        <span
          className={
            "min-w-0 whitespace-nowrap text-[22px] font-semibold tracking-tight transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] " +
            (expanded
              ? "max-w-full flex-1 translate-x-0 opacity-100"
              : "max-w-0 w-0 flex-none -translate-x-2 overflow-hidden opacity-0")
          }
        >
          {activeItem.label}
        </span>
        <span
          className={
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0071e3] text-white transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] " +
            (expanded ? "ml-3" : "ml-0")
          }
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 5v14m-7-7h14" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
