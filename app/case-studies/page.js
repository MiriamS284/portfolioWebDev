import { client, allPostsQuery } from "@/lib/sanity";
import MenuDock from "../_components/layout/MenuDock";
import Footer from "../_components/layout/Footer";
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
        className="min-h-screen px-6"
        style={{ background: "var(--bg)" }}
      >
        <CaseStudiesHeader />
        <CaseStudyList studies={studies} />
        <div className="py-20" />
      </main>

      <Footer />
    </>
  );
}
