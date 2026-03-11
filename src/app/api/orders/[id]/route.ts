import { NextRequest, NextResponse } from "next/server";
import { getOrder, markOrderPaid } from "@/lib/orders";

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
    const body = await request.json();
    const { paymentMethod } = body as { paymentMethod?: string };
    if (!paymentMethod) {
      return NextResponse.json({ error: "缺少支付方式" }, { status: 400 });
    }
    const order = await markOrderPaid(orderId, paymentMethod);
    if (!order) return NextResponse.json({ error: "订单不存在" }, { status: 404 });
    return NextResponse.json(order);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "更新订单失败" }, { status: 500 });
  }
}
