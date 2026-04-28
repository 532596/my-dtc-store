"use client";

import Link from "next/link";
import * as React from "react";

export type SectionFloatingEntryItem = {
  id: string;
  sectionId: string;
  label: string;
  href: string;
};

export default function SectionFloatingEntry({ items }: { items: SectionFloatingEntryItem[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    let frame = 0;
    const detectActive = () => {
      const viewportBottomTrigger = window.innerHeight * 0.82;
      let best: { id: string; distance: number } | null = null;

      for (const item of items) {
        const el = document.getElementById(item.sectionId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // 只在「该分段底部」接近视口下方时触发
        const sectionBottom = rect.bottom;
        const nearBottomBand =
          sectionBottom <= viewportBottomTrigger + 40 &&
          sectionBottom >= viewportBottomTrigger - 140;
        if (!nearBottomBand) continue;
        const distance = Math.abs(sectionBottom - viewportBottomTrigger);
        if (!best || distance < best.distance) best = { id: item.id, distance };
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
      setVisible(true);
      setExpanded(false);
      const openTimer = setTimeout(() => setExpanded(true), 110);
      return () => clearTimeout(openTimer);
    }
    setExpanded(false);
    hideTimerRef.current = setTimeout(() => setVisible(false), 260);
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [activeId]);

  const activeItem = items.find((item) => item.id === activeId) ?? null;
  if (!visible || !activeItem) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[90] flex justify-center px-4">
      <Link
        href={activeItem.href}
        className={
          "pointer-events-auto group flex items-center overflow-hidden rounded-full bg-[#2f3136]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] " +
          (expanded ? "w-[min(92vw,620px)] px-5 py-3.5" : "w-14 px-2 py-2")
        }
        aria-label={activeItem.label}
      >
        <span
          className={
            "min-w-0 flex-1 whitespace-nowrap text-[22px] font-semibold tracking-tight transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] " +
            (expanded ? "max-w-full opacity-100" : "max-w-0 opacity-0")
          }
        >
          {activeItem.label}
        </span>
        <span className="ml-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0071e3] text-white transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 5v14m-7-7h14" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
