import type { Config } from "tailwindcss";

/**
 * 全站深色基调：纯黑/深灰 + 低饱和冷色微光点缀。
 * 参考苹果官网的克制层级与留白节奏。
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          white: "#080b10",
          cream: "#0d1219",
          gray: "#1b2430",
          stone: "#7e8a9a",
          muted: "#aab4c2",
          wood: "#2a3342",
        },
        foreground: "#f3f6fb",
        accent: {
          DEFAULT: "#8fa8c0",
          hover: "#a8bdd0",
          light: "#182331",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        body: ["1rem", { lineHeight: "1.7" }],
      },
      maxWidth: {
        content: "72rem",
      },
      spacing: {
        section: "7rem",
        "section-md": "9rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        /** 产品卖点：展开态入场（GPU translate + scale，避免 max-width 卡顿） */
        "pfs-pill-open": "pfsPillOpen 0.58s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, #6b92a3 0%, #5b6b7a 50%, #4a6578 100%)",
        "accent-gradient-hover":
          "linear-gradient(135deg, #5a8090 0%, #4a5568 100%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pfsPillOpen: {
          "0%": {
            opacity: "0.88",
            transform: "translate3d(0, 10px, 0) scale(0.985)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
