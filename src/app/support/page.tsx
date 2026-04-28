"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { FAQ_GROUPS } from "@/data/faq";
import { Search } from "lucide-react";

const POPULAR_QUESTIONS = [
  { label: "无感升降有多慢？会打扰专注吗？", id: "faq-q1" },
  { label: "支持哪些大模型 API？如何连接？", id: "faq-q2" },
  { label: "1600×800mm 桌面是一整块还是拼接？", id: "faq-q3" },
  { label: "升到最高时稳吗？", id: "faq-q4" },
  { label: "双屏 / 三屏支架能装吗？", id: "faq-q5" },
  { label: "为什么众筹价不含运费？", id: "faq-q6" },
] as const;

export default function SupportPage() {
  const [keyword, setKeyword] = useState("");

  const flatFaqItems = useMemo(() => FAQ_GROUPS.flatMap((group) => group.items), []);

  const filteredFaq = useMemo(() => {
    if (!keyword.trim()) return flatFaqItems;
    const k = keyword.trim().toLowerCase();
    return flatFaqItems.filter(
      (item) =>
        item.questionZh.toLowerCase().includes(k) ||
        item.questionEn.toLowerCase().includes(k) ||
        item.answer.toLowerCase().includes(k)
    );
  }, [keyword, flatFaqItems]);

  const filteredFaqGroups = useMemo(() => {
    if (!keyword.trim()) return FAQ_GROUPS;
    const idSet = new Set(filteredFaq.map((item) => item.id));
    return FAQ_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => idSet.has(item.id)),
    })).filter((group) => group.items.length > 0);
  }, [keyword, filteredFaq]);

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

      {/* 安装与配送、质保政策：浅底卡片须用深色字，勿用全站 text-foreground（为深色页设计） */}
      <section className="mx-auto max-w-content px-6 pb-12 md:pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <Reveal>
            <div
              id="shipping"
              className="scroll-mt-24 rounded-[18px] border border-zinc-200/90 bg-[#fafafa] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
            >
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900 md:text-xl">
                安装与配送
              </h2>
              <p className="mt-3 text-[17px] leading-relaxed text-zinc-600">
                提供 3D 交互式安装指南、视频教程。配送范围与时效在订单页明确可查。
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div
              id="warranty"
              className="scroll-mt-24 rounded-[18px] border border-zinc-200/90 bg-[#fafafa] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
            >
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900 md:text-xl">
                质保政策
              </h2>
              <p className="mt-3 text-[17px] leading-relaxed text-zinc-600">
                电机 5 年质保、桌架 3 年质保、桌面分模块质保。具体条款见购买页。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 常见问题解答：与首页 FAQ 保持一致 */}
      <section
        id="faq"
        className="scroll-mt-24 mx-auto max-w-content px-6 pb-12 md:pb-16"
        aria-labelledby="faq-heading"
      >
        <Reveal>
          <div className="max-w-2xl">
            <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              常见问题
            </h2>
            <p className="mt-2 text-sm text-warm-muted md:text-base">
              点击标题展开答案；支持上方关键词搜索。
            </p>
          </div>
        </Reveal>
        <div className="mt-8">
          {filteredFaq.length === 0 ? (
            <div className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-6 text-center text-warm-muted">
              未找到与「{keyword}」相关的问题，请尝试其他关键词或{" "}
              <Link href="/support/contact" className="text-accent hover:underline">
                联系我们
              </Link>
              。
            </div>
          ) : (
            <Reveal delay={1}>
              <FaqAccordion groups={filteredFaqGroups} variant="light" className="max-w-3xl" />
            </Reveal>
          )}
        </div>
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
