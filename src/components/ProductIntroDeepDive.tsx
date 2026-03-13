"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  Cable,
  ShieldCheck,
  Sparkles,
  Waves,
  BadgeCheck,
  Layers,
  type LucideIcon,
} from "lucide-react";

/** 按部位列出的材质与背书：每个部位明确材质 + 背书说明 */
type MaterialEndorsement = {
  part: string;       // 部位名称，如「支架」「桌面」
  material: string;  // 该部位使用的材质
  endorsement: string; // 该材质的背书说明或认证
};

type DeepDive = {
  name: string;
  structureTitle: string;
  structureKicker: string;
  structureDesc: string;
  structureBullets: { title: string; desc: string }[];
  structureImage: string;
  materialTitle: string;
  materialSubtitle: string;
  materialBadges: { title: string; desc: string; icon: LucideIcon }[];
  swatches: { name: string; className: string }[];
  /** 用料与认证：按部位列出材质，每项都有背书 */
  materialParts: MaterialEndorsement[];
};

const DEEP_DIVE_BY_SLUG: Record<string, DeepDive> = {
  "model-a": {
    name: "Model A",
    structureTitle: "功能结构介绍",
    structureKicker: "STRUCTURE",
    structureDesc:
      "以「紧凑、安静、好打理」为核心：桌下理线、稳固支架与顺滑升降，让小空间也能保持桌面整洁。",
    structureBullets: [
      { title: "全长理线槽", desc: "电源线、转接器统一收纳，桌下不再垂线凌乱。" },
      { title: "稳固支架结构", desc: "冷轧钢框架 + 加厚立柱，日常敲击也更稳。" },
      { title: "低噪升降", desc: "≤45dB，深夜学习/办公不打扰他人。" },
    ],
    structureImage: "/images/model-a.jpg",
    materialTitle: "材质背书",
    materialSubtitle: "耐用、易清洁、触感温润，兼顾居家风格与长期使用。",
    materialBadges: [
      { title: "耐刮擦", desc: "日常键盘、杯具摩擦不易留痕。", icon: ShieldCheck },
      { title: "防污易清洁", desc: "一抹即净，减少顽固污渍残留。", icon: Sparkles },
      { title: "耐潮耐热", desc: "应对冷热杯垫与轻度潮湿环境。", icon: Waves },
    ],
    swatches: [
      { name: "胡桃木纹", className: "bg-gradient-to-br from-[#4b3425] to-[#2a1c15]" },
      { name: "浅灰织纹", className: "bg-gradient-to-br from-[#d7d5d2] to-[#b9b5af]" },
      { name: "深黑岩纹", className: "bg-gradient-to-br from-[#2d2d2f] to-[#151517]" },
    ],
    materialParts: [
      { part: "支架", material: "冷轧钢", endorsement: "结构稳固、承重可靠，日常敲击不易变形。" },
      { part: "桌面", material: "环保板材", endorsement: "耐用易清洁、触感温润，符合家居环保要求。" },
      { part: "整品认证", material: "TÜV", endorsement: "通过 TÜV 安全与可靠性认证。" },
    ],
  },
  "model-b": {
    name: "Model B",
    structureTitle: "功能结构介绍",
    structureKicker: "STRUCTURE",
    structureDesc:
      "为高频升降与多设备桌搭优化：双电机输出、记忆控制与线缆管理，让桌面更专注、桌下更干净。",
    structureBullets: [
      { title: "双电机驱动", desc: "起落更顺滑，承重更强，适配双屏/主机桌搭。" },
      { title: "记忆高度", desc: "常用高度一键切换，坐站交替更轻松。" },
      { title: "隐藏走线", desc: "桌下理线槽 + 走线孔位，桌面始终利落。" },
    ],
    structureImage: "/images/model-b.jpg",
    materialTitle: "材质背书",
    materialSubtitle: "结构与桌面同时强化：稳固、耐磨、经久耐用。",
    materialBadges: [
      { title: "耐磨桌面", desc: "长期使用不易起毛/掉皮。", icon: Layers },
      { title: "易打理饰面", desc: "减少指纹与水渍痕迹。", icon: Sparkles },
      { title: "多项认证", desc: "面向长期可靠性与安全标准。", icon: BadgeCheck },
    ],
    swatches: [
      { name: "原木浅色", className: "bg-gradient-to-br from-[#d2b48c] to-[#a57c52]" },
      { name: "烟熏深灰", className: "bg-gradient-to-br from-[#6a6a6a] to-[#3b3b3b]" },
      { name: "经典雅黑", className: "bg-gradient-to-br from-[#1f1f22] to-[#0f0f10]" },
    ],
    materialParts: [
      { part: "支架", material: "冷轧钢", endorsement: "加厚框架与立柱，升降更稳、承重更强。" },
      { part: "桌面", material: "实木贴皮/环保板", endorsement: "耐磨饰面、易打理，减少指纹与水渍。" },
      { part: "整品认证", material: "TÜV、BIFMA", endorsement: "通过 TÜV 与 BIFMA 安全及耐久标准。" },
    ],
  },
  "model-c": {
    name: "Model C",
    structureTitle: "功能结构介绍",
    structureKicker: "STRUCTURE",
    structureDesc:
      "旗舰配置：更强承重、更宽升降范围与更完整的安全防护。适合多设备桌搭与更高频的坐站切换。",
    structureBullets: [
      { title: "全长金属线缆槽", desc: "模块化收纳电源与转接器，桌下更整洁。" },
      { title: "防撞回弹", desc: "遇阻自动停止并回弹，保护桌面与家人。" },
      { title: "低噪高承重", desc: "≤40dB + 120kg，稳定支撑多设备。" },
    ],
    structureImage: "/images/model-c.jpg",
    materialTitle: "材质背书",
    materialSubtitle: "用料更扎实，细节更耐用，适合长期重度使用。",
    materialBadges: [
      { title: "耐刮擦", desc: "应对多设备频繁移动与摆放。", icon: ShieldCheck },
      { title: "金属结构件", desc: "关键件加固，长时间升降更稳定。", icon: Layers },
      { title: "权威认证", desc: "安全与可靠性标准更清晰。", icon: BadgeCheck },
    ],
    swatches: [
      { name: "胡桃木色", className: "bg-gradient-to-br from-[#6b4b34] to-[#2d2017]" },
      { name: "冷灰石纹", className: "bg-gradient-to-br from-[#cfcfcf] to-[#9a9a9a]" },
      { name: "深空黑", className: "bg-gradient-to-br from-[#242428] to-[#0f0f12]" },
    ],
    materialParts: [
      { part: "支架", material: "冷轧钢", endorsement: "关键结构件加固，长时间升降稳定可靠。" },
      { part: "桌面", material: "实木贴皮/环保板", endorsement: "耐刮擦、防污易清洁，适配重度使用。" },
      { part: "整品认证", material: "TÜV、BIFMA", endorsement: "满足更高安全与可靠性标准。" },
    ],
  },
};

