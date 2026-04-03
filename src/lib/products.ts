import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { kv } from "@vercel/kv";

/** 全站商品目录：系列桌 + 配件，后台可改价、上下架、促销文案 */
export type CatalogProduct = {
  id: string;
  kind: "series" | "accessory";
  published: boolean;
  /** 列表排序，越小越靠前 */
  sortOrder: number;
  name: string;
  desc: string;
  descZh: string;
  price: number;
  comparePrice?: number;
  /** 促销角标，如「限时立减」「Kickstarter 早鸟」 */
  promotionLabel?: string;
  promotionEndsAt?: string | null;
  // —— 系列（列表 + 详情）
  tagline?: string;
  specs?: string[];
  dimensions?: string;
  colours?: string[];
  images?: string[];
  heightRange?: string;
  loadCapacity?: string;
  motor?: string;
  noiseLevel?: string;
  warrantyMotor?: string;
  warrantyFrame?: string;
  certification?: string;
  material?: string;
  highlight?: boolean;
  /** 系列列表卡片图 */
  listImage?: string;
  /** 配件：适用场景说明 */
  features?: string;
};

const isVercel = process.env.VERCEL === "1";
const hasKv =
  typeof process.env.KV_REST_API_URL === "string" &&
  process.env.KV_REST_API_URL.length > 0 &&
  typeof process.env.KV_REST_API_TOKEN === "string" &&
  process.env.KV_REST_API_TOKEN.length > 0;
const DATA_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const KV_PRODUCTS_KEY = "dtc:products:v1";

let memoryCache: CatalogProduct[] | null = null;

async function ensureDataDir() {
  if (isVercel) return;
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

export const DEFAULT_CATALOG: CatalogProduct[] = [
  {
    id: "model-a",
    kind: "series",
    published: true,
    sortOrder: 1,
    name: "Model A",
    tagline: "紧凑静音 · 小空间首选",
    desc: "齐平式升降、线缆收纳、桌面简洁无杂乱。",
    descZh: "紧凑静音升降，适合小空间。齐平式升降、线缆收纳、桌面简洁无杂乱。",
    specs: ["24-43 in", "176 lbs", "Single motor"],
    price: 2999,
    comparePrice: 3499,
    dimensions: "1200mm(L) × 600mm(W)",
    colours: ["银色", "白色", "黑色"],
    images: ["/images/model-a.jpg", "/images/model-a-2.jpg", "/images/model-a-3.jpg"],
    heightRange: "610–1090mm",
    loadCapacity: "80kg",
    motor: "单电机",
    noiseLevel: "≤45dB",
    warrantyMotor: "5 年",
    warrantyFrame: "3 年",
    certification: "TÜV",
    material: "冷轧钢支架 + 环保板材桌面",
    highlight: false,
    listImage: "/images/series-model-a.jpg",
  },
  {
    id: "model-b",
    kind: "series",
    published: true,
    sortOrder: 2,
    name: "Model B",
    tagline: "智能记忆 · 推荐",
    desc: "适配 150–190cm 身高，静音双电机、四档记忆、久坐提醒。",
    descZh: "适配 150–190cm 身高，智能记忆推荐。静音双电机、四档记忆、久坐提醒。",
    specs: ["24-47 in", "220 lbs", "Dual motor", "Smart"],
    price: 3999,
    comparePrice: 4499,
    dimensions: "1400mm(L) × 700mm(W)",
    colours: ["银色", "黑色"],
    images: ["/images/model-b.jpg", "/images/model-b-2.jpg", "/images/model-b-3.jpg"],
    heightRange: "610–1200mm",
    loadCapacity: "100kg",
    motor: "双电机",
    noiseLevel: "≤42dB",
    warrantyMotor: "5 年",
    warrantyFrame: "5 年",
    certification: "TÜV、BIFMA",
    material: "冷轧钢支架 + 实木贴皮/环保板",
    highlight: true,
    listImage: "/images/series-model-b.jpg",
  },
  {
    id: "model-c",
    kind: "series",
    published: true,
    sortOrder: 3,
    name: "Model C",
    tagline: "全功能旗舰 · TÜV 认证",
    desc: "静音双电机、线缆槽、四档记忆、久坐提醒、遇阻回弹。",
    descZh: "全功能旗舰，TÜV 认证。静音双电机、线缆槽、四档记忆、久坐提醒、遇阻回弹。",
    specs: ["24-50 in", "265 lbs", "Dual motor", "Smart"],
    price: 4999,
    comparePrice: 5599,
    dimensions: "1600mm(L) × 800mm(W)",
    colours: ["银色", "黑色", "胡桃木色"],
    images: ["/images/model-c.jpg", "/images/model-c-2.jpg", "/images/model-c-3.jpg"],
    heightRange: "610–1250mm",
    loadCapacity: "120kg",
    motor: "双电机",
    noiseLevel: "≤40dB",
    warrantyMotor: "5 年",
    warrantyFrame: "5 年",
    certification: "TÜV、BIFMA",
    material: "冷轧钢支架 + 实木贴皮/环保板、金属线缆槽",
    highlight: false,
    listImage: "/images/series-model-c.jpg",
  },
  {
    id: "cable",
    kind: "accessory",
    published: true,
    sortOrder: 10,
    name: "理线架",
    tagline: "桌下理线 · 整洁易维护",
    desc: "线缆集中收纳，走线清晰、易维护，与升降桌框架无缝安装。",
    descZh: "线缆集中收纳，走线清晰、易维护，与升降桌框架无缝安装。",
    features: "全系列适用",
    material: "金属 + 塑料",
    price: 129,
    comparePrice: 159,
    highlight: true,
    listImage: "/images/acc-cable.png",
    images: ["/images/acc-cable.png"],
  },
  {
    id: "charger",
    kind: "accessory",
    published: true,
    sortOrder: 11,
    name: "无线充电模块",
    tagline: "桌面无线充电 · 随放随充",
    desc: "嵌入式或桌面式可选，支持 15W 快充，手机、耳机随放随充。",
    descZh: "嵌入式或桌面式可选，支持 15W 快充，手机、耳机随放随充。",
    features: "Model B / C",
    material: "ABS + 线圈",
    price: 199,
    comparePrice: 249,
    highlight: false,
    listImage: "/images/acc-charger.png",
    images: ["/images/acc-charger.png"],
  },
  {
    id: "mat",
    kind: "accessory",
    published: true,
    sortOrder: 12,
    name: "防滑桌垫",
    tagline: "保护桌面 · 静音防滑",
    desc: "高密度橡胶基，防刮防滑，键盘鼠标更稳，久用无异味。",
    descZh: "高密度橡胶基，防刮防滑，键盘鼠标更稳，久用无异味。",
    features: "全系列适用",
    material: "橡胶 + 织物",
    price: 89,
    comparePrice: 119,
    highlight: false,
    listImage: "/images/acc-mat.png",
    images: ["/images/acc-mat.png"],
  },
];

function sortCatalog(list: CatalogProduct[]): CatalogProduct[] {
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));
}

