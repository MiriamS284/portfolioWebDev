import { client, allPostsQuery } from "@/lib/sanity";
import Container from "../_components/shared/Container";
import PageHeader from "../_components/shared/PageHeader";
import BlogGrid from "../_components/blog/BlogGrid";

export const metadata = {
  title: "Blog | Miriam Sparbrod",
  description: "Gedanken über Web-Entwicklung, Design und Technologie",
};

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container size="large">
        <PageHeader
          title="Blog"
          subtitle="Gedanken, Tutorials und Einblicke in moderne Web-Entwicklung"
        />
        <section className="pb-20">
          <BlogGrid posts={posts} />
        </section>
      </Container>
    </div>
  );
}
