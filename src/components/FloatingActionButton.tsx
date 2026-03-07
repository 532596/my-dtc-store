"use client";

import * as React from "react";

const FAB_GRADIENT = "linear-gradient(135deg, #88b8cc 0%, #72a4b8 50%, #5e94a8 100%)";
const FAB_GRADIENT_HOVER = "linear-gradient(135deg, #78b0c4 0%, #6298ac 100%)";

const OPTIONS = [
  { id: "rewards", label: "任务奖励机制", href: "/rewards" },
  { id: "register", label: "注册享受福利", href: "/account?tab=register" },
] as const;

export default function FloatingActionButton() {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        btnRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {open && (
        <div
          ref={panelRef}
          className="rounded-xl border border-warm-gray/40 bg-warm-white py-2 shadow-lg"
          role="dialog"
          aria-label="福利与奖励"
        >
          {OPTIONS.map((opt) => (
            <a
              key={opt.id}
              href={opt.href}
              className="block whitespace-nowrap px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-warm-cream/80"
            >
              {opt.label}
            </a>
          ))}
        </div>
      )}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        style={{ background: open ? FAB_GRADIENT_HOVER : FAB_GRADIENT }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = FAB_GRADIENT_HOVER;
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.background = FAB_GRADIENT;
        }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="福利与奖励"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      </button>
    </div>
  );
}
