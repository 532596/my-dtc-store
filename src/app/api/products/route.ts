import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { listProducts } from "@/lib/products";

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
