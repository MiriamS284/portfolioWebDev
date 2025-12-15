"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* Einzelne Option – außerhalb definiert (fix für static-components) */
function LanguageOption({
  code,
  label,
  active,
  hovered,
  onHover,
  onLeave,
  onFocus,
  onBlur,
  onClick,
}) {
  const isHover = hovered === code;
  const s1 = active || isHover ? 1 : 0.35; // obere Linie
  const s2 = active || isHover ? 1 : 0.2; // untere Linie

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active ? "true" : "false"}
      onMouseEnter={() => onHover(code)}
      onMouseLeave={onLeave}
      onFocus={() => onFocus(code)}
      onBlur={onBlur}
      onClick={() => onClick(code)}
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
      <span>{label}</span>

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
            willChange: "transform",
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
            willChange: "transform",
            opacity: 0.85,
          }}
        />
      </span>
    </button>
  );
}

export default function LanguageSwitcher({
  offsetTop = 160,
  initial = "de",
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const containerRef = useRef(null);

  // Lazy-Init statt setState im Effect (fix für react-hooks/set-state-in-effect)
  const initialLang = useMemo(() => {
    if (typeof window === "undefined") return initial;
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "de") return saved;
    } catch {}
    return initial;
  }, [initial]);

  const [lang, setLang] = useState(initialLang);

  // Persist + Callback
  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    onChange?.(lang);
  }, [lang, onChange]);

  // Outside click → schließen (optional)
  useEffect(() => {
    const onDoc = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc, { passive: true });
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-4 z-40 select-none"
      style={{ top: offsetTop }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Vertikaler Handle */}
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
            color: "var(--ink)",
            fontWeight: 600,
            textTransform: "uppercase",
            WebkitTextStroke:
              "0.35px color-mix(in oklch, var(--bg), transparent 40%)",
            display: "inline-block",
            transform: "rotate(90deg)",
            transformOrigin: "left top",
            fontSize: 11.5,
            letterSpacing: "0.5em",
          }}
        >
          L&nbsp;A&nbsp;N&nbsp;G&nbsp;U&nbsp;A&nbsp;G&nbsp;E
        </span>
      </button>

      {/* Popover: ENG | DEU */}
      {open && (
        <div
          role="menu"
          aria-label="Sprache auswählen"
          className="absolute left-10 top-2 flex items-center gap-4"
          style={{ color: "var(--ink)" }}
        >
          <LanguageOption
            code="en"
            label="E N G"
            active={lang === "en"}
            hovered={hover}
            onHover={setHover}
            onLeave={() => setHover(null)}
            onFocus={setHover}
            onBlur={() => setHover(null)}
            onClick={setLang}
          />
          <span
            aria-hidden
            style={{
              width: 18,
              height: 1,
              background: "color-mix(in oklch, var(--ink), transparent 70%)",
            }}
          />
          <LanguageOption
            code="de"
            label="D E U"
            active={lang === "de"}
            hovered={hover}
            onHover={setHover}
            onLeave={() => setHover(null)}
            onFocus={setHover}
            onBlur={() => setHover(null)}
            onClick={setLang}
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
