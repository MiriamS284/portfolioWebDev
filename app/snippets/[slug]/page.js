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

  // Handle both simple strings and bilingual objects
  const title = typeof snippet.title === "object" && snippet.title !== null
    ? snippet.title.de || snippet.title.en || "Snippet"
    : snippet.title || "Snippet";

  const description = typeof snippet.description === "object" && snippet.description !== null
    ? snippet.description.de || snippet.description.en || ""
    : snippet.description || "";

  return {
    title: `${title} | Code Snippets | Miriam Sparbrod`,
    description: description || `${snippet.language} Code Snippet`,
  };
}

export const revalidate = 60;

export default async function SnippetPage({ params }) {
  const { slug } = await params;
  const snippet = await client.fetch(snippetBySlugQuery, { slug });

  if (!snippet) notFound();

  return <SnippetDetailClient snippet={snippet} />;
}
