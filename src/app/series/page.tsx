import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const PRODUCTS = [
  { slug: "model-a", name: "Model A", desc: "24-43 in, 176 lbs", highlight: false, img: "/images/series-model-a.jpg" },
  { slug: "model-b", name: "Model B", desc: "24-47 in, 220 lbs, smart", highlight: true, img: "/images/series-model-b.jpg" },
  { slug: "model-c", name: "Model C", desc: "24-50 in, 265 lbs", highlight: false, img: "/images/series-model-c.jpg" },
];

export default function SeriesPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Desks</h1>
          <p className="mt-4 max-w-xl text-body text-warm-muted">Choose by scenario and space.</p>
          <Link href="/quiz" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">Find Your Fit →</Link>
        </Reveal>
        <div id="compare" className="mt-16">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground">Compare</h2>
            <div className="mt-8 overflow-hidden rounded-xl border border-warm-gray/60">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-warm-gray bg-warm-cream/50">
                    <th className="p-4 font-semibold text-foreground">Model</th>
                    <th className="p-4 font-semibold text-foreground">Spec</th>
                    <th className="p-4 font-semibold text-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.slug} className={p.highlight ? "bg-accent-light/40" : ""}>
                      <td className="p-4 font-medium text-foreground">{p.name}</td>
                      <td className="p-4 text-warm-muted">{p.desc}</td>
                      <td className="p-4">
                        <Link href={"/series/" + p.slug} className="btn-primary inline-block px-4 py-2">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i === 0 ? 0 : i === 1 ? 1 : 2}>
              <Link href={"/series/" + p.slug} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-warm-gray/60">
                  <Image src={p.img} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground group-hover:underline">{p.name}</h3>
                <p className="mt-2 text-body text-warm-muted">{p.desc}</p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">View details</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
