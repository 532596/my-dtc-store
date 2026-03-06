"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// @ts-ignore: IDE 在解析 @types/react 时误报「not a module」，实际编译通过
import * as React from "react";

const NAV = [
  { href: "/", label: "Home" as const },
  { href: "/series", label: "Desks" as const, menu: "products" as const },
  { href: "/scenarios", label: "Solutions" as const },
  { href: "/about", label: "About" as const, menu: "discover" as const },
  { href: "/support", label: "Support" as const, menu: "discover" as const },
];

export default function Header() {
  const pathname = usePathname();
  const [accountOpen, setAccountOpen] = React.useState<boolean>(false);
  const [productsOpen, setProductsOpen] = React.useState<boolean>(false);
  /** 当前展开的「发现」下拉对应的 nav href，避免 About/Support 同时渲染两个下拉 */
  const [discoverOpen, setDiscoverOpen] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProducts = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setProductsOpen(true);
    setDiscoverOpen(null);
  };
  const closeProducts = () => {
    closeTimerRef.current = setTimeout(() => setProductsOpen(false), 150);
  };
  const openDiscover = (itemHref: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDiscoverOpen(itemHref);
    setProductsOpen(false);
  };
  const closeDiscover = () => {
    closeTimerRef.current = setTimeout(() => setDiscoverOpen(null), 150);
  };

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-gray/50 bg-warm-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Smart Standing Desk
        </Link>

        <div className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            const baseClass =
              "transition-colors " +
              (isActive ? "font-medium text-foreground" : "text-warm-muted hover:text-foreground");

            // 产品下拉：鼠标移入触发区或面板时保持展开，移出后延迟关闭，便于点击子链接
            if (item.menu === "products") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openProducts}
                  onMouseLeave={closeProducts}
                >
                  <Link href={item.href} className={baseClass}>
                    {item.label}
                  </Link>
                  {productsOpen && (
                    <div
                      className="absolute left-1/2 top-full z-40 mt-0 w-64 -translate-x-1/2 rounded-xl border border-warm-gray/40 bg-warm-white/95 p-3 pt-3 text-xs text-warm-muted shadow-lg"
                      onMouseEnter={openProducts}
                    >
                      <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wide text-warm-stone">
                        产品
                      </p>
                      <Link
                        href="/series"
                        className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                      >
                        升降桌系列
                      </Link>
                      <Link
                        href="/accessories"
                        className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                      >
                        配件
                      </Link>
                      <Link
                        href="/series#compare"
                        className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                      >
                        产品对比
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            // 发现下拉：仅当前悬停项（About 或 Support）显示一个下拉，避免重叠
            if (item.menu === "discover") {
              const isThisDiscoverOpen = discoverOpen === item.href;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openDiscover(item.href)}
                  onMouseLeave={closeDiscover}
                >
                  <Link href={item.href} className={baseClass}>
                    {item.label}
                  </Link>
                  {isThisDiscoverOpen && (
                    <div
                      className="absolute left-1/2 top-full z-40 mt-0 w-72 -translate-x-1/2 rounded-xl border border-warm-gray/40 bg-warm-white/95 p-3 pt-3 text-xs text-warm-muted shadow-lg"
                      onMouseEnter={() => openDiscover(item.href)}
                    >
                      {item.href === "/about" ? (
                        <>
                          <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wide text-warm-stone">
                            发现
                          </p>
                          <Link
                            href="/about"
                            className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                          >
                            品牌介绍
                          </Link>
                          <Link
                            href="/about#stories"
                            className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                          >
                            客户故事（预留）
                          </Link>
                          <Link
                            href="/support"
                            className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                          >
                            售后服务
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/support#faq"
                            className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                          >
                            常见问题 FAQ
                          </Link>
                          <Link
                            href="/guide"
                            className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70 hover:text-foreground"
                          >
                            健康办公指南
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={baseClass}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {/* 账号下拉：桌面端 */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setAccountOpen((prev: boolean) => !prev)}
              className="flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent hover:bg-accent-light/60"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-accent">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span>My Account</span>
              <svg
                className="h-3 w-3 text-warm-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-full z-40 mt-3 w-56 rounded-xl border border-warm-gray/40 bg-warm-white/95 p-3 text-xs text-warm-muted shadow-lg">
                <Link
                  href="/account"
                  className="block rounded-lg px-2 py-1.5 text-foreground hover:bg-warm-cream/70"
                >
                  Log in / Create Account
                </Link>
                <Link
                  href="/account"
                  className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70"
                >
                  My Lists
                </Link>
                <Link
                  href="/account/orders"
                  className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70"
                >
                  Order Status
                </Link>
              </div>
            )}
          </div>

          {/* 购物车图标（全端） */}
          <Link
            href="/cart"
            className="flex items-center gap-1 rounded-full border border-warm-gray/40 px-3 py-1.5 text-xs text-warm-muted transition hover:border-accent hover:text-foreground"
            aria-label="Cart"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-xs">Cart</span>
          </Link>

          {/* 移动端：账号入口简化为图标，进入独立页面 */}
          <Link
            href="/account"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-warm-gray/40 text-warm-muted transition hover:border-accent hover:text-foreground md:hidden"
            aria-label="Account"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
