// tailwind.config.ts
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

// Extend the Tailwind config to accept DaisyUI
interface ExtendedConfig extends Config {
  daisyui?: {
    themes?: string[] | boolean;
    styled?: boolean;
    base?: boolean;
    utils?: boolean;
    logs?: boolean;
    rtl?: boolean;
    prefix?: string;
    darkTheme?: string;
  };
}

const config: ExtendedConfig = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Kept for Tailwind compatibility, though DaisyUI handles it
  theme: {
    extend: {
      colors: {
        "dark-bg-primary": "#1e1e2f",
        "dark-bg-secondary": "#13131f",
        "dark-card-primary": "#25253a",
        "dark-input-bg": "#1a1a2e",
        "accent-blue": "#2563EB",
        "accent-red": "#EF4444",
        "text-primary": "#ededed",
        "text-secondary": "#e2e8f0",
        "text-placeholder": "#9ca3af",
        "border-default": "#4b5563",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"], // Only dark theme as the default
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};

export default config;
