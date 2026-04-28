"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export type HeroSlide = {
  id: string;
  name: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
};

export default function HeroShowcase({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const slideCount = slides.length;
  const safeActive = Math.min(Math.max(active, 0), Math.max(slideCount - 1, 0));
  const activeSlide = slides[safeActive];

  React.useEffect(() => {
    if (slideCount <= 1) return;
    if (paused) return;
    if (typeof window === "undefined") return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slideCount);
    }, 6500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [paused, slideCount]);

  const go = (nextIndex: number) => {
    if (slideCount === 0) return;
    const i = ((nextIndex % slideCount) + slideCount) % slideCount;
    setActive(i);
  };

  return (
    <section
      className="relative min-h-[92vh] overflow-hidden bg-black md:min-h-screen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* background slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={
              "absolute inset-0 transition-opacity duration-700 " +
              (i === safeActive ? "opacity-100" : "opacity-0")
            }
          >
            <Image
              src={s.imageSrc}
              alt={s.imageAlt}
              fill
              priority={i === 0}
              className="object-cover opacity-45"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/90" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-[1200px] flex-col items-center justify-center px-6 pb-28 pt-16 text-center text-white md:min-h-screen">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
          Where Deep Work Meets Gentle Technology
        </p>
        <h1 className="mt-5 text-[56px] font-semibold tracking-[-0.03em] md:text-[92px] lg:text-[112px]">
          FlowShift
        </h1>
        <h2 className="mt-3 max-w-5xl text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[56px] lg:text-[72px]">
          The AI-Native Flow Workstation.
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/75 md:text-xl">
          把健康交给算法，把专注留给心流。FlowShift 在后台静默执行健康干预，让你只专注于创造。
        </p>

        <div className="mt-10 flex items-center gap-8 text-[15px] md:text-base">
          <Link href="/series" className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-white/90">
            了解产品
          </Link>
          <Link href="/about" className="font-medium text-[#2997ff] transition hover:text-[#5eb3ff]">
            进一步了解 &gt;
          </Link>
        </div>

        {activeSlide && (
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
            {activeSlide.name} / {activeSlide.tagline}
          </p>
        )}
      </div>

      {slideCount > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-20 px-4 md:px-8">
          <div className="mx-auto flex max-w-[520px] items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                className={
                  "h-1.5 rounded-full transition-all " +
                  (i === safeActive ? "w-12 bg-white" : "w-6 bg-white/35 hover:bg-white/55")
                }
                aria-label={`Go to ${s.name}`}
                aria-current={i === safeActive ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

