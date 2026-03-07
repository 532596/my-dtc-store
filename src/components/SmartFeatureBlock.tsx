"use client";

import Link from "next/link";

type Props = {
  /** 带竖条的列（图片列），高度与竖条一致 */
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  href: string;
  label?: string;
  /** 为 true 时：图片列显示在右侧（文字左、图右），竖条仍在图片列上 */
  reverse?: boolean;
};

/** 竖条放在图片列内，高度与图片一致 */
export default function SmartFeatureBlock({ leftContent, rightContent, href, label = "了解", reverse }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className={`flex flex-col gap-4 transition-transform duration-300 ease-out group-hover:-translate-x-6 md:flex-row md:items-stretch md:gap-0 md:group-hover:-translate-x-8 ${reverse ? "md:flex-row-reverse" : ""}`}>
        <div className="relative shrink-0 md:w-[42%]">
          {leftContent}
          <div className="absolute right-0 top-0 flex h-full w-0 items-center justify-end overflow-hidden transition-[width] duration-300 ease-out group-hover:w-24 md:group-hover:w-28">
            <Link
              href={href}
              className="flex h-full min-w-[6rem] shrink-0 items-center justify-center bg-accent/95 px-4 text-sm font-medium text-white shadow-lg md:px-5"
            >
              <span className="whitespace-nowrap">{label} →</span>
            </Link>
          </div>
        </div>
        {rightContent}
      </div>
    </div>
  );
}
