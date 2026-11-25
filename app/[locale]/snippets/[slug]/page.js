import { getTranslations } from "next-intl/server";
import { pageMetadata, notFoundMetadata, pick } from "@/lib/seo";
import { client } from "@/lib/sanity";
import { snippetBySlugQuery } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import SnippetDetailClient from "./SnippetDetailClient";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const snippet = await client.fetch(snippetBySlugQuery, { slug });

  if (!snippet) {
    const t = await getTranslations({ locale, namespace: "seo" });
    return notFoundMetadata(t("notFound"));
  }

  const title = pick(snippet.title, locale) || "Snippet";
  const description =
    pick(snippet.description, locale) || `${snippet.language || "Code"} Snippet`;

  return pageMetadata({
    locale,
    path: `/snippets/${slug}`,
    title: `${title} – Code-Snippets`,
    description,
  });
}

export const revalidate = 60;

export default async function SnippetPage({ params }) {
  const { slug } = await params;
  const snippet = await client.fetch(snippetBySlugQuery, { slug });

  if (!snippet) notFound();

  return <SnippetDetailClient snippet={snippet} />;
}
