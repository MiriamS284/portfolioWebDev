"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { urlFor } from "@/lib/sanity";
import Breadcrumb from "@/app/_components/shared/Breadcrumb";

export default function ProjectHero({ project }) {
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  // Determine what media to show on hover
  const hasMedia = project.demoGif || project.videoDemo || (project.images && project.images.length > 0);
  const previewImage = project.images?.[0];

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Breadcrumb */}
        <Breadcrumb
          section="projects"
          title={project.title?.[lang] || project.title?.de}
        />

        {/* Logo + Media Preview Container */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start mb-12">
          {/* Logo with Hover Effect */}
          {project.logo && (
            <div
              className="relative flex-shrink-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Logo */}
              <div
                className="relative w-24 h-24 md:w-32 md:h-32 transition-all duration-500"
                style={{
                  opacity: isHovered && hasMedia ? 0.3 : 1,
                  transform: isHovered && hasMedia ? "scale(0.95)" : "scale(1)",
                }}
              >
                <Image
                  src={urlFor(project.logo).width(256).height(256).url()}
                  alt={`${project.title?.[lang] || project.title?.de} Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Hover Media Preview */}
              {hasMedia && (
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none z-10"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered
                      ? "translate(-50%, -50%) scale(1)"
                      : "translate(-50%, -50%) scale(0.85)",
                    width: "480px",
                    maxWidth: "90vw",
                  }}
                >
                  {/* GIF */}
                  {project.demoGif && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={urlFor(project.demoGif).width(560).url()}
                        alt="Demo"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Video */}
                  {!project.demoGif && project.videoDemo && (
                    <video
                      src={project.videoDemo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full aspect-video object-cover"
                    />
                  )}

                  {/* Fallback: First Image */}
                  {!project.demoGif && !project.videoDemo && previewImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={urlFor(previewImage).width(560).height(315).url()}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Title + Tagline */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {project.title?.[lang] || project.title?.de}
            </h1>

            {project.tagline?.[lang] && (
              <p className="text-lg md:text-xl mb-6" style={{ color: "var(--muted)" }}>
                {project.tagline[lang]}
              </p>
            )}

            {/* Meta Info - compact */}
            <div className="flex flex-wrap gap-6 text-sm font-mono" style={{ color: "var(--muted)" }}>
              {project.role?.[lang] && (
                <div>
                  <span className="opacity-50">Role: </span>
                  <span>{project.role[lang]}</span>
                </div>
              )}
              {project.year && (
                <div>
                  <span className="opacity-50">Year: </span>
                  <span>{project.year}</span>
                </div>
              )}
              {project.duration && (
                <div>
                  <span className="opacity-50">Duration: </span>
                  <span>{project.duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Links - subtle */}
        {(project.links?.live || project.links?.github || project.links?.demo) && (
          <div className="flex flex-wrap gap-6 mb-12 text-sm font-mono">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-100"
                style={{ color: "var(--accent)", opacity: 0.9 }}
              >
                Live Website →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-100"
                style={{ color: "var(--ink)", opacity: 0.6 }}
              >
                GitHub →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-100"
                style={{ color: "var(--ink)", opacity: 0.6 }}
              >
                Demo →
              </a>
            )}
          </div>
        )}

        {/* Tech Stack - Architecture Style */}
        {project.technologies && project.technologies.length > 0 && (
          <TechArchitecture technologies={project.technologies} />
        )}
      </div>
    </section>
  );
}

// Tech Stack as Architecture Visualization
function TechArchitecture({ technologies }) {
  // Categorize technologies (simple heuristic)
  const categorize = (tech) => {
    const lower = tech.toLowerCase();
    if (["react", "next", "vue", "angular", "svelte", "tailwind", "css", "html", "framer"].some(t => lower.includes(t))) {
      return "frontend";
    }
    if (["node", "express", "django", "flask", "rails", "php", "laravel", "api", "graphql", "rest"].some(t => lower.includes(t))) {
      return "backend";
    }
    if (["postgres", "mysql", "mongo", "redis", "firebase", "supabase", "sanity", "prisma"].some(t => lower.includes(t))) {
      return "data";
    }
    if (["vercel", "aws", "docker", "kubernetes", "netlify", "heroku", "git", "github"].some(t => lower.includes(t))) {
      return "infra";
    }
    return "tools";
  };

  const categories = {
    frontend: { label: "Frontend", items: [] },
    backend: { label: "Backend", items: [] },
    data: { label: "Data", items: [] },
    infra: { label: "Deploy", items: [] },
    tools: { label: "Tools", items: [] },
  };

  technologies.forEach((tech) => {
    const cat = categorize(tech);
    categories[cat].items.push(tech);
  });

  // Filter empty categories
  const activeCategories = Object.entries(categories).filter(([_, cat]) => cat.items.length > 0);

  return (
    <div className="pt-8">
      <div className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "var(--muted)", opacity: 0.5 }}>
        Architecture
      </div>

      <div className="flex flex-wrap gap-8">
        {activeCategories.map(([key, category]) => (
          <div key={key} className="min-w-[120px]">
            <div
              className="text-xs font-mono uppercase tracking-wider mb-3"
              style={{ color: "var(--accent)", opacity: 0.7 }}
            >
              {category.label}
            </div>
            <div className="space-y-1">
              {category.items.map((tech) => (
                <div
                  key={tech}
                  className="text-sm font-mono"
                  style={{ color: "var(--ink)", opacity: 0.8 }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
