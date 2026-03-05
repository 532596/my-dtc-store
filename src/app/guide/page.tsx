import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">健康办公指南</h1>
          <p className="mt-4 max-w-xl text-body text-warm-muted">
            人体工学设置、场景搭配与健康数据科普。
          </p>
        </Reveal>
        <div className="mt-16 space-y-12">
          <Reveal>
            <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
              <h2 className="text-xl font-semibold text-foreground">人体工学设置</h2>
              <p className="mt-3 text-body text-warm-muted">
                桌面高度建议与坐姿指导：坐时肘部约 90°，站时屏幕与视线平齐。坐站交替每 30–60 分钟。
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
              <h2 className="text-xl font-semibold text-foreground">场景搭配方案</h2>
              <p className="mt-3 text-body text-warm-muted">
                桌搭理线、配件组合建议。办公场景推荐显示器支架，学习场景推荐儿童脚踏。
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
              <h2 className="text-xl font-semibold text-foreground">健康数据科普</h2>
              <p className="mt-3 text-body text-warm-muted">
                久坐危害与坐站交替时间表。减少久坐风险，提升专注效率。
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-12">
          <Link href="/support" className="text-sm font-medium text-accent hover:underline">Support</Link>
        </div>
      </section>
    </main>
  );
}
