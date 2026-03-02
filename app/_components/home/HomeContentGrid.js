"use client";

import { useTranslations, useLocale } from "next-intl";
import ProjectsColumn from "./ProjectsColumn";
import WritingColumn from "./WritingColumn";
import SnippetsColumn from "./SnippetsColumn";
import ThoughtsColumn from "./ThoughtsColumn";

export default function HomeContentGrid({
  projects,
  posts,
  snippets,
  thoughts,
}) {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="py-12 md:py-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        <div
          className="text-sm font-medium mb-8 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t("index")}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-8">
          <ProjectsColumn projects={projects} locale={locale} />
          <WritingColumn posts={posts} locale={locale} />
          <SnippetsColumn snippets={snippets} locale={locale} />
          <ThoughtsColumn thoughts={thoughts} locale={locale} />
        </div>
      </div>
    </section>
  );
}
