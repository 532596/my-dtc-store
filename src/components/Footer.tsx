import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const FOOTER_PRODUCTS = [
  { href: "/series", label: "升降桌系列" },
  { href: "/accessories", label: "配件" },
  { href: "/series#compare", label: "产品对比" },
];

const FOOTER_SOLUTIONS = [
  { href: "/scenarios", label: "场景" },
  { href: "/guide", label: "技术原理" },
  { href: "/guide#voice-control", label: "语音控制" },
  { href: "/guide#height-memory", label: "高度记忆" },
];

const FOOTER_ABOUT = [
  { href: "/about", label: "品牌介绍" },
  { href: "/about#stories", label: "客户故事" },
  { href: "/support", label: "售后服务" },
];

const FOOTER_SUPPORT = [
  { href: "/support#faq", label: "常见问题 FAQ" },
  { href: "/guide", label: "健康办公指南" },
];

const CONTACT_ITEMS = [
  { icon: MessageCircle, label: "在线聊天", href: "/support", desc: "" },
  { icon: Phone, label: "电话咨询", href: "tel:400-000-0000", desc: "400-000-0000" },
  { icon: Mail, label: "邮件", href: "mailto:support@example.com", desc: "support@example.com" },
  { icon: FileText, label: "填写表单", href: "/support#contact", desc: "联系我们" },
];

const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-warm-gray/50 bg-warm-cream">
      <div className="mx-auto max-w-content px-6 py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* 品牌 */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              className="text-lg font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              Smart Standing Desk
            </Link>
          </div>

          {/* 导航列：与顶部导航一致 */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                产品
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_PRODUCTS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-warm-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                解决方案
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_SOLUTIONS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-warm-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                发现
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_ABOUT.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-warm-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                支持
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_SUPPORT.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-warm-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右侧：联系方式 + 社交 */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                需要帮助？
              </h3>
              <p className="mt-2 text-sm text-warm-muted">
                工作日 9:00–18:00，或通过下方方式联系我们。
              </p>
              <ul className="mt-4 divide-y divide-warm-gray/50">
                {CONTACT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 py-3 text-sm text-warm-muted transition-colors hover:text-foreground"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warm-cream text-accent">
                          <Icon className="h-4 w-4" strokeWidth={1.5} />
                        </span>
                        <span className="flex-1">
                          <span className="font-medium text-foreground">{item.label}</span>
                          {item.desc && (
                            <span className="ml-1.5 text-accent hover:underline">{item.desc}</span>
                          )}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-warm-stone" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-foreground">
                关注我们
              </h3>
              <div className="mt-3 flex gap-2">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-gray/60 bg-warm-white text-warm-muted transition-colors hover:border-accent hover:text-accent"
                      aria-label={item.label}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-warm-gray/50 pt-8 text-center text-sm text-warm-stone">
          © Smart Standing Desk. Work Healthier. Live Smarter.
        </div>
      </div>
    </footer>
  );
}
