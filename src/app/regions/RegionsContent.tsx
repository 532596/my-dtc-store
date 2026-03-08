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
    <section className="mr-auto max-w-3xl px-6 py-10 md:max-w-4xl md:px-10 md:py-14">
      <nav className="text-sm text-warm-muted md:text-base" aria-label="面包屑">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Regions</span>
      </nav>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Regions
      </h1>
      <p className="mt-3 text-base text-warm-muted md:text-lg">
        选择您的国家或地区，用于配送与价格展示。
      </p>

      <div className="mt-12 space-y-10 md:mt-14 md:space-y-12">
        {REGIONS.map((group) => (
          <div key={group.title}>
            <h2 className="mb-5 text-lg font-semibold text-foreground md:text-xl">
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.code)}
                    className="flex w-full items-center gap-4 rounded-xl border border-warm-gray/40 bg-warm-cream/20 px-5 py-4 text-left text-foreground transition hover:border-accent/50 hover:bg-warm-cream/50 md:px-6 md:py-4 md:text-lg"
                  >
                    <span className="relative h-8 w-11 shrink-0 overflow-hidden rounded-sm bg-warm-gray/40 md:h-9 md:w-12">
                      <img
                        src={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png`}
                        alt=""
                        width={48}
                        height={36}
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
