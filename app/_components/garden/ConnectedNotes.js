"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

const texts = {
  de: { title: "Verbundene Notizen" },
  en: { title: "Connected Notes" },
};

const growthStageLabels = {
  seedling: "Seedling",
  budding: "Growing",
  evergreen: "Evergreen",
};

export default function ConnectedNotes({ notes }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

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
        {t.title}
      </h2>

      <div className="space-y-1">
        {notes.map((note) => (
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
              {note.title}
            </span>
            <span
              className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity text-sm"
              style={{ color: "var(--muted)" }}
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
