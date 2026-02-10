import { client } from "@/lib/sanity";
import { snippetBySlugQuery } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import SnippetDetailClient from "./SnippetDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const snippet = await client.fetch(snippetBySlugQuery, { slug });

  if (!snippet) {
    return { title: "Snippet nicht gefunden" };
  }

  return {
    title: `${snippet.title} | Code Snippets | Miriam Sparbrod`,
    description: snippet.description || `${snippet.language} Code Snippet`,
  };
}

export const revalidate = 60;

export default async function SnippetPage({ params }) {
  const { slug } = await params;
  const snippet = await client.fetch(snippetBySlugQuery, { slug });

  if (!snippet) notFound();

  return <SnippetDetailClient snippet={snippet} />;
}
