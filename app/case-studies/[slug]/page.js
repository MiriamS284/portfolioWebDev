import { client, postBySlugQuery } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import CaseStudyPageClient from "./CaseStudyPageClient";

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

  return <CaseStudyPageClient post={post} />;
}
