"use client";

import Link from "next/link";
import { useState } from "react";

const STEPS = [
  { q: "主要使用人群？", options: ["个人办公", "家庭多人", "儿童学习", "出租房 / 临时使用"] },
  { q: "空间大小？", options: ["小户型", "标准空间", "大户型 / 独立房间"] },
  { q: "预算区间？", options: ["入门体验", "主流配置", "高端旗舰"] },
  { q: "使用时长和频率？", options: ["偶尔使用", "工作日 3–5 小时", "高频 6 小时以上"] },
  { q: "你更在意哪一项？", options: ["性价比", "稳定性和承重", "颜值与做工"] },
  { q: "桌面与收纳需求？", options: ["只放电脑与键盘", "还需显示器 / 支架", "需要较多收纳与配件"] },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (step < STEPS.length - 1) setStep(step + 1);
    else setStep(-1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-warm-cream/60 via-warm-white to-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {/* 左侧：介绍 + 进度 + 卖点 */}
          <div>
            <span className="inline-flex items-center rounded-full bg-accent-light/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
              快速匹配问答
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Find Your Fit
            </h1>
            <p className="mt-3 max-w-xl text-sm md:text-base text-warm-muted">
              多维度问题，结合使用人群、空间、预算与使用习惯，帮你在众多升降桌中快速筛选合适型号。
            </p>

            {/* 进度与步骤提示 */}
            <div className="mt-8 rounded-2xl border border-warm-gray/40 bg-warm-white/70 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between text-xs text-warm-muted">
                {step >= 0 ? (
                  <>
                    <span>
                      第{" "}
                      <span className="font-semibold text-foreground">
                        {step + 1}
                      </span>{" "}
                      / {STEPS.length} 步
                    </span>
                    <span>大约 30 秒完成</span>
                  </>
                ) : (
                  <span className="font-medium text-foreground">
                    已生成你的匹配结果
                  </span>
                )}
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-warm-gray/20">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{
                    width: `${((step >= 0 ? step + 1 : STEPS.length) / STEPS.length) * 100}%`,
                  }}
                />
              </div>

              <ul className="mt-5 grid gap-3 text-xs text-warm-muted md:grid-cols-3">
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <div>
                    <p className="font-medium text-foreground">人群画像</p>
                    <p>单人办公 / 家庭多场景，需求不同推荐也不同。</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <div>
                    <p className="font-medium text-foreground">空间适配</p>
                    <p>结合房间尺寸，避免桌面过大或过小。</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <div>
                    <p className="font-medium text-foreground">预算参考</p>
                    <p>从入门到旗舰，给出性价比最优解。</p>
                  </div>
                </li>
              </ul>

              {/* 已选答案速览 */}
              {answers.length > 0 && step >= 0 && (
                <div className="mt-4 rounded-xl bg-warm-cream/40 p-3 text-xs text-warm-muted">
                  <p className="mb-2 font-medium text-foreground">已选偏好</p>
                  <div className="flex flex-wrap gap-2">
                    {answers.map((a, i) => (
                      <span
                        key={`${a}-${i}`}
                        className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-medium text-foreground shadow-sm"
                      >
                        {STEPS[i]?.q.replace("？", "")}：{a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 右侧：问题卡片 / 结果卡片 */}
          <div className="rounded-3xl border border-warm-gray/40 bg-warm-white/90 p-6 shadow-lg shadow-warm-gray/10 backdrop-blur md:p-8">
            {step >= 0 ? (
              <>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-warm-muted">
                  Step {step + 1}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-foreground md:text-2xl">
                  {STEPS[step].q}
                </h2>
                <p className="mt-2 text-xs text-warm-muted">
                  请选择最符合你的情况的一项，稍后可以根据结果再微调配置。
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-1">
                  {STEPS[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className="flex items-center justify-between rounded-2xl border border-warm-gray/70 bg-warm-cream/20 px-4 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent-light/40 hover:shadow-sm"
                    >
                      <span>{opt}</span>
                      <span className="text-[11px] font-normal text-warm-muted">
                        点击选择
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  Your Match
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                  推荐：Model B 升降桌
                </h2>
                <p className="mt-3 text-sm text-warm-muted">
                  兼顾稳定性与桌下收纳空间，适合长时间办公与家庭多场景使用。根据你的回答，我们优先匹配了承重、升降范围和桌面尺寸。
                </p>

                {answers.length > 0 && (
                  <div className="mt-5 rounded-2xl bg-warm-cream/40 p-4 text-xs text-warm-muted">
                    <p className="mb-2 font-medium text-foreground">你的偏好总结</p>
                    <ul className="space-y-1">
                      {answers.map((a, i) => (
                        <li key={`${a}-summary-${i}`}>
                          <span className="text-warm-muted">
                            {i + 1}. {STEPS[i]?.q}
                          </span>{" "}
                          <span className="font-medium text-foreground">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/series/model-b"
                    className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm"
                  >
                    查看推荐配置
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      setAnswers([]);
                    }}
                    className="text-xs font-medium text-warm-muted underline-offset-4 hover:underline"
                  >
                    重新填写问卷
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
