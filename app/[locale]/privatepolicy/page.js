import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import PrivacyPageClient from "./PrivacyPageClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.privacy" });
  return pageMetadata({
    locale,
    path: "/privatepolicy",
    title: t("title"),
    description: t("description"),
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPageClient />;
}
