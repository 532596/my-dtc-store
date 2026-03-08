import type { Metadata } from "next";
import RegionsContent from "./RegionsContent";

export const metadata: Metadata = {
  title: "选择国家/地区 | Regions",
  description: "选择您的配送国家或地区，用于配送与价格展示。",
};

export default function RegionsPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <RegionsContent />
    </main>
  );
}
