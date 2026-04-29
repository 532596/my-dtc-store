"use client";

import * as React from "react";
import HeroParticleDesk from "@/components/HeroParticleDesk";

export default function HeroShowcase() {
  return (
    <section
      className="relative isolate min-h-svh w-full overflow-hidden bg-[#030305]"
      aria-labelledby="hero-brand-title"
    >
      <HeroParticleDesk className="absolute inset-0 z-0" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,transparent_20%,rgba(3,3,5,0.55)_100%)]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-svh w-full items-center justify-center px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="hero-brand-title"
            className="text-4xl font-bold tracking-[-0.04em] text-white drop-shadow-[0_8px_48px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            FlowShift
          </h1>
          <p
            className="grad-text grad-text--hero-slogan mt-1.5 text-xl font-semibold tracking-[0.12em] sm:mt-2 sm:text-2xl md:mt-2.5 md:text-3xl"
            lang="zh-Hans"
          >
            心流无界
          </p>
        </div>
      </div>
    </section>
  );
}
