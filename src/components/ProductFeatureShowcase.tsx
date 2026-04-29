"use client";

import Image from "next/image";
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
 * 图二式：上方大图 + 中间横向标签切换 + 下方说明（深色站适配）。
 */
export default function ProductFeatureShowcase() {
  const [active, setActive] = React.useState(0);
  const uid = React.useId();
  const current = ITEMS[active];
  const textPanelId = `pfs-text-${uid}`;
  const tabId = (i: number) => `pfs-tab-${i}-${uid}`;

  return (
    <div className="mx-auto w-full max-w-[min(100%,1200px)]">
      <div
        className="flex flex-col"
        role="region"
        aria-label="产品特性展示"
        aria-live="polite"
      >
        <div
          className="relative w-full min-h-[min(52svh,560px)] overflow-hidden rounded-[28px] bg-zinc-900 shadow-[0_32px_80px_rgba(0,0,0,0.45)] sm:min-h-[min(58svh,640px)] md:min-h-[min(62svh,720px)] md:rounded-[32px]"
        >
          <Image
            key={current.imageSrc + active}
            src={current.imageSrc}
            alt={current.imageAlt}
            fill
            className="object-cover object-center brightness-[0.88] transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/5"
            aria-hidden
          />
        </div>

        <div className="mt-8 flex justify-center px-0 sm:mt-10">
          <div
            className="flex max-w-full items-center gap-0.5 overflow-x-auto scroll-smooth rounded-full bg-white/[0.08] p-1.5 [scrollbar-width:none] [-ms-overflow-style:none] md:gap-1 md:p-1.5 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="选择卖点"
          >
            {ITEMS.map((item, i) => {
              const isOn = i === active;
              return (
                <button
                  key={item.id}
                  id={tabId(i)}
                  type="button"
                  role="tab"
                  aria-selected={isOn}
                  aria-controls={textPanelId}
                  tabIndex={isOn ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                      e.preventDefault();
                      setActive((a) => (a + 1) % ITEMS.length);
                    }
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                      e.preventDefault();
                      setActive((a) => (a - 1 + ITEMS.length) % ITEMS.length);
                    }
                    if (e.key === "Home") {
                      e.preventDefault();
                      setActive(0);
                    }
                    if (e.key === "End") {
                      e.preventDefault();
                      setActive(ITEMS.length - 1);
                    }
                  }}
                  className={
                    "shrink-0 rounded-full px-3 py-2.5 text-[0.8rem] font-medium tracking-tight transition-all duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] sm:px-4 sm:text-sm md:px-5 md:py-2.5 md:text-[0.9375rem] " +
                    (isOn
                      ? "bg-[#1d1d1f] text-white shadow-sm"
                      : "text-white/60 hover:text-white/88")
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={textPanelId}
          className="mt-8 sm:mt-10"
          role="tabpanel"
          aria-labelledby={tabId(active)}
        >
          <p className="mx-auto max-w-[40rem] text-pretty text-center text-[0.9375rem] leading-relaxed text-white/75 md:text-[1.0625rem] md:leading-[1.65]">
            {current.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
