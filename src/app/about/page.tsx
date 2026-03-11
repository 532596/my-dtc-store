import Link from "next/link";
import Reveal from "@/components/Reveal";

const VALUES = [
  {
    title: "健康办公",
    desc: "减少久坐、高度记忆与久坐提醒，用数据与产品支撑健康习惯。",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "空间优化",
    desc: "紧凑到全尺寸多款可选，小户型与多人桌面都能找到合适方案。",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    title: "智能便捷",
    desc: "静音电机、语音/按键控制、四档记忆与遇阻回弹，可靠易用。",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

const PHILOSOPHY_BULLETS = [
  "以温暖家居气质为基底，产品融入家庭与办公室场景。",
  "叠加工程可信表达：静音、承重、认证与质保数据可查。",
  "用健康数据与生活场景叙事传递价值，而非仅卖家具。",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-warm-gray/30 bg-gradient-to-b from-warm-gray/5 to-transparent">
        <div className="mx-auto max-w-content px-6 py-10 md:py-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">About</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Smart Standing Desk
            </h1>
            <p className="mt-4 max-w-2xl text-body text-warm-muted">
              聚焦健康办公、空间优化与智能便捷。我们相信：买的不是家具，是健康生活方式。
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <span className="rounded-full border border-warm-gray/40 bg-warm-white px-4 py-2 text-warm-muted">
                Warm Home + Precise Tech
              </span>
              <Link
                href="/about#stories"
                className="rounded-full border border-accent/40 bg-accent-light/30 px-4 py-2 font-medium text-foreground transition hover:bg-accent-light/50"
              >
                客户故事 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 三大价值：卡片网格 */}
      <section className="mx-auto max-w-content px-6 py-10 md:py-14">
        <Reveal>
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">我们关注的三件事</h2>
          <p className="mt-1 max-w-xl text-sm text-warm-muted">
            从产品设计到品牌表达，都围绕健康、空间与智能展开。
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
              <div className="flex flex-col rounded-2xl border border-warm-gray/40 bg-warm-white p-6 transition hover:border-warm-gray/60 hover:shadow-md">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/40 text-accent">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={v.icon} />
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-warm-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 品牌理念：展开为列表 + 视觉区分 */}
      <section className="border-t border-warm-gray/30 bg-warm-gray/5">
        <div className="mx-auto max-w-content px-6 py-10 md:py-14">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">品牌理念</h2>
            <p className="mt-2 max-w-2xl text-sm text-warm-muted">
              Warm Home + Precise Tech。以温暖家居气质为基底，叠加工程可信表达，用健康数据与生活场景叙事传递价值。
            </p>
            <ul className="mt-6 space-y-3">
              {PHILOSOPHY_BULLETS.map((text) => (
                <li key={text.slice(0, 12)} className="flex gap-3 text-sm text-warm-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 信任与保障：精简标题 + 三块关键词 + 支持中心入口 */}
      <section className="mx-auto max-w-content px-6 py-12 md:py-16">
        <Reveal>
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">信任与保障</h2>
          <p className="mt-2 text-sm text-warm-muted">认证、质保与售后，一目了然。</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-warm-gray/30 bg-warm-white px-6 py-6 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent" aria-hidden>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">权威认证</h3>
              <p className="mt-1.5 text-sm text-warm-muted">TÜV 等多重认证，参数可查</p>
            </div>
            <div className="rounded-2xl border border-warm-gray/30 bg-warm-white px-6 py-6 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent" aria-hidden>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">长周期质保</h3>
              <p className="mt-1.5 text-sm text-warm-muted">电机 5 年，结构 3–5 年</p>
            </div>
            <div className="rounded-2xl border border-warm-gray/30 bg-warm-white px-6 py-6 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent" aria-hidden>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">可视化服务</h3>
              <p className="mt-1.5 text-sm text-warm-muted">安装指南与物流可追踪</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/support/warranty"
              className="inline-flex items-center gap-2 rounded-full border border-warm-gray/40 bg-warm-white px-5 py-2.5 font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
            >
              质保政策
            </Link>
            <Link
              href="/support/returns"
              className="inline-flex items-center gap-2 rounded-full border border-warm-gray/40 bg-warm-white px-5 py-2.5 font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
            >
              配送与退换
            </Link>
            <Link
              href="/support#contact"
              className="inline-flex items-center gap-2 rounded-full border border-warm-gray/40 bg-warm-white px-5 py-2.5 font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
            >
              联系我们
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 客户故事入口 + CTA */}
      <section id="stories" className="border-t border-warm-gray/30 bg-warm-gray/5">
        <div className="mx-auto max-w-content px-6 py-10 md:py-14">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">客户故事</h2>
            <p className="mt-2 max-w-xl text-sm text-warm-muted">
              来自居家办公与企业的真实使用体验，看看他们如何用智能升降桌改变工作方式。
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/about#stories"
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5"
              >
                阅读故事
              </Link>
              <Link
                href="/series"
                className="inline-flex items-center gap-2 rounded-xl border border-warm-gray/40 bg-warm-white px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/30"
              >
                查看产品 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
