"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import * as React from "react";

const ITEMS = [
  {
    id: "look",
    label: "颜值与质感",
    imageSrc: "/images/hero.jpg",
    imageAlt: "FlowShift 桌面与材质细节",
  },
  {
    id: "structure",
    label: "稳固结构",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "FlowShift 双电机底盘与桌架结构",
  },
  {
    id: "canvas",
    label: "大桌面画布",
    imageSrc: "/images/scene-learning.jpg",
    imageAlt: "1600×800mm 大桌面使用场景",
  },
  {
    id: "motion",
    label: "无感升降",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "微幅巡航与静音升降示意",
  },
  {
    id: "cable",
    label: "理线与收纳",
    imageSrc: "/images/hero.jpg",
    imageAlt: "暗黑理线系统与线槽",
  },
  {
    id: "copilot",
    label: "认知副驾就绪",
    imageSrc: "/images/scene-relax.jpg",
    imageAlt: "多场景工作与 FlowShift 协同",
  },
  {
    id: "quiet",
    label: "静音与耐久",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "低噪电机与长期使用",
  },
  {
    id: "fit",
    label: "全域身高适配",
    imageSrc: "/images/scene-learning.jpg",
    imageAlt: "不同身高与坐立切换",
  },
] as const;

/**
 * Apple 式：左侧纵向卖点列表 + 右侧大图切换（深色版、无描边卡片）。
 */
export default function ProductFeatureShowcase() {
  const [active, setActive] = React.useState(0);
  const current = ITEMS[active];
  const panelId = "product-feature-panel";

  return (
    <div className="mx-auto max-w-[1120px]">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,15.5rem)_1fr] lg:gap-14">
        <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0" aria-label="产品卖点">
          {ITEMS.map((item, i) => {
            const isOn = i === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isOn}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                className={
                  "flex min-w-[11.5rem] shrink-0 items-center gap-3 rounded-full px-4 py-3 text-left text-[0.9375rem] font-medium tracking-tight transition-colors duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] lg:min-w-0 " +
                  (isOn
                    ? "bg-white/[0.11] text-white"
                    : "text-white/58 hover:bg-white/[0.06] hover:text-white/88")
                }
              >
                <span
                  className={
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 " +
                    (isOn ? "border-white/25 bg-white/10" : "border-white/12 bg-white/[0.04]")
                  }
                  aria-hidden
                >
                  {isOn ? (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  ) : (
                    <Plus className="h-4 w-4 text-white/45" strokeWidth={1.75} />
                  )}
                </span>
                <span className="leading-snug">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div
          id={panelId}
          role="region"
          aria-live="polite"
          aria-label={current.label}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-zinc-900 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:aspect-[16/11] lg:aspect-[16/10]"
        >
          <Image
            key={current.imageSrc + active}
            src={current.imageSrc}
            alt={current.imageAlt}
            fill
            className="object-cover brightness-[0.88]"
            sizes="(max-width: 1024px) 100vw, 720px"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
