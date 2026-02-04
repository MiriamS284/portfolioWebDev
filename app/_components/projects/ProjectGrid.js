"use client";

import { useState } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("all");

  const texts = {
    de: {
      all: "Alle",
      webApp: "Web Apps",
      website: "Websites",
      api: "APIs",
      openSource: "Open Source",
      showing: "Projekte werden angezeigt",
    },
    en: {
      all: "All",
      webApp: "Web Apps",
      website: "Websites",
      api: "APIs",
      openSource: "Open Source",
      showing: "projects showing",
    },
  };

  const t = texts[lang] || texts.de;

  const filters = [
    { value: "all", label: t.all },
    { value: "web-app", label: t.webApp },
    { value: "website", label: t.website },
    { value: "api", label: t.api },
    { value: "open-source", label: t.openSource },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.projectType === filter);

  return (
    <div>
      {/* Filter */}
      <div className="mb-12 flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className="px-4 py-2 rounded text-sm font-mono transition-all"
            style={{
              background:
                filter === f.value ? "var(--accent)" : "var(--surface)",
              color: filter === f.value ? "var(--bg)" : "var(--ink)",
              border: "1px solid var(--border)",
            }}
          >
            {f.label}
          </button>
        ))}
        <span className="text-xs font-mono opacity-40 ml-auto">
          {filteredProjects.length} {t.showing}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
