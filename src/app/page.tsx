/// <reference types="react" />
import Image from "next/image";
import Link from "next/link";
import Reveal, { type RevealProps } from "@/components/Reveal";
import HeroShowcase, { type HeroSlide } from "@/components/HeroShowcase";
import TestimonialsSection, { type TestimonialItem } from "@/components/TestimonialsSection";

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

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Sarah J.",
    role: "Freelance Designer",
    region: "上海",
    countryCode: "CN",
    scene: "办公场景",
    quote: "Finally no more lower back pain after long workdays.",
    image: "/images/scene-office.jpg",
    imageAlt: "升降桌办公场景",
    productModel: "Model B",
    purchaseDate: "2024年3月",
  },
  {
    name: "Michael T.",
    role: "Software Engineer",
    region: "北京",
    countryCode: "CN",
    scene: "开发场景",
    quote: "Quiet enough for late-night coding.",
    image: "/images/scene-office.jpg",
    imageAlt: "桌面与显示器使用",
    productModel: "Model B",
    purchaseDate: "2024年1月",
  },
  {
    name: "Emma L.",
    role: "Parent & WFH",
    region: "深圳",
    countryCode: "CN",
    scene: "亲子学习",
    quote: "One desk for homework and my meetings.",
    image: "/images/scene-learning.jpg",
    imageAlt: "家用办公桌场景",
    productModel: "Desk Pro",
    purchaseDate: "2024年5月",
  },
  {
    name: "James K.",
    role: "Product Manager",
    region: "杭州",
    countryCode: "CN",
    scene: "会议/办公",
    quote: "TÜV and 5-year motor warranty sold me.",
    image: "/images/scene-office.jpg",
    imageAlt: "桌面产品使用",
    productModel: "Model C",
    purchaseDate: "2024年2月",
  },
  {
    name: "Lisa W.",
    role: "UX Designer",
    region: "广州",
    countryCode: "CN",
    scene: "办公场景",
    quote: "Height memory is a game-changer. I switch between standing for meetings and sitting for deep work without thinking about it.",
    image: "/images/height-memory.png",
    imageAlt: "办公场景",
    productModel: "Model B",
    purchaseDate: "2024年4月",
  },
  {
    name: "David C.",
    role: "Teacher",
    region: "成都",
    countryCode: "CN",
    scene: "书房",
    quote: "学生和老师都能用，高度范围够大。",
    image: "/images/scene-learning.jpg",
    imageAlt: "书房场景",
    productModel: "Desk Pro",
    purchaseDate: "2023年11月",
  },
  {
    name: "Anna Z.",
    role: "Writer",
    region: "南京",
    countryCode: "CN",
    scene: "居家办公",
    quote: "静音升降太重要了，夜里写稿不会吵到家人。语音调高度也很方便。",
    image: "/images/scene-relax.jpg",
    imageAlt: "居家办公",
    productModel: "Model B",
    purchaseDate: "2024年6月",
  },
  {
    name: "Tom H.",
    role: "Developer",
    region: "武汉",
    countryCode: "CN",
    scene: "开发场景",
    quote: "Sturdy and quiet. The cable tray keeps my desk clean.",
    image: "/images/scene-office.jpg",
    imageAlt: "开发桌面",
    productModel: "Model C",
    purchaseDate: "2023年9月",
  },
];

