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
        className="py-20 md:py-32 px-6 md:ml-[280px] md:pt-[120px]"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-5xl">
          <CaseStudiesHeader />
          <CaseStudyList studies={studies} />
        </div>
      </main>

      <Footer />
    </>
  );
}
