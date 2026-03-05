import Image from "next/image";
import Reveal from "@/components/Reveal";

const ITEMS = [
  { name: "理线架", desc: "桌下理线，整洁易维护", img: "/images/acc-cable.jpg" },
  { name: "无线充电模块", desc: "桌面无线充电，随放随充", img: "/images/acc-charger.jpg" },
  { name: "防滑桌垫", desc: "保护桌面，静音防滑", img: "/images/acc-drawer.jpg" },
];

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Accessories</h1>
          <p className="mt-4 max-w-xl text-body text-warm-muted">
            与智能桌搭配的专属配件，提升使用体验。
          </p>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.name} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
              <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-warm-gray/60">
                  <Image src={item.img} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-foreground">{item.name}</h2>
                <p className="mt-2 text-body text-warm-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
