"use client";

import Link from "next/link";
import { useState } from "react";

const STEPS = [
  { q: "主要使用人群？", options: ["个人办公", "家庭多人", "儿童学习"] },
  { q: "空间大小？", options: ["小户型", "标准", "大空间"] },
  { q: "预算区间？", options: ["入门", "主流", "高端"] },
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
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section md:py-section-md">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Find Your Fit</h1>
        <p className="mt-4 max-w-xl text-body text-warm-muted">
          使用人群、空间大小、预算三问，快速匹配产品。
        </p>
        {step >= 0 ? (
          <div className="mt-12">
            <h2 className="text-xl font-medium text-foreground">{STEPS[step].q}</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {STEPS[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="rounded-xl border border-warm-gray bg-warm-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent-light/30"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 rounded-xl border border-warm-gray/60 bg-warm-cream/30 p-8">
            <p className="text-body text-foreground">根据您的选择，推荐 Model B。</p>
            <Link href="/series/model-b" className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover">
              查看推荐
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
