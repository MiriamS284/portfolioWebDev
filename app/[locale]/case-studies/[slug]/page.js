import { getTranslations } from "next-intl/server";
import { client, postBySlugQuery } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { pageMetadata, notFoundMetadata, pick, SITE_URL, SITE_NAME } from "@/lib/seo";
import { categoryTitle } from "@/lib/utils/categoryTitle";
import JsonLd from "@/app/_components/shared/JsonLd";
import CaseStudyPageClient from "./CaseStudyPageClient";

function ogImage(post) {
  return post.mainImage?.asset
    ? [urlFor(post.mainImage).width(1200).height(630).url()]
    : undefined;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    const t = await getTranslations({ locale, namespace: "seo" });
    return notFoundMetadata(t("notFound"));
  }

  return pageMetadata({
    locale,
    path: `/case-studies/${slug}`,
    title: pick(post.seo?.metaTitle, locale) || pick(post.title, locale),
    description: pick(post.seo?.metaDescription, locale) || pick(post.excerpt, locale),
    type: "article",
    images: ogImage(post),
    article: {
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post._updatedAt || undefined,
    },
  });
}

export default async function CaseStudyPage({ params }) {
  const { locale, slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  const url = `${SITE_URL}/${locale}/case-studies/${slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pick(post.title, locale),
    description: pick(post.excerpt, locale),
    inLanguage: locale,
    url,
    mainEntityOfPage: url,
    datePublished: post.publishedAt || undefined,
    dateModified: post._updatedAt || post.publishedAt || undefined,
    image: ogImage(post),
    keywords: post.categories?.map((c) => categoryTitle(c, locale)).filter(Boolean),
    author: { "@type": "Person", name: SITE_NAME, url: `${SITE_URL}/${locale}/about` },
    publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <CaseStudyPageClient post={post} />
    </>
  );
}
