"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/products";

type NewProductForm = {
  id: string;
  kind: "series" | "accessory";
  name: string;
  desc: string;
  descZh: string;
  price: string;
  comparePrice: string;
  sortOrder: string;
  tagline: string;
  promotionLabel: string;
  listImage: string;
  published: boolean;
};

const NEW_FORM_INITIAL: NewProductForm = {
  id: "",
  kind: "series",
  name: "",
  desc: "",
  descZh: "",
  price: "",
  comparePrice: "",
  sortOrder: "",
  tagline: "",
  promotionLabel: "",
  listImage: "",
  published: true,
};

const fieldClass =
  "mt-1 w-full rounded-lg border border-warm-gray/60 bg-warm-white px-3 py-2 text-foreground placeholder:text-warm-muted";

function normalizeIntInput(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  return digits.replace(/^0+(?=\d)/, "");
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [authFail, setAuthFail] = useState(false);
  const [edit, setEdit] = useState<CatalogProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newForm, setNewForm] = useState<NewProductForm>(NEW_FORM_INITIAL);
  const [msg, setMsg] = useState("");

  const groupedCount = useMemo(() => {
    const series = items.filter((i) => i.kind === "series").length;
    const accessory = items.filter((i) => i.kind === "accessory").length;
    const online = items.filter((i) => i.published).length;
    return { series, accessory, online, total: items.length };
  }, [items]);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/products", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) setAuthFail(true);
        return r.ok ? r.json() : [];
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setAuthFail(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const flash = (text: string) => {
    setMsg(text);
    window.setTimeout(() => setMsg(""), 2600);
  };

  const save = async () => {
    if (!edit) return;
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(edit.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          published: edit.published,
          sortOrder: edit.sortOrder,
          name: edit.name,
          desc: edit.desc,
          descZh: edit.descZh,
          price: edit.price,
          comparePrice: edit.comparePrice,
          promotionLabel: edit.promotionLabel || undefined,
          promotionEndsAt: edit.promotionEndsAt || null,
          tagline: edit.tagline,
          highlight: edit.highlight,
          listImage: edit.listImage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error || "保存失败");
        return;
      }
      setEdit(null);
      load();
      flash("已保存");
    } catch {
      setMsg("网络错误");
    } finally {
      setSaving(false);
    }
  };

  const createProduct = async () => {
    if (!newForm.id.trim() || !newForm.name.trim()) {
      setMsg("请至少填写商品 ID 与名称");
      return;
    }
    setCreating(true);
    setMsg("");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newForm.id.trim().toLowerCase(),
          kind: newForm.kind,
          published: newForm.published,
          sortOrder: newForm.sortOrder.trim() ? Number(newForm.sortOrder) : 999,
          name: newForm.name.trim(),
          desc: newForm.desc.trim(),
          descZh: (newForm.descZh || newForm.desc).trim(),
          price: Number(newForm.price || 0),
          comparePrice: newForm.comparePrice.trim() ? Number(newForm.comparePrice) : undefined,
          tagline: newForm.tagline.trim() || undefined,
          promotionLabel: newForm.promotionLabel.trim() || undefined,
          listImage: newForm.listImage.trim() || undefined,
          images: newForm.listImage.trim() ? [newForm.listImage.trim()] : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error || "新增失败");
        return;
      }
      setShowCreate(false);
      setNewForm(NEW_FORM_INITIAL);
      load();
      flash("已新增商品");
    } catch {
      setMsg("网络错误");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center text-warm-muted">加载中…</div>
      </main>
    );
  }

  if (authFail) {
    return (
      <main className="min-h-screen bg-warm-cream">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <p className="text-foreground">请先登录后台</p>
          <Link href="/admin" className="btn-primary mt-6 inline-block px-6 py-3">
            去登录
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">商品与促销</h1>
            <p className="mt-1 text-sm text-warm-muted">
              改价、上下架、促销文案会立即写入 <code className="rounded bg-warm-gray/20 px-1">data/products.json</code>，前台系列页与配件页同步显示。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/orders" className="text-sm text-accent hover:underline">
              订单列表
            </Link>
            <Link href="/admin" className="text-sm text-warm-muted hover:text-foreground">
              重新登录
            </Link>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-warm-gray/40 bg-warm-white px-4 py-3 text-sm text-warm-muted">总商品 <span className="ml-2 font-semibold text-foreground">{groupedCount.total}</span></div>
          <div className="rounded-xl border border-warm-gray/40 bg-warm-white px-4 py-3 text-sm text-warm-muted">系列 <span className="ml-2 font-semibold text-foreground">{groupedCount.series}</span></div>
          <div className="rounded-xl border border-warm-gray/40 bg-warm-white px-4 py-3 text-sm text-warm-muted">配件 <span className="ml-2 font-semibold text-foreground">{groupedCount.accessory}</span></div>
          <div className="rounded-xl border border-warm-gray/40 bg-warm-white px-4 py-3 text-sm text-warm-muted">已上架 <span className="ml-2 font-semibold text-emerald-700">{groupedCount.online}</span></div>
        </div>

        <div className="mb-5 rounded-xl border border-warm-gray/45 bg-warm-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">新增上架产品</p>
              <p className="mt-0.5 text-xs text-warm-muted">快速添加新 SKU：创建后可在下方继续编辑详细字段。</p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreate((v) => !v)}
              className="rounded-lg border border-accent/40 bg-accent-light/25 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent-light/40"
            >
              {showCreate ? "收起" : "新增产品"}
            </button>
          </div>

          {showCreate && (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-foreground">商品 ID *</span>
                <input className={fieldClass} placeholder="如: model-d / arm-pro" value={newForm.id} onChange={(e)=>setNewForm({...newForm,id:e.target.value})} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">类型</span>
                <select className={fieldClass} value={newForm.kind} onChange={(e)=>setNewForm({...newForm,kind:e.target.value as "series"|"accessory"})}>
                  <option value="series">系列</option>
                  <option value="accessory">配件</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">名称 *</span>
                <input className={fieldClass} placeholder="如: Model D" value={newForm.name} onChange={(e)=>setNewForm({...newForm,name:e.target.value})} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">副标题 / tagline</span>
                <input className={fieldClass} placeholder="如: 新一代旗舰" value={newForm.tagline} onChange={(e)=>setNewForm({...newForm,tagline:e.target.value})} />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">列表短描述（中文）</span>
                <input className={fieldClass} value={newForm.desc} onChange={(e)=>setNewForm({...newForm,desc:e.target.value})} />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">详情长描述（中文）</span>
                <textarea rows={3} className={fieldClass} value={newForm.descZh} onChange={(e)=>setNewForm({...newForm,descZh:e.target.value})} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">现价 ¥</span>
                <input type="text" inputMode="numeric" className={fieldClass} value={newForm.price} onChange={(e)=>setNewForm({...newForm,price:normalizeIntInput(e.target.value)})} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">划线价 ¥</span>
                <input type="text" inputMode="numeric" className={fieldClass} value={newForm.comparePrice} onChange={(e)=>setNewForm({...newForm,comparePrice:normalizeIntInput(e.target.value)})} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">排序</span>
                <input type="text" inputMode="numeric" className={fieldClass} placeholder="默认 999" value={newForm.sortOrder} onChange={(e)=>setNewForm({...newForm,sortOrder:normalizeIntInput(e.target.value)})} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">促销角标</span>
                <input className={fieldClass} placeholder="如: 限时立减" value={newForm.promotionLabel} onChange={(e)=>setNewForm({...newForm,promotionLabel:e.target.value})} />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">列表图 URL</span>
                <input className={fieldClass} placeholder="/images/your-product.png" value={newForm.listImage} onChange={(e)=>setNewForm({...newForm,listImage:e.target.value})} />
              </label>
              <label className="flex items-center gap-2 md:col-span-2">
                <input type="checkbox" checked={newForm.published} onChange={(e)=>setNewForm({...newForm,published:e.target.checked})} />
                <span className="text-sm text-foreground">创建后立即上架</span>
              </label>
              <div className="flex justify-end gap-3 md:col-span-2">
                <button type="button" className="rounded-lg border border-warm-gray/50 px-4 py-2 text-sm text-foreground hover:bg-warm-gray/10" onClick={()=>setNewForm(NEW_FORM_INITIAL)}>
                  重置
                </button>
                <button type="button" disabled={creating} className="btn-primary px-5 py-2 text-sm disabled:opacity-60" onClick={createProduct}>
                  {creating ? "创建中…" : "创建并上架"}
                </button>
              </div>
            </div>
          )}
        </div>

        {msg && <p className="mb-4 text-sm text-emerald-700">{msg}</p>}

        <div className="overflow-x-auto rounded-xl border border-warm-gray/50 bg-warm-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-warm-gray/40 bg-warm-gray/5">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">ID</th>
                <th className="px-4 py-3 font-medium text-foreground">类型</th>
                <th className="px-4 py-3 font-medium text-foreground">名称</th>
                <th className="px-4 py-3 font-medium text-foreground">价格</th>
                <th className="px-4 py-3 font-medium text-foreground">上架</th>
                <th className="px-4 py-3 font-medium text-foreground">促销</th>
                <th className="px-4 py-3 font-medium text-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-b border-warm-gray/30 last:border-0 hover:bg-warm-gray/5">
                  <td className="px-4 py-3 font-mono text-xs text-warm-muted">{row.id}</td>
                  <td className="px-4 py-3">{row.kind === "series" ? "系列" : "配件"}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                  <td className="px-4 py-3">
                    ¥{row.price.toLocaleString()}
                    {row.comparePrice != null && row.comparePrice > row.price && (
                      <span className="ml-2 text-xs text-warm-muted line-through">¥{row.comparePrice}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{row.published ? "是" : "否"}</td>
                  <td className="max-w-[140px] truncate px-4 py-3 text-warm-muted" title={row.promotionLabel}>
                    {row.promotionLabel || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setEdit({ ...row })}
                      className="rounded-md px-2 py-1 font-medium text-accent hover:bg-accent-light/25 hover:underline"
                    >
                      编辑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {edit && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-warm-gray/50 bg-warm-white p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-foreground">编辑 {edit.name}</h2>
              <p className="mt-1 text-xs text-warm-muted">ID: {edit.id} · {edit.kind}</p>

              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={edit.published}
                    onChange={(e) => setEdit({ ...edit, published: e.target.checked })}
                  />
                  <span className="text-sm text-foreground">上架</span>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">排序</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    className={fieldClass}
                    value={String(edit.sortOrder)}
                    onChange={(e) => { const v = normalizeIntInput(e.target.value); setEdit({ ...edit, sortOrder: v ? Number(v) : 0 }); }}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">名称</span>
                  <input className={fieldClass} value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">列表短描述（中文）</span>
                  <input className={fieldClass} value={edit.desc} onChange={(e) => setEdit({ ...edit, desc: e.target.value })} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">详情长描述（中文）</span>
                  <textarea rows={3} className={fieldClass} value={edit.descZh} onChange={(e) => setEdit({ ...edit, descZh: e.target.value })} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">副标题 / tagline</span>
                  <input className={fieldClass} value={edit.tagline ?? ""} onChange={(e) => setEdit({ ...edit, tagline: e.target.value })} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">现价 ¥</span>
                    <input type="text" inputMode="numeric" className={fieldClass} value={String(edit.price)} onChange={(e) => { const v = normalizeIntInput(e.target.value); setEdit({ ...edit, price: v ? Number(v) : 0 }); }} />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">划线价 ¥（可选）</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      className={fieldClass}
                      value={edit.comparePrice ?? ""}
                      placeholder="留空则无"
                      onChange={(e) => { const v = normalizeIntInput(e.target.value); setEdit({ ...edit, comparePrice: v === "" ? undefined : Number(v) }); }}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">促销文案（角标）</span>
                  <input className={fieldClass} placeholder="如：限时立减 · 早鸟价" value={edit.promotionLabel ?? ""} onChange={(e) => setEdit({ ...edit, promotionLabel: e.target.value || undefined })} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">促销结束时间（ISO，可选）</span>
                  <input className={fieldClass + " font-mono text-xs"} placeholder="2026-12-31T15:59:59.000Z" value={edit.promotionEndsAt ?? ""} onChange={(e) => setEdit({ ...edit, promotionEndsAt: e.target.value || null })} />
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={!!edit.highlight} onChange={(e) => setEdit({ ...edit, highlight: e.target.checked })} />
                  <span className="text-sm text-foreground">列表「推荐」高亮</span>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">列表图 URL</span>
                  <input className={fieldClass + " font-mono text-xs"} value={edit.listImage ?? ""} onChange={(e) => setEdit({ ...edit, listImage: e.target.value || undefined })} />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" className="rounded-lg border border-warm-gray/50 px-4 py-2 text-sm text-foreground hover:bg-warm-gray/10" onClick={() => setEdit(null)}>
                  取消
                </button>
                <button type="button" disabled={saving} className="btn-primary px-5 py-2 text-sm disabled:opacity-60" onClick={save}>
                  {saving ? "保存中…" : "保存"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
