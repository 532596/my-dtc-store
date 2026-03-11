"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function SupportReturnsPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 pt-section pb-10 md:pt-section-md md:pb-14">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Support</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            退换货政策
          </h1>
          <p className="mt-4 max-w-2xl text-body text-warm-muted">
            退货与换货条件、流程说明，以及处理时间与运费规则。如有疑问请
            <Link href="/support#contact" className="ml-1 font-medium text-accent hover:underline">
              联系我们
            </Link>
            。
          </p>
        </Reveal>

        <div className="mt-12 space-y-8 max-w-2xl">
          <Reveal delay={1}>
            <div className="rounded-xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">退换货条件</h2>
              <ul className="mt-3 space-y-2 text-sm text-warm-muted">
                <li>· 商品签收后 7 日内，未安装、未使用、包装完好可申请无理由退货。</li>
                <li>· 商品存在质量问题或与描述不符，可申请退换，不受 7 日限制。</li>
                <li>· 定制类、已安装或已使用商品不支持无理由退货，质量问题除外。</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="rounded-xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">申请流程</h2>
              <p className="mt-3 text-sm text-warm-muted">
                在「支持中心」或订单详情页提交退换申请，我们将在 1–2 个工作日内与您确认；确认后按指引寄回商品，我们验收通过后办理退款或换货。
              </p>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <div className="rounded-xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">运费说明</h2>
              <p className="mt-3 text-sm text-warm-muted">
                因商品质量问题或错发漏发导致的退换，由我们承担往返运费；无理由退货的寄回运费由您承担，退款将扣除我们发出的运费。
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <div className="mt-12 flex flex-wrap gap-4 text-sm">
            <Link href="/support" className="font-medium text-accent hover:underline">
              ← 返回支持中心
            </Link>
            <Link href="/support#contact" className="font-medium text-accent hover:underline">
              联系我们
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
