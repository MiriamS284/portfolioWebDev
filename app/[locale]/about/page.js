import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import AboutHero from "@/app/_components/about/AboutHero";
import TechStackArchitecture from "@/app/_components/about/TechStackArchitecture";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("metaTitle"),
    absoluteTitle: true,
    description: t("metaDescription"),
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <BackLink href="/">Index</BackLink>
          <AboutHero />
          <TechStackArchitecture />
        </div>
      </main>
      <Footer />
    </>
  );
}
