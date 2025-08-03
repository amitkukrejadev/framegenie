import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
    customThemes?: Record<string, Record<string, string>>;
  };
}

const config: ExtendedConfig = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-mid-tone": "#33334d", // Lighter dark tone, not too dark
        "dark-bg-secondary": "#2d2d44", // Slightly lighter hover background
        "dark-card-primary": "#25253a", // Darker grey for dropdown
        "dark-input-bg": "#1a1a2e",
        "accent-blue": "#2563EB",
        "accent-red": "#EF4444",
        "text-primary": "#d1d1d1", // Slightly darker than #ededed for better contrast
        "text-secondary": "#b0b0c0", // Darker grey for text, replacing white vibe
        "text-placeholder": "#9ca3af",
        "border-default": "#4b5563",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],
    base: true,
    styled: true,
    utils: true,
    logs: false,
    darkTheme: "dark",
    customThemes: {
      dark: {
        primary: "#2563EB",
        secondary: "#33334d", // Matches dark-mid-tone
        accent: "#EF4444",
        neutral: "#25253a",
        "base-100": "#2d2d44",
        info: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
    },
  },
};

export default config;
