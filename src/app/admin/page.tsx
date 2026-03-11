"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "登录失败");
        return;
      }
      router.push("/admin/orders");
      router.refresh();
    } catch {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-warm-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-warm-gray/50 bg-warm-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-foreground">后台登录</h1>
        <p className="mt-1 text-sm text-warm-muted">请输入管理员密码查看订单</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-foreground">密码</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="管理员密码"
              required
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-70">
            {loading ? "登录中…" : "登录"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-warm-muted">
          默认密码见项目说明；生产环境请设置环境变量 <code className="rounded bg-warm-gray/30 px-1">ADMIN_PASSWORD</code>
        </p>
      </div>
    </main>
  );
}
