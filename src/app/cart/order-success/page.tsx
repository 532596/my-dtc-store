"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const fromPayConfirmed = searchParams.get("confirmed") === "1";
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!orderId) {
      setValid(false);
      return;
    }
    if (fromPayConfirmed) {
      setValid(true);
      try {
        const key = "dtc-paid-order-ids";
        const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
        const ids: string[] = raw ? JSON.parse(raw) : [];
        if (!ids.includes(orderId)) {
          localStorage.setItem(key, JSON.stringify([orderId, ...ids]));
        }
      } catch {}
      return;
    }
    let cancelled = false;
    fetch(`/api/orders/${encodeURIComponent(orderId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setValid(data?.status === "paid");
          if (data?.status === "paid") {
            try {
              const key = "dtc-paid-order-ids";
              const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
              const ids: string[] = raw ? JSON.parse(raw) : [];
              if (!ids.includes(orderId)) {
                localStorage.setItem(key, JSON.stringify([orderId, ...ids]));
              }
            } catch {}
          }
        }
      })
      .catch(() => { if (!cancelled) setValid(false); });
    return () => { cancelled = true; };
  }, [orderId, fromPayConfirmed]);

  if (valid === false) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <p className="text-foreground">订单不存在或尚未支付完成</p>
          <p className="mt-2 text-sm text-warm-muted">请先完成支付，或从订单详情页继续支付。</p>
          <Link href="/cart" className="btn-primary mt-6 inline-block px-6 py-3">返回购物车</Link>
        </div>
      </main>
    );
  }

  if (valid !== true) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    );
  }

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
          感谢您的购买。我们已收到您的订单与支付，将尽快安排发货。点击「查看订单」可查看订单详情，发货后可在「订单跟踪」中查询物流。离开本页后，可随时在账户的「订单状态」中再次查看支付成功的订单。
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={orderId ? `/cart/order-details?orderId=${encodeURIComponent(orderId)}` : "/cart/order-details"}
            className="btn-primary inline-flex min-w-[8rem] items-center justify-center px-6 py-3 text-center"
          >
            查看订单
          </Link>
          <Link
            href="/account/orders"
            className="inline-flex min-w-[8rem] items-center justify-center rounded-xl border border-warm-gray/40 bg-warm-white px-6 py-3 text-center text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
          >
            订单状态
          </Link>
          <Link
            href="/series"
            className="inline-flex min-w-[8rem] items-center justify-center rounded-xl border border-warm-gray/40 bg-warm-white px-6 py-3 text-center text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
          >
            继续选购
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
