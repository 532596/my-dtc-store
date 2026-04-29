"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import * as React from "react";

/**
 * 底图按 p2 铺满视窗（全宽 + 约 100svh）；左侧胶囊+展开说明在同列；grid 0fr↔1fr 与透明度丝滑过渡。
 */
const EASE_OUT = "cubic-bezier(0.16,1,0.3,1)";
const SHELL =
  `transition-[border-radius,background-color,border-color,box-shadow,padding,ring-color] duration-500 [transition-timing-function:${EASE_OUT}] motion-reduce:duration-0 motion-reduce:transition-none`;
const GRID_EASE = `[transition:grid-template-rows_580ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none`;
const DETAIL_IN =
  "opacity-100 [transition:opacity_420ms_cubic-bezier(0.16,1,0.3,1)_70ms,transform_520ms_cubic-bezier(0.16,1,0.3,1)_45ms] translate-y-0 motion-reduce:transition-none";
const DETAIL_OUT =
  "pointer-events-none opacity-0 [transition:opacity_160ms_ease-out,transform_200ms_cubic-bezier(0.4,0,0.2,1)] -translate-y-1 sm:-translate-y-1.5 motion-reduce:transition-none";

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

export default function ProductFeatureShowcase() {
  const [active, setActive] = React.useState(0);
  const current = ITEMS[active];
  const panelId = "product-feature-panel";

  return (
    <div className="w-full">
      <div
        id={panelId}
        role="region"
        aria-labelledby={`pfs-btn-${current.id}`}
        className="relative w-full min-h-[100svh] overflow-hidden bg-zinc-900 shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
      >
        <div className="absolute inset-0 z-0">
          <Image
            key={current.id}
            src={current.imageSrc}
            alt={current.imageAlt}
            fill
            className="object-cover object-center transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-0 sm:object-[58%_center] lg:object-[62%_center]"
            sizes="100vw"
            priority={false}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/30 to-black/0 sm:from-black/50 sm:via-black/20"
          aria-hidden
        />

        <nav
          className="relative z-10 flex w-full min-w-0 max-w-64 flex-col items-start gap-3.5 p-3 pt-4 sm:max-w-60 sm:gap-4 sm:p-5 sm:pt-5 md:max-w-64 md:pl-5 md:pt-6"
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
                aria-controls={`${item.id}-detail`}
                id={`pfs-btn-${item.id}`}
                onClick={() => setActive(i)}
                className={
                  `min-w-0 text-left ${SHELL} ` +
                  "flex flex-col " +
                  (isOn
                    ? "w-full max-w-full min-h-0 rounded-2xl border border-zinc-200/90 bg-[#F5F5F7] px-3.5 py-3 text-[#1D1D1F] shadow-[0_4px_20px_rgba(0,0,0,0.12)] sm:px-4 sm:py-3.5"
                    : "w-fit max-w-full min-h-0 rounded-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-white/90 [min-height:2.75rem] shadow-sm backdrop-blur-md hover:border-white/28 hover:bg-white/16 sm:px-4 sm:py-2.5")
                }
              >
                <div className="flex min-h-0 w-full min-w-0 items-center gap-2.5 sm:gap-3">
                  <span
                    className={
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 " +
                      (isOn
                        ? "bg-[#D2D2D7]"
                        : "border border-white/30 bg-white/12")
                    }
                    aria-hidden
                  >
                    {isOn ? (
                      <span className="h-2 w-2 rounded-full bg-[#6E6E73] sm:h-2.5 sm:w-2.5" />
                    ) : (
                      <Plus
                        className="h-3.5 w-3.5 text-white/75 sm:h-4 sm:w-4"
                        strokeWidth={1.75}
                      />
                    )}
                  </span>
                  <span
                    className={
                      "min-w-0 flex-1 text-left text-[0.9375rem] font-medium leading-tight tracking-[-0.01em] sm:text-base " +
                      (isOn ? "font-semibold" : "font-medium")
                    }
                  >
                    {item.label}
                  </span>
                </div>

                <div
                  className={
                    "grid w-full min-w-0 min-h-0 " +
                    GRID_EASE +
                    (isOn ? " grid-rows-[1fr]" : " grid-rows-[0fr]")
                  }
                >
                  <div className="min-h-0 w-full min-w-0 max-h-80 overflow-y-auto sm:max-h-96">
                    <p
                      id={`${item.id}-detail`}
                      className={
                        "mt-2.5 border-t border-zinc-200/90 pt-2.5 text-left text-sm font-normal leading-[1.55] tracking-[-0.01em] text-zinc-600 sm:mt-3 sm:pt-3 " +
                        (isOn
                          ? `${DETAIL_IN}`
                          : `border-0 text-transparent ${DETAIL_OUT}`)
                      }
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
      </div>
    </div>
  );
}
