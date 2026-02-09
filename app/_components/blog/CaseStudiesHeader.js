"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";

export default function CaseStudiesHeader() {
  const { lang } = useLanguage();

  const content = {
    de: {
      label: "Einblicke",
      title: "Case Studies",
      description:
        "Detaillierte Einblicke in Projekte, Prozesse und Lösungen.",
    },
    en: {
      label: "Insights",
      title: "Case Studies",
      description:
        "Detailed insights into projects, processes, and solutions.",
    },
  };

  const { label, title, description } = content[lang];

  return (
    <div className="max-w-2xl mx-auto text-center mb-16 pt-32 md:pt-40">
      <div
        className="text-xs uppercase tracking-[0.3em] font-mono mb-3"
        style={{ color: "var(--muted)", opacity: 0.6 }}
      >
        {label}
      </div>
      <h1
        className="text-4xl md:text-5xl font-bold mb-6"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h1>
      <p
        className="text-lg md:text-xl"
        style={{ color: "var(--muted)" }}
      >
        {description}
      </p>
    </div>
  );
}
