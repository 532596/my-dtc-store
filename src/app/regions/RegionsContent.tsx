"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserCountry } from "@/contexts/UserCountryContext";

type RegionItem = { code: string; name: string };

const REGIONS: { title: string; items: RegionItem[] }[] = [
  {
    title: "Americas",
    items: [
      { code: "US", name: "United States" },
      { code: "CA", name: "Canada" },
    ],
  },
  {
    title: "Europe",
    items: [
      { code: "GB", name: "United Kingdom" },
      { code: "EU", name: "Europe" },
    ],
  },
  {
    title: "Oceania",
    items: [
      { code: "AU", name: "Australia" },
      { code: "NZ", name: "New Zealand" },
    ],
  },
  {
    title: "Asia",
    items: [
      { code: "CN", name: "中国" },
      { code: "TW", name: "台湾" },
      { code: "JP", name: "Japan" },
      { code: "KR", name: "South Korea" },
      { code: "SG", name: "Singapore" },
    ],
  },
];

export default function RegionsContent() {
  const router = useRouter();
  const { setUserRegion } = useUserCountry();

  const handleSelect = (code: string) => {
    setUserRegion(code);
    router.back();
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-10 md:py-14">
      <nav className="text-sm text-warm-muted" aria-label="面包屑">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Regions</span>
      </nav>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        Regions
      </h1>
      <p className="mt-2 text-sm text-warm-muted">
        选择您的国家或地区，用于配送与价格展示。
      </p>

      <div className="mt-10 space-y-8">
        {REGIONS.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 text-base font-semibold text-foreground">
              {group.title}
            </h2>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.code)}
                    className="flex w-full items-center gap-3 rounded-xl border border-warm-gray/40 bg-warm-cream/20 px-4 py-3 text-left text-foreground transition hover:border-accent/50 hover:bg-warm-cream/50"
                  >
                    <span className="relative h-6 w-8 shrink-0 overflow-hidden rounded-sm bg-warm-gray/40">
                      <img
                        src={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png`}
                        alt=""
                        width={32}
                        height={24}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
