"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-secondary hover:bg-primary transition"
    >
      {theme === "dark" ? <Sun className="w-5 h-5 text-dark-400" /> : <Moon className="w-5 h-5 text-white-600" />}
    </button>
  );
}
