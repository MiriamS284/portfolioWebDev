"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function ProjectNav({ prevProject, nextProject }) {
  const { lang } = useLanguage();

  if (!prevProject && !nextProject) return null;

  const texts = {
    de: { prev: "Vorheriges", next: "Nächstes" },
    en: { prev: "Previous", next: "Next" },
  };

  const t = texts[lang] || texts.de;

  return (
    <section
      className="py-12"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex justify-between items-center">
          {/* Previous */}
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug.current}`}
              className="group"
            >
              <span
                className="text-xs block mb-1"
                style={{ color: "var(--muted)", opacity: 0.6 }}
              >
                ← {t.prev}
              </span>
              <span
                className="text-sm group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--ink)" }}
              >
                {prevProject.title?.[lang] || prevProject.title?.de}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug.current}`}
              className="group text-right"
            >
              <span
                className="text-xs block mb-1"
                style={{ color: "var(--muted)", opacity: 0.6 }}
              >
                {t.next} →
              </span>
              <span
                className="text-sm group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--ink)" }}
              >
                {nextProject.title?.[lang] || nextProject.title?.de}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
