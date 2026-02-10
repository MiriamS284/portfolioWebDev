"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

const content = {
  de: {
    intro: "Full-Stack Entwicklerin.",
    description:
      "Ich entwickle Web-Applikationen und SaaS-Lösungen. Frontend und Backend. Custom Software für Unternehmen.",
    tags: [
      "B2B SaaS",
      "Problemlöserin",
      "Agile Entwicklung",

      "Automatisierung",
    ],
    cta: "Projekte",
  },
  en: {
    intro: "Full-Stack Developer.",
    description:
      "Building web applications and SaaS solutions. Frontend and backend. Custom software for businesses.",
    tags: ["B2B SaaS", "Problem Solver", "Agile Development", "Automation"],
    cta: "Projects",
  },
};

export default function HeroShowcase() {
  const { lang } = useLanguage();
  const t = content[lang] || content.de;

  return (
    <section
      className="relative min-h-screen flex items-center px-6 pt-24 pb-16 lg:pt-12 lg:ml-[280px]"
      style={{
        background: "var(--bg)",
        zIndex: 1,
        isolation: "isolate",
      }}
    >
      <div className="max-w-2xl w-full">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          style={{ color: "var(--ink)" }}
        >
          {t.intro}
        </h1>

        <p
          className="text-xl md:text-2xl mb-12 leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {t.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          {t.tags.map((tag, index) => (
            <span
              key={`hero-tag-${index}`}
              className="text-xs font-mono px-3 py-1 rounded-full transition-opacity hover:opacity-100"
              style={{
                color: "var(--muted)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                opacity: 0.7,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link href="/projects" className="inline-flex items-center gap-2 group">
          <span
            className="text-sm font-medium uppercase tracking-wider transition-opacity group-hover:opacity-100"
            style={{
              color: "var(--accent)",
              opacity: 0.9,
              letterSpacing: "0.1em",
            }}
          >
            {t.cta}
          </span>
          <span
            className="transition-transform group-hover:translate-x-1"
            style={{ color: "var(--accent)" }}
          >
            →
          </span>
        </Link>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
          zIndex: -1,
        }}
      />
    </section>
  );
}
/*

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/_context/LanguageProvider";

const content = {
  de: {
    words: ["intuitive", "performante", "skalierbare"],
    headline: {
      before: "Ich entwickle",
      after: "Web-Applikationen.",
    },
    imageAlt: "Portrait: Miriam Sparbrod",
  },
  en: {
    words: ["intuitive", "performant", "scalable"],
    headline: {
      before: "I build",
      after: "web applications.",
    },
    imageAlt: "Portrait: Miriam Sparbrod",
  },
};

export default function HeroShowcase() {
  const { lang } = useLanguage();
  const t = content[lang] || content.de;
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setI((n) => (n + 1) % t.words.length),
      2200,
    );
    return () => clearInterval(timer);
  }, [t.words.length]);

  return (
    <section
      className="relative min-h-dvh overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black opacity-0 animate-[fadeOut_700ms_ease-out_1]" />

      <div className="absolute inset-0 md:inset-y-0 md:left-1/2 md:right-0">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/profil_3.jpeg"
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
                src="/profil_3.jpeg"
                alt={t.imageAlt}
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
            {t.headline.before}{" "}
            <span className="inline-block align-baseline relative">
              <span className="block h-[1em] overflow-hidden align-baseline">
                <span
                  key={i}
                  className="block text-transparent bg-clip-text will-change-transform"
                  style={{
                    backgroundImage: "var(--gradient-accent)",
                    animation: "wordIn .6s ease both",
                  }}
                  aria-live="polite"
                >
                  {t.words[i]}
                </span>
              </span>
            </span>{" "}
            {t.headline.after}
          </h1>
         
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


*/
