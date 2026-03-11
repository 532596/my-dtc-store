"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

const RECEIVER_ACCOUNT = "18056429318";

type Order = {
  orderId: string;
  items: { id: string; name: string; desc: string; price: number; quantity: number; image: string }[];
  subtotal: number;
  total: number;
  status: "pending_payment" | "paid";
  createdAt: string;
  shipping: { name: string; phone: string; region: string; address: string };
};

type Channel = "alipay" | "wechat" | "card" | "paypal";

function PayPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [channel, setChannel] = useState<Channel>("alipay");
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const c = (typeof window !== "undefined" && sessionStorage.getItem("dtc-pay-channel")) as Channel | null;
    if (c && ["alipay", "wechat", "card", "paypal"].includes(c)) setChannel(c);
  }, []);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(`/api/orders/${encodeURIComponent(orderId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) {
          setOrder(data);
          if (data?.status === "paid") router.replace(`/cart/order-success?orderId=${orderId}`);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [orderId, router]);

  const markPaidAndRedirect = useCallback(async () => {
    if (!orderId || !order) return;
    setConfirming(true);
    const label = channel === "alipay" ? "支付宝" : channel === "wechat" ? "微信支付" : channel === "paypal" ? "PayPal" : "信用卡/借记卡";
    const doPatch = () =>
      fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod: label }),
      });
    try {
      let res = await doPatch();
      if (!res.ok && res.status === 404) {
        await new Promise((r) => setTimeout(r, 400));
        res = await doPatch();
      }
      if (res.ok) {
        router.replace(`/cart/order-success?orderId=${encodeURIComponent(orderId)}`);
        return;
      }
      router.replace(`/cart/order-success?orderId=${encodeURIComponent(orderId)}&confirmed=1`);
    } catch {
      router.replace(`/cart/order-success?orderId=${encodeURIComponent(orderId)}&confirmed=1`);
    } finally {
      setConfirming(false);
    }
  }, [orderId, order, channel, router]);

  const paypalMe = typeof process.env.NEXT_PUBLIC_PAYPAL_ME === "string" && process.env.NEXT_PUBLIC_PAYPAL_ME
    ? process.env.NEXT_PUBLIC_PAYPAL_ME
    : RECEIVER_ACCOUNT;
  const goToPayPal = useCallback(() => {
    const amount = order?.total ?? 0;
    const url = `https://www.paypal.com/paypalme/${paypalMe}/${amount}USD`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [order?.total, paypalMe]);

  if (loading) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    );
  }

  if (!orderId || !order) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <p className="text-foreground">订单不存在或已过期</p>
          <Link href="/cart" className="btn-primary mt-6 inline-block px-6 py-3">返回购物车</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-xl px-4 py-8 md:py-10">
        <nav className="mb-6 text-sm text-warm-muted" aria-label="面包屑">
          <Link href="/" className="hover:text-foreground">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-foreground">购物车</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">支付</span>
        </nav>

        <h1 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">支付订单</h1>
        <p className="mt-1 font-mono text-sm text-warm-muted">{order.orderId}</p>
        <p className="mt-2 text-sm text-foreground">应付金额：<span className="font-semibold">¥{order.total.toLocaleString()}</span></p>

        <div className="mt-8 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          {channel === "paypal" && (
            <>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="h-16 w-16 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#003087]">P</span>
                  <span className="text-2xl font-bold text-[#009cde] -ml-2">P</span>
                </div>
                <p className="mt-4 text-lg font-medium text-foreground">Taking you to PayPal</p>
                <p className="mt-1 text-sm text-warm-muted">在新窗口完成支付后，请回到本页点击下方按钮确认。</p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={goToPayPal}
                  className="w-full rounded-xl border-2 border-[#003087] bg-[#003087] py-3.5 text-white font-medium hover:bg-[#002a6e] transition"
                >
                  跳转至 PayPal 支付
                </button>
                <button
                  type="button"
                  onClick={markPaidAndRedirect}
                  disabled={confirming}
                  className="btn-primary w-full py-3.5 disabled:opacity-70"
                >
                  {confirming ? "处理中…" : "我已在 PayPal 完成支付"}
                </button>
              </div>
            </>
          )}

          {(channel === "alipay" || channel === "wechat") && (
            <>
              <p className="text-sm font-medium text-foreground">
                {channel === "alipay" ? "支付宝付款" : "微信支付"}
              </p>
              <p className="mt-1 text-sm text-warm-muted">
                应付金额 <span className="font-semibold text-foreground">¥{order.total.toLocaleString()}</span>，扫码后打开支付页，向收款{channel === "alipay" ? "支付宝" : "微信"}账户付款。
              </p>

              {/* 在线生成的动态二维码：本订单专属，扫码后打开支付说明页并可跳转微信/支付宝 */}
              {origin && (channel === "alipay" || channel === "wechat") && (
                <div className="mt-4 flex flex-col items-center rounded-xl border border-warm-gray/200 bg-warm-gray/5 p-4">
                  <p className="mb-2 text-xs font-medium text-warm-muted">动态二维码（本订单专属，扫码打开支付页）</p>
                  <div className="h-52 w-52 shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-accent/50 bg-white flex items-center justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                        `${origin}/pay/info?orderId=${encodeURIComponent(order.orderId)}&amount=${order.total}&channel=${channel}`
                      )}`}
                      alt="扫码打开支付页"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-warm-muted">手机扫码后可见金额与账号，并可直接点击打开{channel === "alipay" ? "支付宝" : "微信"}支付</p>
                </div>
              )}

              <p className="mt-4 text-xs text-warm-muted">
                支付完成后请点击下方按钮，我们会尽快核对并安排发货；确认后将跳转订单成功页并可查看订单详情。
              </p>
              <button
                type="button"
                onClick={markPaidAndRedirect}
                disabled={confirming}
                className="btn-primary mt-6 w-full py-3.5 disabled:opacity-70"
              >
                {confirming ? "处理中…" : "我已完成支付"}
              </button>
            </>
          )}

          {channel === "card" && (
            <>
              <p className="text-sm text-warm-muted">信用卡/借记卡支付将跳转至安全支付页面。</p>
              <p className="mt-2 text-sm text-warm-muted">请点击下方按钮确认已完成付款（演示流程）。</p>
              <button
                type="button"
                onClick={markPaidAndRedirect}
                disabled={confirming}
                className="btn-primary mt-6 w-full py-3.5 disabled:opacity-70"
              >
                {confirming ? "处理中…" : "我已完成支付"}
              </button>
            </>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-warm-muted">订单摘要</p>
          <ul className="mt-2 space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex gap-3 text-sm">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-warm-gray/60">
                  <Image src={item.image || "/images/hero.jpg"} alt="" fill className="object-cover" sizes="48px" />
                </div>
                <span className="min-w-0 flex-1 text-foreground">{item.name} × {item.quantity}</span>
                <span className="shrink-0 font-medium text-foreground">¥{(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-sm text-warm-muted">
          <Link href="/support#contact" className="text-accent hover:underline">联系客服</Link>
        </p>
      </div>
    </main>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    }>
      <PayPageContent />
    </Suspense>
  );
}
