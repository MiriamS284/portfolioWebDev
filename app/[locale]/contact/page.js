import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata, faqJsonLd } from "@/lib/seo";
import JsonLd from "@/app/_components/shared/JsonLd";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    absoluteTitle: true,
    description: t("metaDescription"),
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "homeSections.faq" });
  return (
    <>
      <JsonLd data={faqJsonLd(t.raw("items"))} />
      <ContactPageClient />
    </>
  );
}
