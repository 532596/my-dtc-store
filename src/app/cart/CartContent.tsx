"use client";

import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER_ITEMS = [
  {
    id: "1",
    name: "Model B 智能升降桌",
    desc: "桌面 1.2m · 灰木色",
    price: 2999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=200",
  },
  {
    id: "2",
    name: "Desk Pro 桌面",
    desc: "1.4m 白色",
    price: 899,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=200",
  },
];

export default function CartContent() {
  const subtotal = PLACEHOLDER_ITEMS.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            结算
          </h1>
          <Link
            href="/series"
            className="text-sm font-medium text-accent hover:underline"
          >
            继续选购
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,400px]">
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
                <span className="text-sm font-medium text-foreground">邮箱</span>
                <span className="ml-1 text-red-500">*</span>
                <input
                  type="email"
                  name="email"
                  className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="用于接收订单确认"
                />
              </label>
            </form>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-warm-gray/50 bg-warm-white p-6 shadow-sm md:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                订单摘要
              </h2>

              <div className="mt-6 max-h-[320px] space-y-4 overflow-y-auto">
                {PLACEHOLDER_ITEMS.map((item) => (
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
                ))}
              </div>

              <div className="mt-6 border-t border-warm-gray/40 pt-4">
                <div className="flex justify-between text-sm text-warm-muted">
                  <span>小计</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-warm-muted">
                  <span>配送</span>
                  <span>{shipping === 0 ? "待计算" : `¥${shipping.toLocaleString()}`}</span>
                </div>
                <div className="mt-4 flex justify-between text-base font-semibold text-foreground">
                  <span>合计</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
