import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import type { CatalogProduct } from "@/lib/products";
import { getProduct, updateProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const p = await getProduct(id);
    if (!p) return NextResponse.json({ error: "商品不存在" }, { status: 404 });
    if (!p.published && !isAdminRequest(request)) {
      return NextResponse.json({ error: "未上架" }, { status: 404 });
    }
    return NextResponse.json(p);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "读取失败" }, { status: 500 });
  }
}

const PATCHABLE: (keyof CatalogProduct)[] = [
  "published",
  "sortOrder",
  "name",
  "desc",
  "descZh",
  "price",
  "comparePrice",
  "promotionLabel",
  "promotionEndsAt",
  "tagline",
  "specs",
  "dimensions",
  "colours",
  "images",
  "heightRange",
  "loadCapacity",
  "motor",
  "noiseLevel",
  "warrantyMotor",
  "warrantyFrame",
  "certification",
  "material",
  "highlight",
  "listImage",
  "features",
];

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = (await request.json()) as Partial<CatalogProduct>;
    const patch: Partial<CatalogProduct> = {};
    for (const key of PATCHABLE) {
      if (key in body && body[key] !== undefined) {
        (patch as Record<string, unknown>)[key] = body[key];
      }
    }
    if (typeof patch.price === "number" && patch.price < 0) {
      return NextResponse.json({ error: "价格无效" }, { status: 400 });
    }
    const updated = await updateProduct(id, patch);
    if (!updated) return NextResponse.json({ error: "商品不存在" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}
