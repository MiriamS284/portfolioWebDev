"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { urlFor } from "@/lib/sanity";

export default function ProjectNav({ prevProject, nextProject }) {
  const { lang } = useLanguage();

  if (!prevProject && !nextProject) return null;

  return (
    <section
      className="py-16"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex justify-between items-center">
          {/* Previous */}
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug.current}`}
              className="group flex items-center gap-4"
            >
              <span
                className="text-sm font-mono transition-transform duration-200 group-hover:-translate-x-1"
                style={{ color: "var(--muted)" }}
              >
                ←
              </span>

              {/* Logo */}
              {prevProject.logo && (
                <div className="relative w-10 h-10 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={urlFor(prevProject.logo).width(80).height(80).url()}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <div>
                <div
                  className="text-xs font-mono uppercase tracking-wider mb-1"
                  style={{ color: "var(--muted)", opacity: 0.6 }}
                >
                  Prev
                </div>
                <div
                  className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: "var(--ink)" }}
                >
                  {prevProject.title?.[lang] || prevProject.title?.de}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug.current}`}
              className="group flex items-center gap-4 text-right"
            >
              <div>
                <div
                  className="text-xs font-mono uppercase tracking-wider mb-1"
                  style={{ color: "var(--muted)", opacity: 0.6 }}
                >
                  Next
                </div>
                <div
                  className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: "var(--ink)" }}
                >
                  {nextProject.title?.[lang] || nextProject.title?.de}
                </div>
              </div>

              {/* Logo */}
              {nextProject.logo && (
                <div className="relative w-10 h-10 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={urlFor(nextProject.logo).width(80).height(80).url()}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <span
                className="text-sm font-mono transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: "var(--muted)" }}
              >
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
