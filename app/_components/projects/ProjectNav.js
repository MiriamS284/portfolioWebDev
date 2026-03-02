"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function ProjectNav({ prevProject, nextProject }) {
  const locale = useLocale();
  const t = useTranslations("projectDetail");

  if (!prevProject && !nextProject) return null;

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
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug.current}`}
              className="group"
            >
              <span
                className="text-xs block mb-1"
                style={{ color: "var(--muted)", opacity: 0.6 }}
              >
                ← {t("prev")}
              </span>
              <span
                className="text-sm group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--ink)" }}
              >
                {prevProject.title?.[locale] || prevProject.title?.de}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug.current}`}
              className="group text-right"
            >
              <span
                className="text-xs block mb-1"
                style={{ color: "var(--muted)", opacity: 0.6 }}
              >
                {t("next")} →
              </span>
              <span
                className="text-sm group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--ink)" }}
              >
                {nextProject.title?.[locale] || nextProject.title?.de}
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
