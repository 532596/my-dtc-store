"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { Search } from "lucide-react";

const POPULAR_QUESTIONS = [
  { label: "无感升降到底有多慢？会打扰我吗？", id: "faq-q1" },
  { label: "支持哪些大模型 API，如何连接？", id: "faq-q2" },
  { label: "1600x800mm 桌面是一整块还是拼接？", id: "faq-q3" },
  { label: "桌子在最高处稳定性怎么样？", id: "faq-q4" },
  { label: "双屏/三屏显示器支架能装吗？", id: "faq-q5" },
  { label: "为什么众筹价格不包含运费？", id: "faq-q6" },
] as const;

type FaqItem = { id: string; question: string; answer: string };
type FaqGroup = { id: string; title: string; items: FaqItem[] };

const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "faq-tech",
    title: "一、关于核心黑科技 (The Technology & \"Subtle Shift\")",
    items: [
      {
        id: "faq-q1",
        question:
          "Q1: How slow is the \"Subtle Shift\" (无感升降) exactly? Will it distract me?(无感升降到底有多慢？会打扰我吗？)",
        answer:
          "A: Not at all. We designed FlowShift based on the principles of gentle technology and ambient intelligence. Instead of a sudden, jarring mechanical movement, the desk rises at a micro-millimeter per second pace. The transition from sitting to standing takes several minutes, acting as a subtle physical intervention that your conscious mind barely registers. Your flow state remains completely unbroken.",
      },
      {
        id: "faq-q2",
        question:
          "Q2: Which LLM APIs does the desk support, and how do I connect them?(桌子支持哪些大模型 API，我该如何连接？)",
        answer:
          "A: FlowShift supports major LLM APIs (like OpenAI, Anthropic, etc.) via our companion desktop app. You simply input your API key into the app, and the desk's integrated control module syncs seamlessly. It operates locally to trigger your IDE focus modes, mute notifications, and manage your \"Flow\" sessions.",
      },
    ],
  },
  {
    id: "faq-material",
    title: "二、关于材质与硬核参数 (Materials & Specifications)",
    items: [
      {
        id: "faq-q3",
        question:
          "Q3: Is the 1600x800mm desktop one solid piece, or spliced together?(1600x800mm 的桌面是一整块实木还是拼接的？)",
        answer:
          "A: It is a single, massive, uninterrupted 1600x800mm solid piece. We use top-tier ENF-grade material, ensuring zero formaldehyde emissions. It's finished with an industrial-grade Powder Coating that provides a premium matte texture (Matrix Black or Quantum White), making it highly scratch-resistant and visually stunning without any glare.",
      },
      {
        id: "faq-q4",
        question:
          "Q4: How stable is the desk at its maximum height?(桌子在最高处有多稳？)",
        answer:
          "A: Rock solid. FlowShift is built on a heavy-duty, commercial-grade 3-stage dual-motor frame. Even fully extended, you can type aggressively without your monitors shaking or your coffee spilling.",
      },
      {
        id: "faq-q5",
        question:
          "Q5: Will my specific dual/triple monitor arm fit?(我的双屏/三屏显示器支架能装上吗？)",
        answer:
          "A: Yes. The edge profile of the desktop is specifically designed to accommodate all standard C-clamp monitor arms perfectly, without interfering with the absolute cable management system underneath.",
      },
    ],
  },
  {
    id: "faq-shipping",
    title: "三、关于发货与全球物流 (Shipping & Logistics)",
    items: [
      {
        id: "faq-q6",
        question:
          "Q6: Why is shipping not included in the pledge price?(为什么众筹价格里不包含运费？)",
        answer:
          "A: FlowShift is a premium, heavy-duty piece of hardware (weighing roughly 45-50kg packaged). Shipping costs fluctuate greatly depending on your exact location. To offer you the lowest possible pledge price today, we will calculate and collect the exact shipping fees via a Pledge Manager after the campaign ends, ensuring transparent and fair pricing.",
      },
      {
        id: "faq-q7",
        question:
          "Q7: How will you handle global shipping for such a heavy item?(对于这么重的物品，你们如何处理全球物流？)",
        answer:
          "A: We use a highly optimized hybrid fulfillment strategy. For our core backers in the US, EU, UK, and AU, we ship via ocean freight to local 3PL warehouses first, and then use local couriers (like UPS/FedEx/DPD) for final delivery. For our backers in the Asia-Pacific region (like Japan, Korea, Singapore), we ship directly from our world-class manufacturing facilities in Malaysia and China. This minimizes transit times and dramatically reduces the risk of shipping damage.",
      },
    ],
  },
  {
    id: "faq-warranty",
    title: "四、关于售后保障 (Warranty & Support)",
    items: [
      {
        id: "faq-q8",
        question:
          "Q8: What exactly does the 10-Year Ironclad Warranty cover?(10年硬核质保具体包含什么？)",
        answer:
          "A: We stand by our engineering. The 10-year warranty covers all mechanical and structural components, including the dual motors, the steel frame, and the lifting mechanisms. The electronic components (control panel, built-in AI module) are covered by a comprehensive 3-year warranty.",
      },
    ],
  },
];

export default function SupportPage() {
  const [keyword, setKeyword] = useState("");

  const flatFaqItems = useMemo(() => FAQ_GROUPS.flatMap((group) => group.items), []);

  const filteredFaq = useMemo(() => {
    if (!keyword.trim()) return flatFaqItems;
    const k = keyword.trim().toLowerCase();
    return flatFaqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(k) ||
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

      {/* 常见问题解答：与首页 FAQ 保持一致 */}
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
        <div className="mt-8 space-y-8">
          {filteredFaq.length === 0 ? (
            <div className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-6 text-center text-warm-muted">
              未找到与「{keyword}」相关的问题，请尝试其他关键词或{" "}
              <Link href="/support/contact" className="text-accent hover:underline">
                联系我们
              </Link>
              。
            </div>
          ) : (
            filteredFaqGroups.map((group, groupIndex) => (
              <Reveal key={group.id} delay={(groupIndex % 4) as 0 | 1 | 2 | 3}>
                <div className="rounded-2xl border border-warm-gray/50 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {group.items.map((item) => (
                      <li
                        key={item.id}
                        id={item.id}
                        className="scroll-mt-24 rounded-xl border border-warm-gray/30 bg-warm-cream/10 p-4"
                      >
                        <p className="font-semibold text-foreground">{item.question}</p>
                        <p className="mt-2 text-body text-warm-muted">{item.answer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))
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
