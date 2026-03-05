"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/series", label: "Desks" },
  { href: "/scenarios", label: "Solutions" },
  { href: "/accessories", label: "Accessories" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-warm-gray/50 bg-warm-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Smart Standing Desk
        </Link>
        <div className="flex items-center gap-10 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-warm-muted transition-colors hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Link href="/account" className="text-warm-muted transition-colors hover:text-foreground" aria-label="Account">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <Link href="/cart" className="flex items-center gap-1 text-warm-muted transition-colors hover:text-foreground" aria-label="Cart">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
