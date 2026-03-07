/// <reference types="react" />
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal, { type RevealProps } from "@/components/Reveal";
import HeroShowcase, { type HeroSlide } from "@/components/HeroShowcase";

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "model-b",
    name: "MODEL B",
    tagline: "Smart control. Everyday ready.",
    imageSrc: "/images/hero.jpg",
    imageAlt: "Smart standing desk hero scene",
  },
  {
    id: "office",
    name: "DESK PRO",
    tagline: "Home office focus.",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "Home office scene",
  },
  {
    id: "learning",
    name: "FAMILY MODE",
    tagline: "One desk for all.",
    imageSrc: "/images/scene-learning.jpg",
    imageAlt: "Family learning scene",
  },
  {
    id: "relax",
    name: "STUDIO",
    tagline: "Work, read, relax.",
    imageSrc: "/images/scene-relax.jpg",
    imageAlt: "Multi-purpose room scene",
  },
];

export default function Home() {
  return (
    <main>
      <HeroShowcase slides={HERO_SLIDES} />

      <section className="relative overflow-hidden py-14">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#f5f5f0] via-[#faf9f6] to-[#ebebe6]"
          aria-hidden
        />

        {/* Grid 父容器：相对定位 + 底层巨大光晕（玻璃才有东西可折射） */}
        <div className="relative mx-auto max-w-content overflow-hidden px-6">
          <div className="absolute -z-10 -left-24 top-0 h-96 w-96 rounded-full bg-stone-300/40 blur-[100px]" aria-hidden />
          <div
            className="absolute -z-10 -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-orange-100/30 blur-[120px]"
            aria-hidden
          />
          <div
            className="absolute -z-10 left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/25 blur-[100px]"
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Dual Motor Lift",
                desc: "稳定顺滑，静音升降，支持长时间高频调节。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20h10M9 20V8m6 12V8M6 8h12M8 8V5a2 2 0 012-2h4a2 2 0 012 2v3" />
                  </svg>
                ),
              },
              {
                title: "Height Memory",
                desc: "四组高度记忆，一键切换办公/学习/站立模式。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Voice Control",
                desc: "支持语音助手，解放双手完成高度调整。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 10v2a7 7 0 01-14 0v-2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19v2" />
                  </svg>
                ),
              },
              {
                title: "Cable Management",
                desc: "隐藏式理线槽与走线孔，让桌面始终干净利落。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h6M7 16h10" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
                  </svg>
                ),
              },
              {
                title: "Anti-collision",
                desc: "智能防撞检测，遇到障碍立即回弹，保护桌面与家人。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "TÜV Safety",
                desc: "关键结构通过 TÜV 等级测试，经久耐用更放心。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3 6 6 .9-4.5 4.4 1.1 6.2L12 16.9 6.4 19.5l1.1-6.2L3 8.9 9 8l3-6z" />
                  </svg>
                ),
              },
              {
                title: "Wide Height Range",
                desc: "覆盖 60–125cm，高个与儿童都能找到舒适区间。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 4h8M8 20h8M12 4v16" />
                  </svg>
                ),
              },
              {
                title: "Low Noise",
                desc: "运行噪音低于 50dB，深夜升降也不打扰家人。",
                icon: (
                  <svg className="h-5 w-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8v8m4-11v14m4-9v4m4-6a4 4 0 010 6" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative flex flex-col gap-3 rounded-3xl border border-white/60 border-t-white/80 bg-white/25 p-7 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-[40px] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/80 hover:bg-white/35"
              >
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500">{f.desc}</p>
                </div>
              </div>
            ))}
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
          <div className="mx-auto mt-14 max-w-5xl space-y-0">
            {[
              {
                name: "Sarah J.",
                role: "Freelance Designer",
                quote: "Finally no more lower back pain after long workdays.",
                image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600",
                imageAlt: "升降桌办公场景",
              },
              {
                name: "Michael T.",
                role: "Software Engineer",
                quote: "Quiet enough for late-night coding.",
                image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600",
                imageAlt: "桌面与显示器使用",
              },
              {
                name: "Emma L.",
                role: "Parent & WFH",
                quote: "One desk for homework and my meetings.",
                image: "https://images.unsplash.com/photo-1593062096033-9a26f09a8d7e?q=80&w=600",
                imageAlt: "家用办公桌场景",
              },
              {
                name: "James K.",
                role: "Product Manager",
                quote: "TÜV and 5-year motor warranty sold me.",
                image: "https://images.unsplash.com/photo-1507925921952-c4e2579030c0?q=80&w=600",
                imageAlt: "桌面产品使用",
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 2 : 3}>
                <div
                  className={`group flex flex-col gap-4 border-b border-warm-gray/60 py-6 transition-all duration-300 first:pt-6 last:border-b-0 hover:bg-warm-cream/50 md:flex-row md:items-center md:gap-10 md:px-6 md:py-5 md:hover:shadow-[inset_4px_0_0_0_rgba(91,107,122,0.35)] ${
                    i % 2 === 1 ? "md:flex-row-reverse md:hover:shadow-[inset_-4px_0_0_0_rgba(91,107,122,0.35)]" : ""
                  }`}
                >
                  <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-lg bg-warm-gray/30 transition-transform duration-300 group-hover:shadow-md md:h-28 md:w-44">
                    <Image
                      src={t.image}
                      alt={t.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 11rem"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium text-foreground md:text-lg">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-stone-900">{t.name}</span>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                      <span className="text-xs text-warm-muted">Verified Buyer</span>
                    </div>
                    <p className="mt-0.5 text-xs text-warm-muted">{t.role}</p>
                  </div>
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
