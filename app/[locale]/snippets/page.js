import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/lib/sanity";
import { allSnippetsQuery } from "@/lib/sanity/queries";
import SnippetsPageClient from "./SnippetsPageClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.snippets" });
  return pageMetadata({
    locale,
    path: "/snippets",
    title: t("title"),
    description: t("description"),
  });
}

export const revalidate = 60;

export default async function SnippetsPage() {
  const snippets = await client.fetch(allSnippetsQuery);

  return <SnippetsPageClient snippets={snippets || []} />;
}
