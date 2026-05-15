import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef6f0",
          100: "#d8eadc",
          500: "#2f6e4f",
          700: "#1e4e39",
          900: "#123225"
        },
        sand: "#d8c49a",
        clay: "#a96748",
        ink: "#1f2628"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(31, 38, 40, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
