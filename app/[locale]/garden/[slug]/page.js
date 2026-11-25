import { getTranslations } from "next-intl/server";
import { pageMetadata, notFoundMetadata } from "@/lib/seo";
import { client } from "@/lib/sanity";
import { gardenEntryBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import GardenEntryPageClient from "./GardenEntryPageClient";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const entry = await client.fetch(gardenEntryBySlugQuery, { slug });

  if (!entry) {
    const t = await getTranslations({ locale, namespace: "seo" });
    return notFoundMetadata(t("notFound"));
  }

  const title = (locale === "en" && entry.title_en) || entry.title_de || entry.title;
  const description =
    (locale === "en" && entry.excerpt_en) || entry.excerpt_de || entry.excerpt || "";

  return pageMetadata({
    locale,
    path: `/garden/${slug}`,
    title: `${title} – Digital Garden`,
    description,
    type: "article",
    images: entry.mainImage?.asset
      ? [urlFor(entry.mainImage).width(1200).height(630).url()]
      : undefined,
    article: {
      publishedTime: entry.plantedAt || undefined,
      modifiedTime: entry.lastTended || undefined,
    },
  });
}

export default async function GardenEntryPage({ params }) {
  const { slug } = await params;
  const entry = await client.fetch(gardenEntryBySlugQuery, { slug });

  if (!entry) notFound();

  return <GardenEntryPageClient entry={entry} />;
}
