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
      {/* 主图区域：占绝大部分空间，参考图主图约 80–85% */}
      <div className="product-gallery-main relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-xl bg-[#1a1a1a] lg:aspect-auto lg:min-h-0 lg:flex-1">
        <Image
          src={currentImage}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* 左右箭头：小号黑底白箭头，贴边 */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90"
          aria-label="上一张"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90"
          aria-label="下一张"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* 360° 视图按钮：椭圆黑底，右下角 */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-2 text-xs font-medium text-white">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            360°
          </span>
        </div>
      </div>
      {/* 缩略图条：主图下方黑色横条，可横向滚动，当前项白框 */}
      <div className="flex h-20 shrink-0 items-center gap-2 overflow-x-auto rounded-b-xl bg-[#1a1a1a] px-3 py-3">
        {list.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setCurrent(i)}
            className={`relative h-14 w-20 shrink-0 overflow-hidden rounded transition ${
              i === current
                ? "ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a]"
                : "opacity-80 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
