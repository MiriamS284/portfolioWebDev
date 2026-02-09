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
      className="py-20 border-t"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Previous */}
          {prevProject && (
            <Link
              href={`/projects/${prevProject.slug.current}`}
              className="group"
            >
              <div className="text-xs uppercase tracking-[0.3em] opacity-40 mb-4">
                ← Previous
              </div>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                {prevProject.coverImage && (
                  <Image
                    src={urlFor(prevProject.coverImage)
                      .width(600)
                      .height(400)
                      .url()}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="text-xl font-bold group-hover:opacity-70 transition-opacity">
                {prevProject.title?.[lang] || prevProject.title?.de}
              </h3>
            </Link>
          )}

          {/* Next */}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug.current}`}
              className="group"
            >
              <div className="text-xs uppercase tracking-[0.3em] opacity-40 mb-4 text-right">
                Next →
              </div>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                {nextProject.coverImage && (
                  <Image
                    src={urlFor(nextProject.coverImage)
                      .width(600)
                      .height(400)
                      .url()}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="text-xl font-bold text-right group-hover:opacity-70 transition-opacity">
                {nextProject.title?.[lang] || nextProject.title?.de}
              </h3>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
