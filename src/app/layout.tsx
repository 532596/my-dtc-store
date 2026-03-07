import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Standing Desk — 健康办公 · 空间优化 · 智能便捷",
  description:
    "智能升降桌：减少久坐风险、提升专注效率。家庭办公、亲子学习与多功能空间，Warm Home + Precise Tech。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen bg-warm-white font-sans antialiased text-foreground">
        <Header />
        {children}
        <NewsletterSection />
        <Footer />
      </body>
    </html>
  );
}