function getSeriesSlug(pathname: string | null): string | null {
  if (!pathname) return null;
  const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  if (parts[0] !== "series") return null;
  return parts[1] || null;
}

export default function ProductIntroDeepDive() {
  const pathname = usePathname();
  const slug = getSeriesSlug(pathname);
  const data = slug ? DEEP_DIVE_BY_SLUG[slug] : null;

  const [imgSrc, setImgSrc] = React.useState<string>(data?.structureImage ?? "");
  React.useEffect(() => {
    setImgSrc(data?.structureImage ?? "");
  }, [data?.structureImage]);

  if (!data) return null;

  return (
    <div>
      {/* 功能结构：浅色图文块，与全站暖色统一 */}
      <section className="bg-warm-cream/40 py-14 md:py-16">
        <div className="mx-auto max-w-content px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-warm-muted">
                {data.structureKicker}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {data.structureTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-warm-muted">
                {data.structureDesc}
              </p>
              <ul className="mt-7 space-y-4">
                {data.structureBullets.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{b.title}</p>
                      <p className="mt-1 text-sm text-warm-muted">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-warm-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-warm-gray/40 bg-white px-3 py-1.5">
                  <Cable className="h-3.5 w-3.5 text-foreground" />
                  理线更整洁
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-warm-gray/40 bg-white px-3 py-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-foreground" />
                  更稳更安心
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-warm-gray/40 bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={imgSrc}
                  alt={`${data.name} 功能结构示意`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setImgSrc("/images/scene-office.jpg")}
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-foreground">
                  {data.name} 结构亮点
                </p>
                <p className="mt-1 text-xs text-warm-muted">
                  理线、稳固与升降体验，三者一次到位。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 材质背书：浅色性能+材质展示（参考图三） */}
      <section className="bg-warm-white py-14 md:py-16">
        <div className="mx-auto max-w-content px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                MATERIALS
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {data.materialTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body text-warm-muted">
                {data.materialSubtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {data.materialBadges.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-warm-gray/40 bg-warm-cream/20 p-6"
                  >
                    <div className="flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <Icon className="h-5 w-5 text-foreground" />
                      </span>
                    </div>
                    <p className="mt-4 text-center text-sm font-semibold text-foreground">
                      {b.title}
                    </p>
                    <p className="mt-2 text-center text-sm text-warm-muted">
                      {b.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-warm-gray/40 bg-white">
              <div className="px-6 pt-7 pb-6 md:px-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-muted">
                  用料与认证
                </p>
                <p className="mt-1 text-sm text-warm-muted">
                  不同部位使用不同材质，每项均有明确背书与认证。
                </p>
                <div className="mt-4 space-y-4">
                  {data.materialParts.map((item) => (
                    <div
                      key={`${item.part}-${item.material}`}
                      className="flex flex-col gap-1 rounded-xl border border-warm-gray/40 bg-warm-cream/20 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
                        <span className="text-sm font-semibold text-foreground">
                          {item.part}：{item.material}
                        </span>
                      </div>
                      <p className="text-sm text-warm-muted sm:max-w-md">
                        {item.endorsement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-0 border-t border-warm-gray/40 md:grid-cols-3">
                {data.swatches.map((s) => (
                  <div key={s.name} className="p-6 md:p-8">
                    <div className={`h-28 w-full rounded-xl ${s.className}`} aria-hidden />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {s.name}
                    </p>
                    <p className="mt-1 text-sm text-warm-muted">
                      适配不同家居风格，耐用易打理。
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-warm-muted">
              想了解更多？可查看{" "}
              <Link href="/support#faq" className="text-accent hover:underline">
                常见问题
              </Link>{" "}
              或{" "}
              <Link href="/support/contact" className="text-accent hover:underline">
                联系我们
              </Link>
              。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

