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
              <span className="text-foreground">{isPaid ? "已支付，将尽快安排发货" : "已提交，待付款后安排发货"}</span>
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
