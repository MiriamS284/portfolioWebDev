"use client";

import { useState } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  const { lang } = useLanguage();
  const [mode, setMode] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (mode === "all") return true;
    return project.status === mode;
  });

  // Determine card size based on position and featured status
  const getCardSize = (project, index) => {
    if (project.featured) return "large";
    // Create visual variety
    const pattern = index % 5;
    if (pattern === 2) return "wide";
    return "normal";
  };

  const labels = {
    mode: lang === "de" ? "Filter:" : "Filter:",
    all: lang === "de" ? "Alle" : "All",
    dev: "Dev",
    prod: "Live",
    noResults:
      lang === "de"
        ? "Keine Projekte gefunden."
        : "No projects found.",
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex items-center gap-4 mb-12">
        <span
          className="text-xs uppercase tracking-wider font-mono"
          style={{ color: "var(--muted)", opacity: 0.6 }}
        >
          {labels.mode}
        </span>

        {[
          { key: "all", label: labels.all },
          { key: "dev", label: labels.dev },
          { key: "prod", label: labels.prod },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setMode(filter.key)}
            className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full transition-all"
            style={{
              color: mode === filter.key ? "var(--accent)" : "var(--muted)",
              background:
                mode === filter.key
                  ? "color-mix(in oklch, var(--accent), transparent 90%)"
                  : "transparent",
              border: `1px solid ${mode === filter.key ? "var(--accent)" : "var(--border)"}`,
              opacity: mode === filter.key ? 1 : 0.6,
            }}
          >
            {filter.label}
          </button>
        ))}

        <span
          className="text-xs font-mono ml-2"
          style={{ color: "var(--muted)", opacity: 0.4 }}
        >
          ({filteredProjects.length})
        </span>
      </div>

      {/* Bento Grid */}
      <div
        className="grid gap-4 md:gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {filteredProjects.map((project, index) => {
          const size = getCardSize(project, index);
          return (
            <div
              key={project._id}
              className={`
                ${size === "large" ? "md:col-span-2 md:row-span-2" : ""}
                ${size === "wide" ? "md:col-span-2" : ""}
              `}
            >
              <ProjectCard project={project} size={size} />
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p style={{ color: "var(--muted)", opacity: 0.6 }}>
            {labels.noResults}
          </p>
        </div>
      )}
    </div>
  );
}
