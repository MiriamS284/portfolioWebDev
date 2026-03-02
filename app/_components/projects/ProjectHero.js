"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { urlFor } from "@/lib/sanity";
import Breadcrumb from "@/app/_components/shared/Breadcrumb";

export default function ProjectHero({ project }) {
  const locale = useLocale();
  const t = useTranslations("projectDetail");

  return (
    <section className="py-20 md:py-32" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        <Breadcrumb
          section="projects"
          title={project.title?.[locale] || project.title?.de}
        />

        {project.logo && (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-8 group cursor-pointer">
            <Image
              src={urlFor(project.logo).width(192).height(192).url()}
              alt={`${project.title?.[locale] || project.title?.de} Logo`}
              fill
              className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 logo-adaptive"
              priority
            />
          </div>
        )}

        <h1
          className="text-2xl font-semibold mb-3"
          style={{ color: "var(--ink)" }}
        >
          {project.title?.[locale] || project.title?.de}
        </h1>

        {project.tagline?.[locale] && (
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--muted)" }}
          >
            {project.tagline[locale]}
          </p>
        )}

        <div
          className="flex flex-wrap gap-6 text-sm mb-8 pb-8 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {project.role?.[locale] && (
            <div>
              <span style={{ opacity: 0.6 }}>{t("role")}: </span>
              <span>{project.role[locale]}</span>
            </div>
          )}
          {project.year && (
            <div>
              <span style={{ opacity: 0.6 }}>{t("year")}: </span>
              <span>{project.year}</span>
            </div>
          )}
          {project.duration && (
            <div>
              <span style={{ opacity: 0.6 }}>{t("duration")}: </span>
              <span>{project.duration}</span>
            </div>
          )}
        </div>

        {(project.links?.live ||
          project.links?.github ||
          project.links?.demo) && (
          <div className="flex flex-wrap gap-6 mb-8 text-sm">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--ink)" }}
              >
                Live Website →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--muted)" }}
              >
                GitHub →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--muted)" }}
              >
                Demo →
              </a>
            )}
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <TechArchitecture technologies={project.technologies} />
        )}
      </div>
    </section>
  );
}

function TechArchitecture({ technologies }) {
  const t = useTranslations("projectDetail");

  const categorize = (tech) => {
    const lower = tech.toLowerCase();

    if (
      [
        "react",
        "next",
        "vue",
        "angular",
        "svelte",
        "tailwind",
        "css",
        "html",
        "framer",
        "typescript",
        "javascript",
        "sass",
        "scss",
        "chakra",
        "material",
        "bootstrap",
        "redux",
        "zustand",
        "motion",
      ].some((t) => lower.includes(t))
    ) {
      return "client";
    }

    if (
      [
        "node",
        "express",
        "django",
        "flask",
        "rails",
        "php",
        "laravel",
        "api",
        "graphql",
        "rest",
        "nest",
        "fastapi",
        "spring",
        "jwt",
        "auth",
        "passport",
      ].some((t) => lower.includes(t))
    ) {
      return "server";
    }

    if (
      [
        "postgres",
        "mysql",
        "mongo",
        "redis",
        "firebase",
        "supabase",
        "sanity",
        "prisma",
        "sqlite",
        "database",
        "sql",
        "nosql",
        "contentful",
        "strapi",
      ].some((t) => lower.includes(t))
    ) {
      return "data";
    }

    return "tools";
  };

  const categories = {
    client: { label: t("client"), items: [] },
    server: { label: t("server"), items: [] },
    data: { label: t("data"), items: [] },
    tools: { label: t("tools"), items: [] },
  };

  technologies.forEach((tech) => {
    const cat = categorize(tech);
    categories[cat].items.push(tech);
  });

  const activeCategories = Object.entries(categories).filter(
    ([_, cat]) => cat.items.length > 0,
  );

  return (
    <div>
      <h2
        className="text-sm font-medium mb-6 pb-2 border-b"
        style={{ color: "var(--muted)", borderColor: "var(--border)" }}
      >
        {t("stack")}
      </h2>

      <div className="space-y-0">
        {activeCategories.map(([key, category], idx) => (
          <div
            key={key}
            className="py-4 px-4 border-l-2 border-r-2 first:border-t-2 last:border-b-2 first:rounded-t-lg last:rounded-b-lg"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: "var(--muted)", opacity: 0.5 }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--ink)" }}
              >
                {category.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 pl-8">
              {category.items.map((tech) => (
                <span
                  key={tech}
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
