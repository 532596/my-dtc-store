"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import * as React from "react";

const ITEMS = [
  {
    id: "look",
    label: "颜值与质感",
    detail:
      "静电喷粉与细腻哑光，桌沿倒角经多轮手板打磨，呈现高端桌面应有的克制质感，与办公环境自然融合。",
    imageSrc: "/images/hero.jpg",
    imageAlt: "FlowShift 桌面与材质细节",
  },
  {
    id: "structure",
    label: "稳固结构",
    detail:
      "三节双电机与加粗桌架协同，升降过程稳、静、可预期；高负载时仍保持低晃动，为显示器与外设提供可靠承托。",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "FlowShift 双电机底盘与桌架结构",
  },
  {
    id: "canvas",
    label: "大桌面画布",
    detail:
      "1600×800mm 大画布为双屏与主机预留排布空间；加深深台面，划清「视区」与「高频操作区」，多设备同屏不拥挤。",
    imageSrc: "/images/scene-learning.jpg",
    imageAlt: "1600×800mm 大桌面使用场景",
  },
  {
    id: "motion",
    label: "无感升降",
    detail:
      "Micro-Flow Cruise 以约 2 mm/s 极慢节奏做微幅起伏，几乎无感，却可持续缓解静态久坐，不打断心流。",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "微幅巡航与静音升降示意",
  },
  {
    id: "cable",
    label: "理线与收纳",
    detail:
      "磁吸理线盖与线槽一体，增减设备时不必钻桌底；线束可快速整理与重构，保持视线内与桌下的双重秩序。",
    imageSrc: "/images/hero.jpg",
    imageAlt: "暗黑理线系统与线槽",
  },
  {
    id: "copilot",
    label: "认知副驾就绪",
    detail:
      "为 AI 与自动化工作流预留能力：健康与姿态策略在后台执行，让认知带宽留在真正重要的创造任务上。",
    imageSrc: "/images/scene-relax.jpg",
    imageAlt: "多场景工作与 FlowShift 协同",
  },
  {
    id: "quiet",
    label: "静音与耐久",
    detail:
      "电机与结构经声学优化，升降声压控制在舒适区间；长周期耐久验证，让安静与可靠成为默认体验。",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "低噪电机与长期使用",
  },
  {
    id: "fit",
    label: "全域身高适配",
    detail:
      "约 150–195 cm 大跨度高度覆盖常见身型，坐站切换与桌高记忆一键即达，适合不同成员共用一张桌子。",
    imageSrc: "/images/scene-learning.jpg",
    imageAlt: "不同身高与坐立切换",
  },
] as const;

/**
 * 左侧纵向卖点 + 选中展开说明；右侧大图（产品亮点区，非 Cognitive Copilot）。
 */
export default function ProductFeatureShowcase() {
  const [active, setActive] = React.useState(0);
  const current = ITEMS[active];
  const panelId = "product-feature-panel";

  return (
    <div className="mx-auto max-w-[1120px]">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12">
        <nav className="flex w-full min-w-0 flex-col gap-2" aria-label="产品卖点">
          {ITEMS.map((item, i) => {
            const isOn = i === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isOn}
                aria-expanded={isOn}
                aria-controls={isOn ? `${item.id}-detail` : undefined}
                onClick={() => setActive(i)}
                className={
                  "w-full min-w-0 text-left transition-[background-color,box-shadow,transform,border-color] duration-500 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] " +
                  (isOn
                    ? "rounded-2xl border border-white/12 bg-white/[0.10] px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md"
                    : "flex items-center gap-3 rounded-full px-4 py-3 text-white/58 transition-colors hover:bg-white/[0.06] hover:text-white/88")
                }
              >
                {isOn ? (
                  <div className="flex w-full min-w-0 flex-col gap-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10"
                        aria-hidden
                      >
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </span>
                      <span className="min-w-0 text-[0.9375rem] font-medium leading-snug tracking-tight text-white">
                        {item.label}
                      </span>
                    </div>
                    <p
                      id={`${item.id}-detail`}
                      className="mt-3 border-t border-white/10 pt-3 text-[0.8125rem] leading-[1.65] text-white/70"
                    >
                      {item.detail}
                    </p>
                  </div>
                ) : (
                  <>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04]"
                      aria-hidden
                    >
                      <Plus className="h-4 w-4 text-white/45" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 text-[0.9375rem] font-medium tracking-tight">
                      {item.label}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </nav>

        <div
          id={panelId}
          role="region"
          aria-live="polite"
          aria-label={current.label}
          className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-[22px] bg-zinc-900 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:aspect-[16/11] lg:aspect-[16/10]"
        >
          <Image
            key={current.imageSrc + active}
            src={current.imageSrc}
            alt={current.imageAlt}
            fill
            className="object-cover brightness-[0.88] transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]"
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
