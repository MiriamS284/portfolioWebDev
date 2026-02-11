"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { portableTextComponents, imagePresets } from "@/lib/sanity";
import { formatDate } from "@/lib/utils/formatDate";
import { LiaSeedlingSolid } from "react-icons/lia";
import { GiPlantRoots } from "react-icons/gi";
import { HiOutlineLink } from "react-icons/hi";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import CategoryBadge from "@/app/_components/shared/CategoryBadge";
import GrowthStageBadge from "@/app/_components/garden/GrowthStageBadge";
import ConnectedNotes from "@/app/_components/garden/ConnectedNotes";

const texts = {
  de: {
    back: "Zurück zum Garten",
    planted: "Gepflanzt",
    lastTended: "Gepflegt",
  },
  en: {
    back: "Back to Garden",
    planted: "Planted",
    lastTended: "Last tended",
  },
};

export default function GardenEntryPageClient({ entry }) {
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
          <BackLink href="/garden">{t.back}</BackLink>

          {/* Header */}
          <header className="mb-12">
            {/* Growth Stage & Categories */}
            <div className="flex gap-2 mb-6 flex-wrap items-center">
              <GrowthStageBadge stage={entry.growthStage} />
              {entry.categories?.length > 0 &&
                entry.categories.map((cat) => (
                  <CategoryBadge key={cat.slug?.current || cat.title} title={cat.title} />
                ))}
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                textShadow:
                  "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
              }}
            >
              {entry.title}
            </h1>

            {/* Meta Info */}
            <div
              className="flex flex-wrap items-center gap-4 text-sm"
              style={{ color: "var(--muted)" }}
            >
              {entry.author && (
                <>
                  <div className="flex items-center gap-3">
                    {entry.author.image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={imagePresets.avatar(entry.author.image).url()}
                          alt={entry.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="font-medium">{entry.author.name}</span>
                  </div>
                  <span style={{ opacity: 0.4 }}>•</span>
                </>
              )}
              <div className="flex items-center gap-1.5">
                <LiaSeedlingSolid className="w-4 h-4" />
                <span>{t.planted}</span>
                <time dateTime={entry.plantedAt}>
                  {formatDate(entry.plantedAt)}
                </time>
              </div>
              {entry.lastTended && (
                <>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <div className="flex items-center gap-1.5">
                    <GiPlantRoots className="w-4 h-4" />
                    <span>{t.lastTended}</span>
                    <time dateTime={entry.lastTended}>
                      {formatDate(entry.lastTended)}
                    </time>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Main Image */}
          {entry.mainImage && (
            <div className="mb-12">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={imagePresets.hero(entry.mainImage).url()}
                  alt={entry.mainImage.alt || entry.title}
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
              value={entry.body}
              components={portableTextComponents}
            />
          </div>

          {/* Connected Notes */}
          <ConnectedNotes notes={entry.connectedNotes} />
        </div>
      </article>

      <Footer />
    </>
  );
}
