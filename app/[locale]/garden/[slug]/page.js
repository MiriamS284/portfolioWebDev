import { client } from "@/lib/sanity";
import { gardenEntryBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import GardenEntryPageClient from "./GardenEntryPageClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = await client.fetch(gardenEntryBySlugQuery, { slug });

  if (!entry) return { title: "Entry nicht gefunden" };

  return {
    title: `${entry.title} | Digital Garden`,
    description: entry.excerpt || entry.seo?.metaDescription,
    openGraph: entry.mainImage
      ? {
          images: [urlFor(entry.mainImage).width(1200).height(630).url()],
        }
      : undefined,
  };
}

export default async function GardenEntryPage({ params }) {
  const { slug } = await params;
  const entry = await client.fetch(gardenEntryBySlugQuery, { slug });

  if (!entry) notFound();

  return <GardenEntryPageClient entry={entry} />;
}
