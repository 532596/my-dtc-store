"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import * as React from "react";

/**
 * 深底、纵向：上为胶囊列表，下为产品图（与参考一致，图在按钮下方）。胶囊 w-fit、列限宽；高度 0fr/1fr + ease-apple-out。
 */
const EASE_OUT = "cubic-bezier(0.16,1,0.3,1)";
/* 与全局 design token 一致，略长一点让高度更“落得住” */
const SHELL =
  `transition-[border-radius,background-color,border-color,box-shadow,padding] duration-500 [transition-timing-function:${EASE_OUT}] motion-reduce:duration-0 motion-reduce:transition-none`;
const GRID_EASE = `[transition:grid-template-rows_580ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none`;
/* 展开时略晚、收起时先隐去文字，体感和高度更同步 */
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
    <div className="mx-auto w-full max-w-[min(100%,1200px)]">
      {/* 上：胶囊列表，下：主图（全断点堆叠，非左右分栏） */}
      <div className="flex flex-col items-stretch gap-10 md:gap-12">
        <nav
          className="flex w-full min-w-0 max-w-80 flex-col items-start gap-4 self-start xl:max-w-[22rem]"
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
                  `min-w-0 flex flex-col text-left ${SHELL} ` +
                  (isOn
                    ? "w-full min-h-0 rounded-[20px] border border-zinc-300/80 bg-white px-4 py-3.5 text-[#1D1D1F] shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.04)] sm:px-5 sm:py-4"
                    : "w-fit max-w-full min-h-0 rounded-full border border-white/[0.1] bg-white/10 px-4 py-3 text-white/88 [min-height:3.25rem] hover:border-white/16 hover:bg-white/[0.14] sm:px-5 sm:py-3")
                }
              >
                <div className="flex min-h-[2.5rem] w-full min-w-0 items-center gap-3 sm:min-h-0 sm:gap-3.5">
                  {/* 固定 32×32 与 p1 图左侧图标对齐，避免断点下变小 */}
                  <span
                    className={
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full " +
                      (isOn
                        ? "bg-[#D2D2D7]"
                        : "border border-white/22 bg-white/[0.08]")
                    }
                    aria-hidden
                  >
                    {isOn ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#6E6E73]" />
                    ) : (
                      <Plus
                        className="h-4 w-4 text-white/65"
                        strokeWidth={1.75}
                      />
                    )}
                  </span>
                  <span
                    className={
                      "min-w-0 flex-1 text-left text-base leading-tight tracking-[-0.015em] sm:text-lg " +
                      (isOn ? "font-semibold" : "font-medium")
                    }
                  >
                    {item.label}
                  </span>
                </div>

                <div
                  className={
                    "grid w-full min-h-0 " +
                    GRID_EASE +
                    (isOn ? " grid-rows-[1fr]" : " grid-rows-[0fr]")
                  }
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      id={`${item.id}-detail`}
                      className={
                        "mt-3 border-t pt-3 text-left text-[0.9375rem] font-normal leading-[1.5] tracking-[-0.01em] sm:mt-3.5 sm:text-base " +
                        (isOn
                          ? `border-zinc-200/90 text-[#86868B] ${DETAIL_IN}`
                          : `border-zinc-200/0 text-[#86868B] ${DETAIL_OUT}`)
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

        <div
          id={panelId}
          role="region"
          aria-live="polite"
          aria-labelledby={`pfs-btn-${current.id}`}
          className="relative min-h-0 w-full min-w-0 aspect-[16/10] max-h-[min(80svh,800px)] overflow-hidden rounded-[1.75rem] bg-zinc-900/50 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:rounded-[2rem]"
        >
          <Image
            key={current.id}
            src={current.imageSrc}
            alt={current.imageAlt}
            fill
            className="object-cover object-center transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-0"
            sizes="(max-width: 1200px) 100vw, min(100vw,1200px)"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
