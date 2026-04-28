/// <reference types="react" />
import Image from "next/image";
import Link from "next/link";
import Reveal, { type RevealProps } from "@/components/Reveal";
import HeroShowcase, { type HeroSlide } from "@/components/HeroShowcase";
import SectionFloatingEntry, { type SectionFloatingEntryItem } from "@/components/SectionFloatingEntry";
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

const FLOATING_PART_ENTRIES: SectionFloatingEntryItem[] = [
  { id: "part-01", sectionId: "part-invisible-intervention", label: "了解无感微动巡航", href: "/guide" },
  { id: "part-02", sectionId: "part-cognitive-copilot", label: "了解 AI 认知副驾", href: "/scenarios" },
  { id: "part-03", sectionId: "part-ultimate-canvas", label: "查看硬件与材质细节", href: "/series" },
  { id: "part-04", sectionId: "part-brand-story-03", label: "阅读完整品牌故事", href: "/about" },
  { id: "part-05", sectionId: "part-faq", label: "进入支持与服务中心", href: "/support" },
];

export default function Home() {
  return (
    <main className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <HeroShowcase slides={HERO_SLIDES} />

      <section className="relative overflow-hidden bg-[#050608] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-xl))]">
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

        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          {/* 苹果式：眉题 + 大标题 + 副文案，居中窄行宽 */}
          <Reveal>
            <header className="mx-auto max-w-4xl text-center">
              <h2 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-tight text-white md:mt-7 md:text-5xl md:leading-[1.05] lg:text-[3.25rem]">
                The &quot;Smart&quot; Desk Dilemma: It Forces You to Choose Between Health and Focus.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/65 md:mt-6 md:text-xl md:leading-relaxed">
                You should never need to choose between cognitive flow and physical wellbeing.
              </p>
            </header>
          </Reveal>

          {/* 大图 + 分层说明（上图下文、文居中；首句加粗大字、次句略小） */}
          <Reveal delay={1}>
            <figure className="mx-auto mt-16 max-w-[1068px] md:mt-20">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[12px] bg-neutral-900 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)] md:rounded-[12px]">
                <Image
                  src="/images/scene-office.jpg"
                  alt="Home office with a standing desk"
                  fill
                  className="object-cover brightness-[0.84]"
                  sizes="(max-width: 768px) 100vw, 1068px"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/15"
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" aria-hidden />
                <div className="absolute left-5 top-5 md:left-7 md:top-6">
                  <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white/90">
                    Timelapse Demo GIF (Placeholder)
                  </div>
                </div>
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 md:inset-x-7 md:bottom-6">
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    2 mm/s Ultra-Gentle Motion
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    5-10 cm smooth floating range
                  </span>
                </div>
              </div>
              <figcaption className="mx-auto mt-12 max-w-[40rem] text-center md:mt-14">
                <p className="text-[1.375rem] font-semibold leading-snug tracking-tight text-white md:text-[1.75rem] md:leading-[1.15]">
                  Nobody ignores health on purpose.
                </p>
                <p className="mt-4 text-[1.0625rem] leading-[1.5] text-white/72 md:mt-5 md:text-[1.1875rem] md:leading-[1.47]">
                  Traditional standing desks fail because they require your active attention at the exact moment you are most
                  focused.
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* 三列要点：等宽、居中、少装饰线，接近产品页 feature 三栏 */}
          <Reveal delay={2}>
            <div className="mx-auto mt-20 max-w-5xl border-t border-white/[0.08] pt-16 md:mt-24 md:pt-20">
              <div className="grid gap-14 md:grid-cols-3 md:gap-10 lg:gap-12">
                <div className="group rounded-2xl px-4 py-3 text-center transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-white/[0.03]">
                  <p className="mx-auto max-w-[18rem] text-lg font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-white md:text-xl">
                    You keep your flow, or you protect your body.
                  </p>
                </div>
                <div className="group rounded-2xl px-4 py-3 text-center transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-white/[0.03]">
                  <p className="mx-auto max-w-[18rem] text-[1.0625rem] leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/88 md:text-[17px] md:leading-relaxed">
                    &quot;One more minute.&quot; Then two hours pass. Alerts are soft, but cognitive lock-in is strong.
                  </p>
                </div>
                <div className="group rounded-2xl px-4 py-3 text-center transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-white/[0.03]">
                  <p className="mx-auto max-w-[18rem] text-[1.0625rem] leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/88 md:text-[17px] md:leading-relaxed">
                    Reaching for controls breaks visual focus; by the time the desk moves, your mental stack is already gone.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <p className="mx-auto mt-16 max-w-[36rem] text-center text-[1.3125rem] font-medium leading-snug text-white md:mt-20 md:text-2xl md:leading-snug">
              You shouldn&apos;t have to interrupt your workflow to save your spine.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="part-invisible-intervention"
        className="relative overflow-hidden bg-[#07090c] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-white/5 blur-[130px]" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-4xl font-semibold tracking-tight md:text-6xl">
              The Invisible Intervention
            </h2>
            <p className="mx-auto mt-4 max-w-4xl text-center text-base text-white/75 md:text-lg">
              隐形物理干预：解决“久坐但不想站”。
            </p>
            <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-white/80 md:text-base">
              在深度沉浸场景中，FlowShift 的 Micro-Flow Cruise 会以极缓、无声、几乎不可察觉的节奏，让身体保持微活动，缓解静力性僵硬，同时不打断你的认知流。
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="-mx-6 mt-12 md:-mx-12 md:mt-16">
              <div className="relative aspect-[21/10] w-full md:aspect-[24/9]">
                <Image
                  src="/images/scene-office.jpg"
                  alt="一杯满水放在桌角，桌面缓慢升降且水面保持稳定的演示画面"
                  fill
                  className="object-cover brightness-[0.82]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                <div className="absolute left-6 top-6 md:left-10 md:top-8">
                  <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white/90">
                    Timelapse Demo GIF (Placeholder)
                  </div>
                </div>
                <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2 md:inset-x-10 md:bottom-8">
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    2 mm/s Ultra-Gentle Motion
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    5-10 cm smooth floating range
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="mx-auto mt-12 max-w-5xl border-t border-white/10 pt-12">
              <div className="grid place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10">
                {[
                  {
                    value: "2 mm/s",
                    label: "Micro-Flow Cruise speed",
                    gradient: "bg-gradient-to-r from-[#ff8f3d] via-[#ffc071] to-[#ffe19f]",
                  },
                  {
                    value: "< 45 dB",
                    label: "Quiet motor profile",
                    gradient: "bg-gradient-to-r from-[#ffd98f] via-[#ffe5b1] to-[#fff0cc]",
                  },
                  {
                    value: "5-10 cm",
                    label: "Subtle floating range",
                    gradient: "bg-gradient-to-r from-[#3f7dff] via-[#5ea8ff] to-[#89d1ff]",
                  },
                  {
                    value: "0 打断",
                    label: "No harsh alerts",
                    gradient: "bg-gradient-to-r from-[#ffd07a] via-[#ffe1a8] to-[#fff0ce]",
                  },
                  {
                    value: "10 年",
                    label: "Frame warranty",
                    gradient: "bg-gradient-to-r from-[#ffd998] via-[#ffe8bf] to-[#fff4df]",
                  },
                  {
                    value: "150-195cm",
                    label: "Height adaptability",
                    gradient: "bg-gradient-to-r from-[#2f6fff] via-[#4698ff] to-[#7ec8ff]",
                  },
                ].map((metric) => (
                  <div key={metric.value} className="text-center">
                    <p
                      className={`inline-block bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl ${metric.gradient}`}
                    >
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm text-white/68 md:text-base">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="part-cognitive-copilot"
        className="relative overflow-hidden bg-[#06080c] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-indigo-300/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-4 h-72 w-72 rounded-full bg-cyan-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-4xl font-semibold tracking-tight md:text-6xl">
              The Cognitive Copilot
            </h2>
            <p className="mx-auto mt-4 max-w-4xl text-center text-base text-white/75 md:text-lg">
              认知副驾：不打断思路的软件与 AI 无感介入。
            </p>
            <p className="mx-auto mt-5 max-w-4xl text-center text-sm leading-relaxed text-white/80 md:text-base">
              系统通过网页端接入你常用的 AI Agent，以勿扰式柔性提醒与智能人体工学推荐，在尊重心流的前提下，提供恰到好处的健康陪伴。
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
            <Reveal delay={0}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/35 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/30 hover:bg-black/45 hover:shadow-[0_18px_46px_rgba(0,0,0,0.42)]">
                <div className="relative aspect-video">
                  <Image
                    src="/images/scene-office.jpg"
                    alt="IDE Focus Mode：代码编辑器全屏时，桌面自动静音通知"
                    fill
                    className="object-cover brightness-[0.7] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85">
                    IDE Focus Mode UI (Placeholder)
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold text-white">Ambient Notifications</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    摒弃蜂鸣与震动式打扰。系统仅在后台以温和消息提醒你切换姿态，不强行打断当前思路。
                  </p>
                  <p className="mt-2 text-xs text-white/60">
                    勿扰式柔性提醒：像懂你的助手，而不是警报器。
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/35 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/30 hover:bg-black/45 hover:shadow-[0_18px_46px_rgba(0,0,0,0.42)]">
                <div className="relative aspect-video">
                  <Image
                    src="/images/hero.jpg"
                    alt="LLM Integration：触控面板 AI 呼吸灯与 API Key 极简输入界面"
                    fill
                    className="object-cover brightness-[0.68] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85">
                    API Key Minimal Panel (Placeholder)
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold text-white">Smart Ergonomics</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    输入身高或语音指令后，AI 自动推荐最符合人体工学的坐站高度，让每一毫米升降都更贴合你的身体数据。
                  </p>
                  <p className="mt-2 text-xs text-white/60">
                    智能人体工学推荐：告别反复试探与盲目调节。
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={2}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/35 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/30 hover:bg-black/45 hover:shadow-[0_18px_46px_rgba(0,0,0,0.42)] md:col-span-2 xl:col-span-1">
                <div className="relative aspect-video">
                  <Image
                    src="/images/scene-learning.jpg"
                    alt="Smart Fatigue Tracking：系统自动计算久坐阈值并触发无感干预"
                    fill
                    className="object-cover brightness-[0.72] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85">
                    Passive Fatigue Model (Placeholder)
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold text-white">AI Agent Web Integration</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    不额外强制你下载冗余 App。通过网页端连接你已有工具链，把健康策略自然嵌入现有工作流。
                  </p>
                  <p className="mt-2 text-xs text-white/60">
                    你的工作流不变，健康干预在后台无感发生。
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="part-ultimate-canvas"
        className="relative overflow-hidden bg-[#05070a] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-lg))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-8 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-blue-300/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <header className="mx-auto max-w-4xl text-center">
              <h2 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-tight md:mt-6 md:text-5xl md:leading-[1.05] lg:text-[3.25rem]">
                The Ultimate Canvas / Workstation
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/65 md:mt-6 md:text-xl md:leading-relaxed">
                重新定义美学与性能：硬核工业设计与材质用料，建立高端心智。
              </p>
            </header>
          </Reveal>

          <Reveal delay={1}>
            <div className="mx-auto mt-14 max-w-[1068px] md:mt-16">
              <figure className="m-0">
                <div className="relative aspect-[21/9] overflow-hidden rounded-[12px] bg-neutral-900 shadow-[0_28px_90px_-28px_rgba(0,0,0,0.92)] md:rounded-[12px]">
                  <Image
                    src="/images/scene-office.jpg"
                    alt="FlowShift 硬件爆炸图：展示材质、尺寸、理线系统与三节双电机底盘"
                    fill
                    className="object-cover brightness-[0.84]"
                    sizes="(max-width: 1024px) 100vw, 1068px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" aria-hidden />
                  <div className="absolute left-5 top-5 md:left-7 md:top-6">
                    <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white/90">
                      Hardware Layer Preview (Placeholder)
                    </div>
                  </div>
                  <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 md:inset-x-7 md:bottom-6">
                    <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                      80 cm Deep Work Zone
                    </span>
                    <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                      Dual-motor Stable Lift
                    </span>
                  </div>
                </div>
                <figcaption className="sr-only">硬件场景与结构示意</figcaption>
              </figure>

              <ul className="mx-auto mt-12 grid max-w-5xl list-none gap-x-12 gap-y-12 pl-0 sm:grid-cols-2 md:mt-16 md:gap-x-16 md:gap-y-14">
                {[
                  {
                    title: "科学桌面分区 + 80cm 超深桌面",
                    desc: "更自由的人机工学活动空间，坐站切换与多设备摆位都更从容",
                    icon: (
                      <svg className="h-10 w-10 text-white/95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8h18M7 8v9m10-9v9M5 17h14" />
                      </svg>
                    ),
                  },
                  {
                    title: "硬核稳定性",
                    desc: "升降时水杯中的水面依然稳定；外力冲击下桌体仍保持低晃动",
                    icon: (
                      <svg className="h-10 w-10 text-white/95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4l7 4v8l-7 4-7-4V8l7-4z" />
                      </svg>
                    ),
                  },
                  {
                    title: "宽域升降适配",
                    desc: "大跨度三节双电机底盘，覆盖约 150-195cm 身高区间的坐站工学需求",
                    icon: (
                      <svg className="h-10 w-10 text-white/95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 5v14m10-14v14M5 7l2-2 2 2m6 10l2 2 2-2" />
                      </svg>
                    ),
                  },
                  {
                    title: "稳如磐石的满载承托",
                    desc: "无论坐姿推演还是站立编码，都可稳定承载显示器、主机与外设系统",
                    icon: (
                      <svg className="h-10 w-10 text-white/95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16h16M6 16l2-8h8l2 8M10 12h4" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <li key={item.title} className="min-w-0">
                    <div className="mb-4">{item.icon}</div>
                    <p className="text-[1.75rem] font-semibold leading-tight tracking-tight text-white md:text-[1.9rem]">{item.title}</p>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/62 md:text-[1.125rem]">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-12 overflow-hidden rounded-[12px] border border-white/15 bg-black/45 md:mt-16">
              <div className="relative aspect-[21/9]">
                <Image
                  src="/images/hero.jpg"
                  alt="矩阵黑桌面边缘微距：圆润倒角、无缝质感、细腻哑光表面"
                  fill
                  className="object-cover brightness-[0.8]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/20 to-black/10" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" aria-hidden />
                <div className="absolute left-5 top-5 md:left-7 md:top-6">
                  <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white/90">
                    Surface Material Preview (Placeholder)
                  </div>
                </div>
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 md:inset-x-7 md:bottom-6">
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    Matte Anti-scratch Finish
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    Premium Touch Edge
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            <Reveal delay={0}>
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/25 p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Eco Powder Coating</p>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl md:leading-tight">
                  Matte, Clean, Durable.
                </h3>
                <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-white/55 md:text-[15px]">
                  桌面采用环保静电喷粉工艺，在低 VOC 前提下保持细腻高级感与装甲级耐磨性。
                </p>
              </article>
            </Reveal>
            <Reveal delay={1}>
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/25 p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Toray Ultrasuede Edge</p>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl md:leading-tight">
                  Soft Touch, Long Session Comfort.
                </h3>
                <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-white/55 md:text-[15px]">
                  手腕接触区域采用东丽翻毛皮质感饰面，触感温润，长时间输入时更稳定、舒适。
                </p>
              </article>
            </Reveal>
            <Reveal delay={2}>
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/25 p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Absolute Cable Control</p>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl md:leading-tight">
                  Snap, Hide, Rebuild.
                </h3>
                <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-white/55 md:text-[15px]">
                  桌面级磁吸快拆理线模块可快速吞噬杂线，增减设备时无需钻到桌底即可完成线缆重构。
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06080d] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-lg))]">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-cyan-300/10 blur-[120px]" />
          <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-indigo-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-4xl font-semibold tracking-tight md:text-6xl">
              把健康交给 AI 算法，把专注留给心流。
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-center text-base leading-relaxed text-white/78 md:text-lg">
              AI Agent 量身定制坐站规划，工业级无感设计静默执行。我们把复杂的健康策略隐藏到后台，把认知带宽还给真正重要的创造工作。
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="mx-auto mt-14 max-w-6xl">
              <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                {
                  id: "01",
                  title: "AI 坐站规划",
                  desc: "输入身高与基本信息，AI 自动生成最科学的坐站比与专属高度，用算法全面接管健康策略。",
                  link: "进一步了解坐站规划",
                },
                {
                  id: "02",
                  title: "静默消息提醒",
                  desc: "摒弃刺耳蜂鸣。系统搭载环境级柔性通知协议，将健康提醒无缝隐匿于数字工作流中，在绝对捍卫专注力的前提下完成无打扰姿态引导。",
                  link: "进一步了解提醒协议",
                },
                {
                  id: "03",
                  title: "无感微动巡航",
                  desc: "针对极度沉浸时刻，底层激活潜意识物理干预引擎，通过零感知的空间微幅起伏，在思绪不断连状态下悄然唤醒核心肌群以化解静态疲劳。",
                  link: "进一步了解微动巡航",
                },
                {
                  id: "04",
                  title: "环保耐刮涂层",
                  desc: "采用零胶水、低 VOC 的静电喷粉工艺。告别工业异味，呈现细腻哑光质感，同时具备装甲级防刮耐磨性。",
                  link: "进一步了解表面工艺",
                },
                {
                  id: "05",
                  title: "跑车级翻毛皮护腕",
                  desc: "手腕高频接触区选用跑车内饰同款东丽翻毛皮。告别桌面的冷硬，提供温润触感与缓冲支撑。",
                  link: "进一步了解材质细节",
                },
                {
                  id: "06",
                  title: "磁吸隐形理线",
                  desc: "随取随吸的快拆模块，瞬间吞噬冗杂电源与信号线。增减设备无需钻入桌底，抬手即可完成极简桌搭。",
                  link: "进一步了解理线系统",
                },
                {
                  id: "07",
                  title: "80cm 超深桌面",
                  desc: "科学划分“视觉展示区”与“高频操作区”，拉开合理的人机工学距离，让全套生产力工具各就其位、互不干扰。",
                  link: "进一步了解桌面分区",
                },
                {
                  id: "08",
                  title: "磐石级抗晃底盘",
                  desc: "升降时杯水不溢，意外撞击桌面不晃。极致稳固的双电机底盘，提供可靠物理承托。",
                  link: "进一步了解稳定结构",
                },
                {
                  id: "09",
                  title: "全域身高适配",
                  desc: "从 1.5 米到 1.95 米全面覆盖。大跨度升降系统精准匹配各类身型，自由切换坐立工作姿态。",
                  link: "进一步了解适配范围",
                },
              ].map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) as 0 | 1 | 2}>
                  <article className="group flex h-full min-h-[300px] w-[22.5rem] shrink-0 snap-start flex-col rounded-[28px] bg-[#070a10] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[#0a0e16] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_18px_42px_rgba(0,0,0,0.38)] md:p-8">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-white/88">
                      {item.id}
                    </div>
                    <h3 className="mt-6 text-[2rem] font-semibold leading-[1.15] tracking-tight text-white">{item.title}</h3>
                    <p className="mt-5 max-w-[34ch] text-base leading-8 text-white/72">{item.desc}</p>
                    <span className="mt-auto pt-6 text-sm font-medium text-[#4ea4ff] transition-colors duration-300 group-hover:text-[#79bcff]">
                      {item.link} &gt;
                    </span>
                  </article>
                </Reveal>
              ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06080b] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-red-300/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-amber-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-4xl font-semibold tracking-tight md:text-6xl">
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

      <section
        id="part-brand-story"
        className="relative overflow-hidden bg-[#05070b] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-16 top-12 h-72 w-72 rounded-full bg-violet-300/10 blur-[120px]" />
          <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-white/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-4xl font-semibold tracking-tight md:text-6xl">
              The Ultimate Balance Between Focus and Well-being.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base text-white/75 md:text-lg">
              在专注与健康之间，找到终极平衡。
            </p>
            <p className="mx-auto mt-2 max-w-3xl text-center text-sm text-white/60 md:text-base">
              From Zhejiang University research to a quiet cognitive co-pilot.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="mx-auto mt-10 max-w-[1068px]">
              <div className="overflow-hidden rounded-[12px] border border-white/15 bg-black/40">
                <div className="relative aspect-[21/9]">
                  <Image
                    src="/images/scene-office.jpg"
                    alt="FlowShift 团队在实验室和工厂测试原型的真实场景"
                    fill
                    className="object-cover brightness-[0.72]"
                    sizes="(max-width: 1024px) 100vw, 1068px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/85 md:left-5 md:top-5">
                    Team Lab / Factory Test (Placeholder)
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-white/70 md:text-base">
              一、用户故事：重构工作站的底层逻辑（Why We Do This）。我们希望用「AI Agent 策略 + 硬件无感执行」重写专注与健康之间的关系。
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="part-brand-story-01"
        className="relative overflow-hidden bg-[#07090c] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-amber-300/10 blur-[130px]" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-3xl font-semibold tracking-tight md:text-5xl">
              01 / 痛点溯源：创造力与健康的零和博弈
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-white/80 md:text-base">
              我们一天中最具创造力的时光，几乎都在书桌前度过。这里是我们推演逻辑、构建代码、探索世界的核心阵地。然而，深度思考的代价是隐蔽且沉重的——久坐正在让脊椎受压、肩颈前倾。在“保持专注”与“保护身体”之间，我们往往被迫牺牲了后者。
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="-mx-6 mt-12 md:-mx-12 md:mt-16">
              <div className="relative aspect-[21/10] w-full md:aspect-[24/9]">
                <Image
                  src="/images/scene-office.jpg"
                  alt="深夜书桌前专注工作：创造力与健康在久坐中的张力"
                  fill
                  className="object-cover brightness-[0.82]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                <div className="absolute left-6 top-6 md:left-10 md:top-8">
                  <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white/90">
                    Deep Work at Desk (Placeholder)
                  </div>
                </div>
                <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2 md:inset-x-10 md:bottom-8">
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    Focus vs. wellbeing
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    Sedentary cost
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="part-brand-story-02"
        className="relative overflow-hidden bg-[#06080c] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-red-300/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-4 h-72 w-72 rounded-full bg-orange-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-3xl font-semibold tracking-tight md:text-5xl">
              02 / 行业盲区：以“破坏专注力”为代价的伪健康
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-white/80 md:text-base">
              真正的健康，源于坐与站的动态平衡。但纵观市面上的升降桌，它们试图用刺耳的蜂鸣、震动或粗暴的电机声来“拯救”你的身体。这种反人性的交互，无情撕裂了脑力工作者最宝贵的资产——心流与注意力。在专注与健康的选择中，传统升降桌给出了最糟糕的妥协。
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="-mx-6 mt-12 md:-mx-12 md:mt-16">
              <div className="relative aspect-[21/10] w-full md:aspect-[24/9]">
                <Image
                  src="/images/hero.jpg"
                  alt="传统升降桌交互：警报与电机声打断专注的示意"
                  fill
                  className="object-cover brightness-[0.78]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                <div className="absolute left-6 top-6 md:left-10 md:top-8">
                  <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white/90">
                    Harsh Alerts vs. Flow (Placeholder)
                  </div>
                </div>
                <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2 md:inset-x-10 md:bottom-8">
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    Beep / vibration
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    Context switch
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="part-brand-story-03"
        className="relative overflow-hidden bg-[#05070a] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-violet-300/10 blur-[130px]" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-3xl font-semibold tracking-tight md:text-5xl">
              03 / 我们的破局：做物理世界最安静的“认知副驾”
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-white/80 md:text-base">
              最好的科技，绝不该尖叫着争夺用户的注意力。因此，我们决定重构工作站的底层逻辑。
              通过「AI Agent 策略 + 硬件无感执行」的模式，让健康干预在后台静默运行。它不是一张强迫你改变习惯的桌子，而是绝对尊重你心流状态的守护者——在不打断思路的前提下，完成健康与专注的完美闭环。
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="-mx-6 mt-12 md:-mx-12 md:mt-16">
              <div className="relative aspect-[21/10] w-full md:aspect-[24/9]">
                <Image
                  src="/images/scene-learning.jpg"
                  alt="温和科技：AI 与无感硬件协同的工作站愿景"
                  fill
                  className="object-cover brightness-[0.8]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                <div className="absolute left-6 top-6 md:left-10 md:top-8">
                  <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white/90">
                    Quiet Cognitive Copilot (Placeholder)
                  </div>
                </div>
                <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2 md:inset-x-10 md:bottom-8">
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    AI Agent + silent hardware
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-white/90">
                    Flow-first
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06080c] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-md))]">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-300/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-emerald-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <h2 className="mx-auto mt-4 max-w-5xl text-center text-4xl font-semibold tracking-tight md:text-6xl">
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

      <section
        id="part-faq"
        className="relative overflow-hidden bg-[#05070a] py-[var(--space-3xl)] md:py-[calc(var(--space-3xl)+var(--space-xl))]"
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-16 top-12 h-72 w-72 rounded-full bg-cyan-300/10 blur-[120px]" />
          <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-indigo-300/10 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-white md:px-12">
          <Reveal>
            <header className="mx-auto max-w-2xl text-center">
              <h2 className="mx-auto mt-4 max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl">
                常见问题
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-white/65 md:text-lg">
                完整问答与分类已集中在帮助中心，首页仅保留入口，避免信息堆叠。
              </p>
            </header>
          </Reveal>

          <Reveal delay={1}>
            <div className="mx-auto mt-12 max-w-xl md:mt-14">
              <Link
                href="/support#faq"
                className="group flex flex-col rounded-[12px] border border-white/15 bg-white/[0.04] p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:p-10"
              >
                <span className="text-sm font-medium text-white/55">帮助中心 · FAQ</span>
                <span className="mt-3 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
                  前往查看全部问题与解答
                </span>
                <span className="mt-3 text-sm leading-relaxed text-white/62">
                  支持关键词搜索、按主题浏览；产品参数、众筹与物流说明也在同一页面。
                </span>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#4ea4ff] transition-colors group-hover:text-[#79bcff]">
                  打开帮助中心
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
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
      <SectionFloatingEntry items={FLOATING_PART_ENTRIES} />
    </main>
  );
}
