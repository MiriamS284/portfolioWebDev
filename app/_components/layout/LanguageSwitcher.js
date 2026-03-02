"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

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
            onClick={() => switchLocale("de")}
            className="group transition-opacity hover:opacity-100 animate-fadeIn"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: locale === "de" ? 1 : 0.4,
            }}
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: locale === "de" ? "var(--accent)" : "var(--ink)",
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
            onClick={() => switchLocale("en")}
            className="group transition-opacity hover:opacity-100 animate-fadeIn"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: locale === "en" ? 1 : 0.4,
            }}
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: locale === "en" ? "var(--accent)" : "var(--ink)",
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
