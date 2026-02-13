"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export default function CinematicIntroPro({
  onDone,
  logoSrc = "/logo_light.png",
}) {
  const ACRONYMS = useMemo(
    () => [{ letters: ["M", "E", "R", "N"], label: "Stack" }],
    [],
  );

  const [phase, setPhase] = useState(() => {
    if (typeof window === "undefined") return "acronyms";
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    return mq.matches ? "done" : "acronyms";
  });

  const [acronymIndex, setAcronymIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [fadeOutText, setFadeOutText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const playedRef = useRef(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (phase === "done" && !playedRef.current) {
      playedRef.current = true;
      onDone?.();
    }
  }, [phase, onDone]);

  useEffect(() => {
    if (phase !== "acronyms") return;

    const currentAcronym = ACRONYMS[acronymIndex];
    if (!currentAcronym) {
      const toUnderline = setTimeout(() => setShowUnderline(true), 800);
      return () => clearTimeout(toUnderline);
    }

    if (letterIndex < currentAcronym.letters.length) {
      const t = setTimeout(() => {
        setLetterIndex((n) => n + 1);
      }, 200);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setAcronymIndex((n) => n + 1);
        setLetterIndex(0);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [phase, acronymIndex, letterIndex, ACRONYMS]);

  useEffect(() => {
    if (!showUnderline) return;

    const labelTimer = setTimeout(() => setShowLabel(true), 600);

    const fadeTimer = setTimeout(() => {
      setFadeOutText(true);
      setTimeout(() => setPhase("logoParticles"), 500);
    }, 2000);

    return () => {
      clearTimeout(labelTimer);
      clearTimeout(fadeTimer);
    };
  }, [showUnderline]);

  useEffect(() => {
    if (phase !== "logoParticles") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const size = Math.min(window.innerWidth * 0.8, 600);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const img = new window.Image();
    img.src = logoSrc;

    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = size;
      tempCanvas.height = size;
      tempCtx.drawImage(img, 0, 0, size, size);

      const imageData = tempCtx.getImageData(0, 0, size, size);
      const pixels = imageData.data;

      const particles = [];
      const spacing = 4;

      for (let y = 0; y < size; y += spacing) {
        for (let x = 0; x < size; x += spacing) {
          const i = (y * size + x) * 4;
          const alpha = pixels[i + 3];

          if (alpha > 128) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 300 + Math.random() * 200;

            particles.push({
              x: size / 2 + Math.cos(angle) * distance,
              y: size / 2 + Math.sin(angle) * distance,
              targetX: x,
              targetY: y,
              size: 1.5 + Math.random() * 1,
              delay: Math.random() * 30,
              speed: 0.08 + Math.random() * 0.04,
              r: pixels[i],
              g: pixels[i + 1],
              b: pixels[i + 2],
            });
          }
        }
      }

      particlesRef.current = particles;

      let frame = 0;
      const animate = () => {
        frame++;
        ctx.clearRect(0, 0, size, size);

        let allArrived = true;

        particles.forEach((p) => {
          if (frame < p.delay) {
            allArrived = false;
            return;
          }

          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 1) {
            p.x += dx * p.speed;
            p.y += dy * p.speed;
            allArrived = false;
          } else {
            p.x = p.targetX;
            p.y = p.targetY;
          }

          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, 0.9)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        if (!allArrived) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            setPhase("logoToCorner");
          }, 1000);
        }
      };

      animate();
    };

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [phase, logoSrc]);

  useEffect(() => {
    if (phase !== "logoToCorner") return;
    const t = setTimeout(() => {
      setFadeOut(true);
      const t2 = setTimeout(() => {
        setPhase("done");
      }, 800);
      return () => clearTimeout(t2);
    }, 1400);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  const currentAcronym = ACRONYMS[acronymIndex];

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center text-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "oklch(0.13 0.03 250)",
      }}
    >
      <button
        type="button"
        onClick={() => {
          setFadeOut(true);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          setTimeout(() => {
            setPhase("done");
          }, 300);
        }}
        className="absolute right-6 top-6 rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-all hover:scale-105 z-50"
        style={{
          background: "color-mix(in oklch, var(--accent), transparent 80%)",
          border:
            "1px solid color-mix(in oklch, var(--accent), transparent 50%)",
        }}
      >
        Skip
      </button>

      {(phase === "acronyms" || showUnderline) && !fadeOutText && (
        <div className="text-center px-6">
          <div className="flex items-center justify-center gap-3 md:gap-6">
            {currentAcronym &&
              currentAcronym.letters.map((letter, idx) => {
                const animations = [
                  "letterFlyIn",
                  "letterFlyIn2",
                  "letterFlyIn3",
                  "letterFlyIn4",
                ];
                const animationName = animations[idx % 4];

                return (
                  <span
                    key={idx}
                    className={`inline-block font-heading text-7xl md:text-9xl xl:text-[12rem] font-bold bg-clip-text text-transparent ${
                      idx < letterIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--accent-strong), var(--accent))",
                      animation:
                        idx < letterIndex
                          ? `${animationName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both ${
                              idx * 0.1
                            }s`
                          : "none",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
          </div>

          {showUnderline && (
            <div
              className="mx-auto mt-6 h-1 rounded-full"
              style={{
                width: "80%",
                maxWidth: "600px",
                background: "var(--accent)",
                animation: "underlineDraw 0.8s ease-out both",
              }}
            />
          )}

          {showLabel && (
            <div
              className="mt-6 text-2xl md:text-4xl font-heading opacity-70"
              style={{
                animation: "fadeIn 0.5s ease-out both",
              }}
            >
              Stack
            </div>
          )}
        </div>
      )}

      {fadeOutText && phase === "acronyms" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "oklch(0.13 0.03 250)",
            animation: "fadeIn 0.5s ease-out both",
          }}
        />
      )}

      {phase === "logoParticles" && (
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block"
            style={{
              filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.5))",
            }}
          />
        </div>
      )}

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
        @keyframes letterFlyIn {
          0% {
            opacity: 0;
            transform: translate(-100vw, -50vh) scale(0.3) rotate(45deg);
            filter: blur(20px);
          }
          60% {
            transform: translate(0, 0) scale(1.15) rotate(0deg);
            filter: blur(0);
          }
          80% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }

        @keyframes letterFlyIn2 {
          0% {
            opacity: 0;
            transform: translate(100vw, 50vh) scale(0.3) rotate(-45deg);
            filter: blur(20px);
          }
          60% {
            transform: translate(0, 0) scale(1.15) rotate(0deg);
            filter: blur(0);
          }
          80% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }

        @keyframes letterFlyIn3 {
          0% {
            opacity: 0;
            transform: translate(-100vw, 50vh) scale(0.3) rotate(135deg);
            filter: blur(20px);
          }
          60% {
            transform: translate(0, 0) scale(1.15) rotate(0deg);
            filter: blur(0);
          }
          80% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }

        @keyframes letterFlyIn4 {
          0% {
            opacity: 0;
            transform: translate(100vw, -50vh) scale(0.3) rotate(-135deg);
            filter: blur(20px);
          }
          60% {
            transform: translate(0, 0) scale(1.15) rotate(0deg);
            filter: blur(0);
          }
          80% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }

        @keyframes underlineDraw {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logoBoomerang {
          0% {
            left: 50%;
            top: 50%;
            width: 600px;
            height: 600px;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          35% {
            transform: translate(-50%, -50%) scale(1.1) rotate(-3deg);
          }
          70% {
            left: -30px;
            top: -20px;
            width: 130px;
            height: 130px;
            transform: translate(0, 0) scale(0.9) rotate(-8deg);
            opacity: 0.9;
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
              left: 50%;
              top: 50%;
              width: 400px;
              height: 400px;
              transform: translate(-50%, -50%);
            }
            70% {
              left: -20px;
              top: -15px;
              width: 100px;
              height: 100px;
              transform: translate(0, 0);
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
