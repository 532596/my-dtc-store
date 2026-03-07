import type { Config } from "tailwindcss";

/**
 * project-strategy.md：浅灰、米白、柔和木色、低饱和科技色点缀；
 * 参考苹果官网：层级清晰、留白充足、克制动效。
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
          white: "#faf9f7",
          cream: "#f5f3ef",
          gray: "#e8e6e2",
          stone: "#9c9892",
          muted: "#6b6560",
          wood: "#c4b8a8",
        },
        foreground: "#2c2926",
        accent: {
          DEFAULT: "#5b6b7a",
          hover: "#4a5568",
          light: "#e8ebee",
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
      },
    },
  },
  plugins: [],
};

export default config;
