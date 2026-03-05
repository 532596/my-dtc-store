import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/series", label: "Desks" },
  { href: "/scenarios", label: "Solutions" },
  { href: "/accessories", label: "Accessories" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-warm-gray/50 bg-warm-white">
      <div className="mx-auto max-w-content px-6 py-14">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Link href="/" className="text-lg font-medium tracking-tight text-foreground">
            Smart Standing Desk
          </Link>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-warm-muted">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-warm-stone">
          © Smart Standing Desk. Work Healthier. Live Smarter.
        </p>
      </div>
    </footer>
  );
}
