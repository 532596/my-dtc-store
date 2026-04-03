import type { FaqGroup } from "@/data/faq";

type Variant = "dark" | "light";

const styles: Record<
  Variant,
  {
    groupEyebrow: string;
    groupTitle: string;
    summaryZh: string;
    summaryEn: string;
    answer: string;
    border: string;
    chevron: string;
    chevronRing: string;
  }
> = {
  dark: {
    groupEyebrow: "text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40",
    groupTitle: "mt-1.5 text-xl font-semibold tracking-tight text-white md:text-2xl",
    summaryZh: "text-[1.0625rem] font-medium leading-snug text-white md:text-[17px]",
    summaryEn: "mt-1 text-[13px] leading-snug text-white/45",
    answer: "pb-5 text-[0.9375rem] leading-relaxed text-white/68 md:text-[15px] md:leading-relaxed",
    border: "border-white/[0.12]",
    chevron: "text-white/35 group-open:text-white/55",
    chevronRing: "border-white/10",
  },
  light: {
    groupEyebrow: "text-[11px] font-semibold uppercase tracking-[0.24em] text-warm-muted",
    groupTitle: "mt-1.5 text-xl font-semibold tracking-tight text-foreground md:text-2xl",
    summaryZh: "text-[1.0625rem] font-medium leading-snug text-foreground md:text-[17px]",
    summaryEn: "mt-1 text-[13px] leading-snug text-warm-muted",
    answer: "pb-5 text-[0.9375rem] leading-relaxed text-warm-muted md:text-[15px] md:leading-relaxed",
    border: "border-warm-gray/35",
    chevron: "text-warm-muted group-open:text-foreground/70",
    chevronRing: "border-warm-gray/45",
  },
};

export default function FaqAccordion({
  groups,
  variant = "dark",
  className = "",
}: {
  groups: FaqGroup[];
  variant?: Variant;
  className?: string;
}) {
  const s = styles[variant];

  return (
    <div className={className}>
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-heading`} className="mt-14 first:mt-0 md:mt-20 md:first:mt-0">
          <p id={`${group.id}-heading`} className={s.groupEyebrow}>
            {group.titleEn}
          </p>
          <h3 className={s.groupTitle}>{group.titleZh}</h3>

          <div className={`mt-6 border-t ${s.border} md:mt-8`}>
            {group.items.map((item) => (
              <details
                key={item.id}
                id={item.id}
                className={`group border-b ${s.border} scroll-mt-28`}
              >
                <summary
                  className={`flex cursor-pointer list-none items-start justify-between gap-4 py-5 pr-1 [&::-webkit-details-marker]:hidden`}
                >
                  <span className="min-w-0 flex-1 text-left">
                    <span className={s.summaryZh}>{item.questionZh}</span>
                    <span className={`block ${s.summaryEn}`}>{item.questionEn}</span>
                  </span>
                  <span
                    className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${s.chevronRing} ${s.chevron} transition-transform duration-200 group-open:rotate-180`}
                    aria-hidden
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className={`${s.answer} -mt-1 max-w-2xl pl-0`}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
