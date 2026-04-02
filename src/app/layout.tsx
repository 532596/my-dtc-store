import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import FloatingActionButton from "@/components/FloatingActionButton";
import ProductIntroDeepDive from "@/components/ProductIntroDeepDive";
import { UserCountryProvider } from "@/contexts/UserCountryContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowShift — AI-Native Flow Workstation",
  description:
    "FlowShift 智能工作站：深色沉浸、无感升降、AI 工作流协同。减少认知负荷，守护深度专注。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen bg-warm-white font-sans antialiased text-foreground">
        <UserCountryProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <ProductIntroDeepDive />
              <NewsletterSection />
              <Footer />
              <FloatingActionButton />
            </CartProvider>
          </AuthProvider>
        </UserCountryProvider>
      </body>
    </html>
  );
}
