import { client } from "@/lib/sanity";
import {
  projectsQuery,
  allPostsQuery,
  allSnippetsQuery,
  allGardenEntriesQuery,
} from "@/lib/sanity/queries";
import ClientHomePage from "@/app/_components/ClientHomePage";

// Canonical und Sprachversionen nur für die Startseite.
// (Vorher stand das im Layout und galt damit fälschlich für alle Unterseiten.)
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { de: "/de", en: "/en", "x-default": "/de" },
    },
    openGraph: { url: `/${locale}` },
  };
}

export const revalidate = 60;

export default async function Page() {
  const [projects, posts, snippets, gardenEntries] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(allPostsQuery),
    client.fetch(allSnippetsQuery),
    client.fetch(allGardenEntriesQuery),
  ]);

  return (
    <ClientHomePage
      projects={projects || []}
      posts={posts || []}
      snippets={snippets || []}
      thoughts={gardenEntries || []}
    />
  );
}
