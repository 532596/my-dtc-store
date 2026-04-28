"use client";

import * as React from "react";

type MetricGradBreathScopeProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * 在规格数字网格上根据指针位置微调渐变 background-position，形成轻微「呼吸」感。
 * prefers-reduced-motion: reduce 时不更新。
 */
export default function MetricGradBreathScope({ className, children }: MetricGradBreathScopeProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);
  const reduceRef = React.useRef(false);

  React.useEffect(() => {
    reduceRef.current =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const apply = React.useCallback((clientX: number, clientY: number) => {
    const el = rootRef.current;
    if (!el || reduceRef.current) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const rx = (clientX - rect.left) / rect.width;
    const ry = (clientY - rect.top) / rect.height;
    const gx = 48 + (rx - 0.5) * 7;
    const gy = 50 + (ry - 0.5) * 12;
    el.style.setProperty("--metric-grad-x", `${gx.toFixed(2)}%`);
    el.style.setProperty("--metric-grad-y", `${gy.toFixed(2)}%`);
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const cx = e.clientX;
    const cy = e.clientY;
    rafRef.current = requestAnimationFrame(() => apply(cx, cy));
  };

  const onPointerLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--metric-grad-x", "48%");
    el.style.setProperty("--metric-grad-y", "50%");
  };

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={
        {
          ["--metric-grad-x" as string]: "48%",
          ["--metric-grad-y" as string]: "50%",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
