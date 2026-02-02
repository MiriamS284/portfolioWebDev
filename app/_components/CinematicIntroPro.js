"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export default function CinematicIntroPro({
  onDone,
  logoSrc = "/logo_side.png",
}) {
  const WORDS = useMemo(
    () => [
      // Foundation
      "HTML",
      "CSS",
      "JavaScript",
      // Backend Basics
      "PHP",
      "MySQL",
      // Modern Frontend
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      // Backend
      "Node.js",
      "Express",
      "REST APIs",
      // Databases
      "MongoDB",
      "PostgreSQL",
      "Sanity CMS",
      "Supabase",
      // Tools
      "Git",
      "GitHub",
      "Vercel",
    ],
    [],
  );

  // Lazy initialization - prüft EINMALIG beim ersten Render
  const [phase, setPhase] = useState(() => {
    if (typeof window === "undefined") return "words";
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    return mq.matches ? "done" : "words";
  });

  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(600);
  const [fadeOut, setFadeOut] = useState(false);
  const playedRef = useRef(false);

  // Skip callback wenn bereits done
  useEffect(() => {
    if (phase === "done" && !playedRef.current) {
      playedRef.current = true;
      onDone?.();
    }
  }, [phase, onDone]);

  // Phase 1: Words (beschleunigend!)
  useEffect(() => {
    if (phase !== "words") return;

    if (index >= WORDS.length - 1) {
      const toLogo = setTimeout(() => setPhase("logoIn"), 300);
      return () => clearTimeout(toLogo);
    }

    const t = setTimeout(() => {
      setIndex((n) => n + 1);
      setDelay((d) => Math.max(80, Math.floor(d * 0.85)));
    }, delay);

    return () => clearTimeout(t);
  }, [phase, index, delay, WORDS.length]);

  // Phase 2: Logo erscheint
  useEffect(() => {
    if (phase !== "logoIn") return;
    const t = setTimeout(() => setPhase("logoToCorner"), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase 3: Logo Boomerang
  useEffect(() => {
    if (phase !== "logoToCorner") return;
    const t = setTimeout(() => {
      setFadeOut(true);
      const t2 = setTimeout(() => {
        setPhase("done");
      }, 600);
      return () => clearTimeout(t2);
    }, 1400);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center text-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "oklch(0.13 0.03 250)",
      }}
    >
      {/* Skip Button */}
      <button
        type="button"
        onClick={() => {
          setFadeOut(true);
          setTimeout(() => {
            setPhase("done");
          }, 300);
        }}
        className="absolute right-6 top-6 rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-all hover:scale-105"
        style={{
          background: "color-mix(in oklch, var(--accent), transparent 80%)",
          border:
            "1px solid color-mix(in oklch, var(--accent), transparent 50%)",
        }}
      >
        Skip
      </button>

      {/* Phase 1: Words */}
      {phase === "words" && (
        <div className="text-center px-6 max-w-4xl">
          <span
            key={index}
            className="inline-block font-heading text-5xl md:text-7xl xl:text-9xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--accent-strong), var(--accent))",
              animation: "wordZoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
              letterSpacing: "-0.03em",
            }}
          >
            {WORDS[index]}
          </span>
        </div>
      )}

      {/* Phase 2: Logo Punch */}
      {phase === "logoIn" && (
        <div className="relative w-[420px] h-[420px] md:w-[520px] md:h-[520px]">
          <div
            className="absolute inset-0"
            style={{
              animation:
                "logoPunch 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            }}
          >
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

      {/* Phase 3: Logo Boomerang */}
      {phase === "logoToCorner" && (
        <div
          className="fixed"
          style={{
            left: 18,
            top: 18,
            width: 150,
            height: 150,
            animation:
              "logoBoomerang 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.4))",
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

      <style jsx>{`
        @keyframes wordZoom {
          0% {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(10px);
          }
          50% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes logoPunch {
          0% {
            opacity: 0;
            transform: scale(0.3);
            filter: blur(20px);
          }
          40% {
            opacity: 1;
            transform: scale(1.15);
            filter: blur(0);
          }
          60% {
            transform: scale(0.95);
          }
          80% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes logoBoomerang {
          0% {
            left: calc(50% - 260px);
            top: calc(50% - 260px);
            width: 520px;
            height: 520px;
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          35% {
            transform: scale(1.1) rotate(-3deg);
          }
          70% {
            left: -30px;
            top: -20px;
            width: 130px;
            height: 130px;
            opacity: 0.9;
            transform: scale(0.9) rotate(-8deg);
          }
          85% {
            left: 30px;
            top: 26px;
            width: 160px;
            height: 160px;
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            left: 18px;
            top: 18px;
            width: 150px;
            height: 150px;
            opacity: 0.95;
            transform: scale(1) rotate(0deg);
          }
        }

        @media (max-width: 768px) {
          @keyframes logoBoomerang {
            0% {
              left: calc(50% - 200px);
              top: calc(50% - 200px);
              width: 400px;
              height: 400px;
            }
            70% {
              left: -20px;
              top: -15px;
              width: 100px;
              height: 100px;
            }
            100% {
              left: 12px;
              top: 12px;
              width: 110px;
              height: 110px;
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
