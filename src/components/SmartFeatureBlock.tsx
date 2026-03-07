"use client";

import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
  label?: string;
};

export default function SmartFeatureBlock({ children, href, label = "了解" }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="transition-transform duration-300 ease-out group-hover:-translate-x-6 md:group-hover:-translate-x-8">
        {children}
      </div>
      <div className="absolute right-0 top-0 flex h-full w-0 items-center justify-end overflow-hidden transition-[width] duration-300 ease-out group-hover:w-24 md:group-hover:w-28">
        <Link
          href={href}
          className="flex h-full min-w-[6rem] shrink-0 items-center justify-center bg-accent/95 px-4 text-sm font-medium text-white shadow-lg md:px-5"
        >
          <span className="whitespace-nowrap">{label} →</span>
        </Link>
      </div>
    </div>
  );
}
