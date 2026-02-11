"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { portableTextComponents, imagePresets } from "@/lib/sanity";
import { formatDate } from "@/lib/utils/formatDate";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import CategoryBadge from "@/app/_components/shared/CategoryBadge";

const texts = {
  de: {
    back: "Zurück zu Case Studies",
  },
  en: {
    back: "Back to Case Studies",
  },
};

export default function CaseStudyPageClient({ post }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  return (
    <>
      <MenuDock />

      <article
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/case-studies">{t.back}</BackLink>

          {/* Header */}
          <header className="mb-12">
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
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow:
                  "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
              }}
            >
              {post.title}
            </h1>

            {/* Meta Info */}
            <div
              className="flex flex-wrap items-center gap-4 text-sm"
              style={{ color: "var(--muted)" }}
            >
              {post.author && (
                <>
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
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                  <span style={{ opacity: 0.4 }}>•</span>
                </>
              )}
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </header>

          {/* Main Image */}
          {post.mainImage && (
            <div className="mb-12">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={imagePresets.hero(post.mainImage).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Content */}
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
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
