"use client";

import Link from "next/link";
import { HiOutlineLink } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi2";
import { useLanguage } from "@/app/_context/LanguageProvider";
import GrowthStageBadge from "./GrowthStageBadge";

const texts = {
  de: {
    title: "Verbundene Notizen",
    description:
      "Diese Gedanken sind miteinander verbunden und ergänzen sich gegenseitig.",
  },
  en: {
    title: "Connected Notes",
    description:
      "These thoughts are interconnected and complement each other.",
  },
};

export default function ConnectedNotes({ notes }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  if (!notes || notes.length === 0) return null;

  return (
    <aside
      className="mt-16 p-6 rounded-2xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <HiOutlineLink
          className="w-5 h-5"
          style={{ color: "var(--muted)", opacity: 0.7 }}
        />
        <span>{t.title}</span>
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
        {t.description}
      </p>
      <div className="space-y-3">
        {notes.map((note) => (
          <Link
            key={note.slug.current}
            href={`/garden/${note.slug.current}`}
            className="group block p-4 rounded-lg transition-colors hover:bg-[var(--surface-2)]"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GrowthStageBadge stage={note.growthStage} showLabel={false} />
                </div>
                <div className="font-medium text-sm group-hover:text-[var(--accent-strong)] transition-colors">
                  {note.title}
                </div>
                {note.excerpt && (
                  <div
                    className="text-xs mt-1 line-clamp-2"
                    style={{ color: "var(--muted)" }}
                  >
                    {note.excerpt}
                  </div>
                )}
              </div>
              <HiChevronRight
                className="w-4 h-4 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                style={{ color: "var(--muted)", opacity: 0.4 }}
              />
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
