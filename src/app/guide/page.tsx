import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">健康办公指南</h1>
          <p className="mt-4 max-w-xl text-body text-warm-muted">
            人体工学设置、场景搭配与健康数据科普；智能功能详解：高度记忆、语音控制。
          </p>
        </Reveal>

        {/* 高度记忆：首页「了解」锚点 */}
        <div id="height-memory" className="mt-16 scroll-mt-24">
          <Reveal>
            <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
              <span className="text-xs font-medium uppercase tracking-wider text-accent">01</span>
              <h2 className="mt-1 text-xl font-semibold text-foreground">高度记忆 Height Memory</h2>
              <p className="mt-3 text-body text-warm-muted">
                四组高度记忆，办公、站立、学习、放松一键切换。精确到毫米的升降，坐站交替更轻松。
              </p>
              <ul className="mt-4 space-y-2 text-sm text-warm-muted">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  <span><strong className="text-foreground">4 组记忆位</strong>：办公 / 站立 / 学习 / 放松，一键切换当前场景。</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  <span><strong className="text-foreground">毫米级精度</strong>：升降稳定可调，坐站交替更轻松。</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  <span><strong className="text-foreground">久坐提醒</strong>：到点提醒站立，养成健康习惯。</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* 语音控制：首页「了解」锚点 */}
        <div id="voice-control" className="mt-12 scroll-mt-24">
          <Reveal>
            <div className="rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
              <span className="text-xs font-medium uppercase tracking-wider text-accent">02</span>
              <h2 className="mt-1 text-xl font-semibold text-foreground">语音控制 Voice Control</h2>
              <p className="mt-3 text-body text-warm-muted">
                接入主流语音助手，说一句即可升高、降低或切换到记忆高度。开会、手脏、抱娃时都能轻松调节。
              </p>
              <ul className="mt-4 space-y-2 text-sm text-warm-muted">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  <span><strong className="text-foreground">语音指令</strong>：如「升高桌面」「切换到站立高度」等，免动手调节。</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  <span><strong className="text-foreground">多场景适用</strong>：会议中、手脏、抱娃或双手占用时尤其方便。</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  <span><strong className="text-foreground">兼容主流助手</strong>：支持常见智能音箱与语音助手，无缝联动。</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

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
