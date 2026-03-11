"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const RECEIVER_ACCOUNT = "18056429318";

function PayInfoContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const amount = searchParams.get("amount") ?? "";
  const channel = searchParams.get("channel") ?? "wechat";

  const isWechat = channel === "wechat";
  const isAlipay = channel === "alipay";

  return (
    <main className="min-h-screen bg-warm-cream px-4 py-8">
      <div className="mx-auto max-w-sm rounded-2xl border border-warm-gray/200 bg-warm-white p-6 shadow-sm">
        <p className="text-center text-sm text-warm-muted">
          {isWechat ? "微信支付" : isAlipay ? "支付宝付款" : "支付"}
        </p>
        <p className="mt-2 text-center text-2xl font-semibold text-foreground">
          ¥{amount ? Number(amount).toLocaleString() : "—"}
        </p>
        <p className="mt-1 text-center text-sm text-warm-muted">
          向绑定手机 <span className="font-medium text-foreground">{RECEIVER_ACCOUNT}</span> 的{isWechat ? "微信" : "支付宝"}账户付款
        </p>
        {orderId && (
          <p className="mt-2 text-center text-xs text-warm-muted">订单号 {orderId}，转账时请备注</p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {isWechat && (
            <a
              href="weixin://"
              className="flex items-center justify-center gap-3 rounded-xl border-2 border-[#07c160] bg-[#07c160] py-4 text-white font-medium"
            >
              <span className="text-2xl">💬</span>
              打开微信支付
            </a>
          )}
          {isAlipay && (
            <a
              href="alipays://"
              className="flex items-center justify-center gap-3 rounded-xl border-2 border-[#1677ff] bg-[#1677ff] py-4 text-white font-medium"
            >
              <span className="text-2xl">支</span>
              打开支付宝
            </a>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-warm-muted">
          若未自动跳转，请手动打开{isWechat ? "微信" : "支付宝"}，向 <strong>{RECEIVER_ACCOUNT}</strong> 转账 ¥{amount ? Number(amount).toLocaleString() : ""}
        </p>

        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-accent hover:underline">返回首页</Link>
        </p>
      </div>
    </main>
  );
}

export default function PayInfoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-warm-cream flex items-center justify-center">
        <p className="text-warm-muted">加载中…</p>
      </main>
    }>
      <PayInfoContent />
    </Suspense>
  );
}
