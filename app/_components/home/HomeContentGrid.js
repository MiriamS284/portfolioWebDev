"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import ProjectsColumn from "./ProjectsColumn";
import WritingColumn from "./WritingColumn";
import SnippetsColumn from "./SnippetsColumn";
import ThoughtsColumn from "./ThoughtsColumn";

const texts = {
  de: { index: "Index" },
  en: { index: "Index" },
};

export default function HomeContentGrid({
  projects,
  posts,
  snippets,
  thoughts,
}) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  return (
    <section className="py-12 md:py-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        <div
          className="text-sm font-medium mb-8 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t.index}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-8">
          <ProjectsColumn projects={projects} lang={lang} />
          <WritingColumn posts={posts} lang={lang} />
          <SnippetsColumn snippets={snippets} lang={lang} />
          <ThoughtsColumn thoughts={thoughts} lang={lang} />
        </div>
      </div>
    </section>
  );
}
