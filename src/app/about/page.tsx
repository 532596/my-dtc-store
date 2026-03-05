import Reveal from "@/components/Reveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">About</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-muted">
            Smart Standing Desk 聚焦健康办公、空间优化与智能便捷。我们相信：买的不是家具，是健康生活方式。
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-foreground">品牌理念</h2>
              <p className="mt-4 text-body text-warm-muted">
                Warm Home + Precise Tech。以温暖家居气质为基底，叠加工程可信表达，用健康数据与生活场景叙事传递价值。
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">信任与保障</h2>
              <p className="mt-4 text-body text-warm-muted">
                德国 TÜV 安全认证、人体工学设计认证。电机 5 年质保、结构 3 年质保。3D 安装指南与视频教程，配送与时效透明可查。
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