async function readProductsRaw(): Promise<CatalogProduct[]> {
  if (hasKv) {
    try {
      const data = await kv.get<CatalogProduct[]>(KV_PRODUCTS_KEY);
      if (Array.isArray(data) && data.length > 0) return sortCatalog(data);
      await kv.set(KV_PRODUCTS_KEY, DEFAULT_CATALOG);
      return sortCatalog([...DEFAULT_CATALOG]);
    } catch {
      // KV 不可用时退回文件方案
    }
  }

  await ensureDataDir();
  try {
    const raw = await readFile(PRODUCTS_FILE, "utf-8");
    const data = JSON.parse(raw) as CatalogProduct[];
    if (Array.isArray(data) && data.length > 0) return sortCatalog(data);
  } catch {
    /* first run */
  }
  await writeFile(PRODUCTS_FILE, JSON.stringify(DEFAULT_CATALOG, null, 2), "utf-8").catch(() => {});
  return sortCatalog([...DEFAULT_CATALOG]);
}

export async function readProducts(): Promise<CatalogProduct[]> {
  if (memoryCache) return memoryCache;
  memoryCache = await readProductsRaw();
  return memoryCache;
}

export async function listProducts(filters?: {
  publishedOnly?: boolean;
  kind?: "series" | "accessory";
}): Promise<CatalogProduct[]> {
  let list = await readProducts();
  if (filters?.publishedOnly) list = list.filter((p) => p.published);
  if (filters?.kind) list = list.filter((p) => p.kind === filters.kind);
  return sortCatalog(list);
}

export async function getProduct(id: string): Promise<CatalogProduct | null> {
  const list = await readProducts();
  return list.find((p) => p.id === id) ?? null;
}

export async function replaceAllProducts(products: CatalogProduct[]): Promise<void> {
  await persistProducts(products);
}


export async function createProduct(input: CatalogProduct): Promise<CatalogProduct> {
  const list = await readProducts();
  const exists = list.some((p) => p.id === input.id);
  if (exists) throw new Error("PRODUCT_ID_EXISTS");
  const next: CatalogProduct = {
    ...input,
    id: input.id.trim(),
    name: input.name.trim(),
    desc: input.desc.trim(),
    descZh: input.descZh.trim(),
  };
  list.push(next);
  await persistProducts(list);
  return next;
}

export async function updateProduct(
  id: string,
  patch: Partial<CatalogProduct>
): Promise<CatalogProduct | null> {
  const list = await readProducts();
  const idx = list.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  const prev = list[idx];
  const next: CatalogProduct = {
    ...prev,
    ...patch,
    id: prev.id,
    kind: prev.kind,
  };
  list[idx] = next;
  await persistProducts(list);
  return next;
}

async function persistProducts(products: CatalogProduct[]) {
  memoryCache = sortCatalog(products);
  if (hasKv) {
    try {
      await kv.set(KV_PRODUCTS_KEY, memoryCache);
      return;
    } catch {
      // KV 写入失败时继续尝试文件写入
    }
  }
  await ensureDataDir();
  try {
    await writeFile(PRODUCTS_FILE, JSON.stringify(memoryCache, null, 2), "utf-8");
  } catch {
    /* ignore on read-only fs */
  }
}

/** 系列详情页：合并默认图片路径 */
export function seriesMainImage(slug: string, product: CatalogProduct): string {
  if (product.images?.length) return product.images[0];
  return `/images/${slug}.jpg`;
}
