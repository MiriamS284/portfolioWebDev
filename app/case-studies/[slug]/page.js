import { client, postBySlugQuery } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import CaseStudyPageClient from "./CaseStudyPageClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) return { title: "Case Study nicht gefunden" };

  // Use German as default for metadata
  const title = post.seo?.metaTitle?.de || post.title?.de || post.title;
  const description = post.seo?.metaDescription?.de || post.excerpt?.de || "";

  return {
    title: `${title} | Miriam Sparbrod`,
    description,
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
