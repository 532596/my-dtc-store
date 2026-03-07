import Link from "next/link";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-warm-gray/10">
      <section className="relative mx-auto flex min-h-[80vh] max-w-content items-center justify-center px-6 py-section">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(186,199,213,0.22),transparent_55%),radial-gradient(circle_at_bottom,_rgba(213,200,186,0.18),transparent_55%)]" />
        <div className="relative z-10 grid w-full gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="hidden flex-col justify-center md:flex">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              登录或创建账户
            </h1>
            <p className="mt-4 max-w-md text-body text-warm-muted">
              保存桌面高度偏好、查看订单状态、同步多设备使用数据。一个账户，管理你与 Smart Standing Desk
              的全部体验。
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-warm-muted">
              <span className="rounded-full border border-warm-gray/50 px-3 py-1">订单状态实时查看</span>
              <span className="rounded-full border border-warm-gray/50 px-3 py-1">高度记忆与使用历史</span>
              <span className="rounded-full border border-warm-gray/50 px-3 py-1">售后与质保集中管理</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-warm-gray/40 bg-warm-white/95 p-6 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold text-foreground">创建一个账户</h2>
              <p className="mt-2 text-xs text-warm-muted">
                建议使用常用邮箱注册，方便接收订单与质保信息。
              </p>
              <form className="mt-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-warm-stone" htmlFor="email">
                    邮箱
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-warm-stone" htmlFor="password">
                    密码
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="至少 8 位，包含字母和数字"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-warm-stone" htmlFor="region">
                    国家 / 地区
                  </label>
                  <select
                    id="region"
                    className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                    defaultValue="cn"
                  >
                    <option value="cn">中国大陆</option>
                    <option value="hk">中国香港</option>
                    <option value="us">United States</option>
                    <option value="eu">Europe</option>
                  </select>
                </div>
                <label className="flex items-start gap-2 text-xs text-warm-muted">
                  <input type="checkbox" className="mt-[2px] h-3.5 w-3.5 rounded border-warm-gray/60 text-accent" />
                  <span>
                    我已阅读并同意{" "}
                    <button type="button" className="underline underline-offset-2">
                      服务条款
                    </button>{" "}
                    与{" "}
                    <button type="button" className="underline underline-offset-2">
                      隐私政策
                    </button>
                    。
                  </span>
                </label>
                <button
                  type="button"
                  className="btn-primary mt-2 inline-flex h-10 w-full items-center justify-center"
                >
                  创建账户
                </button>
              </form>
              <div className="mt-4 border-t border-warm-gray/40 pt-4 text-xs text-warm-muted">
                已有账户？{" "}
                <Link href="/account" className="font-medium text-accent hover:underline">
                  立即登录
                </Link>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-warm-muted">
              你也可以稍后在下单时创建账户。{" "}
              <Link href="/" className="hover:underline">
                回到首页
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
