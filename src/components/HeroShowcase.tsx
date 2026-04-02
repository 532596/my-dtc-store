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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(147,197,253,0.12),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-[85vh] w-full max-w-content items-start px-3 pb-14 pt-14 md:min-h-[92vh] md:px-6 md:pt-16">
        <div className="w-full text-white drop-shadow-[0_14px_40px_rgba(0,0,0,0.6)]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/75">
            Where deep work meets gentle technology
          </p>
          <h1 className="mt-3 max-w-4xl text-xl font-semibold tracking-tight md:text-3xl lg:text-4xl lg:leading-[1.1]">
            FlowShift
          </h1>
          <h2 className="mt-1 max-w-4xl text-xl font-semibold tracking-tight md:text-3xl lg:text-4xl lg:leading-[1.1]">
            The World&apos;s First AI-Native Flow Workstation
          </h2>
          <p className="mt-20 max-w-3xl text-xs text-white/88 md:text-sm">
            Code Deeper. Stand Healthier.
          </p>
          <p className="mt-1 max-w-3xl text-xs text-white/88 md:text-sm">
            Zero Distractions. A desk powered by LLM and ambient ergonomics.
          </p>
          <div className="mt-5 max-w-3xl">
            <p className="text-xs text-white/68 md:text-sm">
              构建你的终极 AI 工作站。深度工作与温和科技的交汇。零打扰，全同步。
            </p>
          </div>
          <p className="mt-2.5 max-w-3xl text-xs leading-relaxed text-white/72 md:text-sm">
            作为你在物理世界的认知副驾（Cognitive Copilot），FlowShift 通过对健康与环境的隐形管理，持续降低认知负荷，让你把脑力完全投入代码与逻辑。
          </p>

          <div className="mt-8 -mx-2 grid w-[calc(100%+1rem)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:-mx-3 md:w-[calc(100%+1.5rem)]">
            {[
              { title: "Subtle Shift Engine", desc: "无感升降引擎", icon: "⇅" },
              { title: "LLM API Integrated", desc: "内置大模型", icon: "◎" },
              { title: "1600x800mm Canvas", desc: "极客终极画布", icon: "▭" },
              { title: "Absolute Cable Control", desc: "极致暗黑理线", icon: "⌁" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm text-white/90">
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/65">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {activeSlide && (
            <p className="mt-5 -mx-2 text-xs font-medium uppercase tracking-wide text-white/55 md:-mx-3">
              {activeSlide.name} · {activeSlide.tagline}
            </p>
          )}
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

