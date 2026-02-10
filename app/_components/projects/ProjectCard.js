"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { urlFor } from "@/lib/sanity";

export default function ProjectCard({ project }) {
  const { lang } = useLanguage();

  const title = project.title?.[lang] || project.title?.de || "Untitled";
  const tagline = project.tagline?.[lang] || project.tagline?.de;
  const slug = project.slug?.current;

  const coverImage = project.coverImage || project.logo;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block py-6"
    >
      {/* Image - optional, subtle */}
      {coverImage && (
        <div className="relative w-full aspect-video mb-4 overflow-hidden">
          <Image
            src={urlFor(coverImage).width(800).height(450).url()}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ opacity: 0.9 }}
          />
        </div>
      )}

      {/* Title - clear link styling */}
      <h3
        className="text-lg md:text-xl font-semibold mb-2 transition-colors duration-200"
        style={{
          color: "var(--ink)",
        }}
      >
        <span className="group-hover:text-[var(--accent)] transition-colors">
          {title}
        </span>
        <span
          className="inline-block ml-2 opacity-0 group-hover:opacity-70 transition-all duration-200 group-hover:translate-x-1"
          style={{ color: "var(--muted)" }}
        >
          →
        </span>
      </h3>

      {/* Tagline */}
      {tagline && (
        <p
          className="text-sm leading-relaxed mb-3"
          style={{ color: "var(--muted)" }}
        >
          {tagline}
        </p>
      )}

      {/* Tech Stack - minimal */}
      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech, idx) => (
            <span
              key={`${project._id}-stack-${idx}`}
              className="text-xs font-mono"
              style={{ color: "var(--muted)", opacity: 0.7 }}
            >
              {tech}
              {idx < Math.min(project.stack.length, 4) - 1 && (
                <span className="ml-2">·</span>
              )}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
