"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import ProjectsColumn from "./ProjectsColumn";
import WritingColumn from "./WritingColumn";
import SnippetsColumn from "./SnippetsColumn";

const texts = {
  de: { index: "Index" },
  en: { index: "Index" },
};

export default function HomeContentGrid({ projects, posts, snippets }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  return (
    <section className="py-12 md:py-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-4xl px-6">
        {/* Index Label */}
        <div
          className="text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: "var(--muted)", opacity: 0.5 }}
        >
          {t.index}
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <ProjectsColumn projects={projects} lang={lang} />
          <WritingColumn posts={posts} lang={lang} />
          <SnippetsColumn snippets={snippets} lang={lang} />
        </div>
      </div>
    </section>
  );
}
