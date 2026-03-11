"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const STORAGE_KEY = "dtc-last-order";

type OrderItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status?: "pending_payment" | "paid";
  createdAt: string;
  shipping?: { name: string; phone: string; region: string; address: string };
  paymentMethod?: string;
  paidAt?: string;
  email?: string;
};

function OrderDetailsContent() {
  const searchParams = useSearchParams();
  const orderIdFromQuery = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderIdFromQuery) {
      fetch(`/api/orders/${encodeURIComponent(orderIdFromQuery)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          setOrder(data);
        })
        .catch(() => setOrder(null))
        .finally(() => setLoading(false));
    } else {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Order;
          setOrder({ ...parsed, status: parsed.paymentMethod ? "paid" : "pending_payment" });
        } else {
          setOrder(null);
        }
      } catch {
        setOrder(null);
      }
      setLoading(false);
    }
  }, [orderIdFromQuery]);

  if (loading) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <p className="text-foreground">暂无订单详情</p>
          <p className="mt-2 text-sm text-warm-muted">
            请使用订单号与邮箱在「订单跟踪」中查询物流状态。
          </p>
          <Link href="/order-tracking" className="btn-primary mt-6 inline-flex min-w-[8rem] items-center justify-center px-6 py-3 text-center">
            订单跟踪
          </Link>
        </div>
      </main>
    );
  }

  const dateStr = new Date(order.createdAt).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const shipping = order.shipping ?? { name: "—", phone: "—", region: "—", address: "—" };
  const isPaid = order.status === "paid" || (order.paymentMethod && order.paymentMethod !== "待支付");
  const paymentMethod = order.paymentMethod ?? "待支付";
  const paidAt = order.paidAt ?? "—";
  const trackingHref = `/order-tracking?orderId=${encodeURIComponent(order.orderId)}${order.email ? `&email=${encodeURIComponent(order.email)}` : ""}`;

  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 md:py-10">
        <nav className="mb-6 text-sm text-warm-muted" aria-label="面包屑">
          <Link href="/" className="hover:text-foreground">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/cart/order-success" className="hover:text-foreground">订单提交成功</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">订单详情</span>
        </nav>

        <h1 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          订单详情
        </h1>

        {/* 订单收据：信息完整 + 分区排版 + 一键查询物流 */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-warm-gray/200 bg-warm-white shadow-md">
          {/* 收据头部：订单号 + 状态 + 一键查询 */}
          <div className="border-b border-warm-gray/200 bg-warm-gray/30 px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted">订单编号</p>
                <p className="mt-1 font-mono text-lg font-semibold text-foreground">{order.orderId}</p>
                <p className="mt-2 text-sm text-warm-muted">下单时间：{dateStr}</p>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${isPaid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {isPaid ? "已支付" : "待支付"}
              </span>
            </div>
            {isPaid && (
              <Link
                href={trackingHref}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <span>一键查询物流</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            )}
          </div>

          {/* 收货与联系 */}
          <div className="grid gap-0 border-b border-warm-gray/200 sm:grid-cols-2">
            <div className="border-b border-warm-gray/200 px-5 py-4 sm:border-b-0 sm:border-r border-warm-gray/200">
              <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted">收货信息</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                <li>收件人：{shipping.name}</li>
                <li>电话：{shipping.phone}</li>
                <li>地址：{shipping.region} {shipping.address}</li>
              </ul>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted">联系与支付</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                <li>下单邮箱：{order.email || "—"}</li>
                <li>支付方式：{paymentMethod}</li>
                <li>支付时间：{paidAt}</li>
                <li>实付金额：¥{order.total.toLocaleString()}</li>
              </ul>
            </div>
          </div>

          {/* 商品明细 */}
          <div className="border-b border-warm-gray/200 px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted">商品明细</p>
            <ul className="mt-3 space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-warm-gray/100">
                    <Image
                      src={item.image || "/images/hero.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-warm-muted">{item.desc}</p>
                    <p className="mt-1 text-xs text-warm-muted">
                      ¥{item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <div className="shrink-0 text-right font-medium text-foreground">
                    ¥{(item.price * item.quantity).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-warm-gray/100 pt-4 text-sm">
              <span className="text-warm-muted">小计（商品）</span>
              <span className="text-foreground">¥{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm font-semibold text-foreground">
              <span>订单合计</span>
              <span>¥{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* 商家与须知 */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <span className="text-sm text-warm-muted">商家：官方自营</span>
            <Link href="/support#contact" className="text-sm font-medium text-accent hover:underline">联系客服</Link>
          </div>
          <div className="border-t border-warm-gray/100 bg-warm-gray/20 px-5 py-3 text-xs text-warm-muted sm:px-6">
            发票：电子普通发票（个人），支付后可申请。退换货详见
            <Link href="/support/returns" className="text-accent hover:underline">退换货政策</Link>。
          </div>
        </div>

        {/* 未支付时展示去支付入口 */}
        {!isPaid && (
          <div className="mt-8 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-semibold text-foreground">待支付</h2>
            <p className="mt-1 text-sm text-warm-muted">请完成支付后我们将安排发货。应付金额：<span className="font-semibold text-foreground">¥{order.total.toLocaleString()}</span></p>
            <Link
              href={`/cart/pay?orderId=${encodeURIComponent(order.orderId)}`}
              className="btn-primary mt-4 inline-flex min-w-[10rem] items-center justify-center px-6 py-3.5"
            >
              去支付
            </Link>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {isPaid && (
            <Link
              href={trackingHref}
              className="btn-primary inline-flex min-w-[8rem] items-center justify-center px-6 py-3 text-center"
            >
              查询物流
            </Link>
          )}
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

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    }>
      <OrderDetailsContent />
    </Suspense>
  );
}
