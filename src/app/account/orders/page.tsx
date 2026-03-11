"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PAID_ORDER_IDS_KEY = "dtc-paid-order-ids";

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

export default function AccountOrdersPage() {
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
          const paid = (list.filter(Boolean) as Order[]).filter((o) => o.status === "paid");
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
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            订单状态
          </h1>
          <p className="mt-2 text-sm text-warm-muted">
            您支付成功的订单详情可在此查看；点击「查看详情」可进入完整订单页。
          </p>

          {loading ? (
            <div className="mt-8 py-16 text-center text-warm-muted">加载中…</div>
          ) : orders.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-warm-gray/40 bg-warm-white/95 p-8 text-center">
              <p className="text-sm text-warm-muted">暂无支付成功的订单。</p>
              <p className="mt-1 text-xs text-warm-muted">完成支付后，订单会出现在本页。</p>
              <Link
                href="/series"
                className="btn-primary mt-6 inline-block px-6 py-3"
              >
                去选购
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {orders.map((order) => {
                const dateStr = new Date(order.createdAt).toLocaleString("zh-CN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const shipping = order.shipping ?? { name: "—", phone: "—", region: "—", address: "—" };
                const paymentMethod = order.paymentMethod ?? "—";
                const paidAt = order.paidAt ?? "—";
                return (
                  <div
                    key={order.orderId}
                    className="overflow-hidden rounded-xl border border-warm-gray/50 bg-warm-white shadow-sm"
                  >
                    <div className="border-b border-warm-gray/200 bg-warm-gray/5 px-5 py-4 text-center">
                      <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
                        订单收据
                      </p>
                      <p className="mt-1 font-mono text-xs text-warm-muted">{order.orderId}</p>
                    </div>

                    <div className="px-5 py-4 text-sm">
                      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                        <span className="text-warm-muted">下单时间</span>
                        <span className="text-foreground">{dateStr}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap justify-between gap-x-4 gap-y-1">
                        <span className="text-warm-muted">订单状态</span>
                        <span className="text-foreground">已支付，将尽快安排发货</span>
                      </div>
                    </div>

                    <div className="border-t border-warm-gray/200 px-5 py-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-warm-muted">
                        收货信息
                      </p>
                      <div className="mt-2 space-y-1 text-sm text-foreground">
                        <p>收件人：{shipping.name}</p>
                        <p>联系电话：{shipping.phone}</p>
                        <p>收货地址：{shipping.region} {shipping.address}</p>
                      </div>
                    </div>

                    <div className="border-t border-warm-gray/200 px-5 py-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-warm-muted">
                        商品明细
                      </p>
                      <ul className="mt-3 space-y-3">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex gap-3">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-warm-gray/60">
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
                    </div>

                    <div className="border-t border-warm-gray/200 px-5 py-4">
                      <div className="flex justify-between text-sm text-warm-muted">
                        <span>小计（商品）</span>
                        <span>¥{order.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm font-semibold text-foreground">
                        <span>订单合计</span>
                        <span>¥{order.total.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                        <span className="text-warm-muted">支付方式</span>
                        <span className="text-foreground">{paymentMethod}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                        <span className="text-warm-muted">支付时间</span>
                        <span className="text-foreground">{paidAt}</span>
                      </div>
                    </div>

                    <div className="border-t border-warm-gray/200 px-5 py-4">
                      <Link
                        href={`/cart/order-details?orderId=${encodeURIComponent(order.orderId)}`}
                        className="btn-primary inline-flex min-w-[8rem] items-center justify-center px-5 py-2.5 text-sm"
                      >
                        查看详情
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
