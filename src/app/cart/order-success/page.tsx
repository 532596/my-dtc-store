"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-xl px-4 py-16 text-center md:py-24">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600" aria-hidden>
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          订单提交成功
        </h1>
        <p className="mt-3 text-sm text-warm-muted">
          感谢您的购买。我们已收到您的订单，将尽快安排发货；您可在「订单跟踪」中查看物流状态。
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/order-tracking" className="btn-primary inline-flex px-6 py-3">
            查看订单
          </Link>
          <Link
            href="/series"
            className="inline-flex rounded-xl border border-warm-gray/40 bg-warm-white px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
          >
            继续选购
          </Link>
        </div>
      </div>
    </main>
  );
}
