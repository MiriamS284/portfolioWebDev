"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";

export default function CaseStudiesHeader() {
  const { lang } = useLanguage();

  const content = {
    de: {
      title: "Case Studies",
      description: "Einblicke in Projekte, Prozesse und Lösungen.",
    },
    en: {
      title: "Case Studies",
      description: "Insights into projects, processes, and solutions.",
    },
  };

  const { title, description } = content[lang];

  return (
    <header className="mb-16">
      <h1 className="text-2xl font-semibold mb-3">{title}</h1>
      <p className="text-base" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    </header>
  );
}