export default function Home() {
  return (
    <main>
      <HeroShowcase slides={HERO_SLIDES} />

      <section className="relative overflow-hidden bg-[#050608] py-20 md:py-24">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/scene-office.jpg"
            alt=""
            fill
            className="object-cover opacity-15 grayscale"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/95" />
          <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-white/5 blur-[110px]" />
          <div className="absolute -right-16 bottom-8 h-80 w-80 rounded-full bg-sky-300/10 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">The Problem</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl md:leading-[1.08]">
              The &quot;Smart&quot; Desk Dilemma: It Forces You to Choose Between Health and Focus.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              You should never need to choose between cognitive flow and physical wellbeing.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="mt-12 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-relaxed text-white/90 md:text-base">
                      Nobody ignores health on purpose. Traditional standing desks fail because they require your active attention at the exact moment you are most focused.
                    </p>
                  </div>
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <Image
                      src="/images/scene-office.jpg"
                      alt="Focused coding scene"
                      fill
                      className="object-cover brightness-75"
                      sizes="112px"
                    />
                  </div>
                </div>
              </article>
              <article className="rounded-2xl border border-white/10 bg-black/30 p-6 md:p-7">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">Core Conflict</p>
                <p className="mt-3 text-xl font-medium leading-snug text-white md:text-2xl">
                  You keep your flow,
                  <br />
                  or you protect your body.
                </p>
                <div className="mt-4 relative h-16 w-full overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src="/images/hero.jpg"
                    alt="Desk environment detail"
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              </article>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 md:mt-6 md:grid-cols-2">
            <Reveal delay={2}>
              <article className="rounded-2xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">The Ignored Nudges</p>
                <p className="mt-2.5 text-sm leading-relaxed text-white/85 md:text-base">
                  &quot;One more minute.&quot; Then two hours pass. Alerts are soft, but cognitive lock-in is strong.
                </p>
                <div className="mt-4 relative h-16 w-full overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src="/images/scene-learning.jpg"
                    alt="Long sitting work session"
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </article>
            </Reveal>

            <Reveal delay={3}>
              <article className="rounded-2xl border border-white/12 bg-black/30 p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">The Context Switch</p>
                <p className="mt-2.5 text-sm leading-relaxed text-white/85 md:text-base">
                  Reaching for controls breaks visual focus; by the time the desk moves, your mental stack is already gone.
                </p>
                <div className="mt-4 relative h-16 w-full overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src="/images/height-memory.png"
                    alt="Control panel interaction"
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal delay={3}>
            <div className="mt-10 border-l border-white/35 pl-4 md:pl-5">
              <p className="text-lg font-medium text-white md:text-2xl">
                You shouldn&apos;t have to interrupt your workflow to save your spine.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07090c] py-16 md:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-white/5 blur-[130px]" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">The Magic</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
              Meet the &quot;Subtle Shift&quot;: Gentle Technology at Work.
            </h2>
            <p className="mt-4 max-w-4xl text-base text-white/75 md:text-lg">
              认识“无感升降”：温柔科技的实践。
            </p>
            <p className="mt-6 max-w-4xl text-sm leading-relaxed text-white/80 md:text-base">
              FlowShift 采用环境式智能（Ambient Intelligence）设计：最好的科技，不是频繁打断你，而是在你几乎感觉不到它存在的情况下，悄悄把环境调到最适合深度工作的状态。
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <Reveal delay={1}>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                <div className="relative aspect-video">
                  <Image
                    src="/images/scene-office.jpg"
                    alt="一杯满水放在桌角，桌面缓慢升降且水面保持稳定的演示画面"
                    fill
                    className="object-cover brightness-[0.75]"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/90">
                    Timelapse Demo GIF (Placeholder)
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/90">
                      Rises at micro-millimeters per second
                    </span>
                    <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/90">
                      Water surface stays steady
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">Dynamic Metrics</p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold text-white">micro-mm/s</p>
                    <p className="mt-1 text-sm text-white/65">Ultra-slow adaptive lift speed</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold text-white">&lt; 45 dB</p>
                    <p className="mt-1 text-sm text-white/65">Quiet motor profile for deep focus</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold text-white">0 abrupt cues</p>
                    <p className="mt-1 text-sm text-white/65">No harsh alarms, no forced context switch</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06080c] py-16 md:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-indigo-300/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-4 h-72 w-72 rounded-full bg-cyan-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">The AI Copilot</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
              Syncs with Your Brain, Not Just Your Room.
            </h2>
            <p className="mt-4 max-w-4xl text-base text-white/75 md:text-lg">
              与你的大脑同步，而不仅仅是你的房间。
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-white/80 md:text-base">
              FlowShift 不只是升降桌，更是软硬一体的 AI 工作站：它理解你的专注状态、工具链与疲劳节奏，让环境围绕你的认知流自动调参。
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Reveal delay={0}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/35">
                <div className="relative aspect-video">
                  <Image
                    src="/images/scene-office.jpg"
                    alt="IDE Focus Mode：代码编辑器全屏时，桌面自动静音通知"
                    fill
                    className="object-cover brightness-[0.7]"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85">
                    IDE Focus Mode UI (Placeholder)
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">01</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">IDE Focus Mode</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    当编辑器进入全屏深度编码，桌面系统自动静音非关键通知，减少视觉与听觉干扰，让你不被环境打断。
                  </p>
                  <p className="mt-2 text-xs text-white/60">
                    IDE 专注联动：代码进入冲刺态，桌面进入静默态。
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={1}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/35">
                <div className="relative aspect-video">
                  <Image
                    src="/images/hero.jpg"
                    alt="LLM Integration：触控面板 AI 呼吸灯与 API Key 极简输入界面"
                    fill
                    className="object-cover brightness-[0.68]"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85">
                    API Key Minimal Panel (Placeholder)
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">02</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">LLM Integration</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    触控面板提供极简 API Key 接入流程，状态灯以“呼吸光”反馈模型在线状态，帮助你在本地或云端快速接入 AI 能力。
                  </p>
                  <p className="mt-2 text-xs text-white/60">
                    大模型接入：从硬件面板到开发工作流，一次配置，持续可用。
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={2}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/35 md:col-span-2 xl:col-span-1">
                <div className="relative aspect-video">
                  <Image
                    src="/images/scene-learning.jpg"
                    alt="Smart Fatigue Tracking：系统自动计算久坐阈值并触发无感干预"
                    fill
                    className="object-cover brightness-[0.72]"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85">
                    Passive Fatigue Model (Placeholder)
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">03</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Smart Fatigue Tracking</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    不需要你主动去按，系统会综合你的久坐时长与工作节奏，自动计算疲劳阈值并触发轻量、无感的姿态干预。
                  </p>
                  <p className="mt-2 text-xs text-white/60">
                    智能疲劳追踪：少一点意志力消耗，多一点身体与认知的长期稳定性。
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#05070a] py-16 md:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-8 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-blue-300/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">The Hardware</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
              Over-Engineered for the Ultimate Setup.
            </h2>
            <p className="mt-4 max-w-4xl text-base text-white/75 md:text-lg">
              为终极桌面生态而过度设计。
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Reveal delay={1}>
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/scene-office.jpg"
                    alt="FlowShift 硬件爆炸图：展示材质、尺寸、理线系统与三节双电机底盘"
                    fill
                    className="object-cover brightness-[0.72]"
                    sizes="(max-width: 1024px) 100vw, 62vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white/85">
                    Exploded View (Placeholder)
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="space-y-3 rounded-2xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur">
                {[
                  "矩阵黑 / 量子白：静电喷粉哑光工艺，ENF 级环保无醛",
                  "1600x800mm 画布：可容纳超宽带鱼屏 + 双竖屏 + 主机",
                  "极致暗黑理线系统：桌底走线槽吞噬所有乱线",
                  "三节双电机底盘：跑车级稳定性 + 10 年质保",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white/85">
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={3}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-black/45">
              <div className="relative aspect-[21/9]">
                <Image
                  src="/images/hero.jpg"
                  alt="矩阵黑桌面边缘微距：圆润倒角、无缝质感、细腻哑光表面"
                  fill
                  className="object-cover brightness-[0.7]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-center">
                  <p className="text-2xl font-semibold text-white md:text-4xl">
                    Powder Coated MDF. Engineering the perfect surface.
                  </p>
                  <p className="mt-3 text-sm text-white/75 md:text-lg">
                    We didn&apos;t just build a desk. We reinvented the canvas.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Reveal delay={0}>
              <article className="rounded-2xl border border-white/15 bg-black/35 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">The Seamless Edge</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Zero Seams. Zero Swelling.</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  传统桌板封边条会剥落并渗入湿气。FlowShift 通过 360 度全方位包裹彻底消灭接缝，让水分无隙可乘，长期使用依然稳定。
                </p>
              </article>
            </Reveal>
            <Reveal delay={1}>
              <article className="rounded-2xl border border-white/15 bg-black/35 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">The Pure Air</p>
                <h3 className="mt-2 text-xl font-semibold text-white">0 Glue. True 0 VOC.</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  告别含有机溶剂的贴面胶水。采用物理静电吸附与高温固化工艺，无毒害、无异味，为深度思考保留纯净呼吸空间。
                </p>
              </article>
            </Reveal>
            <Reveal delay={2}>
              <article className="rounded-2xl border border-white/15 bg-black/35 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">The Armor</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Feels like silk. Resists like armor.</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  细腻微磨砂触感带来高级手感，同时具备远超普通贴皮的耐刮抗磨能力，机械键盘、金属主机与重型支架都能稳定承载。
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06080b] py-16 md:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-red-300/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-amber-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">Rewards & Pricing</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Choose Your Flow.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Super Early Bird",
                price: "$699",
                limit: "Limited to 50",
                sold: 44,
                total: 50,
                accent: "from-red-500/90 to-red-400/90",
              },
              {
                name: "Early Bird",
                price: "$899",
                limit: "Limited to 150",
                sold: 98,
                total: 150,
                accent: "from-amber-500/90 to-yellow-400/90",
              },
              {
                name: "Kickstarter Special",
                price: "$999",
                limit: "Limited to 300",
                sold: 126,
                total: 300,
                accent: "from-sky-500/90 to-cyan-400/90",
              },
            ].map((tier, index) => {
              const pct = Math.min(100, Math.round((tier.sold / tier.total) * 100));
              return (
                <Reveal key={tier.name} delay={index as 0 | 1 | 2}>
                  <article className="flex h-full flex-col rounded-2xl border border-white/15 bg-black/40 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white/75">{tier.name}</p>
                        <p className="mt-2 text-4xl font-semibold tracking-tight text-white">{tier.price}</p>
                      </div>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85">
                        {tier.limit}
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>{tier.sold} claimed</span>
                        <span>{tier.total - tier.sold} left</span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${tier.accent}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden />
                        FlowShift 桌子主体（1600x800mm）
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden />
                        极致暗黑理线系统（线槽 + 走线管理）
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden />
                        矩阵黑 / 量子白 自选配色
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden />
                        三节双电机底盘 + 10 年质保
                      </li>
                    </ul>

                    <Link
                      href="/series"
                      className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
                    >
                      立即锁定席位
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#05070b] py-16 md:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-16 top-12 h-72 w-72 rounded-full bg-violet-300/10 blur-[120px]" />
          <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-white/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">The Team & Philosophy</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              From ZJU Labs to Your Workspace.
            </h2>
            <p className="mt-4 text-base text-white/75 md:text-lg">
              Who We Are: Engineering the Flow State
            </p>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              我们是谁：为心流状态而生的缔造者
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Reveal delay={1}>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/scene-office.jpg"
                    alt="FlowShift 团队在实验室和工厂测试原型的真实场景"
                    fill
                    className="object-cover brightness-[0.72]"
                    sizes="(max-width: 1024px) 100vw, 62vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85">
                    Team Lab / Factory Test (Placeholder)
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <article className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur">
                <p className="text-sm leading-relaxed text-white/85">
                  我们来自浙大实验室，用 CS + HCI + 工业设计把“心流理论”做成了实体 AI 工作站。下面是完整品牌故事。
                </p>
                <details className="group mt-5 rounded-xl border border-white/10 bg-black/25 p-4">
                  <summary className="cursor-pointer list-none text-sm font-medium text-white">
                    展开完整故事 / Collapse story
                    <span className="ml-2 text-white/60 group-open:hidden">[点击展开]</span>
                    <span className="ml-2 hidden text-white/60 group-open:inline">[已展开]</span>
                  </summary>

                  <div className="mt-4 space-y-4">
                    <p className="text-sm leading-relaxed text-white/85">
                      We are a collective of PhD and Master&apos;s researchers from Zhejiang University (ZJU), specializing in Computer Science, Human-Computer Interaction (HCI), and Industrial Design. For years, our daily lives involved writing endless lines of code, drafting complex research papers, and endlessly rendering 3D models. We lived in our chairs. We experienced firsthand the physical toll of deep work, and the extreme frustration of having our &quot;flow state&quot; shattered by the jarring alarms of traditional smart devices.
                    </p>
                    <p className="text-sm leading-relaxed text-white/70">
                      我们是一群来自浙江大学的博士和硕士研究人员，深耕于计算机科学、人机交互（HCI）和工业设计领域。多年来，我们的日常就是编写无尽的代码、撰写复杂的学术论文以及无休止地渲染 3D 模型。我们几乎“长”在了椅子上。我们亲身体验了深度工作对身体的消耗，以及“心流状态”被传统智能设备刺耳的警报声生硬打断时的极度挫败感。
                    </p>
                    <p className="text-sm leading-relaxed text-white/85">
                      In our HCI research, we explore concepts like &quot;Gentle Technology&quot; and &quot;Ethical Friction&quot;—the philosophy that technology shouldn&apos;t always scream for our instant attention. Sometimes, deliberately slowing down an interaction is the best way to protect our cognitive and physical well-being. We looked at traditional standing desks and realized they were designed completely backward: they were passive machines that forced humans to adapt to their disruptive mechanical rhythms.
                    </p>
                    <p className="text-sm leading-relaxed text-white/70">
                      在人机交互研究中，我们一直在探索“温柔科技”和“伦理摩擦”的概念——即技术不应总是尖叫着争夺我们的注意力。有时候，刻意放缓交互节奏，才是保护我们认知和身体健康的最佳方式。我们审视了传统的升降桌，意识到它们的设计逻辑完全反了：它们是被动的机器，强迫人类去适应它们那充满干扰的机械节奏。
                    </p>
                    <p className="text-sm leading-relaxed text-white/85">
                      We decided to change that. FlowShift is the culmination of our three disciplines. Our CS team engineered the local LLM integrations to sync directly with your workflow. Our HCI researchers designed the micro-millimeter &quot;Subtle Shift&quot; engine-a physiological intervention completely invisible to your conscious mind. And our Industrial Design team obsessively crafted the physical form, insisting on zero-emission, seamless Powder Coated MDF and an absolute cable management system to eliminate visual clutter.
                    </p>
                    <p className="text-sm leading-relaxed text-white/70">
                      我们决定改变这一切。FlowShift 是我们三个学科领域的结晶。我们的计算机团队开发了本地大模型集成，使其与你的工作流直接同步。我们的 HCI 研究员设计了微毫米级的“无感升降”引擎——一种对你的意识完全隐形的生理干预。而我们的工业设计团队则对物理形态进行了近乎偏执的雕琢，坚持采用零甲醛、无缝接的静电喷粉 MDF 板材和极致的暗黑理线系统，彻底抹除视觉上的杂乱。
                    </p>
                    <p className="border-l-2 border-white/35 pl-4 text-sm leading-relaxed text-white/85">
                      It&apos;s not just a desk. It&apos;s an academic theory engineered into a physical AI Workstation. We are bringing the intelligence of the lab directly to your workspace. Join us, and let&apos;s redefine how the world works.
                    </p>
                    <p className="pl-4 text-sm leading-relaxed text-white/70">
                      它不仅仅是一张桌子。它是一个被转化为实体 AI 工作站的学术理论。我们正将实验室里的智能直接带到你的工作空间。加入我们，一起重新定义世界的工作方式。
                    </p>
                  </div>
                </details>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06080c] py-16 md:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-300/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-emerald-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">Timeline & Shipping</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Build Plan You Can Track.
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="mt-10 overflow-x-auto">
              <div className="min-w-[980px] rounded-2xl border border-white/15 bg-black/35 p-6">
                <div className="grid grid-cols-6 gap-4">
                  {[
                    { name: "Concept", done: true },
                    { name: "Prototyping", done: true },
                    { name: "Kickstarter Launch", done: false },
                    { name: "Tooling & Production", done: false },
                    { name: "Ocean Freight", done: false },
                    { name: "Local Delivery", done: false },
                  ].map((item, idx, arr) => (
                    <div key={item.name} className="relative">
                      <div className="flex flex-col items-start">
                        <span
                          className={
                            "inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium " +
                            (item.done
                              ? "border-emerald-300/60 bg-emerald-300/15 text-emerald-200"
                              : "border-white/25 bg-white/5 text-white/75")
                          }
                        >
                          {item.done ? "✓" : idx + 1}
                        </span>
                        <p className="mt-3 text-sm text-white/85">{item.name}</p>
                        <p className="mt-1 text-xs text-white/55">{item.done ? "Completed" : "Planned"}</p>
                      </div>
                      {idx < arr.length - 1 && (
                        <span className="absolute left-10 top-4 h-px w-[calc(100%-1rem)] bg-white/20" aria-hidden />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-8 rounded-2xl border border-amber-300/40 bg-amber-400/10 p-6">
              <p className="text-base font-semibold text-amber-100">
                Shipping is NOT included. Collected via Pledge Manager later.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-amber-50/85">
                运费不包含在本次 pledge 金额中，后续会通过 Pledge Manager 单独收取并确认地址。
              </p>
              <ul className="mt-4 space-y-2 text-sm text-amber-50/90">
                <li>美国：西海岸入仓 + 本地尾程配送，降低末端延误风险。</li>
                <li>欧洲：EU 区域中转仓分发，优先保障主要国家清关与派送稳定。</li>
                <li>亚太：混合仓储与分批履约策略，按地区波次发货并同步追踪号。</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#05070a] py-16 md:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-16 top-12 h-72 w-72 rounded-full bg-cyan-300/10 blur-[120px]" />
          <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-indigo-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-content px-6 text-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              常见问题解答
            </h2>
          </Reveal>

          <div className="mt-10 space-y-8">
            <Reveal delay={1}>
              <div className="rounded-2xl border border-white/15 bg-black/35 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">
                  一、关于核心黑科技 (The Technology &amp; &quot;Subtle Shift&quot;)
                </p>
                <div className="mt-5 space-y-5">
                  <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">
                      Q1: How slow is the &quot;Subtle Shift&quot; exactly? Will it distract me?
                      (无感升降到底有多慢？会打扰我吗？)
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      A: Not at all. We designed FlowShift based on the principles of gentle technology and ambient intelligence. Instead of a sudden, jarring mechanical movement, the desk rises at a micro-millimeter per second pace. The transition from sitting to standing takes several minutes, acting as a subtle physical intervention that your conscious mind barely registers. Your flow state remains completely unbroken.
                    </p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">
                      Q2: Which LLM APIs does the desk support, and how do I connect them?
                      (桌子支持哪些大模型 API，我该如何连接？)
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      A: FlowShift supports major LLM APIs (like OpenAI, Anthropic, etc.) via our companion desktop app. You simply input your API key into the app, and the desk&apos;s integrated control module syncs seamlessly. It operates locally to trigger your IDE focus modes, mute notifications, and manage your &quot;Flow&quot; sessions.
                    </p>
                  </article>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="rounded-2xl border border-white/15 bg-black/35 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">
                  二、关于材质与硬核参数 (Materials &amp; Specifications)
                </p>
                <div className="mt-5 space-y-5">
                  <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">
                      Q3: Is the 1600x800mm desktop one solid piece, or spliced together?
                      (1600x800mm 的桌面是一整块实木还是拼接的？)
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      A: It is a single, massive, uninterrupted 1600x800mm solid piece. We use top-tier ENF-grade material, ensuring zero formaldehyde emissions. It&apos;s finished with an industrial-grade Powder Coating that provides a premium matte texture (Matrix Black or Quantum White), making it highly scratch-resistant and visually stunning without any glare.
                    </p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">
                      Q4: How stable is the desk at its maximum height?
                      (桌子在最高处有多稳？)
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      A: Rock solid. FlowShift is built on a heavy-duty, commercial-grade 3-stage dual-motor frame. Even fully extended, you can type aggressively without your monitors shaking or your coffee spilling.
                    </p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">
                      Q5: Will my specific dual/triple monitor arm fit?
                      (我的双屏/三屏显示器支架能装上吗？)
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      A: Yes. The edge profile of the desktop is specifically designed to accommodate all standard C-clamp monitor arms perfectly, without interfering with the absolute cable management system underneath.
                    </p>
                  </article>
                </div>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="rounded-2xl border border-white/15 bg-black/35 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">
                  三、关于发货与全球物流 (Shipping &amp; Logistics)
                </p>
                <div className="mt-5 space-y-5">
                  <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">
                      Q6: Why is shipping not included in the pledge price?
                      (为什么众筹价格里不包含运费？)
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      A: FlowShift is a premium, heavy-duty piece of hardware (weighing roughly 45-50kg packaged). Shipping costs fluctuate greatly depending on your exact location. To offer you the lowest possible pledge price today, we will calculate and collect the exact shipping fees via a Pledge Manager after the campaign ends, ensuring transparent and fair pricing.
                    </p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">
                      Q7: How will you handle global shipping for such a heavy item?
                      (对于这么重的物品，你们如何处理全球物流？)
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      A: We use a highly optimized hybrid fulfillment strategy. For our core backers in the US, EU, UK, and AU, we ship via ocean freight to local 3PL warehouses first, and then use local couriers (like UPS/FedEx/DPD) for final delivery. For our backers in the Asia-Pacific region (like Japan, Korea, Singapore), we ship directly from our world-class manufacturing facilities in Malaysia and China. This minimizes transit times and dramatically reduces the risk of shipping damage.
                    </p>
                  </article>
                </div>
              </div>
            </Reveal>

            <div className="rounded-2xl border border-white/15 bg-black/35 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">
                四、关于售后保障 (Warranty &amp; Support)
              </p>
              <div className="mt-5">
                <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">
                    Q8: What exactly does the 10-Year Ironclad Warranty cover?
                    (10年硬核质保具体包含什么？)
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    A: We stand by our engineering. The 10-year warranty covers all mechanical and structural components, including the dual motors, the steel frame, and the lifting mechanisms. The electronic components (control panel, built-in AI module) are covered by a comprehensive 3-year warranty.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 健康指南：场景化科普，传递「购买的是健康生活方式」 */}
      <section className="bg-warm-cream py-section md:py-section-md">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
              健康指南
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-body text-warm-muted">
              一张好桌，撑起健康办公。用场景化方式了解坐站交替、人体工学与久坐提醒，让每一天都在最舒适的状态。
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-warm-gray/40 bg-warm-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch">
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    科学设计，为健康加分
                  </h3>
                  <p className="mt-3 text-body text-warm-muted">
                    升降桌专为久坐人群、远程办公与家庭学习设计，注重舒适与可持续使用。
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-foreground">
                    {[
                      "坐站交替，减少久坐风险",
                      "人体工学支撑，缓解肩颈腰背压力",
                      "高度记忆与久坐提醒，养成好习惯",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/guide"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                  >
                    查看健康办公指南
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 p-6 md:gap-5 md:p-8">
                  <div className="flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-warm-gray/40">
                      <Image
                        src="/images/height-memory.png"
                        alt="站立办公"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-warm-stone">
                      站立办公
                    </p>
                    <p className="mt-0.5 text-xs text-warm-muted">坐站交替，减轻久坐负担</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-warm-gray/40">
                      <Image
                        src="/images/voice-control.png"
                        alt="坐姿办公"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-warm-stone">
                      坐姿办公
                    </p>
                    <p className="mt-0.5 text-xs text-warm-muted">一键记忆，找回舒适高度</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TestimonialsSection items={TESTIMONIALS} />

      {/* P2：买的不是家具，hero 首图做背景、黑白+低对比 */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover grayscale contrast-[0.85] brightness-[0.92]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-warm-white/75" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-2xl px-6 py-10 text-center md:py-14">
          <Reveal>
            <p className="text-2xl font-semibold text-foreground md:text-3xl">
              买的不是家具，是健康生活方式。
            </p>
            <p className="mt-3 text-body text-warm-muted">
              电机 5 年质保 · 结构 3 年质保 · TÜV 安全认证
            </p>
            <Link
              href="/series"
              className="btn-primary mt-10 inline-block px-10 py-4"
            >
              前往选购
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
