"use client";

import Image from "next/image";
import * as React from "react";

const TABS = [
  {
    id: "ambient",
    title: "Ambient Notifications",
    pill: "IDE Focus Mode UI (Placeholder)",
    imageSrc: "/images/scene-office.jpg",
    imageAlt: "IDE Focus Mode：代码编辑器全屏时，桌面自动静音通知",
    body: "摒弃蜂鸣与震动式打扰。系统仅在后台以温和消息提醒你切换姿态，不强行打断当前思路。",
    sub: "勿扰式柔性提醒：像懂你的助手，而不是警报器。",
  },
  {
    id: "ergo",
    title: "Smart Ergonomics",
    pill: "API Key Minimal Panel (Placeholder)",
    imageSrc: "/images/hero.jpg",
    imageAlt: "LLM Integration：API Key 极简输入与人体工学推荐",
    body: "输入身高或语音指令后，AI 自动推荐最符合人体工学的坐站高度，让每一毫米升降都更贴合你的身体数据。",
    sub: "智能人体工学推荐：告别反复试探与盲目调节。",
  },
  {
    id: "agent",
    title: "AI Agent Web Integration",
    pill: "Passive Fatigue Model (Placeholder)",
    imageSrc: "/images/scene-learning.jpg",
    imageAlt: "Smart Fatigue：系统自动计算久坐阈值并触发无感干预",
    body: "不额外强制你下载冗余 App。通过网页端连接你已有工具链，把健康策略自然嵌入现有工作流。",
    sub: "你的工作流不变，健康干预在后台无感发生。",
  },
] as const;

/**
 * The Cognitive Copilot：上图二式 — 大图、横向标签切换、下方主文案 + 副标（原三卡内容不变）。
 */
export default function CognitiveCopilotShowcase() {
  const [active, setActive] = React.useState(0);
  const uid = React.useId();
  const t = TABS[active];
  const textId = `ccp-text-${uid}`;
  const tabId = (i: number) => `ccp-tab-${i}-${uid}`;

  return (
    <div className="w-full" role="region" aria-label="Cognitive Copilot 功能" aria-live="polite">
      <div
        className="relative w-full min-h-[min(48svh,520px)] overflow-hidden rounded-[28px] bg-zinc-900 shadow-[0_28px_70px_rgba(0,0,0,0.45)] sm:min-h-[min(56svh,600px)] md:min-h-[min(60svh,680px)] md:rounded-[32px]"
      >
        <Image
          key={t.imageSrc + active}
          src={t.imageSrc}
          alt={t.imageAlt}
          fill
          className="object-cover object-center brightness-[0.72] transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]"
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" aria-hidden />
        <div className="absolute left-4 top-4 md:left-6 md:top-5">
          <span className="inline-block max-w-[85vw] rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[0.7rem] text-white/88 backdrop-blur-sm sm:text-xs">
            {t.pill}
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <div
          className="inline-flex max-w-full flex-nowrap items-center gap-0.5 overflow-x-auto scroll-smooth rounded-full bg-white/[0.08] p-1.5 [scrollbar-width:none] md:gap-1 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Cognitive Copilot 能力"
        >
          {TABS.map((item, i) => {
            const isOn = i === active;
            return (
              <button
                key={item.id}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={isOn}
                aria-controls={textId}
                tabIndex={isOn ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => (a + 1) % TABS.length);
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => (a - 1 + TABS.length) % TABS.length);
                  }
                }}
                className={
                  "shrink-0 max-w-[min(100%,14rem)] rounded-full px-3 py-2.5 text-left text-[0.72rem] font-medium leading-snug tracking-tight transition-all duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] sm:max-w-[16rem] sm:px-4 sm:text-sm md:max-w-[18rem] md:text-[0.9375rem] " +
                  (isOn ? "bg-[#1d1d1f] text-white shadow-sm" : "text-white/55 hover:text-white/88")
                }
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={textId}
        className="mt-8 sm:mt-10"
        role="tabpanel"
        aria-labelledby={tabId(active)}
      >
        <h3 className="sr-only">{t.title}</h3>
        <p className="mx-auto max-w-[40rem] text-pretty text-center text-[0.9375rem] leading-relaxed text-white/80 md:text-[1.0625rem] md:leading-[1.7]">
          {t.body}
        </p>
        <p className="mx-auto mt-4 max-w-[40rem] text-pretty text-center text-xs leading-relaxed text-white/50 md:mt-5 md:text-sm">
          {t.sub}
        </p>
      </div>
    </div>
  );
}
