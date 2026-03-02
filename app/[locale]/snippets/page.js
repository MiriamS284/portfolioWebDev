import { client } from "@/lib/sanity";
import { allSnippetsQuery } from "@/lib/sanity/queries";
import SnippetsPageClient from "./SnippetsPageClient";

export const metadata = {
  title: "Code Snippets | Miriam Sparbrod",
  description: "Nützliche Code-Beispiele und Snippets für Web-Entwicklung.",
};

export const revalidate = 60;

export default async function SnippetsPage() {
  const snippets = await client.fetch(allSnippetsQuery);

  return <SnippetsPageClient snippets={snippets || []} />;
}
