"use client";

import Image from "next/image";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { urlFor } from "@/lib/sanity";

export default function ProjectHero({ project }) {
  const { lang } = useLanguage();

  return (
    <section className="py-20 md:py-32" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-6">
     
        <div className="mb-8 flex items-center gap-2 text-sm font-mono opacity-60">
          <a href="/projects" className="hover:opacity-100 transition-opacity">
            Projekte
          </a>
          <span>/</span>
          <span>{project.title?.[lang] || project.title?.de}</span>
        </div>


        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          {project.title?.[lang] || project.title?.de}
        </h1>

      
        {project.tagline?.[lang] && (
          <p className="text-xl md:text-2xl opacity-70 mb-8 max-w-3xl">
            {project.tagline[lang]}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mb-12 text-sm font-mono">
          {project.role?.[lang] && (
            <div>
              <div className="opacity-40 mb-1">Role</div>
              <div>{project.role[lang]}</div>
            </div>
          )}
          {project.year && (
            <div>
              <div className="opacity-40 mb-1">Year</div>
              <div>{project.year}</div>
            </div>
          )}
          {project.duration && (
            <div>
              <div className="opacity-40 mb-1">Duration</div>
              <div>{project.duration}</div>
            </div>
          )}
          {project.teamSize?.[lang] && (
            <div>
              <div className="opacity-40 mb-1">Team</div>
              <div>{project.teamSize[lang]}</div>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-12">
            <div className="text-xs uppercase tracking-[0.3em] opacity-40 mb-4">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded text-sm font-mono"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.links?.live || project.links?.github || project.links?.demo) && (
          <div className="flex flex-wrap gap-4 mb-16">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                Live Website →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                GitHub →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                Demo Video →
              </a>
            )}
          </div>
        )}

        {/* Hero Image */}
        {project.coverImage && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(project.coverImage).width(1600).height(900).url()}
              alt={project.title?.[lang] || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}