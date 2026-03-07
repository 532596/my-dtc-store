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
    quote: "Finally no more lower back pain after long workdays.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600",
    imageAlt: "升降桌办公场景",
    productModel: "Model B",
    purchaseDate: "2024年3月",
  },
  {
    name: "Michael T.",
    role: "Software Engineer",
    region: "北京",
    countryCode: "CN",
    quote: "Quiet enough for late-night coding.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600",
    imageAlt: "桌面与显示器使用",
    productModel: "Model B",
    purchaseDate: "2024年1月",
  },
  {
    name: "Emma L.",
    role: "Parent & WFH",
    region: "深圳",
    countryCode: "CN",
    quote: "One desk for homework and my meetings.",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=600",
    imageAlt: "家用办公桌场景",
    productModel: "Desk Pro",
    purchaseDate: "2024年5月",
  },
  {
    name: "James K.",
    role: "Product Manager",
    region: "杭州",
    countryCode: "CN",
    quote: "TÜV and 5-year motor warranty sold me.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600",
    imageAlt: "桌面产品使用",
    productModel: "Model C",
    purchaseDate: "2024年2月",
  },
  {
    name: "Lisa W.",
    role: "UX Designer",
    region: "广州",
    countryCode: "CN",
    quote: "Height memory is a game-changer. I switch between standing for meetings and sitting for deep work without thinking about it.",
    image: "https://images.unsplash.com/photo-1593062096033-9a26f09a8d7e?q=80&w=600",
    imageAlt: "办公场景",
    productModel: "Model B",
    purchaseDate: "2024年4月",
  },
  {
    name: "David C.",
    role: "Teacher",
    region: "成都",
    countryCode: "CN",
    quote: "学生和老师都能用，高度范围够大。",
    image: "https://images.unsplash.com/photo-1507925921952-c4e2579030c0?q=80&w=600",
    imageAlt: "书房场景",
    productModel: "Desk Pro",
    purchaseDate: "2023年11月",
  },
  {
    name: "Anna Z.",
    role: "Writer",
    region: "南京",
    countryCode: "CN",
    quote: "静音升降太重要了，夜里写稿不会吵到家人。语音调高度也很方便。",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=600",
    imageAlt: "居家办公",
    productModel: "Model B",
    purchaseDate: "2024年6月",
  },
  {
    name: "Tom H.",
    role: "Developer",
    region: "武汉",
    countryCode: "CN",
    quote: "Sturdy and quiet. The cable tray keeps my desk clean.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600",
    imageAlt: "开发桌面",
    productModel: "Model C",
    purchaseDate: "2023年9月",
  },
];

export default function Home() {
  return (
    <main>
      <HeroShowcase slides={HERO_SLIDES} />

      <section className="relative overflow-hidden py-14">
        {/* 模糊底图：与首屏场景图同风格，颜色做淡 */}
        <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden>
          <Image
            src="/images/scene-office.jpg"
            alt=""
            fill
            className="object-cover blur-3xl scale-105 opacity-40"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-warm-white/85" aria-hidden />
        </div>
        {/* 底色渐变：暖色家居感 + 轻微冷色智能感 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-warm-cream/90 via-warm-white/95 to-[#ebebe6]/95"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-tl from-accent/[0.04] via-transparent to-transparent"
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
              智能功能
            </h2>
          </Reveal>

          {/* 非卡片、上下排列；高度记忆 = 动图左 / 文字右，整体拉长 */}
          <Reveal delay={0}>
            <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-stretch md:gap-0">
              <div className="relative w-full shrink-0 overflow-hidden rounded-lg bg-warm-gray/60 md:w-[42%]">
                <div className="relative aspect-[3/2] min-h-[280px] md:min-h-[360px]">
                  <video
                    src="/videos/height-memory.mp4"
                    poster="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800"
                    className="h-full w-full object-cover"
                    playsInline
                    muted
                    loop
                    autoPlay
                    aria-label="高度记忆演示"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center md:w-[58%]">
                <div className="px-0 py-6 md:py-14 md:pl-12 md:pr-10">
                  <span className="text-xs font-medium uppercase tracking-widest text-accent" aria-hidden>01</span>
                  <h3 className="mt-1 border-l-2 border-accent pl-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    Height Memory
                  </h3>
                  <p className="mt-3 text-body text-warm-muted">
                    四组高度记忆，办公、站立、学习、放松一键切换。精确到毫米的升降，坐站交替更轻松。
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-warm-muted">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
                      <span><strong className="text-foreground">4 组记忆位</strong>：办公 / 站立 / 学习 / 放松，一键切换当前场景。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
                      <span><strong className="text-foreground">毫米级精度</strong>：升降稳定可调，坐站交替更轻松。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
                      <span><strong className="text-foreground">久坐提醒</strong>：到点提醒站立，养成健康习惯。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 语音控制 = 文字左 / 动图右，非卡片、拉长 */}
          <Reveal delay={1}>
            <div className="mt-20 flex flex-col gap-6 md:mt-28 md:flex-row md:items-stretch md:gap-0">
              <div className="order-2 flex flex-col justify-center md:order-1 md:w-[58%]">
                <div className="px-0 py-6 md:py-14 md:pl-12 md:pr-10">
                  <span className="text-xs font-medium uppercase tracking-widest text-accent" aria-hidden>02</span>
                  <h3 className="mt-1 border-l-2 border-accent pl-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    Voice Control
                  </h3>
                  <p className="mt-3 text-body text-warm-muted">
                    接入主流语音助手，说一句即可升高、降低或切换到记忆高度。开会、手脏、抱娃时都能轻松调节。
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-warm-muted">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
                      <span><strong className="text-foreground">语音指令</strong>：如「升高桌面」「切换到站立高度」等，免动手调节。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
                      <span><strong className="text-foreground">多场景适用</strong>：会议中、手脏、抱娃或双手占用时尤其方便。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
                      <span><strong className="text-foreground">兼容主流助手</strong>：支持常见智能音箱与语音助手，无缝联动。</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative order-1 w-full shrink-0 overflow-hidden rounded-lg bg-warm-gray/60 md:order-2 md:w-[42%]">
                <div className="relative aspect-[3/2] min-h-[280px] md:min-h-[360px]">
                  <video
                    src="/videos/voice-control.mp4"
                    poster="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800"
                    className="h-full w-full object-cover"
                    playsInline
                    muted
                    loop
                    autoPlay
                    aria-label="语音控制演示"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-center md:mt-20">
            <div>
              <p className="text-2xl font-semibold text-foreground">4 组</p>
              <p className="mt-1 text-sm text-warm-muted">高度记忆</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">语音</p>
              <p className="mt-1 text-sm text-warm-muted">一键调节</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">毫米级</p>
              <p className="mt-1 text-sm text-warm-muted">精确升降</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/guide"
              className="btn-primary inline-block px-8 py-3.5"
            >
              了解智能功能 →
            </Link>
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
            <Link href="/series#compare" className="btn-primary inline-block px-8 py-3.5">
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
                        src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600"
                        alt=""
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
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600"
                        alt=""
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
