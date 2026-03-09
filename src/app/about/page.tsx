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

const TRUST_ITEMS = [
  { label: "TÜV 安全认证", sub: "德国莱茵" },
  { label: "人体工学认证", sub: "设计保障" },
  { label: "电机 5 年质保", sub: "结构 3–5 年" },
  { label: "3D 安装指南", sub: "视频教程" },
  { label: "配送时效可查", sub: "透明售后" },
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

      {/* 信任与保障：左右分栏信息卡 */}
      <section className="mx-auto max-w-content px-6 py-10 md:py-14">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.5fr)]">
            {/* 左侧：标题 + 三大承诺 */}
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-foreground md:text-2xl">信任与保障</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-warm-muted">
                  专门为「能否放心买」这一件事做的说明。从国际认证、质保年限到售后响应，用尽量少的字，把最重要的信息说清楚。
                </p>
              </div>
              <div className="grid gap-3 text-sm text-warm-muted sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-warm-gray/40 bg-warm-white px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    Certification
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">权威机构认证</p>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    含 TÜV、安全与人体工学多重认证，关键参数公开可查。
                  </p>
                </div>
                <div className="rounded-2xl border border-warm-gray/40 bg-warm-white px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    Warranty
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">长周期质保</p>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    电机最长 5 年，结构 3–5 年，主要部件质保范围清晰标注。
                  </p>
                </div>
                <div className="rounded-2xl border border-warm-gray/40 bg-warm-white px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    Service
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">可视化服务</p>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    3D 安装指南与配送时效跟踪，让收货、安装与售后都有据可循。
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-warm-muted">
                所有保障条款均可在
                <span className="mx-1 font-medium text-foreground">「支持中心」</span>
                中查看详细说明。
              </p>
            </div>

            {/* 右侧：明细网格 + 支持入口 */}
            <div className="rounded-3xl border border-warm-gray/40 bg-warm-white/90 p-5 shadow-sm shadow-warm-gray/10 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-warm-muted">
                    Transparency
                  </p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    认证与服务一览
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-warm-cream/60 px-3 py-1 text-[11px] font-medium text-warm-muted">
                  实际保障以随箱说明书与官网支持页为准
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TRUST_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-2xl border border-warm-gray/40 bg-warm-cream/10 px-3.5 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-foreground md:text-sm">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-[11px] text-warm-muted md:text-xs">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
                <Link
                  href="/support#warranty"
                  className="inline-flex items-center gap-2 rounded-full border border-warm-gray/50 bg-warm-cream/40 px-4 py-2 font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  质保政策
                </Link>
                <Link
                  href="/support#shipping"
                  className="inline-flex items-center gap-2 rounded-full border border-warm-gray/50 bg-warm-cream/40 px-4 py-2 font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  配送与退换
                </Link>
                <Link
                  href="/support#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-warm-gray/50 bg-warm-cream/40 px-4 py-2 font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  联系我们
                </Link>
              </div>
            </div>
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
