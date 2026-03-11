"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// @ts-ignore: IDE 在解析 @types/react 时误报「not a module」，实际编译通过
import * as React from "react";
import { useUserCountry } from "@/contexts/UserCountryContext";
import { useAuth, getInitials } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const NAV = [
  { href: "/", label: "Home" as const },
  { href: "/series", label: "Products" as const, menu: "products" as const },
  { href: "/scenarios", label: "Solutions" as const, menu: "solutions" as const },
  { href: "/about", label: "About" as const, menu: "discover" as const },
  { href: "/support", label: "Support" as const, menu: "discover" as const },
];

export default function Header() {
  const pathname = usePathname();
  const { displayCode, isLoading } = useUserCountry();
  const { displayName, isLoggedIn, logout } = useAuth();
  const { items: cartItems } = useCart();
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const [accountOpen, setAccountOpen] = React.useState<boolean>(false);
  const [productsOpen, setProductsOpen] = React.useState<boolean>(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState<boolean>(false);
  const [discoverOpen, setDiscoverOpen] = React.useState<string | null>(null);
  /** 收起动画中，仍保持挂载以便播放退出动画 */
  const [closingProducts, setClosingProducts] = React.useState(false);
  const [closingSolutions, setClosingSolutions] = React.useState(false);
  const [closingDiscover, setClosingDiscover] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const accountCloseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaContentRef = React.useRef<HTMLDivElement>(null);
  const [megaPanelHeight, setMegaPanelHeight] = React.useState(0);
  /** 各 mega 面板左侧当前悬停的子项索引（0=第一项），未悬停左侧时为 0 */
  const [megaProductsSub, setMegaProductsSub] = React.useState(0);
  const [megaSolutionsSub, setMegaSolutionsSub] = React.useState(0);
  const [megaAboutSub, setMegaAboutSub] = React.useState(0);
  const [megaSupportSub, setMegaSupportSub] = React.useState(0);
  const [cartOpen, setCartOpen] = React.useState(false);
  const cartCloseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const MEGA_EXIT_MS = 180;
  const cartSubtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  /** 当前展示的面板类型（收起时展示正在收起的；否则展示当前打开的） */
  const activePanel =
    closingProducts ? "products" :
    closingSolutions ? "solutions" :
    closingDiscover || (productsOpen ? "products" : solutionsOpen ? "solutions" : discoverOpen);
  const megaVisible = !!(productsOpen || solutionsOpen || discoverOpen || closingProducts || closingSolutions || closingDiscover);
  const isMegaClosing = closingProducts || closingSolutions || !!closingDiscover;

  React.useLayoutEffect(() => {
    if (!megaVisible || !megaContentRef.current) return;
    const h = megaContentRef.current.scrollHeight;
    setMegaPanelHeight(h);
  }, [megaVisible, activePanel, megaProductsSub, megaSolutionsSub, megaAboutSub, megaSupportSub]);

  const keepMegaOpen = () => {
    if (productsOpen) openProducts();
    else if (solutionsOpen) openSolutions();
    else if (discoverOpen) openDiscover(discoverOpen);
  };

  const openProducts = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setClosingProducts(false);
    setProductsOpen(true);
    setSolutionsOpen(false);
    setDiscoverOpen(null);
    setClosingSolutions(false);
    setClosingDiscover(null);
  };
  const closeProducts = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setClosingProducts(true);
      exitTimerRef.current = setTimeout(() => {
        setProductsOpen(false);
        setClosingProducts(false);
      }, MEGA_EXIT_MS);
    }, 80);
  };
  const openSolutions = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setClosingSolutions(false);
    setSolutionsOpen(true);
    setProductsOpen(false);
    setDiscoverOpen(null);
    setClosingProducts(false);
    setClosingDiscover(null);
  };
  const closeSolutions = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setClosingSolutions(true);
      exitTimerRef.current = setTimeout(() => {
        setSolutionsOpen(false);
        setClosingSolutions(false);
      }, MEGA_EXIT_MS);
    }, 80);
  };
  const openDiscover = (itemHref: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setClosingDiscover(null);
    setDiscoverOpen(itemHref);
    setProductsOpen(false);
    setSolutionsOpen(false);
    setClosingProducts(false);
    setClosingSolutions(false);
  };
  const closeDiscover = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    const current = discoverOpen;
    closeTimerRef.current = setTimeout(() => {
      setClosingDiscover(current);
      exitTimerRef.current = setTimeout(() => {
        setDiscoverOpen(null);
        setClosingDiscover(null);
      }, MEGA_EXIT_MS);
    }, 80);
  };

  /** 仅当鼠标离开整块导航+下拉区域时收起（左右在导航栏滑动不触发，避免闪） */
  const closeAll = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    if (productsOpen) {
      setClosingProducts(true);
      exitTimerRef.current = setTimeout(() => {
        setProductsOpen(false);
        setClosingProducts(false);
      }, MEGA_EXIT_MS);
    } else if (solutionsOpen) {
      setClosingSolutions(true);
      exitTimerRef.current = setTimeout(() => {
        setSolutionsOpen(false);
        setClosingSolutions(false);
      }, MEGA_EXIT_MS);
    } else if (discoverOpen) {
      const current = discoverOpen;
      setClosingDiscover(current);
      exitTimerRef.current = setTimeout(() => {
        setDiscoverOpen(null);
        setClosingDiscover(null);
      }, MEGA_EXIT_MS);
    }
  };

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (cartCloseTimerRef.current) clearTimeout(cartCloseTimerRef.current);
    };
  }, []);

  return (
    <header
      className="relative sticky top-0 z-50 border-b border-warm-gray/50 bg-warm-white/95 backdrop-blur-md"
      onMouseLeave={closeAll}
    >
      <nav className="relative mx-auto flex max-w-content items-center justify-between px-6 py-4">
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

            // 产品：悬浮展开满屏 mega menu，移出后快速收起
            if (item.menu === "products") {
              return (
                <div key={item.href} className="relative" onMouseEnter={openProducts}>
                  <Link href={item.href} className={baseClass}>
                    {item.label}
                  </Link>
                </div>
              );
            }
            if (item.menu === "solutions") {
              return (
                <div key={item.href} className="relative" onMouseEnter={openSolutions}>
                  <Link href={item.href} className={baseClass}>
                    {item.label}
                  </Link>
                </div>
              );
            }
            if (item.menu === "discover") {
              return (
                <div key={item.href} className="relative" onMouseEnter={() => openDiscover(item.href)}>
                  <Link href={item.href} className={baseClass}>
                    {item.label}
                  </Link>
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
          {/* 账号下拉：桌面端，鼠标移出自动收起 */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => {
              if (accountCloseTimerRef.current) {
                clearTimeout(accountCloseTimerRef.current);
                accountCloseTimerRef.current = null;
              }
            }}
            onMouseLeave={() => {
              accountCloseTimerRef.current = setTimeout(() => setAccountOpen(false), 120);
            }}
          >
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
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-lg px-2 py-1.5 text-foreground hover:bg-warm-cream/70"
                >
                  Log in / Create Account
                </Link>
                <Link
                  href="/account/lists"
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70"
                >
                  My Lists
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-lg px-2 py-1.5 hover:bg-warm-cream/70"
                >
                  Order Status
                </Link>
                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={() => { logout(); setAccountOpen(false); }}
                    className="block w-full rounded-lg px-2 py-1.5 text-left text-warm-muted hover:bg-warm-cream/70"
                  >
                    退出登录
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 购物车：悬停显示下拉卡片，展示当前商品简要信息 */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => {
              if (cartCloseTimerRef.current) {
                clearTimeout(cartCloseTimerRef.current);
                cartCloseTimerRef.current = null;
              }
              setCartOpen(true);
            }}
            onMouseLeave={() => {
              cartCloseTimerRef.current = setTimeout(() => setCartOpen(false), 120);
            }}
          >
            <Link
              href="/cart"
              className="relative flex items-center gap-1 rounded-full border border-warm-gray/40 px-3 py-1.5 text-xs text-warm-muted transition hover:border-accent hover:text-foreground"
              aria-label={cartCount > 0 ? `Cart (${cartCount} items)` : "Cart"}
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
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            {cartOpen && (
              <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-xl border border-warm-gray/200 bg-white shadow-xl">
                <div className="max-h-[min(70vh,320px)] overflow-y-auto p-3">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-warm-muted">
                    购物车 {cartCount > 0 ? `（${cartCount} 件）` : ""}
                  </p>
                  {cartItems.length === 0 ? (
                    <p className="py-6 text-center text-sm text-warm-muted">购物车为空</p>
                  ) : (
                    <>
                      <ul className="space-y-3">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex gap-3 rounded-lg border border-warm-gray/100 p-2">
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
                              <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                              <p className="mt-0.5 line-clamp-1 text-xs text-warm-muted">{item.desc}</p>
                              <p className="mt-1 text-xs text-foreground">
                                ¥{item.price.toLocaleString()} × {item.quantity}
                              </p>
                            </div>
                            <p className="shrink-0 text-sm font-medium text-foreground">
                              ¥{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 border-t border-warm-gray/200 pt-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-warm-muted">小计</span>
                          <span className="font-semibold text-foreground">¥{cartSubtotal.toLocaleString()}</span>
                        </div>
                        <Link
                          href="/cart"
                          className="btn-primary mt-3 block w-full py-2.5 text-center text-sm"
                          onClick={() => setCartOpen(false)}
                        >
                          查看购物车 / 去结算
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 移动端：购物车仍为简单链接 */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1 rounded-full border border-warm-gray/40 px-3 py-1.5 text-xs text-warm-muted transition hover:border-accent hover:text-foreground md:hidden"
            aria-label={cartCount > 0 ? `Cart (${cartCount} items)` : "Cart"}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* 点击进入地区选择页，修改配送/地址偏好 */}
          {!isLoading && displayCode && (
            <Link
              href="/regions"
              className="flex items-center gap-1.5 rounded-lg border border-warm-gray/40 px-2 py-1.5 text-warm-muted transition hover:border-accent hover:text-foreground"
              title="选择国家/地区"
              aria-label={`当前地区 ${displayCode}，点击修改`}
            >
              <img
                src={`https://flagcdn.com/w40/${displayCode.toLowerCase()}.png`}
                alt=""
                width={24}
                height={18}
                className="h-[18px] w-6 shrink-0 rounded-sm object-cover"
              />
              <span className="text-[11px] font-medium uppercase tracking-wide text-foreground">
                {displayCode}
              </span>
            </Link>
          )}

          {/* 用户头像：未登录默认头像，登录后显示账号名称缩写 */}
          <Link
            href="/account"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-warm-gray/40 text-warm-muted transition hover:border-accent hover:text-foreground"
            aria-label={isLoggedIn ? displayName ?? "账户" : "登录 / 注册"}
            title={isLoggedIn ? displayName ?? "账户" : "登录 / 注册"}
          >
            {isLoggedIn && displayName ? (
              <span className="text-xs font-semibold text-foreground">
                {getInitials(displayName)}
              </span>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
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

      {/* 单一 mega 面板：左右切换只换内容不收回，高度随内容过渡 */}
      {megaVisible && (
        <div
          className={`absolute left-0 right-0 top-full z-40 overflow-hidden border-t border-warm-gray/30 bg-stone-50 shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-[height] duration-200 ease-out ${isMegaClosing ? "mega-menu-panel-out" : "mega-menu-panel"}`}
          style={{ height: megaPanelHeight }}
          onMouseEnter={keepMegaOpen}
        >
          <div ref={megaContentRef} className="mx-auto flex max-w-content px-6 py-8">
            {activePanel === "products" && (
              <>
                <aside className="w-52 shrink-0 rounded-xl bg-warm-gray/20 py-4 pr-4" onMouseLeave={() => setMegaProductsSub(0)}>
                  <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-warm-muted">产品</p>
                  <Link href="/series" onMouseEnter={() => setMegaProductsSub(0)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaProductsSub === 0 ? "bg-warm-cream/60" : ""}`}>升降桌系列</Link>
                  <Link href="/accessories" onMouseEnter={() => setMegaProductsSub(1)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaProductsSub === 1 ? "bg-warm-cream/60" : ""}`}>配件</Link>
                  <Link href="/series#compare" onMouseEnter={() => setMegaProductsSub(2)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaProductsSub === 2 ? "bg-warm-cream/60" : ""}`}>产品对比</Link>
                </aside>
                <div className="ml-10 flex-1">
                  {megaProductsSub === 0 && (
                    <>
                      <div className="border-b border-warm-gray/30 pb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">精选产品</h3>
                          <Link href="/series" className="text-xs font-medium text-accent hover:underline">查看全部 →</Link>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                          <Link href="/series/model-a" className="group rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                            <p className="text-sm font-medium text-foreground group-hover:text-accent">Model A</p>
                            <p className="mt-0.5 text-xs text-warm-muted">紧凑静音 · 小空间</p>
                          </Link>
                          <Link href="/series/model-b" className="group rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                            <p className="text-sm font-medium text-foreground group-hover:text-accent">Model B</p>
                            <p className="mt-0.5 text-xs text-warm-muted">智能记忆 · 推荐</p>
                          </Link>
                          <Link href="/series/model-c" className="group rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                            <p className="text-sm font-medium text-foreground group-hover:text-accent">Model C</p>
                            <p className="mt-0.5 text-xs text-warm-muted">全功能 · TÜV 认证</p>
                          </Link>
                          <Link href="/accessories" className="group rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                            <p className="text-sm font-medium text-foreground group-hover:text-accent">配件</p>
                            <p className="mt-0.5 text-xs text-warm-muted">桌垫、线缆等</p>
                          </Link>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">浏览分类</h3>
                        <div className="mt-3 flex flex-wrap gap-3">
                          <Link href="/series" className="rounded-lg border border-warm-gray/40 bg-warm-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">全部升降桌</Link>
                          <Link href="/accessories" className="rounded-lg border border-warm-gray/40 bg-warm-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">配件与周边</Link>
                          <Link href="/series#compare" className="rounded-lg border border-warm-gray/40 bg-warm-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">产品对比</Link>
                        </div>
                      </div>
                    </>
                  )}
                  {megaProductsSub === 1 && (
                    <>
                      <div className="border-b border-warm-gray/30 pb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">配件与周边</h3>
                          <Link href="/accessories" className="text-xs font-medium text-accent hover:underline">查看全部 →</Link>
                        </div>
                        <p className="mt-3 max-w-xl text-sm text-warm-muted">桌垫、线缆管理、显示器支架等，让桌面更整洁、更高效。</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Link href="/accessories" className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent/50 hover:bg-warm-cream/40">桌垫与收纳</Link>
                          <Link href="/accessories" className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent/50 hover:bg-warm-cream/40">线缆与电源</Link>
                          <Link href="/accessories" className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent/50 hover:bg-warm-cream/40">显示器支架</Link>
                        </div>
                      </div>
                    </>
                  )}
                  {megaProductsSub === 2 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">产品对比</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">并排对比 Model A、B、C 的规格与功能，快速找到最适合你的型号。</p>
                      <div className="mt-6">
                        <Link href="/series#compare" className="inline-flex rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">前往对比页 →</Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {activePanel === "solutions" && (
              <>
                <aside className="w-52 shrink-0 rounded-xl bg-warm-gray/20 py-4 pr-4" onMouseLeave={() => setMegaSolutionsSub(0)}>
                  <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-warm-muted">解决方案</p>
                  <Link href="/scenarios" onMouseEnter={() => setMegaSolutionsSub(0)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSolutionsSub === 0 ? "bg-warm-cream/60" : ""}`}>场景</Link>
                  <Link href="/guide" onMouseEnter={() => setMegaSolutionsSub(1)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSolutionsSub === 1 ? "bg-warm-cream/60" : ""}`}>技术原理</Link>
                </aside>
                <div className="ml-10 flex-1">
                  {megaSolutionsSub === 0 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">功能概览</h3>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <Link href="/guide#voice-control" className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                          <p className="text-sm font-medium text-foreground">语音控制</p>
                          <p className="mt-0.5 text-xs text-warm-muted">声控升降与记忆</p>
                        </Link>
                        <Link href="/guide#height-memory" className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                          <p className="text-sm font-medium text-foreground">高度记忆</p>
                          <p className="mt-0.5 text-xs text-warm-muted">四档记忆与久坐提醒</p>
                        </Link>
                        <Link href="/scenarios" className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                          <p className="text-sm font-medium text-foreground">办公场景</p>
                          <p className="mt-0.5 text-xs text-warm-muted">居家与办公室</p>
                        </Link>
                        <Link href="/guide" className="rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4 transition hover:border-accent/50 hover:bg-warm-cream/40">
                          <p className="text-sm font-medium text-foreground">健康办公指南</p>
                          <p className="mt-0.5 text-xs text-warm-muted">了解更多 →</p>
                        </Link>
                      </div>
                    </>
                  )}
                  {megaSolutionsSub === 1 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">技术原理</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">电机驱动、静音设计、高度记忆与安全防护，了解智能升降桌如何工作。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/guide" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">技术指南 →</Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {activePanel === "/about" && (
              <>
                <aside className="w-52 shrink-0 rounded-xl bg-warm-gray/20 py-4 pr-4" onMouseLeave={() => setMegaAboutSub(0)}>
                  <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-warm-muted">关于</p>
                  <Link href="/about" onMouseEnter={() => setMegaAboutSub(0)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaAboutSub === 0 ? "bg-warm-cream/60" : ""}`}>关于我们</Link>
                  <Link href="/about#stories" onMouseEnter={() => setMegaAboutSub(1)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaAboutSub === 1 ? "bg-warm-cream/60" : ""}`}>客户故事</Link>
                </aside>
                <div className="ml-10 flex-1">
                  {megaAboutSub === 0 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">关于我们</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">专注智能升降桌与健康办公，为家庭与办公室提供静音、可靠的解决方案。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/about" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">品牌介绍</Link>
                        <Link href="/about#stories" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">客户故事</Link>
                      </div>
                    </>
                  )}
                  {megaAboutSub === 1 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">客户故事</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">来自居家办公与企业的真实使用体验，看看他们如何用智能升降桌改变工作方式。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/about#stories" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">阅读故事 →</Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {activePanel === "/support" && (
              <>
                <aside className="w-52 shrink-0 rounded-xl bg-warm-gray/20 py-4 pr-4" onMouseLeave={() => setMegaSupportSub(0)}>
                  <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-warm-muted">支持</p>
                  <Link href="/support#contact" onMouseEnter={() => setMegaSupportSub(0)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSupportSub === 0 ? "bg-warm-cream/60" : ""}`}>联系我们</Link>
                  <Link href="/support" onMouseEnter={() => setMegaSupportSub(1)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSupportSub === 1 ? "bg-warm-cream/60" : ""}`}>常见问题解答</Link>
                  <Link href="/order-tracking" onMouseEnter={() => setMegaSupportSub(2)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSupportSub === 2 ? "bg-warm-cream/60" : ""}`}>订单跟踪</Link>
                  <Link href="/support#shipping" onMouseEnter={() => setMegaSupportSub(3)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSupportSub === 3 ? "bg-warm-cream/60" : ""}`}>物流</Link>
                  <Link href="/support#shipping" onMouseEnter={() => setMegaSupportSub(5)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSupportSub === 5 ? "bg-warm-cream/60" : ""}`}>退换货</Link>
                  <Link href="/support#warranty" onMouseEnter={() => setMegaSupportSub(4)} className={`block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-warm-cream/70 hover:translate-x-0.5 ${megaSupportSub === 4 ? "bg-warm-cream/60" : ""}`}>保修单</Link>
                </aside>
                <div className="ml-10 flex-1">
                  {megaSupportSub === 0 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">联系我们</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">售前咨询、售后与商务合作，我们随时为你解答。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/support#contact" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">联系表单</Link>
                        <Link href="/support" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">支持中心 →</Link>
                      </div>
                    </>
                  )}
                  {megaSupportSub === 1 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">常见问题解答</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">安装、使用、质保与退换等常见问题，快速找到答案。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/support#faq" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">查看 FAQ →</Link>
                      </div>
                    </>
                  )}
                  {megaSupportSub === 2 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">订单跟踪</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">输入订单号或手机号，实时查询配送状态。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/order-tracking" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">查询订单 →</Link>
                      </div>
                    </>
                  )}
                  {megaSupportSub === 3 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">物流</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">配送范围、时效与运费说明，以及退换货流程。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/support#shipping" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">配送与退换 →</Link>
                      </div>
                    </>
                  )}
                  {megaSupportSub === 4 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">保修单</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">电机与框架质保政策，以及保修申请方式。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/support#warranty" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">保修政策 →</Link>
                      </div>
                    </>
                  )}
                  {megaSupportSub === 5 && (
                    <>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">退换货</h3>
                      <p className="mt-3 max-w-xl text-sm text-warm-muted">退货与换货条件、流程说明，以及处理时间与运费规则。</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/support#shipping" className="rounded-lg border border-warm-gray/40 bg-warm-cream/20 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:bg-warm-cream/40">查看退换政策 →</Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
