"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import Reveal from "@/components/Reveal";

export type TestimonialItem = {
  name: string;
  role: string;
  region: string;
  quote: string;
  image: string;
  imageAlt: string;
  productModel: string;
  purchaseDate: string;
};

type SortOption = "time-desc" | "time-asc" | "length-desc" | "length-asc";

function parseDateKey(purchaseDate: string): number {
  const m = purchaseDate.match(/(\d+)年(\d+)月/);
  if (!m) return 0;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  return y * 12 + mo;
}

export default function TestimonialsSection({ items }: { items: TestimonialItem[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("time-desc");
  const [expanded, setExpanded] = useState(false);

  const sorted = useMemo(() => {
    const arr = [...items];
    if (sortBy === "time-desc") arr.sort((a, b) => parseDateKey(b.purchaseDate) - parseDateKey(a.purchaseDate));
    if (sortBy === "time-asc") arr.sort((a, b) => parseDateKey(a.purchaseDate) - parseDateKey(b.purchaseDate));
    if (sortBy === "length-desc") arr.sort((a, b) => b.quote.length - a.quote.length);
    if (sortBy === "length-asc") arr.sort((a, b) => a.quote.length - b.quote.length);
    return arr;
  }, [items, sortBy]);

  const initialCount = 2;
  const visible = expanded ? sorted : sorted.slice(0, initialCount);
  const hasMore = sorted.length > initialCount;

  return (
    <section className="bg-warm-white py-section md:py-section-md">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            What Our Customers Say
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-5xl md:mt-14">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-warm-muted">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              aria-label="评价排序方式"
            >
              <option value="time-desc">按时间从近到远</option>
              <option value="time-asc">按时间从远到近</option>
              <option value="length-desc">按字数从多到少</option>
              <option value="length-asc">按字数从少到多</option>
            </select>
          </div>

          <div className="space-y-0">
            {visible.map((t, i) => (
              <div key={t.name}>
                {i > 0 && (
                  <div className="px-6 md:px-6" aria-hidden>
                    <hr className="border-0 border-t border-warm-gray" />
                  </div>
                )}
                <Reveal delay={i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 2 : 3}>
                  <div
                    className={`group flex flex-col gap-4 py-6 transition-all duration-300 hover:bg-warm-cream/50 md:flex-row md:items-center md:gap-10 md:px-6 md:py-5 md:hover:shadow-[inset_4px_0_0_0_rgba(91,107,122,0.35)] ${
                      i % 2 === 1 ? "md:flex-row-reverse md:hover:shadow-[inset_-4px_0_0_0_rgba(91,107,122,0.35)]" : ""
                    }`}
                  >
                    <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-lg bg-warm-gray/30 transition-transform duration-300 group-hover:shadow-md md:h-28 md:w-44">
                      <Image
                        src={t.image}
                        alt={t.imageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 11rem"
                      />
                    </div>
                    <div
                      className={`min-w-0 flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    >
                      <p className="text-base font-medium text-foreground md:text-lg">
                        &quot;{t.quote}&quot;
                      </p>
                      <div
                        className={`mt-2 flex flex-wrap items-center gap-2 ${i % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                      >
                        <span className="font-semibold text-stone-900">{t.name}</span>
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                        <span className="text-xs text-warm-muted">Verified Buyer</span>
                      </div>
                      <div
                        className={`mt-1.5 text-xs text-warm-muted ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                      >
                        <p>{t.role}</p>
                        <p className="mt-0.5">{t.region}</p>
                        <p className="mt-0.5 text-warm-stone">
                          {t.productModel} · 购买于 {t.purchaseDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="inline-flex items-center gap-2 rounded-xl border border-warm-gray/60 bg-warm-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-warm-cream/50"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    收起 <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    展开更多评价（共 {items.length} 条） <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
