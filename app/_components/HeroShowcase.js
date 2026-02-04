"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const WORDS = ["intuitive", "performante", "skalierbare"];

export default function HeroShowcase() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative min-h-dvh overflow-hidden"
      style={{ background: "oklch(0.13 0.03 250)", color: "var(--ink)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black opacity-0 animate-[fadeOut_700ms_ease-out_1]" />

      <div className="absolute inset-0 md:inset-y-0 md:left-1/2 md:right-0">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/portfolio_1.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover blur-xl opacity-60"
            aria-hidden
            style={{ objectPosition: "60% 18%" }}
          />

          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-full w-[min(92%,700px)]">
              <Image
                src="/portfolio_1.jpg"
                alt="Portrait: Miriam Sparbrod"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain will-change-transform"
                style={{
                  objectPosition: "60% 18%",
                  transform: "scale(0.78)",
                  transformOrigin: "60% 20%",
                }}
              />
            </div>
          </div>

          <div
            aria-hidden
            className="hidden md:block absolute inset-y-0 left-0 w-28"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.0), rgba(0,0,0,0.35), rgba(0,0,0,0.65))",
              mixBlendMode: "multiply",
            }}
          />

          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(120% 120% at 80% 50%, rgba(0,0,0,.25) 0%, rgba(0,0,0,0) 58%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20 h-dvh grid">
        <div className="place-self-center md:place-self-start md:self-center w-full md:max-w-[42ch]">
          <h1
            className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05]"
            style={{
              textShadow:
                "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
            }}
          >
            Ich entwickle{" "}
            <span className="inline-block align-baseline relative">
              <span className="block h-[1em] overflow-hidden align-baseline">
                <span
                  key={i}
                  className="block text-transparent bg-clip-text will-change-transform"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--accent-strong), var(--accent))",
                    animation: "wordIn .6s ease both",
                  }}
                  aria-live="polite"
                >
                  {WORDS[i]}
                </span>
              </span>
            </span>{" "}
            Web-Applikationen.
          </h1>
          {/* CTA Buttons 
          <div className="mt-8 flex gap-3 flex-wrap">
            <a
              href="#work"
              className="rounded-2xl px-5 py-3 text-sm font-medium transition will-change-transform"
              style={{
                color: "var(--ink)",
                background:
                  "color-mix(in oklch, var(--accent), transparent 85%)",
                boxShadow:
                  "inset 0 0 0 1px color-mix(in oklch, var(--accent), transparent 60%)",
              }}
            >
              Arbeiten ansehen
            </a>
            <a
              href="/contact"
              className="rounded-2xl px-5 py-3 text-sm font-medium ring-1 transition"
              style={{
                color: "var(--ink)",
                boxShadow:
                  "inset 0 0 0 1px color-mix(in oklch, var(--ink), transparent 85%)",
              }}
            >
              Kontakt
            </a>
          </div>
          */}
        </div>
      </div>

      <div
        aria-hidden
        className="md:hidden absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0))",
        }}
      />

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: "var(--surface)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      <style>{`
        @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes wordIn { from{opacity:0; transform: translateY(.4em)} to{opacity:1; transform:translateY(0)} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
      `}</style>
    </section>
  );
}
