"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { Search } from "lucide-react";

const POPULAR_QUESTIONS = [
  { label: "各型号（Model A / B / C）有什么区别？", id: "faq-q1" },
  { label: "桌面承重上限是多少？", id: "faq-q2" },
  { label: "SKINS 是什么？", id: "faq-q3" },
  { label: "配件是否与所有型号通用？", id: "faq-q4" },
  { label: "桌子如何调节高度？", id: "faq-q5" },
  { label: "配送需要多久？", id: "faq-q6" },
] as const;

const FAQ_ITEMS: { id: string; question: string; answer: string }[] = [
  {
    id: "faq-q1",
    question: "各型号（Model A / B / C）有什么区别？",
    answer:
      "Model A 为紧凑型，适合小空间；Model B 功能均衡，带记忆与常用高度预设；Model C 为旗舰款，承重与升降范围更大，适合双屏与多设备。详细规格可在产品页对比。",
  },
  {
    id: "faq-q2",
    question: "桌面承重上限是多少？",
    answer:
      "Model A 桌面承重约 80kg，Model B 约 100kg，Model C 约 120kg。建议在承重范围内放置显示器、主机与常用办公用品，避免长期超载。",
  },
  {
    id: "faq-q3",
    question: "SKINS 是什么？",
    answer:
      "SKINS 为桌面贴面/饰面系列，可更换桌面外观与材质感，便于与家居风格统一。部分型号支持选配 SKINS，具体以产品页说明为准。",
  },
  {
    id: "faq-q4",
    question: "配件是否与所有型号通用？",
    answer:
      "线缆收纳、显示器支架等通用配件适用于全系列；桌板尺寸与孔位因型号而异，选购时请确认兼容的型号与尺寸。",
  },
  {
    id: "faq-q5",
    question: "桌子如何调节高度？",
    answer:
      "通过桌面侧边或底部的控制面板可一键升降；部分型号支持记忆高度、语音控制。具体操作见随箱说明书或官网「使用指南」视频。",
  },
  {
    id: "faq-q6",
    question: "配送需要多久？",
    answer:
      "国内主要城市通常 3–7 个工作日送达，偏远地区略长。下单后可在「订单跟踪」中查看物流状态与预计送达时间。",
  },
];

export default function SupportPage() {
  const [keyword, setKeyword] = useState("");

  const filteredFaq = useMemo(() => {
    if (!keyword.trim()) return FAQ_ITEMS;
    const k = keyword.trim().toLowerCase();
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(k) ||
        item.answer.toLowerCase().includes(k)
    );
  }, [keyword]);

  const onSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!keyword.trim()) {
        document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const first = filteredFaq[0];
      if (first) {
        document.getElementById(first.id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [keyword, filteredFaq]
  );

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero：标题 + 搜索框，参考 p1 */}
      <section
        className="relative mx-auto max-w-content px-6 pt-section pb-12 md:pt-section-md md:pb-16"
        aria-label="帮助中心"
      >
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              我们随时为您提供帮助。
            </h1>
          </Reveal>
          <Reveal delay={1}>
            <form
              onSubmit={onSearchSubmit}
              className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
            >
              <input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="输入关键词搜索..."
                className="w-full rounded-lg border border-warm-gray/60 bg-white px-4 py-3 text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                aria-label="搜索常见问题"
              />
              <span className="hidden shrink-0 text-sm text-warm-muted sm:inline">
                按 Enter 搜索
              </span>
              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-lg border border-warm-gray/60 bg-warm-cream/30 px-4 py-3 text-sm font-medium text-foreground hover:bg-warm-cream/50"
                aria-label="搜索"
              >
                <Search className="h-4 w-4" />
                搜索
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* 热门问题：左侧标题，右侧链接列表 */}
      <section className="mx-auto max-w-content px-6 pb-12 md:pb-16">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <h2 className="shrink-0 text-lg font-semibold text-foreground md:w-40">
              热门问题
            </h2>
            <ul className="min-w-0 space-y-3">
              {POPULAR_QUESTIONS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-1.5 text-accent hover:underline"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden>&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 安装与配送、质保政策卡片 */}
      <section className="mx-auto max-w-content px-6 pb-12 md:pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <div
              id="shipping"
              className="scroll-mt-24 rounded-xl border border-warm-gray/60 bg-white p-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground">
                安装与配送
              </h2>
              <p className="mt-3 text-body text-warm-muted">
                提供 3D 交互式安装指南、视频教程。配送范围与时效在订单页明确可查。
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div
              id="warranty"
              className="scroll-mt-24 rounded-xl border border-warm-gray/60 bg-white p-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground">
                质保政策
              </h2>
              <p className="mt-3 text-body text-warm-muted">
                电机 5 年质保、桌架 3 年质保、桌面分模块质保。具体条款见购买页。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 常见问题解答 */}
      <section
        id="faq"
        className="scroll-mt-24 mx-auto max-w-content px-6 pb-12 md:pb-16"
        aria-labelledby="faq-heading"
      >
        <Reveal>
          <h2 id="faq-heading" className="text-2xl font-semibold text-foreground">
            常见问题解答
          </h2>
        </Reveal>
        <ul className="mt-8 space-y-6">
          {filteredFaq.length === 0 ? (
            <li className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-6 text-center text-warm-muted">
              未找到与「{keyword}」相关的问题，请尝试其他关键词或{" "}
              <Link href="/support#contact" className="text-accent hover:underline">
                联系我们
              </Link>
              。
            </li>
          ) : (
            filteredFaq.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <li
                  id={item.id}
                  className="scroll-mt-24 rounded-xl border border-warm-gray/40 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-body text-warm-muted">{item.answer}</p>
                </li>
              </Reveal>
            ))
          )}
        </ul>
      </section>

      {/* 健康办公指南 + 联系我们 */}
      <section className="mx-auto max-w-content px-6 pb-section md:pb-section-md">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href="/guide"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent hover:underline"
            >
              健康办公指南
              <span aria-hidden>&rarr;</span>
            </Link>
            <span className="hidden text-warm-muted sm:inline">|</span>
            <div id="contact" className="scroll-mt-24">
              <span className="text-sm text-warm-muted">需要更多帮助？</span>{" "}
              <a
                href="mailto:support@example.com"
                className="text-sm font-medium text-accent hover:underline"
              >
                邮件联系我们
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
