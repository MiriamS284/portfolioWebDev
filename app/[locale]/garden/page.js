import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/lib/sanity";
import { allGardenEntriesQuery } from "@/lib/sanity/queries";
import GardenPageClient from "./GardenPageClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.garden" });
  return pageMetadata({
    locale,
    path: "/garden",
    title: t("title"),
    description: t("description"),
  });
}

export const revalidate = 60;

export default async function GardenPage() {
  const entries = await client.fetch(allGardenEntriesQuery);

  return <GardenPageClient entries={entries || []} />;
}
