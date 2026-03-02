"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { useLocale, useTranslations } from "next-intl";
import { portableTextComponents, imagePresets } from "@/lib/sanity";
import { formatDate } from "@/lib/utils/formatDate";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import Breadcrumb from "@/app/_components/shared/Breadcrumb";
import CategoryBadge from "@/app/_components/shared/CategoryBadge";

export default function CaseStudyPageClient({ post }) {
  const locale = useLocale();
  const t = useTranslations("common");

  const title = post.title?.[locale] || post.title?.de || post.title;
  const excerpt = post.excerpt?.[locale] || post.excerpt?.de;
  const body = post.body?.[locale] || post.body?.de || post.body;
  const altText =
    post.mainImage?.alt?.[locale] || post.mainImage?.alt?.de || title || "";

  return (
    <>
      <MenuDock />

      <article
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Breadcrumb section="case-studies" title={title} />

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

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {title}
            </h1>

            {excerpt && (
              <p
                className="text-lg md:text-xl mb-8 leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {excerpt}
              </p>
            )}

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
                  <span className="opacity-50">{t("published")}: </span>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, locale)}
                  </time>
                </div>
              )}
            </div>
          </div>
        </section>

        {post.mainImage?.asset && (
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
              <PortableText value={body} components={portableTextComponents} />
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
