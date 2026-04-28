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
        <h1
          id="hero-brand-title"
          className="text-center text-5xl font-bold tracking-[-0.04em] text-white drop-shadow-[0_8px_48px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          FlowShift
        </h1>
      </div>
    </section>
  );
}
