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
        background: "#151514",
        secondary: "#2b2926",
        accent: "#eb5e28",
        text: "#fffcf2",
      },
    },
  },
  plugins: [],
};
export default config;
