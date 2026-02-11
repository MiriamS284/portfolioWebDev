import { client } from "@/lib/sanity";
import { gardenEntryBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Container from "@/app/_components/shared/Container";
import BackLink from "@/app/_components/shared/BackLink";
import GardenEntryHeader from "@/app/_components/garden/GardenEntryHeader";
import GardenEntryContent from "@/app/_components/garden/GardenEntryContent";
import ConnectedNotes from "@/app/_components/garden/ConnectedNotes";

export async function generateMetadata({ params }) {
  const entry = await client.fetch(gardenEntryBySlugQuery, {
    slug: params.slug,
  });

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
  const entry = await client.fetch(gardenEntryBySlugQuery, {
    slug: params.slug,
  });

  if (!entry) notFound();

  return (
    <article
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container>
        <div className="py-12 md:py-20">
          <BackLink href="/garden">Zurück zum Garten</BackLink>
          <GardenEntryHeader entry={entry} />
        </div>
      </Container>

      <Container>
        <GardenEntryContent entry={entry} />
        <ConnectedNotes notes={entry.connectedNotes} />
      </Container>

      <div className="h-20" />
    </article>
  );
}
