"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("displayName") as HTMLInputElement)?.value?.trim();
    if (name) setUser(name);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-warm-gray/10">
      <section className="relative mx-auto flex min-h-[80vh] max-w-content items-center justify-center px-6 py-section">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(186,199,213,0.22),transparent_55%),radial-gradient(circle_at_bottom,_rgba(213,200,186,0.18),transparent_55%)]" />
        <div className="relative z-10 grid w-full gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="hidden flex-col justify-center md:flex">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              登录账户
            </h1>
            <p className="mt-4 max-w-md text-body text-warm-muted">
              使用你的账号名称与密码登录，管理订单、偏好与设备数据。
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-warm-muted">
              <span className="rounded-full border border-warm-gray/50 px-3 py-1">订单与配送</span>
              <span className="rounded-full border border-warm-gray/50 px-3 py-1">高度记忆同步</span>
              <span className="rounded-full border border-warm-gray/50 px-3 py-1">售后与质保</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-warm-gray/40 bg-warm-white/95 p-6 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold text-foreground">登录</h2>
              <p className="mt-2 text-xs text-warm-muted">
                输入注册时使用的账号名称与密码。
              </p>
              <form className="mt-5 space-y-4" onSubmit={handleLogin}>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-warm-stone" htmlFor="displayName">
                    账号名称
                  </label>
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="昵称或注册时填写的名称"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-warm-stone" htmlFor="password">
                    密码
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="请输入密码"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary mt-2 inline-flex h-10 w-full items-center justify-center"
                >
                  登录
                </button>
              </form>
              <div className="mt-4 border-t border-warm-gray/40 pt-4 text-xs text-warm-muted">
                没有账户？{" "}
                <Link href="/account" className="font-medium text-accent hover:underline">
                  立即注册
                </Link>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-warm-muted">
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
