"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="space-y-6 text-center">
        <div className="p-6 rounded-xl bg-base-100 text-base-content shadow-xl text-xl font-semibold">
          ✅ Dark mode confirmed working
        </div>

        <div className="space-x-4">
          <button
            className="btn btn-primary"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>

          <button
            className="btn btn-outline"
            onClick={() => setTheme("system")}
          >
            Reset to System ({systemTheme})
          </button>
        </div>

        <p className="text-sm opacity-60">
          Current Theme: <strong>{theme}</strong> — System:{" "}
          <strong>{systemTheme}</strong>
        </p>
      </div>
    </div>
  );
}
