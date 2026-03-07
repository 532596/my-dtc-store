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
      className="relative min-h-[85vh] overflow-hidden bg-warm-gray/80 md:min-h-[92vh]"
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
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      {/* copy: 略向右移，底部偏左 */}
      <div className="relative flex min-h-[85vh] w-full items-end px-5 pb-18 pt-20 md:min-h-[92vh] md:pl-14 md:pr-8 md:pb-24">
        <div className="max-w-2xl text-warm-white drop-shadow-[0_14px_40px_rgba(0,0,0,0.6)] md:ml-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.06]">
            Work Healthier. Live Smarter.
          </h1>
          <p className="mt-5 max-w-xl text-sm text-white/85 md:text-base">
            The smart standing desk for any space and any pace. 一张桌子，满足全家办公学习。
          </p>

          {activeSlide && (
            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-white/75">
              {activeSlide.name} · {activeSlide.tagline}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/series"
              className="btn-primary inline-flex min-w-[11rem] items-center justify-center px-10 py-3"
            >
              Shop Now
            </Link>
            <Link
              href="/series#compare"
              className="inline-flex min-w-[11rem] items-center justify-center rounded-xl border border-white/25 bg-white/10 px-10 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15"
            >
              Compare
            </Link>
          </div>
        </div>
      </div>

      {/* bottom selector (secretlab-like) */}
      {slideCount > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-20 px-4 md:px-8">
          <div className="w-full">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-2 shadow-lg backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  aria-label="Previous"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  onClick={() => go(safeActive - 1)}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="grid flex-1 grid-cols-4 gap-2 px-1">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => go(i)}
                      className={
                        "min-w-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-medium transition " +
                        (i === safeActive
                          ? "bg-white text-foreground"
                          : "text-white/80 hover:bg-white/10 hover:text-white")
                      }
                      aria-current={i === safeActive ? "true" : "false"}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Next"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  onClick={() => go(safeActive + 1)}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

