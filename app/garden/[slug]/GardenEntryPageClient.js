"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { portableTextComponents, imagePresets } from "@/lib/sanity";
import { formatDate } from "@/lib/utils/formatDate";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import ConnectedNotes from "@/app/_components/garden/ConnectedNotes";

const growthStageLabels = {
  seedling: { de: "Seedling", en: "Seedling" },
  budding: { de: "Growing", en: "Growing" },
  evergreen: { de: "Evergreen", en: "Evergreen" },
};

const texts = {
  de: {
    back: "Garden",
    planted: "Gepflanzt",
    updated: "Aktualisiert",
  },
  en: {
    back: "Garden",
    planted: "Planted",
    updated: "Updated",
  },
};

export default function GardenEntryPageClient({ entry }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  const stageLabel = growthStageLabels[entry.growthStage]?.[lang] || entry.growthStage;

  // Bilingual content
  const title = lang === "en" ? entry.title_en : entry.title_de;
  const excerpt = lang === "en" ? entry.excerpt_en : entry.excerpt_de;
  const body = lang === "en" ? entry.body_en : entry.body_de;

  return (
    <>
      <MenuDock />

      <article
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/garden">{t.back}</BackLink>

          {/* Header */}
          <header className="mb-12">
            {/* Meta line */}
            <div
              className="text-sm mb-4 font-mono"
              style={{ color: "var(--muted)" }}
            >
              {stageLabel}
              {entry.plantedAt && ` · ${formatDate(entry.plantedAt)}`}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              {title}
            </h1>

            {/* Excerpt if available */}
            {excerpt && (
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {excerpt}
              </p>
            )}
          </header>

          {/* Main Image */}
          {entry.mainImage && (
            <div className="mb-12">
              <div
                className="relative aspect-video rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <Image
                  src={imagePresets.hero(entry.mainImage).url()}
                  alt={entry.mainImage.alt || title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Content */}
          {body && (
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
          )}

          {/* Connected Notes */}
          <ConnectedNotes notes={entry.connectedNotes} />
        </div>
      </article>

      <Footer />
    </>
  );
}
