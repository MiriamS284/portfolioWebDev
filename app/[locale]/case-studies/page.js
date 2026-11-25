import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { client, allPostsQuery } from "@/lib/sanity";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import CaseStudiesHeader from "@/app/_components/blog/CaseStudiesHeader";
import CaseStudyList from "@/app/_components/blog/CaseStudyList";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.caseStudies" });
  return pageMetadata({
    locale,
    path: "/case-studies",
    title: t("title"),
    description: t("description"),
  });
}

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const studies = await client.fetch(allPostsQuery);

  return (
    <>

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <BackLink href="/">Index</BackLink>
          <CaseStudiesHeader />
          <CaseStudyList studies={studies} />
        </div>
      </main>

      <Footer />
    </>
  );
}
