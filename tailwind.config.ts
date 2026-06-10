import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
        },
        brandBlue: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
        },
        offWhite: "#F8F7F4",
        charcoal: "#1E293B",
        slate: "#64748B",
        accentGold: "#D4A853",
        success: "#059669",
        error: "#DC2626",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-satoshi)', 'Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
