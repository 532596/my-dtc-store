"use client";

import Link from "next/link";
import { useState } from "react";
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

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [mockStatus, setMockStatus] = useState<StepKey>("transit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;
    setIsQuerying(true);
    setSearched(true);
    setMockStatus("transit");
    setTimeout(() => {
      setIsQuerying(false);
      document.getElementById("tracking-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
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

      {/* 查询结果：仅在有查询后展示 */}
      {searched && (
        <section id="tracking-result" className="mx-auto max-w-content scroll-mt-6 px-6 pb-12 md:pb-16">
          <div className="mx-auto max-w-xl">
            <Reveal>
              <div className="rounded-xl border border-warm-gray/60 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">
                  订单 {orderNumber || "—"} 物流状态
                </h2>
                <p className="mt-1 text-sm text-warm-muted">
                  当前状态：{STATUS_STEPS.find((s) => s.key === mockStatus)?.label}
                </p>

                <ul className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:gap-2" aria-label="配送进度">
                  {STATUS_STEPS.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    return (
                      <li
                        key={step.key}
                        className="flex items-center gap-3 sm:flex-1"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                            isActive
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-warm-gray/40 bg-warm-gray/20 text-warm-muted"
                          }`}
                        >
                          <StepIcon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <span
                            className={`font-medium ${
                              isCurrent ? "text-accent" : isActive ? "text-foreground" : "text-warm-muted"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-6 text-sm text-warm-muted">
                  如有疑问，请查看
                  <Link href="/support#shipping" className="ml-1 text-accent hover:underline">
                    配送说明
                  </Link>
                  或
                  <Link href="/support#contact" className="ml-1 text-accent hover:underline">
                    联系我们
                  </Link>
                  。
                </p>
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
