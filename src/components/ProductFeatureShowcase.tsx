"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import * as React from "react";

const EASE = "[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]";
const SMOOTH = `transition-all duration-500 ${EASE} motion-reduce:duration-0 motion-reduce:transition-none`;

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
 * 图二式：左栏浅底胶囊、右栏大图。选项切换时以 grid 0fr↔1fr 丝滑展开/收起说明。
 */
export default function ProductFeatureShowcase() {
  const [active, setActive] = React.useState(0);
  const current = ITEMS[active];
  const panelId = "product-feature-panel";

  return (
    <div className="mx-auto w-full max-w-[min(100%,1200px)]">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,18.5rem)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,20rem)_1fr]">
        <nav
          className="flex w-full min-w-0 flex-col gap-2.5"
          aria-label="产品卖点"
        >
          {ITEMS.map((item, i) => {
            const isOn = i === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isOn}
                aria-expanded={isOn}
                id={`pfs-btn-${item.id}`}
                aria-controls={`${item.id}-detail`}
                onClick={() => setActive(i)}
                className={
                  `flex w-full min-w-0 flex-col px-3.5 py-2.5 text-left ${SMOOTH} ` +
                  (isOn
                    ? "rounded-2xl border border-white/14 bg-white/[0.16] text-white shadow-[0_2px_16px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/[0.08] sm:px-4 sm:py-3"
                    : "rounded-full border border-white/[0.08] bg-white/[0.09] text-white/72 hover:border-white/14 hover:bg-white/[0.12] hover:text-white/92 sm:px-4 sm:py-2.5")
                }
              >
                <div className="flex w-full items-center gap-3">
                  <span
                    className={
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 " +
                      (isOn
                        ? "border-0 bg-white/[0.2]"
                        : "border border-white/18 bg-white/[0.04]")
                    }
                    aria-hidden
                  >
                    {isOn ? (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-white/55" strokeWidth={1.8} />
                    )}
                  </span>
                  <span
                    className={
                      "min-w-0 flex-1 text-left text-[0.875rem] font-medium leading-snug tracking-tight sm:text-[0.9375rem]"
                    }
                  >
                    {item.label}
                  </span>
                </div>

                <div
                  className={
                    "grid w-full min-h-0 " +
                    "[transition:grid-template-rows_520ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none " +
                    (isOn ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
                  }
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      id={`${item.id}-detail`}
                      className="mt-3 border-t border-white/12 pt-3 text-left text-[0.8125rem] leading-[1.65] text-white/70 sm:mt-3.5"
                      aria-hidden={!isOn}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div
          id={panelId}
          role="region"
          aria-live="polite"
          aria-labelledby={`pfs-btn-${current.id}`}
          className="relative w-full min-w-0 overflow-hidden rounded-[1.5rem] bg-zinc-900/80 shadow-[0_28px_64px_rgba(0,0,0,0.38)] sm:rounded-[1.75rem] lg:aspect-[16/10] lg:min-h-[min(64svh,700px)]"
        >
          <Image
            key={current.id}
            src={current.imageSrc}
            alt={current.imageAlt}
            fill
            className={`object-cover object-center brightness-[0.9] sm:brightness-[0.88] ${SMOOTH} transition-opacity duration-500`}
            sizes="(max-width: 1024px) 100vw, 880px"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/5"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
