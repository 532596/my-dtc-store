import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const SCENARIOS = [
  { id: "office", title: "Home Office", desc: "Remote work. Height memory, sit reminder.", href: "/series?scene=office", img: "/images/scene-office.jpg" },
  { id: "learning", title: "Family Learning", desc: "Kids and adults. One desk for all.", href: "/series?scene=learning", img: "/images/scene-learning.jpg" },
  { id: "relax", title: "Multi-purpose", desc: "Guest, relax, reading.", href: "/series?scene=relax", img: "/images/scene-relax.jpg" },
];

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Solutions</h1>
          <p className="mt-4 max-w-xl text-body text-warm-muted">By scenario: office, learning, relax.</p>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.id} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
              <div className="overflow-hidden rounded-xl border border-warm-gray/60 bg-warm-cream/30">
                <div className="relative aspect-[5/4] bg-warm-gray/50">
                  <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-foreground">{s.title}</h2>
                  <p className="mt-3 text-body text-warm-muted">{s.desc}</p>
                  <Link href={s.href} className="mt-6 inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover">See products</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
