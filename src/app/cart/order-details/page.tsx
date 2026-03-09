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
};

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

        <div className="mt-6 rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-warm-gray/40 pb-4">
            <div>
              <p className="text-sm font-medium text-foreground">订单号</p>
              <p className="mt-0.5 font-mono text-lg text-foreground">{order.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-warm-muted">下单时间</p>
              <p className="mt-0.5 text-sm text-foreground">{dateStr}</p>
            </div>
          </div>

          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-warm-muted">
            状态
          </p>
          <p className="mt-1 text-foreground">已提交，待发货</p>

          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-warm-muted">
            商品明细
          </p>
          <ul className="mt-3 space-y-4">
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
              <span>合计</span>
              <span>¥{order.total.toLocaleString()}</span>
            </div>
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
