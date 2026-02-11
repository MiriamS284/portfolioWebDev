"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

const labels = {
  de: {
    projects: "Projekte",
    "case-studies": "Case Studies",
    garden: "Digital Garden",
    snippets: "Code Snippets",
  },
  en: {
    projects: "Projects",
    "case-studies": "Case Studies",
    garden: "Digital Garden",
    snippets: "Code Snippets",
  },
};

export default function Breadcrumb({ section, title }) {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.de;
  const sectionLabel = t[section] || section;

  return (
    <div
      className="mb-12 flex items-center gap-2 text-sm font-mono"
      style={{ color: "var(--muted)" }}
    >
      <Link
        href={`/${section}`}
        className="hover:opacity-100 transition-opacity opacity-60"
      >
        {sectionLabel}
      </Link>
      <span className="opacity-40">/</span>
      <span className="opacity-60">{title}</span>
    </div>
  );
}
