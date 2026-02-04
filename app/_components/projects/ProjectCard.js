"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function ProjectCard({ project }) {
  const { lang } = useLanguage();

  const title = project.title?.[lang] || project.title?.de || project.title;
  const tagline =
    project.tagline?.[lang] || project.tagline?.de || project.tagline;
  const slug = project.slug?.current || project.slug;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.coverImage ? (
          <Image
            src={urlFor(project.coverImage).width(800).height(500).url()}
            alt={title || "Project"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--surface)" }}
          >
            <span className="text-4xl opacity-30">📁</span>
          </div>
        )}

        {/* Logo Overlay */}
        {project.logo && (
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm p-2">
            <Image
              src={urlFor(project.logo).width(80).height(80).url()}
              alt={`${title} Logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-strong)] transition-colors">
          {title}
        </h3>

        {tagline && (
          <p className="text-sm opacity-70 mb-4 line-clamp-2">{tagline}</p>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded text-xs font-mono"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs font-mono opacity-50">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
