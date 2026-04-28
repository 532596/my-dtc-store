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

export interface HeroShowcaseProps {
  slides: HeroSlide[];
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export default function HeroShowcase({ slides, cta }: HeroShowcaseProps) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const slideCount = slides.length;
  const safeActive = Math.min(Math.max(active, 0), Math.max(slideCount - 1, 0));
  const activeSlide = slides[safeActive];

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (slideCount <= 1) return;
    if (paused) return;
    if (prefersReducedMotion) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slideCount);
    }, 6500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [paused, prefersReducedMotion, slideCount]);

  const go = (nextIndex: number) => {
    if (slideCount === 0) return;
    const i = ((nextIndex % slideCount) + slideCount) % slideCount;
    setActive(i);
  };

  return (
    <section
      className="relative min-h-[85vh] overflow-hidden bg-black md:min-h-screen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* background slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={
              "absolute inset-0 transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] " +
              (i === safeActive
                ? "opacity-100 " + (prefersReducedMotion ? "scale-100" : "scale-100")
                : "opacity-0 " + (prefersReducedMotion ? "scale-100" : i < safeActive ? "scale-[1.02]" : "scale-[1.05]"))
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

      {/* overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/[0.68] via-black/[0.52] to-black/[0.62]" />

      <div className="relative flex min-h-[85vh] w-full flex-col justify-between px-6 pb-12 pt-14 md:min-h-screen md:px-12 md:pb-16 md:pt-16">
        <div className="mx-auto flex w-full max-w-[1200px] flex-1 items-center">
          <div className="relative w-full max-w-4xl text-white">
            <div className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[22px] bg-[rgba(0,0,0,0.25)]" />
            <div className="relative">
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/72">
                Where deep work meets gentle technology
              </p>
              <h1 className="mt-4 text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[76px] md:tracking-[-0.03em] lg:text-[92px]">
                FlowShift
              </h1>
              <h2 className="mt-5 text-[20px] font-medium leading-[1.35] tracking-[-0.01em] text-white/90 md:text-[30px] md:leading-[1.3]">
                The World&apos;s First AI-Native Flow Workstation
              </h2>
              <p className="mt-6 max-w-3xl text-[16px] leading-[1.5] text-white/82 md:text-[19px]">
                构建你的终极 AI 工作站。深度工作与温和科技的交汇。零打扰，全同步。
              </p>
              <p className="mt-3 hidden max-w-3xl text-[16px] leading-[1.5] text-white/72 md:block md:text-[17px]">
                As your cognitive copilot in the physical world, FlowShift quietly manages posture and environment so you can keep your mind fully on code and logic.
              </p>

              {cta?.primary || cta?.secondary ? (
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  {cta?.primary ? (
                    <Link
                      href={cta.primary.href}
                      className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:opacity-90"
                    >
                      {cta.primary.label}
                    </Link>
                  ) : null}
                  {cta?.secondary ? (
                    <Link
                      href={cta.secondary.href}
                      className="text-[15px] font-medium text-[#0066CC] transition-colors duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:text-[#0077ED]"
                    >
                      {cta.secondary.label} →
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/*
        // TODO: 待 page.tsx 改造时,决定是否提取为独立 section
        <div className="mt-8 w-full grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        */}
      </div>

      {/* bottom selector */}
      {slideCount > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-20 px-6 md:bottom-8 md:px-12">
          <div className="mx-auto w-full max-w-[1200px]">
            {activeSlide && (
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.22em] text-white/70">
                {activeSlide.name}
              </p>
            )}
            <div className="flex items-center gap-5">
              <button
                type="button"
                aria-label="Previous"
                className="inline-flex items-center justify-center text-white/50 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:text-white/90"
                onClick={() => go(safeActive - 1)}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div
                className="grid flex-1 items-center gap-3"
                style={{ gridTemplateColumns: `repeat(${slideCount}, minmax(0, 1fr))` }}
              >
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(i)}
                    className="group flex w-full items-center py-2"
                    aria-current={i === safeActive ? "true" : "false"}
                    aria-label={`Go to ${s.name}`}
                  >
                    <span
                      className={
                        "block h-[1.5px] w-full transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] " +
                        (i === safeActive ? "opacity-100 bg-white" : "opacity-30 bg-white group-hover:opacity-60")
                      }
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Next"
                className="inline-flex items-center justify-center text-white/50 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:text-white/90"
                onClick={() => go(safeActive + 1)}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

