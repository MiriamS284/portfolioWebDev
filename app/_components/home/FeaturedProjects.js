"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";
import ProjectCard from "../projects/ProjectCard";

export default function FeaturedProjects({ projects = [] }) {
  const { lang } = useLanguage();

  const texts = {
    de: {
      label: "Ausgewählte Arbeiten",
      title: "Projekte",
      subtitle:
        "Eine Auswahl meiner Projekte - Develeper Mode & Production Ready",
      viewAll: "Alle Projekte ansehen",
    },
    en: {
      label: "Featured Work",
      title: "Projects",
      subtitle:
        "A selection of my projects - Develeper Mode & Production Ready",
      viewAll: "View All Projects",
    },
  };

  const t = texts[lang] || texts.de;

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
            {t.label}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h2>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {t.viewAll}
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
