import { NextRequest, NextResponse } from "next/server";
import { getOrder, markOrderPaid, updateOrderStatus } from "@/lib/orders";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id: orderId } = await params;
  try {
    const order = await getOrder(orderId);
    if (!order) return NextResponse.json({ error: "订单不存在" }, { status: 404 });
    return NextResponse.json(order);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "获取订单失败" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id: orderId } = await params;
  try {
    const body = await request.json() as { paymentMethod?: string; status?: string };
    if (body.status && ["shipped", "in_transit", "received"].includes(body.status)) {
      const order = await updateOrderStatus(orderId, body.status as "shipped" | "in_transit" | "received");
      if (!order) return NextResponse.json({ error: "订单不存在" }, { status: 404 });
      return NextResponse.json(order);
    }
    if (body.paymentMethod) {
      const order = await markOrderPaid(orderId, body.paymentMethod);
      if (!order) return NextResponse.json({ error: "订单不存在" }, { status: 404 });
      return NextResponse.json(order);
    }
    return NextResponse.json({ error: "缺少 paymentMethod 或 status" }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "更新订单失败" }, { status: 500 });
  }
}
