/// <reference types="react" />
import Image from "next/image";
import Link from "next/link";
import Reveal, { type RevealProps } from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[85vh] overflow-hidden bg-warm-gray/80 md:min-h-[92vh]">
        <Image
          src="/images/hero.jpg"
          alt="Smart desk at home"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-content items-end px-6 pb-14 pt-20 md:min-h-[92vh] md:items-center md:pb-0">
          <div className="max-w-2xl text-warm-white drop-shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl lg:leading-[1.02]">
              Work Healthier. Live Smarter.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
              The smart standing desk for any space and any pace. 一张桌子，满足全家办公学习。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/series"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Shop Now
              </Link>
              <Link
                href="/series#compare"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15"
              >
                Compare
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-warm-gray/50 bg-warm-white py-8">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-12 px-6 md:gap-20">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light">
              <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h2a2 2 0 00-2 2" />
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground">Sit & Stand Ergonomics</span>
          </div>
          <div className="hidden h-8 w-px bg-warm-gray md:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light">
              <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground">Space Optimized Design</span>
          </div>
          <div className="hidden h-8 w-px bg-warm-gray md:block" />
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light">
              <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground">Smart Control System</span>
          </div>
        </div>
      </section>

      <section className="bg-warm-cream py-section md:py-section-md">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
              Why Choose Our Smart Desk?
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {[
              { title: "Boost Your Productivity", desc: "坐站交替减少久坐风险，提升专注效率。", img: "/images/why-choose-1.jpg" },
              { title: "Ergonomic & Healthy", desc: "适配 150–190cm 身高，大人小孩都能用。", img: "/images/why-choose-2.jpg" },
              { title: "Quiet & Stable Performance", desc: "静音升降，深夜办公不扰邻。", img: "/images/why-choose-3.jpg" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
                <div className="overflow-hidden rounded-xl border border-warm-gray/60 bg-warm-white shadow-sm">
                  <div className="relative aspect-[4/3] bg-warm-gray/50">
                    <Image src={item.img} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-body text-warm-muted">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-section md:py-section-md">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
              Adjust to Your Life
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              { title: "Dual Motor", desc: "双电机稳定升降，线缆管理系统。", img: "/images/adjust-1.jpg" },
              { title: "Cable Management", desc: "理线架、无线充电模块可选。", img: "/images/adjust-2.jpg" },
              { title: "Solid Tabletop", desc: "柔和木色桌面，耐用易清洁。", img: "/images/adjust-3.jpg" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
                <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/50 p-6">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-warm-gray/60">
                    <Image src={item.img} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-body text-warm-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-10 text-center">
            <div>
              <p className="text-2xl font-semibold text-foreground">24&quot; - 47&quot;</p>
              <p className="mt-1 text-sm text-warm-muted">Height Range</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">220 lbs</p>
              <p className="mt-1 text-sm text-warm-muted">Load Capacity</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">&lt; 45 dB</p>
              <p className="mt-1 text-sm text-warm-muted">Noise Level</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/series#compare" className="inline-block rounded-xl bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
              Compare Now →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-warm-cream py-section md:py-section-md">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
              Trusted by Thousands
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-body text-warm-muted">
              参数透明，一目了然。
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-14 overflow-hidden rounded-xl border border-warm-gray/60 bg-warm-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-warm-gray bg-warm-cream/50">
                    <th className="p-4 font-semibold text-foreground">Model</th>
                    <th className="p-4 font-semibold text-foreground">Height Range</th>
                    <th className="p-4 font-semibold text-foreground">Weight Capacity</th>
                    <th className="p-4 font-semibold text-foreground">Smart Controls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-warm-gray/50">
                    <td className="p-4 font-medium text-foreground">Model A</td>
                    <td className="p-4 text-warm-muted">24&quot; - 43&quot;</td>
                    <td className="p-4 text-warm-muted">176 lbs</td>
                    <td className="p-4 text-warm-muted">—</td>
                  </tr>
                  <tr className="border-b border-warm-gray/50 bg-accent-light/50">
                    <td className="p-4 font-medium text-foreground">Model B</td>
                    <td className="p-4 text-warm-muted">24&quot; - 47&quot;</td>
                    <td className="p-4 text-warm-muted">220 lbs</td>
                    <td className="p-4 text-foreground">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-foreground">Model C</td>
                    <td className="p-4 text-warm-muted">24&quot; - 50&quot;</td>
                    <td className="p-4 text-warm-muted">265 lbs</td>
                    <td className="p-4 text-foreground">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
          <div className="mt-10 text-center">
            <Link href="/series#compare" className="text-sm font-medium text-accent hover:underline">
              Compare Now →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-section md:py-section-md">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
              What Our Customers Say
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { quote: "Great Investment!", review: "使用前后对比明显，腰背轻松多了。", name: "Zhang" },
              { quote: "Perfect for Remote Work", review: "静音升降，深夜加班不扰家人。", name: "Li" },
              { quote: "Kids Love It", review: "高度可调，孩子写作业、大人办公都能用。", name: "Wang" },
              { quote: "Worth Every Penny", review: "TÜV 认证、5 年电机质保，买得放心。", name: "Chen" },
            ].map((t, i) => (
              <Reveal key={t.quote} delay={i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 2 : 3}>
                <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-warm-gray">
                    <Image src={`/images/avatar-${i + 1}.jpg`} alt="" fill className="object-cover" sizes="48px" />
                  </div>
                  <p className="mt-4 font-medium text-foreground">{t.name}</p>
                  <p className="mt-1 text-warm-stone">★★★★★</p>
                  <p className="mt-3 font-medium text-foreground">&quot;{t.quote}&quot;</p>
                  <p className="mt-2 text-body text-warm-muted">{t.review}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-cream py-section md:py-section-md">
        <div className="mx-auto max-w-content px-6 text-center">
          <Reveal>
            <p className="text-2xl font-semibold text-foreground">
              买的不是家具，是健康生活方式。
            </p>
            <p className="mt-3 text-body text-warm-muted">
              电机 5 年质保 · 结构 3 年质保 · TÜV 安全认证
            </p>
            <Link
              href="/series"
              className="mt-10 inline-block rounded-xl bg-accent px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              前往选购
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
