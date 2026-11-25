import { client } from "@/lib/sanity";
import {
  projectsQuery,
  allPostsQuery,
  allGardenEntriesQuery,
} from "@/lib/sanity/queries";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata, homeJsonLd } from "@/lib/seo";
import JsonLd from "@/app/_components/shared/JsonLd";
import ClientHomePage from "@/app/_components/ClientHomePage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const meta = pageMetadata({
    locale,
    path: "",
    title: t("title"),
    absoluteTitle: true,
    description: t("description"),
  });
  // Für geteilte Links der Leitsatz aus dem Hero statt des Seitentitels
  meta.openGraph.title = t("ogTitle");
  meta.twitter.title = t("ogTitle");
  return meta;
}

export const revalidate = 60;

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, posts, gardenEntries] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(allPostsQuery),
    client.fetch(allGardenEntriesQuery),
  ]);

  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const tHome = await getTranslations({ locale, namespace: "homeSections" });

  return (
    <>
      <JsonLd
        data={homeJsonLd({
          locale,
          name: tSeo("serviceName"),
          jobTitle: tSeo("jobTitle"),
          description: tMeta("description"),
          services: tHome.raw("services.items"),
        })}
      />
      <ClientHomePage
        projects={projects || []}
        posts={posts || []}
        thoughts={gardenEntries || []}
      />
    </>
  );
}
