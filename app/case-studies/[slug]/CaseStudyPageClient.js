"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { portableTextComponents, imagePresets } from "@/lib/sanity";
import { formatDate } from "@/lib/utils/formatDate";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import Breadcrumb from "@/app/_components/shared/Breadcrumb";
import CategoryBadge from "@/app/_components/shared/CategoryBadge";

export default function CaseStudyPageClient({ post }) {
  const { lang } = useLanguage();

  const title = post.title?.[lang] || post.title?.de || post.title;
  const excerpt = post.excerpt?.[lang] || post.excerpt?.de;
  const body = post.body?.[lang] || post.body?.de || post.body;
  const altText = post.mainImage?.alt?.[lang] || post.mainImage?.alt?.de || title || "";

  return (
    <>
      <MenuDock />

      <article
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            {/* Breadcrumb */}
            <Breadcrumb section="case-studies" title={title} />

            {/* Categories */}
            {post.categories?.length > 0 && (
              <div className="flex gap-2 mb-6 flex-wrap">
                {post.categories.map((cat) => (
                  <CategoryBadge
                    key={cat.slug?.current || cat.title}
                    title={cat.title}
                  />
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {title}
            </h1>

            {/* Excerpt / Tagline */}
            {excerpt && (
              <p
                className="text-lg md:text-xl mb-8 leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div
              className="flex flex-wrap items-center gap-6 text-sm font-mono"
              style={{ color: "var(--muted)" }}
            >
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={imagePresets.avatar(post.author.image).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>{post.author.name}</span>
                </div>
              )}
              {post.publishedAt && (
                <div>
                  <span className="opacity-50">
                    {lang === "de" ? "Veröffentlicht: " : "Published: "}
                  </span>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, lang)}
                  </time>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Image */}
        {post.mainImage && (
          <section className="pb-16">
            <div className="mx-auto max-w-5xl px-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={imagePresets.hero(post.mainImage).url()}
                  alt={altText}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div
              className="prose prose-lg max-w-none"
              style={{
                "--tw-prose-body": "var(--ink)",
                "--tw-prose-headings": "var(--ink)",
                "--tw-prose-links": "var(--accent)",
                "--tw-prose-code": "var(--ink)",
              }}
            >
              <PortableText
                value={body}
                components={portableTextComponents}
              />
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
