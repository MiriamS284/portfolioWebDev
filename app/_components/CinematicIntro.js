"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CinematicIntroPro({
  onDone,
  onDock,
  logoSrc = "/logo_side.png",
}) {
  const WORDS = useMemo(
    () => [
      // Core
      "TypeScript",
      "JavaScript",
      "HTML & CSS",
      // Frontend
      "React",
      "Next.js",
      "Design Systems",
      "A11y",
      "i18n",
      "SEO",
      "Performance",
      "PWA",
      "MDX",
      // Next.js / Modern
      "SSR",
      "ISR",
      "RSC",
      "Server Actions",
      "Edge",
      // Backend / APIs
      "Node.js",
      "REST",
      "GraphQL",
      "tRPC",
      "WebSockets",
      "Auth (OAuth/JWT/Sessions)",
      "RBAC",
      // Data
      "PostgreSQL",
      "Prisma / ORM",
      "Migrations",
      "Caching (Redis)",
      // DevOps / Delivery
      "Docker",
      "CI/CD",
      "Cloud Deployment",
      "Analytics",
      "Monitoring (Sentry)",
      // CMS
      "Headless CMS",
      "Custom CMS",
      // Optional / Nice-to-have
      "WebGL / Three",
      "App-Entwicklung",
    ],
    []
  );

  const [phase, setPhase] = useState("words");
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(900);
  const [fadeOut, setFadeOut] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      const id = setTimeout(() => {
        playedRef.current = true;
        setPhase("done");
        onDone?.();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [onDone]);

  useEffect(() => {
    if (phase !== "words") return;
    if (index >= WORDS.length - 1) {
      const toLogo = setTimeout(() => setPhase("logoIn"), 0);
      return () => clearTimeout(toLogo);
    }
    const t = setTimeout(() => {
      setIndex((n) => n + 1);
      setDelay((d) => Math.max(140, Math.floor(d * 0.85)));
    }, delay);
    return () => clearTimeout(t);
  }, [phase, index, delay, WORDS.length]);

  useEffect(() => {
    if (phase !== "logoIn") return;
    const t = setTimeout(() => setPhase("logoToCorner"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "logoToCorner") return;
    const t = setTimeout(() => {
      setFadeOut(true);
      const t2 = setTimeout(() => {
        if (!playedRef.current) {
          playedRef.current = true;
          setPhase("done");
          onDone?.();
        }
      }, 480);
      return () => clearTimeout(t2);
    }, 900);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[70] grid place-items-center text-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        "--bg": "oklch(0.13 0.03 250)",

        "--accent": "oklch(0.73 0.12 60)",
        "--accent-strong": "oklch(0.68 0.16 55)",
        background: "var(--bg)",
      }}
      aria-live="polite"
    >
      {/* Skip */}
      <button
        type="button"
        onClick={() => {
          setFadeOut(true);
          const id = setTimeout(() => {
            setPhase("done");
            onDone?.();
          }, 200);
          return () => clearTimeout(id);
        }}
        className="absolute right-5 top-5 rounded-full px-3 py-1 text-xs uppercase tracking-wider ring-1 hover:bg-white/10"
        style={{
          color: "var(--ink, #fff)",
          borderColor: "transparent",
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklch, var(--accent, #7ad0ff), transparent 70%)",
        }}
      >
        Überspringen
      </button>
      {phase === "words" && (
        <div className="text-center px-6">
          <div className="mt-6">
            <span
              key={index}
              className="inline-block text-4xl md:text-6xl xl:text-7xl font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--accent-strong, #7aa7ff), var(--accent, #7ad0ff))",
                animation: "wordFadeZoom .48s cubic-bezier(.2,.8,0,1) both",
              }}
            >
              {WORDS[index]}
            </span>
          </div>
        </div>
      )}
      {phase === "logoIn" && (
        <div className="relative w-[420px] h-[420px] md:w-[480px] md:h-[480px]">
          <div className="absolute inset-0 animate-[logoRipple_1100ms_cubic-bezier(.2,.8,0,1)_both]">
            <Image
              src={logoSrc}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {phase === "logoToCorner" && (
        <div
          className="fixed z-[71]"
          style={{
            left: 18,
            top: 18,
            width: 150,
            height: 150,
            animation:
              "logoBoomerangToCorner 1200ms cubic-bezier(.2,.8,0,1) both",
            filter:
              "drop-shadow(0 12px 30px color-mix(in oklch, var(--accent, #d7a96b), transparent 70%))",
          }}
          onAnimationEnd={() => {
            onDock?.();
            setTimeout(() => {
              setPhase("done");
              onDone?.();
            }, 150);
          }}
        >
          <Image
            src={logoSrc}
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      <style>{`
  /* Wort-Animation: volle Lesbarkeit – kein Clipping */
  @keyframes wordFadeZoom {
    0%   { opacity: 0; transform: scale(.96); filter: blur(6px) }
    60%  { opacity: 1; filter: blur(0) }
    100% { opacity: 1; transform: scale(1) }
  }

  /* Wellenartiger Punch: scale schwingt leicht */
  @keyframes logoRipple {
    0%   { opacity: 0; transform: scale(.88); filter: blur(8px) }
    30%  { opacity: 1; transform: scale(1.18); filter: blur(1px) }
    55%  { transform: scale(0.98) }
    78%  { transform: scale(1.08) }
    100% { transform: scale(1.00); filter: blur(0) }
  }

  /* Boomerang: groß → über Ecke hinaus → zurückschwingen → andocken */
  @keyframes logoBoomerangToCorner {
    /* Start: zentriert & groß */
    0% {
      left: calc(50% - 150px);
      top: calc(50% - 150px);
      width: 300px;
      height: 300px;
      opacity: 1;
      transform: translate3d(0,0,0) scale(1) rotate(0.001deg);
      filter: blur(0);
    }
    /* Boost: leicht größer + minimaler Drift */
    28% {
      transform: translate3d(-10px, -6px, 0) scale(1.28) rotate(0.001deg);
    }
    /* Overshoot: knapp an der Ecke vorbei */
    72% {
      left: -20px;
      top: -12px;
      width: 140px;
      height: 140px;
      opacity: .92;
      transform: translate3d(0,0,0) scale(0.92) rotate(-1.2deg);
      filter: blur(.2px);
    }
    /* Rückfederung: hinter Ziel */
    88% {
      left: 24px;
      top: 20px;
      width: 152px;
      height: 152px;
      transform: translate3d(0,0,0) scale(1.02) rotate(0.2deg);
      opacity: .9;
    }
    /* Endzustand: exakt angedockt */
    100% {
      left: 18px;
      top: 18px;
      width: 150px;
      height: 150px;
      opacity: .88;
      transform: translate3d(0,0,0) scale(1) rotate(0deg);
      filter: blur(.15px);
    }
  }

  /* Mobile Feinabstimmung */
 @media (max-width: 480px) {
  @keyframes logoBoomerangToCorner {
    0%   { left: calc(50% - 180px); top: calc(50% - 180px); width: 360px; height: 360px; }
    70%  { left: -18px; top: -12px; width: 116px; height: 116px; }
    88%  { left: 14px; top: 12px; width: 112px; height: 112px; }
    100% { left: 12px; top: 12px; width: 110px; height: 110px; }
  }
  }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important }
  }
`}</style>
    </div>
  );
}
