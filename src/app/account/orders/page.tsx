import Link from "next/link";

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section">
        <h1 className="text-3xl font-semibold text-foreground">订单状态</h1>
        <p className="mt-4 text-body text-warm-muted">
          这里将展示你的历史订单与当前发货进度。当前为占位页面，后续接入实际订单数据。
        </p>
        <Link href="/account" className="mt-8 inline-block text-sm font-medium text-accent hover:underline">
          返回账户
        </Link>
      </section>
    </main>
  );
}

