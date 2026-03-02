"use client";

import { useTranslations } from "next-intl";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import SnippetCard from "@/app/_components/snippets/SnippetCard";

const categoryLabels = {
  "react-hooks": "React Hooks",
  components: "Components",
  forms: "Forms & Validation",
  pdf: "PDF Generation",
  api: "API Integration",
  animations: "Animations",
  performance: "Performance",
  utilities: "Utilities",
  dataviz: "Data Visualization",
  auth: "Authentication",
};

export default function SnippetsPageClient({ snippets }) {
  const t = useTranslations("snippets");

  const groupedByCategory = snippets.reduce((acc, snippet) => {
    const category = snippet.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(snippet);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedByCategory).sort();

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <BackLink href="/" />

          <header className="mb-16">
            <h1 className="text-2xl font-semibold mb-3">{t("title")}</h1>
            <p className="text-base" style={{ color: "var(--muted)" }}>
              {t("subtitle")}
            </p>
          </header>

          <div className="space-y-12">
            {sortedCategories.map((category) => (
              <section key={category}>
                <h2
                  className="text-sm font-medium mb-4 pb-2 border-b"
                  style={{
                    color: "var(--muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  {categoryLabels[category] || category}
                </h2>
                <div className="space-y-1">
                  {groupedByCategory[category].map((snippet) => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
