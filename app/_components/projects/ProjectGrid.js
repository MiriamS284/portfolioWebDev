"use client";

import { useTranslations } from "next-intl";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  const t = useTranslations("projects");

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p style={{ color: "var(--muted)" }}>{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
