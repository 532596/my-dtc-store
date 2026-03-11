"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { Package, Truck, MapPin, CheckCircle2 } from "lucide-react";

const STATUS_STEPS = [
  { key: "placed", label: "已下单", icon: Package },
  { key: "shipped", label: "已发货", icon: Truck },
  { key: "transit", label: "配送中", icon: MapPin },
  { key: "delivered", label: "已签收", icon: CheckCircle2 },
] as const;

type StepKey = (typeof STATUS_STEPS)[number]["key"];

const STEP_ORDER: StepKey[] = ["placed", "shipped", "transit", "delivered"];

function getStepIndex(status: string): number {
  const i = STEP_ORDER.indexOf(status as StepKey);
  return i >= 0 ? i : 0;
}

/** 订单状态映射到物流步骤 */
function orderStatusToStep(status: string | undefined): StepKey {
  if (status === "received") return "delivered";
  if (status === "in_transit") return "transit";
  if (status === "shipped") return "shipped";
  return "placed";
}

export default function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [mockStatus, setMockStatus] = useState<StepKey>("transit");
  const [urlApplied, setUrlApplied] = useState(false);

  useEffect(() => {
    const orderId = searchParams.get("orderId")?.trim();
    const emailFromUrl = searchParams.get("email")?.trim();
    if (urlApplied || !orderId) return;
    setOrderNumber(orderId);
    if (emailFromUrl) setEmail(emailFromUrl);
    setUrlApplied(true);
    if (!emailFromUrl) return;
    setIsQuerying(true);
    setSearched(true);
    fetch(`/api/orders/${encodeURIComponent(orderId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const step = orderStatusToStep(data?.status);
        setMockStatus(step);
      })
      .catch(() => setMockStatus("transit"))
      .finally(() => {
        setIsQuerying(false);
        setTimeout(() => {
          document.getElementById("tracking-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      });
  }, [searchParams, urlApplied]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;
    setIsQuerying(true);
    setSearched(true);
    fetch(`/api/orders/${encodeURIComponent(orderNumber.trim())}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setMockStatus(orderStatusToStep(data?.status)))
      .catch(() => setMockStatus("transit"))
      .finally(() => {
        setIsQuerying(false);
        setTimeout(() => {
          document.getElementById("tracking-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      });
  };

  const currentStepIndex = getStepIndex(mockStatus);

  return (
    <main className="min-h-screen bg-warm-white">
      {/* 标题区：订单跟踪专用，无搜索、无热门问题 */}
      <section
        className="mx-auto max-w-content px-6 pt-section pb-10 md:pt-section-md md:pb-14"
        aria-label="订单跟踪"
      >
        <div className="mx-auto max-w-xl">
          <Reveal>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              订单跟踪
            </h1>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-3 text-body text-warm-muted">
              输入订单号与注册邮箱，查询物流状态与配送进度。
            </p>
          </Reveal>

          <Reveal delay={2}>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4 rounded-xl border border-warm-gray/60 bg-white p-6 shadow-sm"
            >
              <div>
                <label
                  htmlFor="order-number"
                  className="block text-sm font-medium text-foreground"
                >
                  订单号
                </label>
                <input
                  id="order-number"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="例如：SSD-2024-XXXX"
                  className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-white px-4 py-3 text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="order-email"
                  className="block text-sm font-medium text-foreground"
                >
                  注册邮箱
                </label>
                <input
                  id="order-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="下单时使用的邮箱"
                  className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-white px-4 py-3 text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isQuerying}
                className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:pointer-events-none disabled:opacity-70"
              >
                {isQuerying ? "查询中…" : "查询"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* 查询结果：时间线式物流状态 */}
      {searched && (
        <section id="tracking-result" className="mx-auto max-w-content scroll-mt-6 px-6 pb-12 md:pb-16">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-warm-gray/200 bg-white shadow-lg">
                {/* 头部：订单号 + 当前状态徽章 */}
                <div className="border-b border-warm-gray/100 bg-warm-gray/30 px-6 py-5 sm:px-8 sm:py-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted">订单号</p>
                      <p className="mt-1 font-mono text-lg font-semibold text-foreground">{orderNumber || "—"}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/12 px-4 py-2 text-sm font-semibold text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      {STATUS_STEPS.find((s) => s.key === mockStatus)?.label}
                    </span>
                  </div>
                </div>

                {/* 时间线进度 */}
                <div className="relative px-6 py-8 sm:px-8 sm:py-10">
                  <p className="mb-6 text-sm font-medium text-warm-muted">配送进度</p>
                  <span
                    className="absolute left-[2.25rem] top-14 bottom-14 w-0.5 bg-warm-gray/40 sm:left-12"
                    aria-hidden
                  />
                  <ul className="relative space-y-0" aria-label="配送进度">
                    {STATUS_STEPS.map((step, index) => {
                      const StepIcon = step.icon;
                      const isDone = index < currentStepIndex;
                      const isCurrent = index === currentStepIndex;
                      const isPending = index > currentStepIndex;
                      const mockDate =
                        index <= currentStepIndex
                          ? ["2026-03-08 14:20", "2026-03-09 09:00", "2026-03-10 16:30", "2026-03-11 预计送达"][index]
                          : null;
                      return (
                        <li
                          key={step.key}
                          className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5"
                        >
                          <span
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white sm:h-12 sm:w-12 ${
                              isDone
                                ? "border-accent bg-accent text-white"
                                : isCurrent
                                  ? "border-accent bg-accent/15 text-accent shadow-md"
                                  : "border-warm-gray/40 bg-warm-gray/30 text-foreground/60"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.5} />
                            ) : (
                              <StepIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.5} />
                            )}
                          </span>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <p
                              className={`font-semibold ${
                                isCurrent ? "text-foreground" : isDone ? "text-foreground" : "text-warm-muted"
                              }`}
                            >
                              {step.label}
                            </p>
                            {mockDate && (
                              <p className="mt-0.5 text-xs text-warm-muted">{mockDate}</p>
                            )}
                            {isCurrent && (
                              <p className="mt-2 text-sm text-warm-muted">
                                {step.key === "placed" && "订单已确认，等待仓库拣货发货。"}
                                {step.key === "shipped" && "商品已发出，正在等待揽收或运输。"}
                                {step.key === "transit" && "商品正在配送中，请保持收货电话畅通。"}
                                {step.key === "delivered" && "您已签收，感谢购买。"}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* 底部说明与链接 */}
                <div className="border-t border-warm-gray/100 bg-warm-gray/20 px-6 py-4 sm:px-8">
                  <p className="text-sm text-warm-muted">
                    如有疑问，请查看
                    <Link href="/support#shipping" className="ml-1 font-medium text-accent hover:underline">
                      配送说明
                    </Link>
                    或
                    <Link href="/support#contact" className="ml-1 font-medium text-accent hover:underline">
                      联系我们
                    </Link>
                    。
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 未查询时的说明 */}
      {!searched && (
        <section className="mx-auto max-w-content px-6 pb-12 md:pb-16">
          <div className="mx-auto max-w-xl">
            <Reveal>
              <div className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-6">
                <h2 className="text-sm font-semibold text-foreground">
                  如何查找订单号？
                </h2>
                <p className="mt-2 text-sm text-warm-muted">
                  订单号可在下单成功后的确认邮件中查看，格式一般为
                  SSD-年份-XXXX。请使用下单时填写的邮箱进行查询。
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 底部快捷链接 */}
      <section className="mx-auto max-w-content px-6 pb-section md:pb-section-md">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/support#shipping"
              className="text-foreground hover:text-accent hover:underline"
            >
              配送说明
            </Link>
            <span className="text-warm-muted">|</span>
            <Link
              href="/support#warranty"
              className="text-foreground hover:text-accent hover:underline"
            >
              质保政策
            </Link>
            <span className="text-warm-muted">|</span>
            <Link
              href="/support"
              className="text-foreground hover:text-accent hover:underline"
            >
              常见问题与支持
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
