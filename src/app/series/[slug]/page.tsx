import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartButton from "@/components/AddToCartButton";

const PRODUCTS: Record<
  string,
  {
    name: string;
    desc: string;
    specs: string[];
    price: number;
    comparePrice?: number;
    dimensions: string;
    colours: string[];
  }
> = {
  "model-a": {
    name: "Model A",
    desc: "Compact, quiet lift. Ideal for small spaces. Flush lift mechanism, cable management, zero clutter.",
    specs: ["24-43 in", "176 lbs", "Single motor"],
    price: 2999,
    comparePrice: 3499,
    dimensions: "1200mm(L) × 600mm(W)",
    colours: ["Silver", "White", "Black"],
  },
  "model-b": {
    name: "Model B",
    desc: "Fits 150-190cm. Smart control. Recommended. Quiet dual-motor, memory presets.",
    specs: ["24-47 in", "220 lbs", "Dual motor", "Smart"],
    price: 3999,
    comparePrice: 4499,
    dimensions: "1400mm(L) × 700mm(W)",
    colours: ["Silver", "Black"],
  },
  "model-c": {
    name: "Model C",
    desc: "Full-featured. TUV certified. Premium build, cable tray, programmable height.",
    specs: ["24-50 in", "265 lbs", "Dual motor", "Smart"],
    price: 4999,
    comparePrice: 5599,
    dimensions: "1600mm(L) × 800mm(W)",
    colours: ["Silver", "Black", "Walnut"],
  },
};

export default function ProductPage(props: { params: { slug: string } }) {
  const product = PRODUCTS[props.params.slug];
  if (!product) notFound();

  const mainImage = `/images/${props.params.slug}.jpg`;
  const images = [mainImage]; // 可扩展为多图

  const saving =
    product.comparePrice && product.comparePrice > product.price
      ? product.comparePrice - product.price
      : 0;
  const savingPercent =
    product.comparePrice && product.comparePrice > 0 && saving > 0
      ? Math.round((saving / product.comparePrice) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#1c1c1e]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,minmax(380px,420px)]">
        {/* 左侧：主图区（深色） */}
        <div className="flex flex-col bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] p-6 md:p-8 lg:p-10">
          <div className="max-w-4xl">
            <ProductImageGallery images={images} alt={product.name} />
          </div>
        </div>

        {/* 右侧：信息侧栏（白色） */}
        <div className="flex flex-col bg-warm-white lg:min-h-screen">
          <div className="flex flex-1 flex-col p-6 md:p-8 lg:max-h-screen lg:overflow-y-auto">
            {/* 面包屑 */}
            <nav className="text-sm text-warm-muted">
              <Link href="/series" className="hover:text-foreground">
                Collection
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground">All Desks</span>
            </nav>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {product.name}
            </h1>

            {/* 评分 */}
            <div className="mt-2 flex items-center gap-1.5 text-sm text-warm-muted">
              <span className="flex text-amber-500" aria-hidden>
                ★★★★★
              </span>
              <span>(4.9/5 stars)</span>
            </div>

            <p className="mt-4 text-body text-warm-muted">{product.desc}</p>

            <Link
              href="/guide"
              className="mt-4 inline-flex w-fit items-center rounded-lg border border-warm-gray/60 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground hover:bg-warm-cream/50"
            >
              EXPLORE FEATURES
            </Link>

            {/* 型号与价格 */}
            <div className="mt-8 rounded-xl border border-warm-gray/40 bg-warm-cream/30 p-4">
              <p className="font-medium text-foreground">{product.name}</p>
              <p className="mt-1 text-sm text-warm-muted">{product.dimensions}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-semibold text-foreground">
                  ¥{product.price.toLocaleString()}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <>
                    <span className="text-sm text-warm-muted line-through">
                      ¥{product.comparePrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-green-700">
                      You Save ¥{saving.toLocaleString()}
                      {savingPercent > 0 && ` (${savingPercent}%)`}
                    </span>
                  </>
                )}
              </div>
              <Link href="/guide" className="mt-1 inline-block text-xs font-medium text-accent hover:underline">
                Learn More
              </Link>
            </div>

            {/* 配置选项 */}
            <div className="mt-6 space-y-3 border-t border-warm-gray/40 pt-6">
              <p className="text-sm font-medium text-foreground">
                1. Choose your desk
              </p>
              <div className="flex items-center justify-between rounded-lg border border-warm-gray/40 bg-warm-white py-3 px-4">
                <span className="text-sm text-foreground">
                  Desk Length · {product.dimensions}
                </span>
                <span className="text-warm-muted" aria-hidden>→</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-warm-gray/40 bg-warm-white py-3 px-4">
                <span className="text-sm text-foreground">Colour</span>
                <span className="text-sm text-warm-muted">
                  {product.colours[0]}
                </span>
                <span className="text-warm-muted" aria-hidden>→</span>
              </div>
            </div>

            {/* 占位：使底部栏不遮挡内容 */}
            <div className="h-24 flex-shrink-0 lg:h-28" />
          </div>

          {/* 底部固定操作栏 */}
          <div className="sticky bottom-0 left-0 right-0 border-t border-warm-gray/40 bg-warm-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="truncate text-sm font-medium text-foreground">
                {product.name}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/series#compare"
                  className="rounded-xl border border-warm-gray/60 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-warm-cream/50"
                >
                  Compare
                </Link>
                <AddToCartButton
                  slug={props.params.slug}
                  name={product.name}
                  desc={product.desc}
                  price={product.price}
                  image={mainImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
