import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { de: "/de/contact", en: "/en/contact", "x-default": "/de/contact" },
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageClient />;
}
