"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";

export default function ProjectsHeader() {
  const { lang } = useLanguage();

  const content = {
    de: {
      label: "Portfolio",
      title: "Projekte",
      description: "Eine Auswahl meiner Arbeiten - Dev & Prod Mode",
    },
    en: {
      label: "Portfolio",
      title: "Projects",
      description: "A selection of my work - Dev & Prod Mode",
    },
  };

  const { label, title, description } = content[lang];

  return (
    <div className="mb-16">
      <div
        className="text-xs uppercase tracking-[0.3em] font-mono mb-3"
        style={{ color: "var(--muted)", opacity: 0.6 }}
      >
        {label}
      </div>
      <h1
        className="text-4xl md:text-6xl font-bold mb-6"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h1>
      <p
        className="text-lg md:text-xl max-w-3xl"
        style={{ color: "var(--muted)" }}
      >
        {description}
      </p>
    </div>
  );
}
