import Link from "next/link";

export default function AccountListsPage() {
  return (
    <main className="min-h-screen bg-warm-gray/10">
      <section className="relative mx-auto max-w-content px-6 py-section">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(186,199,213,0.22),transparent_55%)]" />
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            我的清单
          </h1>
          <p className="mt-2 text-sm text-warm-muted">
            收藏产品、创建心愿单，方便下次对比与购买。
          </p>
          <div className="mt-8 rounded-2xl border border-warm-gray/40 bg-warm-white/95 p-8 text-center">
            <p className="text-sm text-warm-muted">暂无清单。登录后可将喜欢的产品加入清单。</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/account"
                className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
              >
                登录 / 注册
              </Link>
              <Link
                href="/series"
                className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40"
              >
                去逛逛
              </Link>
            </div>
          </div>
          <p className="mt-6">
            <Link href="/account" className="text-sm font-medium text-accent hover:underline">
              返回账户
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
