import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AddToCartButton from "@/components/AddToCartButton";

const PRODUCTS = [
  {
    slug: "model-a",
    name: "Model A",
    tagline: "紧凑静音 · 小空间首选",
    desc: "齐平式升降、线缆收纳、桌面简洁无杂乱。",
    heightRange: "610–1090mm",
    loadCapacity: "80kg",
    motor: "单电机",
    noiseLevel: "≤45dB",
    warranty: "电机 5 年 / 框架 3 年",
    certification: "TÜV",
    price: 2999,
    comparePrice: 3499,
    highlight: false,
    img: "/images/series-model-a.jpg",
  },
  {
    slug: "model-b",
    name: "Model B",
    tagline: "智能记忆 · 推荐",
    desc: "适配 150–190cm 身高，静音双电机、四档记忆、久坐提醒。",
    heightRange: "610–1200mm",
    loadCapacity: "100kg",
    motor: "双电机",
    noiseLevel: "≤42dB",
    warranty: "电机 5 年 / 框架 5 年",
    certification: "TÜV、BIFMA",
    price: 3999,
    comparePrice: 4499,
    highlight: true,
    img: "/images/series-model-b.jpg",
  },
  {
    slug: "model-c",
    name: "Model C",
    tagline: "全功能旗舰 · TÜV 认证",
    desc: "静音双电机、线缆槽、四档记忆、久坐提醒、遇阻回弹。",
    heightRange: "610–1250mm",
    loadCapacity: "120kg",
    motor: "双电机",
    noiseLevel: "≤40dB",
    warranty: "电机 5 年 / 框架 5 年",
    certification: "TÜV、BIFMA",
    price: 4999,
    comparePrice: 5599,
    highlight: false,
    img: "/images/series-model-c.jpg",
  },
];

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-warm-gray/15 px-2.5 py-1.5 text-xs">
      <span className="text-warm-muted">{label}</span>
      <span className="ml-1 font-medium text-foreground">{value}</span>
    </div>
  );
}

export default function SeriesPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero：标题 + 价值主张 + 智能推荐入口 */}
      <section className="relative overflow-hidden border-b border-warm-gray/30 bg-gradient-to-b from-warm-gray/5 to-transparent">
        <div className="mx-auto max-w-content px-6 py-10 md:py-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">智能升降桌系列</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              按场景与空间，选最适合的一款
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-warm-muted">
              静音电机、高度记忆、久坐提醒与 TÜV 认证，从紧凑桌面到全功能旗舰，覆盖居家办公与多人身高。
            </p>
            <Link
              href="/quiz"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent-light/30 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-accent-light/50"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              根据身高与桌面需求，智能推荐 → 
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 产品卡片网格：高信息密度 + 规格标签 */}
      <section className="mx-auto max-w-content px-6 py-10 md:py-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground md:text-2xl">三款可选</h2>
              <p className="mt-1 text-sm text-warm-muted">规格、承重与智能功能一目了然，点击查看详情或加入对比。</p>
            </div>
            <Link
              href="/series#compare"
              className="shrink-0 text-sm font-medium text-accent hover:underline"
            >
              快速对比
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const saving = p.comparePrice && p.comparePrice > p.price ? p.comparePrice - p.price : 0;
            return (
              <Reveal key={p.slug} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
                <div
                  className={`group flex flex-col overflow-hidden rounded-2xl border transition hover:shadow-lg ${
                    p.highlight
                      ? "border-accent/40 bg-gradient-to-b from-accent-light/20 to-transparent"
                      : "border-warm-gray/40 bg-warm-white hover:border-warm-gray/60"
                  }`}
                >
                  <Link href={`/series/${p.slug}`} className="relative aspect-[4/3] shrink-0 overflow-hidden bg-warm-gray/30">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {p.highlight && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-2.5 py-0.5 text-xs font-medium text-white">
                        推荐
                      </span>
                    )}
                    {saving > 0 && (
                      <span className="absolute right-3 top-3 rounded-lg bg-foreground/90 px-2 py-0.5 text-xs font-medium text-white">
                        省 ¥{saving}
                      </span>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <Link href={`/series/${p.slug}`} className="w-fit">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="mt-0.5 text-xs font-medium text-accent">{p.tagline}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-warm-muted">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <SpecChip label="升降" value={p.heightRange} />
                      <SpecChip label="承重" value={p.loadCapacity} />
                      <SpecChip label="噪音" value={p.noiseLevel} />
                      <SpecChip label="质保" value={p.warranty} />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-warm-gray/30 pt-4">
                      <div>
                        <span className="text-lg font-semibold text-foreground">¥{p.price.toLocaleString()}</span>
                        {p.comparePrice && p.comparePrice > p.price && (
                          <span className="ml-2 text-xs text-warm-muted line-through">
                            ¥{p.comparePrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/series/${p.slug}`}
                        className="rounded-lg bg-warm-gray/20 px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent/20 hover:text-accent"
                      >
                        查看详情
                      </Link>
                    </div>
                    <AddToCartButton
                      slug={p.slug}
                      name={p.name}
                      desc={p.desc}
                      price={p.price}
                      image={p.img}
                      redirectToCart={false}
                      className="mt-4 min-w-0 w-full px-4 py-2.5"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 快速对比条 */}
      <section id="compare" className="border-t border-warm-gray/30 bg-warm-gray/5">
        <div className="mx-auto max-w-content px-6 py-10 md:py-12">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground">快速对比</h2>
            <p className="mt-1 text-sm text-warm-muted">并排查看升降范围、承重、电机与价格，快速做决定。</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-warm-gray/40 bg-warm-white">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
                {PRODUCTS.map((p) => (
                  <div
                    key={p.slug}
                    className={`flex flex-col border-warm-gray/30 sm:border-r last:sm:border-r-0 ${
                      p.highlight ? "bg-accent-light/10" : ""
                    }`}
                  >
                    <div className="relative aspect-video shrink-0 overflow-hidden bg-warm-gray/20">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      {p.highlight && (
                        <span className="absolute left-2 top-2 rounded bg-accent/90 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          推荐
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="font-semibold text-foreground">{p.name}</div>
                      <div className="mt-1 text-xs text-warm-muted">{p.heightRange} · {p.loadCapacity}</div>
                      <div className="mt-2 text-sm font-medium text-foreground">
                        ¥{p.price.toLocaleString()} 起
                      </div>
                      <Link
                        href={`/series/${p.slug}`}
                        className="mt-3 inline-block w-full rounded-lg border border-warm-gray/40 py-2 text-center text-sm font-medium text-foreground transition hover:border-accent hover:bg-accent-light/30"
                      >
                        查看
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
