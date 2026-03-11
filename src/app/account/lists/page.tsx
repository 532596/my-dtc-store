"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LIST_EMAIL_KEY = "dtc-list-email";

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
  const [savedEmail, setSavedEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const fetchByEmail = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setLoading(true);
    setEmailError("");
    fetch(`/api/orders?email=${encodeURIComponent(trimmed)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("获取失败"))))
      .then((list: Order[]) => {
        setOrders(Array.isArray(list) ? list : []);
        try {
          localStorage.setItem(LIST_EMAIL_KEY, trimmed);
          setSavedEmail(trimmed);
        } catch {}
      })
      .catch(() => {
        setOrders([]);
        setEmailError("无法加载订单，请检查邮箱是否正确或稍后重试。");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let cancelled = false;
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(LIST_EMAIL_KEY) : null;
      const email = (raw && raw.trim()) || "";
      if (!email) {
        setOrders([]);
        setLoading(false);
        return;
      }
      setSavedEmail(email);
      fetch(`/api/orders?email=${encodeURIComponent(email)}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((list: Order[]) => {
          if (!cancelled) setOrders(Array.isArray(list) ? list : []);
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
      <section className="relative mx-auto max-w-xl px-6 py-section">
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
          ) : !savedEmail ? (
            <div className="mt-8 rounded-2xl border border-warm-gray/40 bg-warm-white/95 p-8">
              <p className="text-sm text-foreground">使用下单时填写的邮箱查看您的订单，订单会长期保留。</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchByEmail(emailInput);
                }}
                className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
              >
                <label className="flex-1 min-w-0">
                  <span className="sr-only">邮箱</span>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }}
                    placeholder="请输入下单时使用的邮箱"
                    className="w-full rounded-lg border border-warm-gray/60 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading || !emailInput.trim()}
                  className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                >
                  查看订单
                </button>
              </form>
              {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/series" className="text-sm font-medium text-accent hover:underline">去逛逛</Link>
                <Link href="/account" className="text-sm font-medium text-accent hover:underline">返回账户</Link>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-warm-gray/40 bg-warm-white/95 p-8 text-center">
              <p className="text-sm text-warm-muted">该邮箱下暂无支付成功的订单。</p>
              <p className="mt-1 text-xs text-warm-muted">完成支付后，订单会显示在本页并长期保留。</p>
              <button
                type="button"
                onClick={() => {
                  try { localStorage.removeItem(LIST_EMAIL_KEY); } catch {}
                  setSavedEmail("");
                  setOrders([]);
                  setEmailInput("");
                }}
                className="mt-4 text-sm font-medium text-accent hover:underline"
              >
                使用其他邮箱
              </button>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/series" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">去逛逛</Link>
                <Link href="/account" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">返回账户</Link>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-6 text-sm text-warm-muted">
                当前邮箱：{savedEmail}
                <button
                  type="button"
                  onClick={() => {
                    try { localStorage.removeItem(LIST_EMAIL_KEY); } catch {}
                    setSavedEmail("");
                    setOrders([]);
                    setEmailInput("");
                  }}
                  className="ml-2 font-medium text-accent hover:underline"
                >
                  使用其他邮箱
                </button>
              </p>
              <div className="mt-4 space-y-5 max-w-xl">
              {orders.map((order) => {
                const dateStr = new Date(order.createdAt).toLocaleString("zh-CN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const paidAtStr =
                  order.paidAt &&
                  (() => {
                    try {
                      return new Date(order.paidAt).toLocaleString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    } catch {
                      return order.paidAt;
                    }
                  })();
                const statusLabel = orderStatusLabel(order.status);
                const statusClass =
                  order.status === "received"
                    ? "bg-green-100 text-green-800"
                    : order.status === "in_transit"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "shipped"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800";
                const trackingHref = `/order-tracking?orderId=${encodeURIComponent(order.orderId)}${order.email ? `&email=${encodeURIComponent(order.email)}` : ""}`;
                const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
                return (
                  <div
                    key={order.orderId}
                    className="overflow-hidden rounded-xl border border-warm-gray/50 bg-warm-white shadow-sm"
                  >
                    {/* 头部：订单号 + 状态 */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-warm-gray/200 bg-warm-gray/5 px-5 py-3">
                      <p className="font-mono text-sm font-medium text-foreground">{order.orderId}</p>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </div>
                    {/* 主体：纵向排列，先时间与合计，再商品，再摘要与按钮 */}
                    <div className="px-5 py-4 space-y-5">
                      <p className="text-sm text-warm-muted">
                        下单时间：{dateStr} · 合计 ¥{order.total.toLocaleString()}
                      </p>
                      <ul className="space-y-3">
                        {order.items.slice(0, 3).map((item) => (
                          <li key={item.id} className="flex gap-3">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-warm-gray/100">
                              <Image
                                src={item.image || "/images/hero.jpg"}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-warm-muted mt-0.5">
                                ¥{item.price.toLocaleString()} × {item.quantity}
                              </p>
                            </div>
                          </li>
                        ))}
                        {order.items.length > 3 && (
                          <li className="text-xs text-warm-muted pt-0.5">等共 {order.items.length} 件商品</li>
                        )}
                      </ul>
                      {/* 订单摘要：加大行距，避免拥挤 */}
                      <div className="border-t border-warm-gray/200 pt-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted mb-4">
                          订单摘要
                        </p>
                        <dl className="space-y-3 text-sm">
                          <div>
                            <dt className="sr-only">商品件数</dt>
                            <dd className="text-foreground">共 {itemCount} 件商品</dd>
                          </div>
                          <div>
                            <dt className="text-warm-muted font-normal">支付方式</dt>
                            <dd className="mt-0.5 text-foreground">{order.paymentMethod ?? "—"}</dd>
                          </div>
                          <div>
                            <dt className="text-warm-muted font-normal">支付时间</dt>
                            <dd className="mt-0.5 text-foreground">{paidAtStr ?? "—"}</dd>
                          </div>
                        </dl>
                        <div className="mt-6 flex flex-col gap-3">
                          <Link
                            href={`/cart/order-details?orderId=${encodeURIComponent(order.orderId)}`}
                            className="inline-flex items-center justify-center rounded-lg border border-warm-gray/40 bg-warm-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
                          >
                            查看订单详情
                          </Link>
                          <Link
                            href={trackingHref}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                          >
                            一键查询物流
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </>
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
