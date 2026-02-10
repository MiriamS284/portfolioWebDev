import { client } from "@/lib/sanity";
import { projectsQuery, allPostsQuery, allSnippetsQuery } from "@/lib/sanity/queries";
import ClientHomePage from "./_components/ClientHomePage";

export const metadata = {
  title: "Miriam Sparbrod | Full-Stack Entwicklerin",
  description:
    "Full-Stack Entwicklerin spezialisiert auf MERN Stack, Next.js und moderne Web-Anwendungen. Von der Linguistik zur Web-Entwicklung.",
};

export const revalidate = 60;

export default async function Page() {
  // Fetch all content in parallel
  const [projects, posts, snippets] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(allPostsQuery),
    client.fetch(allSnippetsQuery),
  ]);

  return (
    <ClientHomePage
      projects={projects || []}
      posts={posts || []}
      snippets={snippets || []}
    />
  );
}
