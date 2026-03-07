"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    setStatus("loading");
    // 占位：实际可对接后端或第三方邮件服务
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <section className="border-t border-warm-gray/50 bg-warm-white py-12 md:py-14">
      <div className="mx-auto max-w-content px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            订阅获取独家优惠与动态
          </h2>
          <p className="mt-3 text-body text-warm-muted">
            留下邮箱，第一时间了解新品、专属折扣与健康办公小贴士。
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-stretch">
              <label htmlFor="newsletter-email" className="sr-only">
                邮箱地址
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入您的邮箱"
                disabled={status === "loading"}
                className="min-w-0 flex-1 rounded-xl border border-warm-gray/60 bg-warm-white px-4 py-2.5 text-foreground placeholder:text-warm-stone focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "newsletter-error" : undefined}
              />
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="btn-primary shrink-0 px-8 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "提交中…" : status === "success" ? "已订阅" : "订阅"}
              </button>
            </div>
            {status === "success" && (
              <p className="mt-3 text-sm text-emerald-600" role="status">
                感谢订阅，我们会尽快与您联系。
              </p>
            )}
            {status === "error" && (
              <p id="newsletter-error" className="mt-3 text-sm text-red-600" role="alert">
                提交失败，请稍后重试。
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-warm-stone">
              点击「订阅」即表示您同意我们依照{" "}
              <Link href="/support#privacy" className="text-accent underline hover:no-underline">
                隐私政策
              </Link>{" "}
              收集并处理您的信息。
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
