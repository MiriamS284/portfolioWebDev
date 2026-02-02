"use client";

import { useState } from "react";

// Schlanke Option ohne Hooks im Inneren (vermeidet static-components Lint)
function LangOption({
  code,
  label,
  active,
  hovered,
  onHover,
  onLeave,
  onSelect,
}) {
  const s1 = active || hovered ? 1 : 0.35; // obere Linie
  const s2 = active || hovered ? 1 : 0.2; // untere Linie

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active ? "true" : "false"}
      onMouseEnter={() => onHover(code)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(code)}
      onBlur={onLeave}
      onClick={() => onSelect(code)}
      className="relative px-1 py-1"
      style={{
        color: "var(--ink)",
        fontWeight: 600,
        textTransform: "uppercase",
        WebkitTextStroke:
          "0.35px color-mix(in oklch, var(--bg), transparent 40%)",
        fontSize: 12,
        letterSpacing: "0.35em",
        transition: "opacity .18s ease",
        opacity: active ? 1 : 0.9,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <span
        aria-hidden
        className="absolute left-0 right-0"
        style={{ bottom: -6, height: 10 }}
      >
        <span
          style={{
            display: "block",
            width: "100%",
            height: 2,
            background: "color-mix(in oklch, var(--ink), transparent 60%)",
            transform: `scaleX(${s1})`,
            transformOrigin: "left center",
            transition: "transform 220ms cubic-bezier(.2,.7,0,1)",
            opacity: 0.95,
          }}
        />
        <span style={{ display: "block", height: 6 }} />
        <span
          style={{
            display: "block",
            width: "66%",
            height: 2,
            background: "color-mix(in oklch, var(--ink), transparent 72%)",
            transform: `scaleX(${s2})`,
            transformOrigin: "left center",
            transition: "transform 260ms cubic-bezier(.2,.7,0,1)",
            opacity: 0.85,
          }}
        />
      </span>
    </button>
  );
}

export default function LanguageSwitcher({ value = "de", onChange }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);

  return (
    <div
      className="relative mt-4"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Vertikal „LANGUAGE“ */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="cursor-pointer"
        style={{ background: "transparent" }}
      >
        <span
          style={{
            display: "inline-block",
            transform: "rotate(90deg)",
            transformOrigin: "left top",
            color: "var(--ink)",
            fontWeight: 600,
            textTransform: "uppercase",
            WebkitTextStroke:
              "0.35px color-mix(in oklch, var(--bg), transparent 40%)",
            fontSize: 11.5,
            letterSpacing: "0.5em",
          }}
        >
          L&nbsp;A&nbsp;N&nbsp;G&nbsp;U&nbsp;A&nbsp;G&nbsp;E
        </span>
      </button>

      {/* Rechts daneben: ENG | DEU */}
      {open && (
        <div
          role="menu"
          aria-label="Sprache auswählen"
          className="absolute top-1 left-[72px] flex items-center gap-4"
          style={{ color: "var(--ink)" }}
        >
          <LangOption
            code="en"
            label="E&nbsp;N&nbsp;G"
            active={value === "en"}
            hovered={hover === "en"}
            onHover={setHover}
            onLeave={() => setHover(null)}
            onSelect={onChange}
          />
          <span
            aria-hidden
            style={{
              width: 18,
              height: 1,
              background: "color-mix(in oklch, var(--ink), transparent 70%)",
            }}
          />
          <LangOption
            code="de"
            label="D&nbsp;E&nbsp;U"
            active={value === "de"}
            hovered={hover === "de"}
            onHover={setHover}
            onLeave={() => setHover(null)}
            onSelect={onChange}
          />
        </div>
      )}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important }
        }
      `}</style>
    </div>
  );
}
