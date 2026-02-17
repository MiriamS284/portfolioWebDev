import { client, allPostsQuery } from "@/lib/sanity";
import MenuDock from "../_components/layout/MenuDock";
import Footer from "../_components/layout/Footer";
import BackLink from "../_components/shared/BackLink";
import CaseStudiesHeader from "../_components/blog/CaseStudiesHeader";
import CaseStudyList from "../_components/blog/CaseStudyList";

export const metadata = {
  title: "Case Studies | Miriam Sparbrod",
  description:
    "Detaillierte Einblicke in Projekte, Prozesse und technische Lösungen.",
};

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const studies = await client.fetch(allPostsQuery);

  return (
    <>
      <MenuDock />

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
