import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import type { CatalogProduct } from "@/lib/products";
import { createProduct, listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

/** GET：访客仅返回上架商品；带管理员鉴权时返回全部（含下架） */
export async function GET(request: NextRequest) {
  try {
    const all = isAdminRequest(request);
    const kind = request.nextUrl.searchParams.get("kind") as "series" | "accessory" | null;
    const products = await listProducts({
      publishedOnly: !all,
      kind: kind ?? undefined,
    });
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "读取商品失败" }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Partial<CatalogProduct>;
    const id = (body.id || "").trim().toLowerCase();
    const name = (body.name || "").trim();
    const kind = body.kind === "accessory" ? "accessory" : "series";
    if (!id || !name) {
      return NextResponse.json({ error: "缺少 id 或名称" }, { status: 400 });
    }
    const product: CatalogProduct = {
      id,
      kind,
      published: body.published ?? true,
      sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 999,
      name,
      desc: (body.desc || body.descZh || "").trim(),
      descZh: (body.descZh || body.desc || "").trim(),
      price: Number.isFinite(Number(body.price)) ? Number(body.price) : 0,
      comparePrice:
        body.comparePrice === undefined || body.comparePrice === null || body.comparePrice === ("" as unknown)
          ? undefined
          : Number(body.comparePrice),
      promotionLabel: body.promotionLabel?.trim() || undefined,
      promotionEndsAt: body.promotionEndsAt || null,
      tagline: body.tagline?.trim() || undefined,
      specs: body.specs ?? [],
      dimensions: body.dimensions || undefined,
      colours: body.colours ?? [],
      images: body.images ?? (body.listImage ? [body.listImage] : []),
      heightRange: body.heightRange || undefined,
      loadCapacity: body.loadCapacity || undefined,
      motor: body.motor || undefined,
      noiseLevel: body.noiseLevel || undefined,
      warrantyMotor: body.warrantyMotor || undefined,
      warrantyFrame: body.warrantyFrame || undefined,
      certification: body.certification || undefined,
      material: body.material || undefined,
      highlight: !!body.highlight,
      listImage: body.listImage || undefined,
      features: body.features || undefined,
    };
    if (product.price < 0) {
      return NextResponse.json({ error: "价格无效" }, { status: 400 });
    }
    const created = await createProduct(product);
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message === "PRODUCT_ID_EXISTS") {
      return NextResponse.json({ error: "ID 已存在" }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: "新增商品失败" }, { status: 500 });
  }
}
