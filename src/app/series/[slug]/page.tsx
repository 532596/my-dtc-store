import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { getProduct, seriesMainImage } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductPage(props: { params: { slug: string } }) {
  const product = await getProduct(props.params.slug);
  if (!product || product.kind !== "series" || !product.published) notFound();

  const mainImage = seriesMainImage(props.params.slug, product);
  const images = product.images?.length ? product.images : [mainImage];

  const saving =
    product.comparePrice && product.comparePrice > product.price
      ? product.comparePrice - product.price
      : 0;
  const savingPercent =
    product.comparePrice && product.comparePrice > 0 && saving > 0
      ? Math.round((saving / product.comparePrice) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-warm-white lg:min-h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[7fr_3fr] lg:min-h-0">
        {/* 左侧：大图区，无黑边，与右侧信息并列 */}
        <div className="flex min-h-[320px] flex-col bg-warm-gray/5 p-4 md:p-6 lg:min-h-full lg:h-full lg:min-h-0 lg:p-8">
          <div className="flex w-full max-w-4xl flex-1 flex-col min-h-0 lg:mx-auto lg:max-w-none">
            <ProductImageGallery images={images} alt={product.name} />
          </div>
        </div>

        {/* 右侧：产品信息 */}
        <div className="flex min-w-0 flex-col overflow-hidden bg-warm-white lg:h-screen">
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden break-words p-6 md:p-8">
            {/* 面包屑 */}
            <nav className="text-sm text-warm-muted">
              <Link href="/series" className="hover:text-foreground">
                系列
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground">全部升降桌</span>
            </nav>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {product.name}
            </h1>

            {/* 评分 */}
            <div className="mt-2 flex items-center gap-1.5 text-sm text-warm-muted">
              <span className="flex text-amber-500" aria-hidden>
                ★★★★☆
              </span>
              <span>4.9/5 星</span>
            </div>

            <p className="mt-4 text-body text-warm-muted">{product.descZh}</p>

            <Link
              href="/guide"
              className="mt-4 inline-flex w-fit items-center rounded-lg border border-warm-gray/60 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground hover:bg-warm-cream/50"
            >
              探索功能
            </Link>

            {/* 型号与价格 */}
            <div className="mt-8 rounded-xl border border-warm-gray/40 bg-warm-cream/30 p-4">
              <p className="font-medium text-foreground">{product.name}</p>
              <p className="mt-1 text-sm text-warm-muted">{product.dimensions}</p>
              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-xl font-semibold text-foreground">
                  ¥{product.price.toLocaleString()}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <>
                    <span className="text-sm text-warm-muted line-through">
                      ¥{product.comparePrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-green-700">
                      立省 ¥{saving.toLocaleString()}
                      {savingPercent > 0 ? `（省 ${savingPercent}%）` : ""}
                    </span>
                  </>
                )}
              </div>
              {product.promotionLabel && (
                <p className="mt-2 rounded-lg bg-amber-500/15 px-2 py-1.5 text-xs font-medium text-amber-900">
                  {product.promotionLabel}
                </p>
              )}
              <Link href="/guide" className="mt-1 inline-block text-xs font-medium text-accent hover:underline">
                了解更多
              </Link>
            </div>

            {/* 详细规格 */}
            <div className="mt-6 rounded-xl border border-warm-gray/40 bg-warm-cream/20 p-4">
              <p className="text-sm font-semibold text-foreground">详细规格</p>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-warm-muted">升降范围</dt>
                <dd className="text-foreground">{product.heightRange ?? "—"}</dd>
                <dt className="text-warm-muted">桌面承重</dt>
                <dd className="text-foreground">{product.loadCapacity ?? "—"}</dd>
                <dt className="text-warm-muted">电机类型</dt>
                <dd className="text-foreground">{product.motor ?? "—"}</dd>
                <dt className="text-warm-muted">运行噪音</dt>
                <dd className="text-foreground">{product.noiseLevel ?? "—"}</dd>
                <dt className="text-warm-muted">材质</dt>
                <dd className="text-foreground">{product.material ?? "—"}</dd>
                <dt className="text-warm-muted">电机质保</dt>
                <dd className="text-foreground">{product.warrantyMotor ?? "—"}</dd>
                <dt className="text-warm-muted">结构质保</dt>
                <dd className="text-foreground">{product.warrantyFrame ?? "—"}</dd>
                <dt className="text-warm-muted">认证</dt>
                <dd className="text-foreground">{product.certification ?? "—"}</dd>
              </dl>
            </div>

            {/* 配置选项 */}
            <div className="mt-6 space-y-3 border-t border-warm-gray/40 pt-6">
              <p className="text-sm font-medium text-foreground">
                1. 选择你的桌面
              </p>
              <div className="flex items-center justify-between rounded-lg border border-warm-gray/40 bg-warm-white py-3 px-4">
                <span className="text-sm text-foreground">
                  桌面尺寸 · {product.dimensions}
                </span>
                <span className="text-warm-muted" aria-hidden>→</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-warm-gray/40 bg-warm-white py-3 px-4">
                <span className="text-sm text-foreground">颜色</span>
                <span className="text-sm text-warm-muted">
                  {product.colours?.[0] ?? "—"}
                </span>
                <span className="text-warm-muted" aria-hidden>→</span>
              </div>
            </div>

            {/* 服务与保障 */}
            <div className="mt-6 space-y-2 border-t border-warm-gray/40 pt-6 text-xs text-warm-muted">
              <p>
                <Link href="/support/returns" className="text-accent hover:underline">配送与退换</Link>
                <span className="mx-1.5">·</span>
                <Link href="/support/warranty" className="text-accent hover:underline">保修说明</Link>
              </p>
              <p>
                <Link href="/series#reviews" className="text-accent hover:underline">用户评价</Link>
                <span className="mx-1.5">·</span>
                <Link href="/support#faq" className="text-accent hover:underline">常见问题</Link>
              </p>
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
                  对比
                </Link>
                <AddToCartButton
                  slug={props.params.slug}
                  name={product.name}
                  desc={product.descZh}
                  price={product.price}
                  image={mainImage}
                  redirectToCart
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
