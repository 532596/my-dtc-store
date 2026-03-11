import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

export type OrderItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  image: string;
};

export type OrderShipping = {
  name: string;
  phone: string;
  region: string;
  address: string;
  email?: string;
};

export type Order = {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: "pending_payment" | "paid";
  paymentMethod?: string;
  paidAt?: string;
  createdAt: string;
  shipping: OrderShipping;
  email?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

async function readOrders(): Promise<Order[]> {
  await ensureDataDir();
  try {
    const raw = await readFile(ORDERS_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]) {
  await ensureDataDir();
  await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export async function createOrder(order: Omit<Order, "status">): Promise<Order> {
  const orders = await readOrders();
  const newOrder: Order = {
    ...order,
    status: "pending_payment",
  };
  orders.unshift(newOrder);
  await writeOrders(orders);
  return newOrder;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const orders = await readOrders();
  return orders.find((o) => o.orderId === orderId) ?? null;
}

export async function listOrders(): Promise<Order[]> {
  return readOrders();
}

export async function markOrderPaid(
  orderId: string,
  paymentMethod: string
): Promise<Order | null> {
  const orders = await readOrders();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx < 0) return null;
  orders[idx] = {
    ...orders[idx],
    status: "paid",
    paymentMethod,
    paidAt: new Date().toISOString(),
  };
  await writeOrders(orders);
  return orders[idx];
}
