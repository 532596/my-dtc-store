import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const ITEMS = [
  {
    id: "cable",
    name: "理线架",
    tagline: "桌下理线 · 整洁易维护",
    desc: "线缆集中收纳，走线清晰、易维护，与升降桌框架无缝安装。",
    features: "全系列适用",
    material: "金属 + 塑料",
    price: 129,
    comparePrice: 159,
    highlight: true,
    img: "/images/acc-cable.png",
  },
  {
    id: "charger",
    name: "无线充电模块",
    tagline: "桌面无线充电 · 随放随充",
    desc: "嵌入式或桌面式可选，支持 15W 快充，手机、耳机随放随充。",
    features: "Model B / C",
    material: "ABS + 线圈",
    price: 199,
    comparePrice: 249,
    highlight: false,
    img: "/images/acc-charger.png",
  },
  {
    id: "mat",
    name: "防滑桌垫",
    tagline: "保护桌面 · 静音防滑",
    desc: "高密度橡胶基，防刮防滑，键盘鼠标更稳，久用无异味。",
    features: "全系列适用",
    material: "橡胶 + 织物",
    price: 89,
    comparePrice: 119,
    highlight: false,
    img: "/images/acc-mat.png",
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

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero：与系列页统一 */}
      <section className="relative overflow-hidden border-b border-warm-gray/30 bg-gradient-to-b from-warm-gray/5 to-transparent">
        <div className="mx-auto max-w-content px-6 py-10 md:py-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">配件与周边</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              与智能桌搭配的专属配件，提升使用体验
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-warm-muted">
              理线架、无线充电、防滑桌垫等，让桌面更整洁、更高效。全系列兼容，随桌选购或单独加购。
            </p>
            <Link
              href="/series"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent-light/30 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-accent-light/50"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </span>
              搭配升降桌一起选购 →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 产品卡片网格：与系列页同结构 */}
      <section className="mx-auto max-w-content px-6 py-10 md:py-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground md:text-2xl">精选配件</h2>
              <p className="mt-1 text-sm text-warm-muted">适用型号、材质与价格一目了然，可与升降桌一并加入购物车。</p>
            </div>
            <Link href="/series" className="shrink-0 text-sm font-medium text-accent hover:underline">
              去选升降桌
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => {
            const saving = item.comparePrice && item.comparePrice > item.price ? item.comparePrice - item.price : 0;
            return (
              <Reveal key={item.id} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
                <div
                  className={`group flex flex-col overflow-hidden rounded-2xl border transition hover:shadow-lg ${
                    item.highlight
                      ? "border-accent/40 bg-gradient-to-b from-accent-light/20 to-transparent"
                      : "border-warm-gray/40 bg-warm-white hover:border-warm-gray/60"
                  }`}
                >
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-warm-gray/30">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {item.highlight && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-2.5 py-0.5 text-xs font-medium text-white">
                        推荐
                      </span>
                    )}
                    {saving > 0 && (
                      <span className="absolute right-3 top-3 rounded-lg bg-foreground/90 px-2 py-0.5 text-xs font-medium text-white">
                        省 ¥{saving}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-accent">{item.tagline}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-warm-muted">{item.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <SpecChip label="适用" value={item.features} />
                      <SpecChip label="材质" value={item.material} />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-warm-gray/30 pt-4">
                      <div>
                        <span className="text-lg font-semibold text-foreground">¥{item.price}</span>
                        {item.comparePrice && item.comparePrice > item.price && (
                          <span className="ml-2 text-xs text-warm-muted line-through">
                            ¥{item.comparePrice}
                          </span>
                        )}
                      </div>
                      <Link
                        href="/series"
                        className="rounded-lg bg-warm-gray/20 px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent/20 hover:text-accent"
                      >
                        搭配选购
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 底部快速浏览条：与系列页快速对比条同风格 */}
      <section className="border-t border-warm-gray/30 bg-warm-gray/5">
        <div className="mx-auto max-w-content px-6 py-10 md:py-12">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground">配件一览</h2>
            <p className="mt-1 text-sm text-warm-muted">三款常用配件，均可与任意型号升降桌搭配使用。</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-warm-gray/40 bg-warm-white">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
                {ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col border-warm-gray/30 sm:border-r last:sm:border-r-0 ${
                      item.highlight ? "bg-accent-light/10" : ""
                    }`}
                  >
                    <div className="relative aspect-video shrink-0 overflow-hidden bg-warm-gray/20">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      {item.highlight && (
                        <span className="absolute left-2 top-2 rounded bg-accent/90 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          推荐
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="font-semibold text-foreground">{item.name}</div>
                      <div className="mt-1 text-xs text-warm-muted">{item.features} · ¥{item.price}</div>
                      <Link
                        href="/series"
                        className="mt-3 inline-block w-full rounded-lg border border-warm-gray/40 py-2 text-center text-sm font-medium text-foreground transition hover:border-accent hover:bg-accent-light/30"
                      >
                        搭配选购
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
