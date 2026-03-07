"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartContent() {
  const { items } = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping: number = 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <nav className="mb-6 text-sm text-warm-muted" aria-label="面包屑">
          <Link href="/" className="hover:text-foreground">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-foreground">购物车</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">结算</span>
        </nav>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            结算
          </h1>
          <Link href="/series" className="text-sm font-medium text-accent hover:underline">
            继续选购
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,400px]">
          <div className="space-y-6">
            <div className="rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
              <h2 className="text-lg font-semibold text-foreground">配送信息</h2>
              <p className="mt-1 text-sm text-warm-muted">* 标记为必填</p>

              <form
                id="checkout-form"
                className="mt-6 space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">姓</span>
                    <span className="ml-1 text-red-500">*</span>
                    <input
                      type="text"
                      name="lastName"
                      className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="请输入"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">名</span>
                    <span className="ml-1 text-red-500">*</span>
                    <input
                      type="text"
                      name="firstName"
                      className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="请输入"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-foreground">公司/单位</span>
                  <span className="ml-1 text-xs text-warm-muted">（选填）</span>
                  <input
                    type="text"
                    name="company"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="选填"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-foreground">国家/地区</span>
                  <span className="ml-1 text-red-500">*</span>
                  <select
                    name="country"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="CN">中国</option>
                    <option value="US">美国</option>
                    <option value="TW">台湾</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-foreground">详细地址</span>
                  <span className="ml-1 text-red-500">*</span>
                  <input
                    type="text"
                    name="address"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="街道、门牌号等"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">门牌/楼层/室号</span>
                  <span className="ml-1 text-xs text-warm-muted">（选填）</span>
                  <input
                    type="text"
                    name="address2"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="如 3 栋 2 单元 501 室"
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">邮编</span>
                    <span className="ml-1 text-red-500">*</span>
                    <input
                      type="text"
                      name="postalCode"
                      className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="请输入"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">城市</span>
                    <span className="ml-1 text-red-500">*</span>
                    <input
                      type="text"
                      name="city"
                      className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="请输入"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-foreground">手机号码</span>
                  <span className="ml-1 text-red-500">*</span>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="例如 +86 138 0000 0000"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">备用电话</span>
                  <span className="ml-1 text-xs text-warm-muted">（选填）</span>
                  <input
                    type="tel"
                    name="phoneAlt"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="选填"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">邮箱</span>
                  <span className="ml-1 text-red-500">*</span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="用于接收订单确认与物流"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">配送偏好/备注</span>
                  <span className="ml-1 text-xs text-warm-muted">（选填）</span>
                  <input
                    type="text"
                    name="shippingNote"
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="如 工作日配送、放门口、联系再送等"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">订单备注</span>
                  <span className="ml-1 text-xs text-warm-muted">（选填）</span>
                  <textarea
                    name="orderNote"
                    rows={3}
                    className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="留言给商家，如安装需求、发票抬头等"
                  />
                </label>
              </form>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  订单摘要
                </h2>
                <Link href="/cart" className="text-xs font-medium text-accent hover:underline">
                  编辑购物车
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg bg-warm-cream/80 px-3 py-2 text-xs text-warm-muted">
                <input
                  type="text"
                  placeholder="优惠码或礼品卡"
                  className="min-w-0 flex-1 rounded border border-warm-gray/60 bg-warm-white px-2.5 py-1.5 text-foreground focus:border-accent focus:outline-none"
                />
                <button type="button" className="shrink-0 rounded-lg border border-warm-gray/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-warm-cream">
                  应用
                </button>
              </div>

              <div className="mt-6 max-h-[280px] space-y-4 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-warm-muted">暂无商品</p>
                    <p className="mt-1 text-xs text-warm-muted">前往产品页添加升降桌后再结算</p>
                    <Link href="/series" className="mt-3 text-sm font-medium text-accent hover:underline">去选购</Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-warm-gray/40 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-warm-gray/40">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="mt-0.5 text-xs text-warm-muted">{item.desc}</p>
                        <p className="mt-1 text-sm text-foreground">
                          ¥{item.price.toLocaleString()} × {item.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium text-foreground">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 border-t border-warm-gray/40 pt-4">
                <div className="flex justify-between text-sm text-warm-muted">
                  <span>小计（商品）</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-warm-muted">
                  <span>配送</span>
                  <span>{shipping === 0 ? "待计算" : `¥${shipping.toLocaleString()}`}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-warm-muted">
                  <span>税费</span>
                  <span>按实际结算</span>
                </div>
                <div className="mt-4 flex justify-between text-base font-semibold text-foreground">
                  <span>合计</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
                <p className="mt-1 text-xs text-warm-muted">含税金额以支付页为准</p>
              </div>

              <p className="mt-4 text-center text-xs text-warm-muted">
                电机 5 年质保 · 结构 3 年质保 · TÜV 安全认证
              </p>

              <button
                type="submit"
                form="checkout-form"
                className="btn-primary mt-6 w-full py-3.5"
              >
                提交订单
              </button>

              <p className="mt-4 text-center text-xs text-warm-muted">
                提交即表示同意
                <Link href="/support" className="text-accent hover:underline"> 服务条款 </Link>
                与
                <Link href="/support" className="text-accent hover:underline"> 隐私政策</Link>
              </p>

              <div className="mt-6 border-t border-warm-gray/40 pt-4">
                <p className="text-xs font-medium text-foreground">需要帮助？</p>
                <p className="mt-1 text-xs text-warm-muted">客服电话：400-xxx-xxxx</p>
                <Link href="/support" className="mt-1 inline-block text-xs font-medium text-accent hover:underline">
                  在线客服 / 常见问题
                </Link>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-warm-gray/50 bg-warm-white p-4 text-center text-xs text-warm-muted">
              <Link href="/support#shipping" className="text-accent hover:underline">配送与退换</Link>
              <span className="mx-2">·</span>
              <Link href="/support" className="text-accent hover:underline">隐私政策</Link>
              <span className="mx-2">·</span>
              <Link href="/support" className="text-accent hover:underline">服务条款</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
