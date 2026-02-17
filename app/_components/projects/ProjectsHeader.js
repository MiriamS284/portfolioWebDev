"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";

export default function ProjectsHeader() {
  const { lang } = useLanguage();

  const content = {
    de: {
      title: "Projekte",
      description: "Eine Auswahl meiner Arbeiten",
    },
    en: {
      title: "Projects",
      description: "A selection of my work",
    },
  };

  const { title, description } = content[lang];

  return (
    <header className="mb-12">
      <h1
        className="text-2xl font-semibold mb-2"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h1>
      <p className="text-base" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    </header>
  );
}
