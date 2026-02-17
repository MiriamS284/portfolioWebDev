"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  const { lang } = useLanguage();

  const labels = {
    noResults:
      lang === "de"
        ? "Keine Projekte gefunden."
        : "No projects found.",
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p style={{ color: "var(--muted)" }}>{labels.noResults}</p>
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
