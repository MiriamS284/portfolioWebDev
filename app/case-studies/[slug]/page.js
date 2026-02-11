import { client, postBySlugQuery } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Container from "@/app/_components/shared/Container";
import Breadcrumb from "@/app/_components/shared/Breadcrumb";
import BlogPostHeader from "@/app/_components/blog/BlogPostHeader";
import BlogPostContent from "@/app/_components/blog/BlogPostContent";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) return { title: "Case Study nicht gefunden" };

  return {
    title: `${post.title} | Miriam Sparbrod`,
    description: post.excerpt || post.seo?.metaDescription,
    openGraph: post.mainImage
      ? {
          images: [urlFor(post.mainImage).width(1200).height(630).url()],
        }
      : undefined,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <article
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container>
        <div className="py-12 md:py-20">
          <Breadcrumb section="case-studies" title={post.title} />
          <BlogPostHeader post={post} />
        </div>
      </Container>

      <Container>
        <BlogPostContent post={post} />
      </Container>

      <div className="h-20" />
    </article>
  );
}
