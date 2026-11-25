import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import ImprintPageClient from "./ImprintPageClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.imprint" });
  return pageMetadata({
    locale,
    path: "/imprint",
    title: t("title"),
    description: t("description"),
  });
}

export default function ImprintPage() {
  return <ImprintPageClient />;
}
