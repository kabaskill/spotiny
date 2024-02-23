import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Add your custom colors here
        primary: "#dfdfe2",
        secondary: "#ffffff",
        appbackground: "#4d4d62",
        background: "#1b1b32",
        foreground: "#3b3b4f",
        highlight: "#f1be32",

      },
    },
  },
  plugins: [],
};
export default config;
