// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config & { daisyui?: any } = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Define custom colors for your dark theme here for consistency
      colors: {
        "dark-bg-primary": "#1e1e2f", // Main application background
        "dark-bg-secondary": "#13131f", // Topbar and sidebar background
        "dark-card-primary": "#25253a", // Main content card background
        "dark-input-bg": "#1a1a2e", // Input field background
        "accent-blue": "#2563EB", // Primary accent blue (matches Tailwind's blue-600 closely)
        "accent-red": "#EF4444", // Primary accent red (matches Tailwind's red-500 closely)
        "text-primary": "#ededed", // Bright text, like main headings
        "text-secondary": "#e2e8f0", // General body text, slightly subdued
        "text-placeholder": "#9ca3af", // Placeholder text, less prominent
        "border-default": "#4b5563", // Default border color (matches Tailwind's gray-600 closely)
      },
      // Define a consistent font size scale
      fontSize: {
        display: "clamp(2.5rem, 6vw, 4rem)", // For very large titles, e.g., Welcome to FrameGenie
        "h1-responsive": "clamp(2rem, 5vw, 3rem)", // For main page headings (Social Share, Video Upload)
        "h2-responsive": "clamp(1.5rem, 4vw, 2rem)", // For section headings within pages
        "body-lg": "1.125rem", // 18px - For larger paragraphs
        "body-base": "1rem", // 16px - Standard body text
        "body-sm": "0.875rem", // 14px - Smaller text, like side menu items, input labels
        caption: "0.75rem", // 12px - Very small text, captions
      },
      // Define a consistent spacing scale
      spacing: {
        "layout-px": "1.5rem", // 24px - Consistent horizontal padding for main layout/header
        "layout-py": "1rem", // 16px - Consistent vertical padding for main layout/header
        "sidebar-width": "16rem", // 256px - Consistent width for the sidebar (w-64)
        "sidebar-p": "1rem", // 16px - Consistent padding for sidebar content
        "card-p": "2rem", // 32px - Consistent padding inside main content cards
        "section-gap-y": "2rem", // 32px - Consistent vertical gap between sections
        "button-px": "1rem", // 16px - Horizontal padding for most buttons
        "button-py": "0.5rem", // 8px - Vertical padding for most buttons
        "input-py": "0.5rem", // 8px - Vertical padding for inputs
        "input-px": "0.75rem", // 12px - Horizontal padding for inputs
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"], // Ensure DaisyUI uses the 'dark' theme
  },
};

export default config;
