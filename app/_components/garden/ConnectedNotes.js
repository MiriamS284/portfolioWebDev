"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const growthStageLabels = {
  seedling: "Seedling",
  budding: "Growing",
  evergreen: "Evergreen",
};

export default function ConnectedNotes({ notes }) {
  const t = useTranslations("garden");
  const locale = useLocale();

  if (!notes || notes.length === 0) return null;

  return (
    <section
      className="mt-16 pt-8 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <h2
        className="text-sm font-medium mb-4 pb-2"
        style={{ color: "var(--muted)" }}
      >
        {t("connectedNotes")}
      </h2>

      <div className="space-y-1">
        {notes.map((note) => {
          const noteTitle = locale === "en" ? note.title_en : note.title_de;
          return (
            <Link
              key={note.slug.current}
              href={`/garden/${note.slug.current}`}
              className="group flex items-center gap-3 py-2 transition-colors"
            >
              <span
                className="text-sm font-mono"
                style={{ color: "var(--muted)" }}
              >
                {growthStageLabels[note.growthStage] || note.growthStage}
              </span>
              <span
                className="group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--ink)" }}
              >
                {noteTitle}
              </span>
              <span
                className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity text-sm"
                style={{ color: "var(--muted)" }}
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
