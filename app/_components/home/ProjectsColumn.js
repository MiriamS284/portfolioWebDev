"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ProjectsColumn({ projects = [], locale = "de" }) {
  const t = useTranslations("projects");

  return (
    <div>
      <h2 className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        {t("title")}
      </h2>

      {/* List */}
      <div className="space-y-5">
        {projects.slice(0, 4).map((project) => (
          <ProjectItem key={project._id} project={project} locale={locale} />
        ))}

        <Link href="/projects" className="group inline-block">
          <span
            className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
            style={{ color: "var(--ink)" }}
          >
            {t("viewAll")}
          </span>
        </Link>
      </div>
    </div>
  );
}

function ProjectItem({ project, locale }) {
  const title = project.title?.[locale] || project.title?.de || "Untitled";
  const tagline = project.tagline?.[locale] || project.tagline?.de || "";
  const slug = project.slug?.current;

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="flex items-center gap-1">
        <span
          className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </span>
        <span
          className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "var(--muted)" }}
        >
          ↗
        </span>
      </div>
      {tagline && (
        <p
          className="text-sm mt-1 leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {tagline}
        </p>
      )}
    </Link>
  );
}
