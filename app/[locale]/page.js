import { client } from "@/lib/sanity";
import {
  projectsQuery,
  allPostsQuery,
  allGardenEntriesQuery,
} from "@/lib/sanity/queries";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ClientHomePage from "@/app/_components/ClientHomePage";

// Canonical und Sprachversionen nur für die Startseite.
// (Vorher stand das im Layout und galt damit fälschlich für alle Unterseiten.)
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { de: "/de", en: "/en", "x-default": "/de" },
    },
    // openGraph wird von Next nicht mit dem Layout zusammengeführt, deshalb hier vollständig
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "Miriam Sparbrod",
      title: t("ogTitle"),
      description: t("description"),
      locale: locale === "de" ? "de_DE" : "en_GB",
    },
  };
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

  return (
    <ClientHomePage
      projects={projects || []}
      posts={posts || []}
      thoughts={gardenEntries || []}
    />
  );
}
