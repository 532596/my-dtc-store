"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dtc-last-order";

const PAYMENT_CHANNELS = [
  { id: "alipay", label: "支付宝", desc: "使用支付宝扫码或账户余额支付" },
  { id: "wechat", label: "微信支付", desc: "使用微信扫码支付" },
  { id: "card", label: "信用卡 / 借记卡", desc: "支持 Visa、Mastercard、银联等" },
] as const;

type StoredItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  image: string;
};

type StoredOrder = {
  orderId: string;
  items: StoredItem[];
  subtotal: number;
  total: number;
  createdAt: string;
  shipping?: { name: string; phone: string; region: string; address: string };
  paymentMethod?: string;
  paidAt?: string;
};

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [mounted, setMounted] = useState(false);
  const [paymentChannel, setPaymentChannel] = useState<"alipay" | "wechat" | "card">("alipay");
  const [isPaying, setIsPaying] = useState(false);
  const [payDone, setPayDone] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setOrder(JSON.parse(raw) as StoredOrder);
    } catch {}
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-warm-muted">
          加载中…
        </div>
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
  const isPaid = order.paymentMethod !== undefined && order.paymentMethod !== "待支付";
  const paymentMethod = order.paymentMethod ?? "待支付";
  const paidAt = order.paidAt ?? "—";

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      try {
        const updated = {
          ...order,
          paymentMethod: paymentChannel === "alipay" ? "支付宝" : paymentChannel === "wechat" ? "微信支付" : "信用卡",
          paidAt: new Date().toLocaleString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setOrder(updated);
        setPayDone(true);
      } catch {}
      setIsPaying(false);
    }, 800);
  };

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

        {/* 单张收据式卡片：所有信息整合为一张票据 */}
        <div className="mt-6 overflow-hidden rounded-xl border border-warm-gray/50 bg-warm-white shadow-sm">
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
              <span className="text-foreground">已提交，待付款后安排发货</span>
            </div>
          </div>

          <div className="border-t border-warm-gray/200 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-warm-muted">
              收货信息（来自结算页配送信息）
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
          </div>

          <div className="border-t border-warm-gray/200 px-5 py-4">
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <span className="text-warm-muted">支付方式</span>
              <span className="text-foreground">{paymentMethod}</span>
            </div>
            <div className="mt-1 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <span className="text-warm-muted">支付时间</span>
              <span className="text-foreground">{paidAt}</span>
            </div>
            <div className="mt-1 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <span className="text-warm-muted">实付金额</span>
              <span className="font-medium text-foreground">¥{order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-warm-gray/200 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-warm-muted">商家</span>
              <span className="text-foreground">官方自营</span>
              <Link href="/support#contact" className="text-accent hover:underline">联系客服</Link>
            </div>
          </div>

          <div className="border-t border-warm-gray/200 px-5 py-3 text-xs text-warm-muted">
            发票：电子普通发票（个人），支付后可于订单跟踪页申请。
            退换货：<Link href="/support#shipping" className="text-accent hover:underline">退换货政策</Link>
          </div>
        </div>

        {/* 支付方式选择与支付按钮（未支付时展示） */}
        {!isPaid && !payDone && (
          <div className="mt-8 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-semibold text-foreground">支付</h2>
            <p className="mt-1 text-xs text-warm-muted">所有交易均经安全加密处理。</p>

            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-foreground">支付方式</p>
              {PAYMENT_CHANNELS.map((ch) => (
                <label
                  key={ch.id}
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition ${
                    paymentChannel === ch.id
                      ? "border-accent bg-accent-light/10"
                      : "border-warm-gray/200 bg-warm-gray/5 hover:border-warm-gray/300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={ch.id}
                    checked={paymentChannel === ch.id}
                    onChange={() => setPaymentChannel(ch.id)}
                    className="mt-1 h-4 w-4 border-warm-gray/60 text-accent focus:ring-accent"
                  />
                  <div>
                    <p className="font-medium text-foreground">{ch.label}</p>
                    <p className="mt-0.5 text-xs text-warm-muted">{ch.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {paymentChannel === "card" && (
              <div className="mt-6 rounded-xl border border-warm-gray/200 bg-warm-gray/5 p-4">
                <p className="text-sm font-medium text-foreground">银行卡信息</p>
                <div className="mt-3 space-y-3">
                  <label className="block">
                    <span className="text-xs text-warm-muted">卡号</span>
                    <input
                      type="text"
                      placeholder="请输入卡号"
                      className="mt-1 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-sm text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs text-warm-muted">有效期 (MM/YY)</span>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="mt-1 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-sm text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-warm-muted">安全码</span>
                      <input
                        type="text"
                        placeholder="CVV"
                        className="mt-1 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-sm text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs text-warm-muted">持卡人姓名</span>
                    <input
                      type="text"
                      placeholder="与卡面一致"
                      className="mt-1 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-sm text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                </div>
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-warm-muted">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-warm-gray/60 text-accent focus:ring-accent" />
              <span>使用收货地址作为账单地址</span>
            </label>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-sm text-warm-muted">
                应付金额：<span className="font-semibold text-foreground">¥{order.total.toLocaleString()}</span>
              </p>
              <button
                type="button"
                onClick={handlePay}
                disabled={isPaying}
                className="btn-primary inline-flex min-w-[10rem] items-center justify-center px-6 py-3.5 disabled:pointer-events-none disabled:opacity-70"
              >
                {isPaying ? "支付处理中…" : "立即支付"}
              </button>
            </div>
          </div>
        )}

        {payDone && (
          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="font-medium text-green-800">支付成功</p>
            <p className="mt-1 text-sm text-green-700">订单将尽快安排发货，您可在下方查询物流。</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/order-tracking"
            className="btn-primary inline-flex min-w-[8rem] items-center justify-center px-6 py-3 text-center"
          >
            查询物流
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
