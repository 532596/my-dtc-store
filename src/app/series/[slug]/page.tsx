import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";

const PRODUCTS: Record<string, { name: string; desc: string; specs: string[] }> = {
  "model-a": { name: "Model A", desc: "Compact, quiet lift. Ideal for small spaces.", specs: ["24-43 in", "176 lbs", "Single motor"] },
  "model-b": { name: "Model B", desc: "Fits 150-190cm. Smart control. Recommended.", specs: ["24-47 in", "220 lbs", "Dual motor", "Smart"] },
  "model-c": { name: "Model C", desc: "Full-featured. TUV certified.", specs: ["24-50 in", "265 lbs", "Dual motor", "Smart"] },
};

export default function ProductPage(props: { params: { slug: string } }) {
  const product = PRODUCTS[props.params.slug];
  if (!product) notFound();
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Link href="/series" className="text-sm text-warm-muted hover:text-foreground">Back to Desks</Link>
        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-warm-gray/60">
              <Image src={`/images/${props.params.slug}.jpg`} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h1 className="text-3xl font-semibold text-foreground">{product.name}</h1>
              <p className="mt-4 text-body text-warm-muted">{product.desc}</p>
              <ul className="mt-6 space-y-2 text-body text-warm-muted">
                {product.specs.map((s) => (
                  <li key={s}>- {s}</li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link href="/cart" className="rounded-xl bg-accent px-8 py-3.5 text-sm font-medium text-white hover:bg-accent-hover">Add to Cart</Link>
                <Link href="/series#compare" className="rounded-xl border border-warm-gray px-8 py-3.5 text-sm font-medium text-foreground hover:bg-warm-cream">Compare</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
