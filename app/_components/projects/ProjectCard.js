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

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex items-start gap-4 py-4 border-b transition-colors"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Logo */}
      {project.logo && (
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={urlFor(project.logo).width(96).height(96).url()}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className="text-base font-medium mb-1 group-hover:text-[var(--accent)] transition-colors"
          style={{ color: "var(--ink)" }}
        >
          {title}
          <span
            className="inline-block ml-2 opacity-0 group-hover:opacity-70 transition-all duration-200 group-hover:translate-x-1"
            style={{ color: "var(--muted)" }}
          >
            →
          </span>
        </h3>

        {tagline && (
          <p
            className="text-sm truncate"
            style={{ color: "var(--muted)" }}
          >
            {tagline}
          </p>
        )}
      </div>
    </Link>
  );
}
