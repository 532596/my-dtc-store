"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  orderId: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  status: "pending_payment" | "paid";
  paymentMethod?: string;
  paidAt?: string;
  createdAt: string;
  shipping: { name: string; phone: string; region: string; address: string };
  email?: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authFail, setAuthFail] = useState(false);

  useEffect(() => {
    fetch("/api/orders", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) setAuthFail(true);
        return r.ok ? r.json() : [];
      })
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => setAuthFail(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    );
  }

  if (authFail) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <p className="text-foreground">请先登录后台</p>
          <Link href="/admin" className="btn-primary mt-6 inline-block px-6 py-3">去登录</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">订单列表</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/admin/products" className="text-sm font-medium text-accent hover:underline">
              商品与促销
            </Link>
            <Link href="/admin" className="text-sm text-warm-muted hover:text-accent">
              退出 / 重新登录
            </Link>
          </div>
        </div>

        <p className="mb-6 text-sm text-warm-muted">以下为所有下单记录，可查看下单账号（邮箱/电话）、订单信息及是否支付成功。</p>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-warm-gray/50 bg-warm-white p-12 text-center text-warm-muted">
            暂无订单
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm font-medium text-foreground">{order.orderId}</p>
                    <p className="mt-1 text-xs text-warm-muted">
                      下单时间：{new Date(order.createdAt).toLocaleString("zh-CN")}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status === "paid" ? "已支付" : "待支付"}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 border-t border-warm-gray/100 pt-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-warm-muted">下单账号 / 收货信息</p>
                    <p className="mt-1 text-sm text-foreground">邮箱：{order.email || "—"}</p>
                    <p className="mt-0.5 text-sm text-foreground">收件人：{order.shipping?.name ?? "—"}</p>
                    <p className="mt-0.5 text-sm text-foreground">电话：{order.shipping?.phone ?? "—"}</p>
                    <p className="mt-0.5 text-sm text-warm-muted">{order.shipping?.region} {order.shipping?.address}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-warm-muted">支付信息</p>
                    <p className="mt-1 text-sm text-foreground">支付方式：{order.paymentMethod ?? "—"}</p>
                    <p className="mt-0.5 text-sm text-foreground">支付时间：{order.paidAt ?? "—"}</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">订单金额：¥{order.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-warm-gray/100 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-warm-muted">商品明细</p>
                  <ul className="mt-2 space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-sm text-foreground">
                        {item.name} × {item.quantity} — ¥{(item.price * item.quantity).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
