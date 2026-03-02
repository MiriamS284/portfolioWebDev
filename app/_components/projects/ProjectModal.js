"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ProjectModal({ project, onClose }) {
  const { lang } = useLanguage();

  const title = project.title?.[lang] || project.title?.de;
  const tagline = project.tagline?.[lang] || project.tagline?.de;
  const problem = project.problem?.[lang] || project.problem?.de;
  const solution = project.solution?.[lang] || project.solution?.de;
  const description = project.description?.[lang] || project.description?.de;
  const challenges = project.challenges?.[lang] || project.challenges?.de;
  const learnings = project.learnings?.[lang] || project.learnings?.de;
  const results = project.results?.[lang] || project.results?.de;
  const role = project.role?.[lang] || project.role?.de;
  const teamSize = project.teamSize?.[lang] || project.teamSize?.de;

  const labels = {
    problem: lang === "de" ? "Problem" : "Problem",
    solution: lang === "de" ? "Lösung" : "Solution",
    role: lang === "de" ? "Rolle" : "Role",
    duration: lang === "de" ? "Dauer" : "Duration",
    team: "Team",
    year: lang === "de" ? "Jahr" : "Year",
    type: lang === "de" ? "Typ" : "Type",
    stack: lang === "de" ? "Tech Stack" : "Tech Stack",
    features: lang === "de" ? "Features" : "Key Features",
    challenges: lang === "de" ? "Herausforderungen" : "Challenges",
    learnings: lang === "de" ? "Learnings" : "Learnings",
    results: lang === "de" ? "Ergebnisse" : "Results",
    viewLive: lang === "de" ? "Live ansehen" : "View Live",
    viewCode: lang === "de" ? "Code ansehen" : "View Code",
  };

  const projectTypes = {
    "web-app": lang === "de" ? "Web App" : "Web App",
    "mobile-app": lang === "de" ? "Mobile App" : "Mobile App",
    website: "Website",
    api: "API/Backend",
    "open-source": "Open Source",
    "client-work": lang === "de" ? "Kundenarbeit" : "Client Work",
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const getStatus = () => {
    switch (project.status) {
      case "prod":
        return { label: "LIVE", color: "var(--accent)" };
      case "dev":
        return { label: "IN DEV", color: "var(--muted)" };
      case "archived":
        return { label: "ARCHIVED", color: "var(--muted)" };
      default:
        return null;
    }
  };

  const status = getStatus();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      style={{ background: "rgba(0, 0, 0, 0.9)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-8 rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          <CloseIcon />
        </button>

        <div
          className="p-8 md:p-12 pb-6"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-start gap-6">
            {project.logo && (
              <div className="flex-shrink-0 hidden md:block">
                <Image
                  src={urlFor(project.logo).width(80).height(80).url()}
                  alt={title}
                  width={80}
                  height={80}
                  className="object-contain rounded-xl"
                  style={{ background: "var(--surface)" }}
                />
              </div>
            )}

            <div className="flex-grow min-w-0">
              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {status && (
                  <span
                    className="text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      color: status.color,
                      background: `color-mix(in oklch, ${status.color}, transparent 90%)`,
                      border: `1px solid ${status.color}`,
                    }}
                  >
                    {status.label}
                  </span>
                )}
                {project.year && (
                  <span
                    className="text-xs font-mono"
                    style={{ color: "var(--muted)" }}
                  >
                    {project.year}
                  </span>
                )}
                {project.projectType && (
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      color: "var(--muted)",
                      background: "var(--surface)",
                    }}
                  >
                    {projectTypes[project.projectType] || project.projectType}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
                style={{ color: "var(--ink)" }}
              >
                {title}
              </h2>

              {/* Tagline */}
              {tagline && (
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {tagline}
                </p>
              )}

              {/* Links */}
              {project.links && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                      style={{
                        background:
                          "color-mix(in oklch, var(--accent), transparent 85%)",
                        border: "1px solid var(--accent)",
                        color: "var(--accent)",
                      }}
                    >
                      <ExternalIcon />
                      {labels.viewLive}
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--ink)",
                      }}
                    >
                      <GithubIcon />
                      {labels.viewCode}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-10">
          {/* Problem & Solution */}
          {(problem || solution) && (
            <div className="grid md:grid-cols-2 gap-6">
              {problem && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-xs font-mono uppercase tracking-wider mb-3"
                    style={{ color: "var(--muted)", opacity: 0.7 }}
                  >
                    {labels.problem}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--ink)" }}
                  >
                    {problem}
                  </p>
                </div>
              )}
              {solution && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background:
                      "color-mix(in oklch, var(--accent), transparent 95%)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  <h3
                    className="text-xs font-mono uppercase tracking-wider mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    {labels.solution}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--ink)" }}
                  >
                    {solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Description (Portable Text) */}
          {description && (
            <div>
              <div
                className="prose max-w-none"
                style={{ color: "var(--muted)" }}
              >
                <PortableText value={description} />
              </div>
            </div>
          )}

          {/* Meta Grid: Role, Duration, Team */}
          {(role || project.duration || teamSize) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {role && (
                <div
                  className="p-4 rounded-lg"
                  style={{ background: "var(--surface)" }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider block mb-1"
                    style={{ color: "var(--muted)", opacity: 0.6 }}
                  >
                    {labels.role}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {role}
                  </span>
                </div>
              )}
              {project.duration && (
                <div
                  className="p-4 rounded-lg"
                  style={{ background: "var(--surface)" }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider block mb-1"
                    style={{ color: "var(--muted)", opacity: 0.6 }}
                  >
                    {labels.duration}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {project.duration}
                  </span>
                </div>
              )}
              {teamSize && (
                <div
                  className="p-4 rounded-lg"
                  style={{ background: "var(--surface)" }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider block mb-1"
                    style={{ color: "var(--muted)", opacity: 0.6 }}
                  >
                    {labels.team}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {teamSize}
                  </span>
                </div>
              )}
              {project.year && (
                <div
                  className="p-4 rounded-lg"
                  style={{ background: "var(--surface)" }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider block mb-1"
                    style={{ color: "var(--muted)", opacity: 0.6 }}
                  >
                    {labels.year}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {project.year}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-4"
                style={{ color: "var(--muted)", opacity: 0.7 }}
              >
                {labels.stack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={`tech-${idx}`}
                    className="px-3 py-1.5 rounded-lg text-sm font-mono"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--ink)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-4"
                style={{ color: "var(--muted)", opacity: 0.7 }}
              >
                {labels.features}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((f, idx) => (
                  <div
                    key={`feature-${idx}`}
                    className="p-4 rounded-lg"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <h4
                      className="text-base font-semibold mb-2"
                      style={{ color: "var(--ink)" }}
                    >
                      {f.feature?.[lang] || f.feature?.de}
                    </h4>
                    {(f.description?.[lang] || f.description?.de) && (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--muted)" }}
                      >
                        {f.description?.[lang] || f.description?.de}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {challenges && (
            <div>
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-4"
                style={{ color: "var(--muted)", opacity: 0.7 }}
              >
                {labels.challenges}
              </h3>
              <div
                className="prose max-w-none text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                <PortableText value={challenges} />
              </div>
            </div>
          )}

          {/* Learnings */}
          {learnings && learnings.length > 0 && (
            <div>
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-4"
                style={{ color: "var(--muted)", opacity: 0.7 }}
              >
                {labels.learnings}
              </h3>
              <ul className="space-y-2">
                {learnings.map((item, idx) => (
                  <li
                    key={`learning-${idx}`}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--ink)" }}
                  >
                    <span
                      className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {results && (
            <div
              className="p-6 rounded-xl"
              style={{
                background:
                  "color-mix(in oklch, var(--accent), transparent 95%)",
                border: "1px solid var(--accent)",
              }}
            >
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: "var(--accent)" }}
              >
                {labels.results}
              </h3>
              <p
                className="text-base leading-relaxed whitespace-pre-line"
                style={{ color: "var(--ink)" }}
              >
                {results}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
