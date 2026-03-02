"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MERNWriteIntro({
  onDone,
  logoSrc = "/logo_no_text.png",
}) {
  const [phase, setPhase] = useState("writing");
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
      setTimeout(() => setPhase("subtitle"), 2800),

      setTimeout(() => setPhase("dragonfly"), 3500),

      setTimeout(() => setPhase("flyToNav"), 5500),

      setTimeout(() => {
        setPhase("done");
        if (!hasCalledDone.current) {
          hasCalledDone.current = true;
          onDone?.();
        }
      }, 6800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onDone, prefersReducedMotion]);

  const handleSkip = () => {
    setPhase("done");
    if (!hasCalledDone.current) {
      hasCalledDone.current = true;
      onDone?.();
    }
  };

  if (prefersReducedMotion || phase === "done") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:opacity-80 z-50"
        style={{
          color: "var(--muted)",
          background: "transparent",
          border: "1px solid var(--border)",
        }}
      >
        Skip
      </button>

      <div
        className={`absolute transition-opacity duration-500 ${
          phase === "flyToNav" ? "opacity-0" : "opacity-100"
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

        <p
          className={`mern-subtitle text-center mt-8 text-sm md:text-base tracking-widest uppercase transition-opacity duration-400 ${
            phase === "writing" ? "opacity-0" : "opacity-60"
          }`}
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.3em",
          }}
        >
          Full Stack Developer
        </p>
      </div>

      <div
        className={`dragonfly-container ${
          phase === "dragonfly" ? "circling" : ""
        } ${phase === "flyToNav" ? "fly-to-nav" : ""}`}
        style={{
          opacity: phase === "dragonfly" || phase === "flyToNav" ? 1 : 0,
        }}
      >
        <Image
          src={logoSrc}
          alt="Dragonfly"
          width={120}
          height={120}
          priority
          className="dragonfly-image"
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,.4))",
          }}
        />
      </div>

      <style jsx>{`
        .mern-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawMERN 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes drawMERN {
          to {
            stroke-dashoffset: 0;
          }
        }

        .mern-subtitle {
          animation: fadeInSubtitle 0.6s ease-out 2.5s forwards;
        }

        @keyframes fadeInSubtitle {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 0.6;
            transform: translateY(0);
          }
        }

        .dragonfly-container {
          position: absolute;
          width: 90px;
          height: 90px;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .dragonfly-container :global(.dragonfly-image) {
          will-change: transform;
        }

        .dragonfly-container.circling {
          animation: circleAround 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .dragonfly-container.circling :global(.dragonfly-image) {
          animation: dragonflyFly 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes circleAround {
          0% {
            transform: translate(220px, -80px) scale(0.4);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          15% {
            transform: translate(160px, 40px) scale(0.8);
          }
          30% {
            transform: translate(40px, 90px) scale(1);
          }
          45% {
            transform: translate(-100px, 50px) scale(1);
          }
          60% {
            transform: translate(-160px, -30px) scale(1);
          }
          75% {
            transform: translate(-60px, -90px) scale(1);
          }
          88% {
            transform: translate(60px, -50px) scale(1);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes dragonflyFly {
          0% {
            transform: rotateY(0deg) rotateZ(-20deg) rotateX(10deg);
          }
          20% {
            transform: rotateY(90deg) rotateZ(15deg) rotateX(-5deg);
          }
          40% {
            transform: rotateY(180deg) rotateZ(-10deg) rotateX(8deg);
          }
          60% {
            transform: rotateY(270deg) rotateZ(12deg) rotateX(-3deg);
          }
          80% {
            transform: rotateY(360deg) rotateZ(-8deg) rotateX(5deg);
          }
          100% {
            transform: rotateY(360deg) rotateZ(0deg) rotateX(0deg);
          }
        }

        .dragonfly-container.fly-to-nav {
          animation: flyToNavPosition 1.3s cubic-bezier(0.34, 1.2, 0.64, 1)
            forwards;
        }

        .dragonfly-container.fly-to-nav :global(.dragonfly-image) {
          animation: dragonflySettle 1.3s cubic-bezier(0.34, 1.2, 0.64, 1)
            forwards;
        }

        @keyframes flyToNavPosition {
          0% {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            width: 90px;
            height: 90px;
          }
          50% {
            top: 25%;
            left: 20%;
            transform: translate(0, 0) scale(1.05);
            width: 120px;
            height: 120px;
          }
          100% {
            top: 24px;
            left: 24px;
            transform: translate(0, 0) scale(1);
            width: 160px;
            height: 160px;
          }
        }

        @keyframes dragonflySettle {
          0% {
            transform: rotateY(0deg) rotateZ(0deg);
          }
          40% {
            transform: rotateY(-20deg) rotateZ(-8deg);
          }
          70% {
            transform: rotateY(10deg) rotateZ(4deg);
          }
          100% {
            transform: rotateY(0deg) rotateZ(0deg);
          }
        }

        @media (max-width: 1024px) {
          .dragonfly-container {
            width: 60px;
            height: 60px;
          }

          @keyframes circleAround {
            0% {
              transform: translate(150px, -60px) scale(0.4);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            15% {
              transform: translate(100px, 30px) scale(0.8);
            }
            30% {
              transform: translate(20px, 60px) scale(1);
            }
            45% {
              transform: translate(-60px, 35px) scale(1);
            }
            60% {
              transform: translate(-100px, -20px) scale(1);
            }
            75% {
              transform: translate(-40px, -60px) scale(1);
            }
            88% {
              transform: translate(40px, -35px) scale(1);
            }
            100% {
              transform: translate(0, 0) scale(1);
            }
          }

          @keyframes flyToNavPosition {
            0% {
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) scale(1);
              width: 60px;
              height: 60px;
            }
            100% {
              top: 12px;
              left: 16px;
              transform: translate(0, 0) scale(1);
              width: 48px;
              height: 48px;
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mern-path,
          .mern-subtitle,
          .dragonfly-container.circling,
          .dragonfly-container.circling :global(.dragonfly-image),
          .dragonfly-container.fly-to-nav,
          .dragonfly-container.fly-to-nav :global(.dragonfly-image) {
            animation: none !important;
          }
          .mern-path {
            stroke-dashoffset: 0;
          }
          .mern-subtitle {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
