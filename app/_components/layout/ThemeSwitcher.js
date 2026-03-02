"use client";

import { useState } from "react";
import { useTheme } from "@/app/_context/ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label - immer sichtbar */}
      <div
        className="cursor-pointer"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          color: "var(--ink)",
          fontWeight: 700,
          letterSpacing: "0.5em",
          fontSize: 11,
          textTransform: "uppercase",
          opacity: 0.9,
        }}
      >
        THEME
      </div>

      {/* Options - nur bei Hover */}
      {isHovered && (
        <>
          {/* Separator Line */}
          <div
            className="w-[1px] h-6 animate-fadeIn"
            style={{ background: "var(--border)", opacity: 0.3 }}
          />

          {/* DARK - vertikal */}
          <button
            onClick={() => setTheme("dark")}
            className="group transition-opacity hover:opacity-100 animate-fadeIn"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: theme === "dark" ? 1 : 0.4,
            }}
            aria-label="Dark mode"
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: theme === "dark" ? "var(--accent)" : "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.3em",
                fontSize: 11,
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              DARK
            </div>
          </button>

          {/* Separator Line */}
          <div
            className="w-[1px] h-6 animate-fadeIn"
            style={{ background: "var(--border)", opacity: 0.3 }}
          />

          {/* LIGHT - vertikal */}
          <button
            onClick={() => setTheme("light")}
            className="group transition-opacity hover:opacity-100 animate-fadeIn"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: theme === "light" ? 1 : 0.4,
            }}
            aria-label="Light mode"
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: theme === "light" ? "var(--accent)" : "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.3em",
                fontSize: 11,
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              LIGHT
            </div>
          </button>
        </>
      )}
    </div>
  );
}

// Mobile version for OverlayMenu
export function MobileThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("dark")}
        className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
        style={{
          background: theme === "dark" ? "var(--accent)" : "transparent",
          color: theme === "dark" ? "var(--bg)" : "var(--ink)",
          opacity: theme === "dark" ? 1 : 0.5,
          border: theme === "dark" ? "none" : "1px solid var(--border)",
        }}
        aria-label="Dark mode"
      >
        DARK
      </button>
      <button
        onClick={() => setTheme("light")}
        className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
        style={{
          background: theme === "light" ? "var(--accent)" : "transparent",
          color: theme === "light" ? "var(--bg)" : "var(--ink)",
          opacity: theme === "light" ? 1 : 0.5,
          border: theme === "light" ? "none" : "1px solid var(--border)",
        }}
        aria-label="Light mode"
      >
        LIGHT
      </button>
    </div>
  );
}
