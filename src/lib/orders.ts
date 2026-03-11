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

/** 订单状态：已支付、已发货、运送中、已收货 */
export type OrderStatus = "pending_payment" | "paid" | "shipped" | "in_transit" | "received";

export type Order = {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: string;
  paidAt?: string;
  createdAt: string;
  shipping: OrderShipping;
  email?: string;
};

// Vercel 上项目目录只读，使用 /tmp 才能写入；同实例内用内存缓存保证读写一致
const isVercel = process.env.VERCEL === "1";
const DATA_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

let memoryCache: Order[] | null = null;

async function ensureDataDir() {
  if (isVercel) return; // /tmp 一定存在
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

async function readOrders(): Promise<Order[]> {
  if (memoryCache) return memoryCache;
  await ensureDataDir();
  try {
    const raw = await readFile(ORDERS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : [];
    memoryCache = list;
    return list;
  } catch {
    memoryCache = [];
    return [];
  }
}

async function writeOrders(orders: Order[]) {
  memoryCache = orders;
  await ensureDataDir();
  try {
    await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  } catch (e) {
    // Vercel 非 /tmp 写入会失败，已用 memoryCache，忽略
  }
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

const PAID_STATUSES: OrderStatus[] = ["paid", "shipped", "in_transit", "received"];

/** 按邮箱查询该用户所有已支付/已发货等订单（用于「我的清单」持久化展示） */
export async function listOrdersByEmail(email: string): Promise<Order[]> {
  if (!email || typeof email !== "string") return [];
  const normalized = email.trim().toLowerCase();
  if (!normalized) return [];
  const orders = await readOrders();
  return orders
    .filter(
      (o) =>
        (o.email?.trim().toLowerCase() === normalized ||
          (o.shipping as OrderShipping & { email?: string })?.email?.trim().toLowerCase() === normalized) &&
        PAID_STATUSES.includes(o.status)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

/** 更新订单状态（已发货 / 运送中 / 已收货），供后台使用 */
export async function updateOrderStatus(
  orderId: string,
  status: "shipped" | "in_transit" | "received"
): Promise<Order | null> {
  const orders = await readOrders();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx < 0) return null;
  orders[idx] = { ...orders[idx], status };
  await writeOrders(orders);
  return orders[idx];
}
