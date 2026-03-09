"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dtc-last-order";

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
  /** 可选：提交时写入的收货与支付信息 */
  shipping?: { name: string; phone: string; region: string; address: string };
  paymentMethod?: string;
  paidAt?: string;
};

const STATUS_STEPS = [
  { key: "ordered", label: "已下单", done: true },
  { key: "paid", label: "待付款", done: false },
  { key: "shipped", label: "待发货", done: false },
  { key: "delivering", label: "配送中", done: false },
  { key: "done", label: "已完成", done: false },
] as const;

export default function OrderDetailsPage() {
  const router = useRouter();
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [mounted, setMounted] = useState(false);

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

  const shipping = order.shipping ?? {
    name: "—",
    phone: "—",
    region: "—",
    address: "—",
  };
  const paymentMethod = order.paymentMethod ?? "待支付";
  const paidAt = order.paidAt ?? "—";

  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-10">
        <nav className="mb-6 text-sm text-warm-muted" aria-label="面包屑">
          <Link href="/" className="hover:text-foreground">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/cart/order-success" className="hover:text-foreground">订单提交成功</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">订单详情</span>
        </nav>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          订单详情
        </h1>

        {/* 订单状态时间线 */}
        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            订单状态
          </h2>
          <div className="mt-4 flex flex-wrap gap-4 sm:gap-6" aria-label="订单进度">
            {STATUS_STEPS.map((step, i) => (
              <div key={step.key} className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    step.done ? "bg-accent text-white" : "bg-warm-gray/30 text-warm-muted"
                  }`}
                >
                  {step.done ? "✓" : i + 1}
                </span>
                <span className={step.done ? "text-foreground" : "text-warm-muted"}>
                  {step.label}
                </span>
                {i < STATUS_STEPS.length - 1 && (
                  <span className="hidden shrink-0 text-warm-gray/50 sm:inline" aria-hidden>—</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-warm-muted">当前：已提交，待付款后安排发货</p>
        </div>

        {/* 订单信息：订单号、下单时间 */}
        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            订单信息
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-warm-muted">订单号</dt>
              <dd className="mt-0.5 font-mono text-foreground">{order.orderId}</dd>
            </div>
            <div>
              <dt className="text-xs text-warm-muted">下单时间</dt>
              <dd className="mt-0.5 text-foreground">{dateStr}</dd>
            </div>
          </dl>
        </div>

        {/* 收货/配送信息 */}
        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            收货信息
          </h2>
          <div className="mt-4 space-y-1 text-sm text-foreground">
            <p><span className="text-warm-muted">收件人：</span>{shipping.name}</p>
            <p><span className="text-warm-muted">联系电话：</span>{shipping.phone}</p>
            <p><span className="text-warm-muted">收货地址：</span>{shipping.region} {shipping.address}</p>
          </div>
        </div>

        {/* 商品明细 */}
        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            商品明细
          </h2>
          <ul className="mt-4 space-y-4">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-lg border border-warm-gray/40 bg-warm-cream/20 p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-warm-gray/60">
                  <Image
                    src={item.image || "/images/hero.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-warm-muted">{item.desc}</p>
                  <p className="mt-2 text-sm text-warm-muted">
                    ¥{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <div className="shrink-0 text-right font-medium text-foreground">
                  ¥{(item.price * item.quantity).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-warm-gray/40 pt-4">
            <div className="flex justify-between text-sm text-warm-muted">
              <span>小计（商品）</span>
              <span>¥{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="mt-2 flex justify-between text-base font-semibold text-foreground">
              <span>订单合计</span>
              <span>¥{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 支付信息 */}
        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            支付信息
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-warm-muted">支付方式</dt>
              <dd className="mt-0.5 text-foreground">{paymentMethod}</dd>
            </div>
            <div>
              <dt className="text-xs text-warm-muted">支付时间</dt>
              <dd className="mt-0.5 text-foreground">{paidAt}</dd>
            </div>
            <div>
              <dt className="text-xs text-warm-muted">实付金额</dt>
              <dd className="mt-0.5 font-medium text-foreground">¥{order.total.toLocaleString()}</dd>
            </div>
          </dl>
        </div>

        {/* 商家/店铺信息 */}
        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            商家信息
          </h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">官方自营</p>
              <p className="mt-0.5 text-xs text-warm-muted">智能升降桌品牌直营，正品保障</p>
            </div>
            <Link
              href="/support#contact"
              className="text-sm font-medium text-accent hover:underline"
            >
              联系客服
            </Link>
          </div>
        </div>

        {/* 发票与售后 */}
        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            发票与售后
          </h2>
          <div className="mt-4 space-y-3 text-sm text-warm-muted">
            <p>
              <span className="text-foreground">发票：</span>
              电子普通发票（个人），如需开票请在支付后于「订单跟踪」页申请。
            </p>
            <p>
              <span className="text-foreground">退换货：</span>
              <Link href="/support#shipping" className="text-accent hover:underline">退换货政策</Link>
              ，符合条件可申请退换，具体以支持中心说明为准。
            </p>
          </div>
        </div>

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
