"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductImageGallery({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const list = images.length ? images : ["/images/placeholder.jpg"];
  const currentImage = list[current] ?? list[0];

  const goPrev = () => setCurrent((i) => (i - 1 + list.length) % list.length);
  const goNext = () => setCurrent((i) => (i + 1) % list.length);

  return (
    <div className="relative flex flex-1 flex-col min-h-0 w-full lg:min-h-0">
      {/* 缩略图列表：置于主图上方，降低亮度避免遮挡大图 */}
      <div className="mb-4 flex shrink-0 gap-2 overflow-x-auto pb-1 [filter:brightness(0.85)] hover:[filter:brightness(0.95)]">
        {list.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setCurrent(i)}
            className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
              i === current
                ? "border-[#88b8cc] ring-2 ring-[#88b8cc]/30"
                : "border-transparent opacity-75 hover:opacity-95"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
      {/* 主图区域：移动端固定比例，桌面端填满剩余高度 */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[#2c2c2e] lg:aspect-auto lg:min-h-0 lg:flex-1">
        <Image
          src={currentImage}
          alt={alt}
          fill
          className="object-cover object-center"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* 左右箭头 */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
          aria-label="上一张"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
          aria-label="下一张"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* 3D 按钮 */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            3D
          </span>
        </div>
      </div>
    </div>
  );
}
