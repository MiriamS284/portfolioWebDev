"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MERNWriteIntro({ onDone, logoSrc = "/logo_side.png" }) {
  const [phase, setPhase] = useState("writing");
  const [skipVisible, setSkipVisible] = useState(true);
  const logoRef = useRef(null);
  const hasCalledDone = useRef(false);

  const [prefersReducedMotion] = useState(() => getPrefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion) {
      if (!hasCalledDone.current) {
        hasCalledDone.current = true;
        onDone?.();
      }
      return;
    }

    const timers = [
      setTimeout(() => setPhase("logoFadeIn"), 4000),

      setTimeout(() => setPhase("logoToCorner"), 5000),

      setTimeout(() => {
        setPhase("done");
        if (!hasCalledDone.current) {
          hasCalledDone.current = true;
          onDone?.();
        }
      }, 6500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onDone, prefersReducedMotion]);

  const handleSkip = () => {
    setPhase("done");
    onDone?.();
  };

  if (prefersReducedMotion || phase === "done") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Skip Button */}
      {skipVisible && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:opacity-80"
          style={{
            color: "var(--muted)",
            background: "transparent",
            border: "1px solid var(--border)",
          }}
        >
          Skip
        </button>
      )}

      {/* MERN Writing Animation */}
      <div
        className={`absolute transition-opacity duration-700 ${
          phase === "writing" ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 500 120"
          className="w-full max-w-[90vw] md:max-w-[500px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="mernGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-strong, #a855f7)" />
              <stop offset="100%" stopColor="var(--accent, #8b5cf6)" />
            </linearGradient>
          </defs>

          <path
            className="mern-path"
            pathLength="1"
            fill="none"
            stroke="url(#mernGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="
              M 20,100
              L 20,20
              L 55,80
              L 90,20
              L 90,100

              M 110,100
              L 110,20
              L 160,20
              M 110,60
              L 150,60
              M 110,100
              L 160,100

              M 180,100
              L 180,20
              L 230,20
              Q 250,20 250,40
              Q 250,60 230,60
              L 180,60
              L 250,100

              M 270,100
              L 270,20
              L 350,100
              L 350,20
            "
          />
        </svg>

        {/* Subtitle that appears after text */}
        <p
          className="mern-subtitle text-center mt-8 text-sm md:text-base tracking-widest uppercase"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.3em",
          }}
        >
          Full Stack Developer
        </p>
      </div>

      {/* Logo - fades in center, then moves to corner */}
      <div
        ref={logoRef}
        className={`absolute transition-all duration-1000 ease-out ${
          phase === "logoFadeIn"
            ? "opacity-100 scale-100"
            : phase === "logoToCorner"
              ? "opacity-100 scale-50"
              : "opacity-0 scale-75"
        }`}
        style={{
          ...(phase === "logoToCorner"
            ? {
                top: "24px",
                left: "16px",
                transform: "translate(0, 0) scale(0.5)",
              }
            : {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }),
        }}
      >
        <Image
          src={logoSrc}
          alt="Logo"
          width={200}
          height={200}
          priority
          className="w-32 h-32 md:w-48 md:h-48"
          style={{ objectFit: "contain" }}
        />
      </div>

      <style jsx>{`
        .mern-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawMERN 3.5s cubic-bezier(0.445, 0.05, 0.55, 0.95)
            forwards;
        }

        @keyframes drawMERN {
          to {
            stroke-dashoffset: 0;
          }
        }

        .mern-subtitle {
          opacity: 0;
          animation: fadeInSubtitle 0.8s ease-out 3.2s forwards;
        }

        @keyframes fadeInSubtitle {
          to {
            opacity: 0.6;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mern-path {
            animation: none;
            stroke-dashoffset: 0;
          }
          .mern-subtitle {
            animation: none;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
