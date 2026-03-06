/// <reference types="react" />
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

      <section className="bg-stone-50/90 py-14">
        <div className="mx-auto max-w-content px-6">
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
                className="group flex flex-col gap-3 rounded-3xl bg-stone-50/95 p-7 text-left shadow-[0_0_0_1px_rgba(214,211,209,0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/70"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{f.title}</p>
                  <p className="mt-1 text-sm text-stone-500">{f.desc}</p>
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
