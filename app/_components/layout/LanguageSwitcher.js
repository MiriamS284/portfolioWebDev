"use client";

import { useState } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
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
        LANGUAGE
      </div>

      {/* Options - nur bei Hover */}
      {isHovered && (
        <>
          {/* Separator Line */}
          <div
            className="w-[1px] h-6 animate-fadeIn"
            style={{ background: "var(--border)", opacity: 0.3 }}
          />

          {/* DEU - vertikal */}
          <button
            onClick={() => setLang("de")}
            className="group transition-opacity hover:opacity-100 animate-fadeIn"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: lang === "de" ? 1 : 0.4,
            }}
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: lang === "de" ? "var(--accent)" : "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.3em",
                fontSize: 11,
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              DEU
            </div>
          </button>

          {/* Separator Line */}
          <div
            className="w-[1px] h-6 animate-fadeIn"
            style={{ background: "var(--border)", opacity: 0.3 }}
          />

          {/* ENG - vertikal */}
          <button
            onClick={() => setLang("en")}
            className="group transition-opacity hover:opacity-100 animate-fadeIn"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: lang === "en" ? 1 : 0.4,
            }}
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: lang === "en" ? "var(--accent)" : "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.3em",
                fontSize: 11,
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              ENG
            </div>
          </button>
        </>
      )}
    </div>
  );
}
