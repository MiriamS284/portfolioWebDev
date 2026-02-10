"use client";

import Link from "next/link";
import Container from "../shared/Container";
import ProjectCard from "../projects/ProjectCard";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function FeaturedProjectsClient({ projects }) {
  const { lang } = useLanguage();

  const texts = {
    de: {
      eyebrow: "Featured Work",
      title: "Ausgewählte Projekte",
      description:
        "Von Konzept über Prototyp bis Launch – hier sind einige meiner liebsten Arbeiten",
      viewAll: "Alle Projekte ansehen",
    },
    en: {
      eyebrow: "Featured Work",
      title: "Featured Projects",
      description:
        "From concept to prototype to launch – here are some of my favorite works",
      viewAll: "View all projects",
    },
  };

  const t = texts[lang] || texts.de;

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        background: "var(--surface)",
        color: "var(--ink)",
        zIndex: 2,
        isolation: "isolate",
      }}
    >
      <Container size="large">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
            {t.eyebrow}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">{t.description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-lg font-medium hover:text-[var(--accent-strong)] transition-colors"
          >
            {t.viewAll}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l3-3-3-3m6 0H6" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
