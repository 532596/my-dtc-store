"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PAID_ORDER_IDS_KEY = "dtc-paid-order-ids";

const STATUS_LABELS: Record<string, string> = {
  pending_payment: "待支付",
  paid: "已支付",
  shipped: "已发货",
  in_transit: "运送中",
  received: "已收货",
};

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
  status?: string;
  createdAt: string;
  shipping?: { name: string; phone: string; region: string; address: string };
  paymentMethod?: string;
  paidAt?: string;
  email?: string;
};

function orderStatusLabel(status: string | undefined): string {
  if (!status) return "已支付";
  return STATUS_LABELS[status] ?? "已支付";
}

export default function AccountListsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(PAID_ORDER_IDS_KEY) : null;
      const ids: string[] = raw ? JSON.parse(raw) : [];
      if (ids.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }
      Promise.all(
        ids.map((id) =>
          fetch(`/api/orders/${encodeURIComponent(id)}`).then((r) => (r.ok ? r.json() : null))
        )
      )
        .then((list) => {
          if (cancelled) return;
          const paid = (list.filter(Boolean) as Order[]).filter(
            (o) => o.status === "paid" || o.status === "shipped" || o.status === "in_transit" || o.status === "received"
          );
          setOrders(paid);
        })
        .catch(() => { if (!cancelled) setOrders([]); })
        .finally(() => { if (!cancelled) setLoading(false); });
    } catch {
      setOrders([]);
      setLoading(false);
    }
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="min-h-screen bg-warm-gray/10">
      <section className="relative mx-auto max-w-2xl px-6 py-section">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(186,199,213,0.22),transparent_55%)]" />
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            我的清单
          </h1>
          <p className="mt-2 text-sm text-warm-muted">
            该账号下所有支付成功的订单；订单状态包括已支付、已发货、运送中、已收货。
          </p>

          {loading ? (
            <div className="mt-8 py-16 text-center text-warm-muted">加载中…</div>
          ) : orders.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-warm-gray/40 bg-warm-white/95 p-8 text-center">
              <p className="text-sm text-warm-muted">暂无支付成功的订单。</p>
              <p className="mt-1 text-xs text-warm-muted">完成支付后，订单会显示在本页。</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/series"
                  className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
                >
                  去逛逛
                </Link>
                <Link
                  href="/account"
                  className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
                >
                  返回账户
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {orders.map((order) => {
                const dateStr = new Date(order.createdAt).toLocaleString("zh-CN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const statusLabel = orderStatusLabel(order.status);
                const statusClass =
                  order.status === "received"
                    ? "bg-green-100 text-green-800"
                    : order.status === "in_transit"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "shipped"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800";
                return (
                  <div
                    key={order.orderId}
                    className="overflow-hidden rounded-xl border border-warm-gray/50 bg-warm-white shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-warm-gray/200 bg-warm-gray/5 px-4 py-3">
                      <p className="font-mono text-sm font-medium text-foreground">{order.orderId}</p>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </div>
                    <div className="px-4 py-3 text-sm text-warm-muted">
                      下单时间：{dateStr} · 合计 ¥{order.total.toLocaleString()}
                    </div>
                    <div className="border-t border-warm-gray/100 px-4 py-3">
                      <ul className="space-y-2">
                        {order.items.slice(0, 3).map((item) => (
                          <li key={item.id} className="flex gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-warm-gray/100">
                              <Image
                                src={item.image || "/images/hero.jpg"}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-warm-muted">
                                ¥{item.price.toLocaleString()} × {item.quantity}
                              </p>
                            </div>
                          </li>
                        ))}
                        {order.items.length > 3 && (
                          <li className="text-xs text-warm-muted">等共 {order.items.length} 件商品</li>
                        )}
                      </ul>
                    </div>
                    <div className="border-t border-warm-gray/200 px-4 py-3">
                      <Link
                        href={`/cart/order-details?orderId=${encodeURIComponent(order.orderId)}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        查看订单详情 →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-8">
            <Link href="/account" className="text-sm font-medium text-accent hover:underline">
              返回账户
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
