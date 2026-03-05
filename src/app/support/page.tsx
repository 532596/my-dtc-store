import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Support</h1>
          <p className="mt-4 max-w-xl text-body text-warm-muted">
            安装指导、质保政策与常见问题。
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
              <h2 className="text-lg font-semibold text-foreground">安装与配送</h2>
              <p className="mt-3 text-body text-warm-muted">
                提供 3D 交互式安装指南、视频教程。配送范围与时效在订单页明确可查。
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
              <h2 className="text-lg font-semibold text-foreground">质保政策</h2>
              <p className="mt-3 text-body text-warm-muted">
                电机 5 年质保、桌架 3 年质保、桌面分模块质保。具体条款见购买页。
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-12">
          <Link href="/guide" className="text-sm font-medium text-accent hover:underline">
            健康办公指南 →
          </Link>
        </div>
      </section>
    </main>
  );
}
