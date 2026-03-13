"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function SupportWarrantyPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 pt-section pb-10 md:pt-section-md md:pb-14">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Support</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            保修单
          </h1>
          <p className="mt-4 max-w-2xl text-body text-warm-muted">
            电机与框架质保政策，以及保修申请方式。具体以随箱说明书与购买页为准；如有疑问请
            <Link href="/support/contact" className="ml-1 font-medium text-accent hover:underline">
              联系我们
            </Link>
            。
          </p>
        </Reveal>

        <div className="mt-12 space-y-8 max-w-2xl">
          <Reveal delay={1}>
            <div className="rounded-xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">质保范围与年限</h2>
              <ul className="mt-3 space-y-2 text-sm text-warm-muted">
                <li>· 电机：最长 5 年质保（具体型号以产品页为准）。</li>
                <li>· 桌架 / 结构：3–5 年质保。</li>
                <li>· 桌面：分模块质保，详见产品页与随箱说明。</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="rounded-xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">保修申请</h2>
              <p className="mt-3 text-sm text-warm-muted">
                在质保期内如遇质量问题，请通过「支持中心」或订单详情提交保修申请，提供订单号与故障描述；我们将在 1–2 个工作日内与您联系并安排检测或换件。
              </p>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <div className="rounded-xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">除外情形</h2>
              <p className="mt-3 text-sm text-warm-muted">
                人为损坏、私自拆装、不当使用或超出质保期不在保修范围内。具体条款以随箱说明书与官网支持页为准。
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <div className="mt-12 flex flex-wrap gap-4 text-sm">
            <Link href="/support" className="font-medium text-accent hover:underline">
              ← 返回支持中心
            </Link>
            <Link href="/support/contact" className="font-medium text-accent hover:underline">
              联系我们
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
