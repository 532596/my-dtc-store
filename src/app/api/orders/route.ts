import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { createOrder, listOrders, listOrdersByEmail } from "@/lib/orders";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      items,
      subtotal,
      total,
      shipping,
      email,
    } = body as {
      orderId: string;
      items: { id: string; name: string; desc: string; price: number; quantity: number; image: string }[];
      subtotal: number;
      total: number;
      shipping: { name: string; phone: string; region: string; address: string };
      email?: string;
    };
    if (!orderId || !items?.length || total == null) {
      return NextResponse.json({ error: "缺少订单信息" }, { status: 400 });
    }
    const order = await createOrder({
      orderId,
      items,
      subtotal: Number(subtotal),
      total: Number(total),
      createdAt: new Date().toISOString(),
      shipping: shipping ?? { name: "", phone: "", region: "", address: "" },
      email,
    });
    return NextResponse.json(order);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "创建订单失败" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim();
  if (email) {
    try {
      const orders = await listOrdersByEmail(email);
      return NextResponse.json(orders);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "获取订单列表失败" }, { status: 500 });
    }
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  try {
    const orders = await listOrders();
    return NextResponse.json(orders);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "获取订单列表失败" }, { status: 500 });
  }
}
