"use client";

import { useEffect, useRef, useState } from "react";

export interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  key?: React.Key;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass =
    delay === 1 ? "reveal-delay-1" : delay === 2 ? "reveal-delay-2" : delay === 3 ? "reveal-delay-3" : "";
  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
