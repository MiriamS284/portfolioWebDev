import { client } from "@/lib/sanity";
import {
  projectsQuery,
  allPostsQuery,
  allSnippetsQuery,
  allGardenEntriesQuery,
} from "@/lib/sanity/queries";
import ClientHomePage from "@/app/_components/ClientHomePage";

export const metadata = {
  title: "Miriam Sparbrod | Full-Stack Entwicklerin",
  description:
    "Full-Stack Entwicklerin spezialisiert auf MERN Stack, Next.js und moderne Web-Anwendungen. SaaS für B2B.",
};

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
