"use client";

import { useTranslations } from "next-intl";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import GardenCard from "@/app/_components/garden/GardenCard";

export default function GardenPageClient({ entries }) {
  const t = useTranslations("garden");

  const seedlings = entries.filter((e) => e.growthStage === "seedling");
  const budding = entries.filter((e) => e.growthStage === "budding");
  const evergreen = entries.filter((e) => e.growthStage === "evergreen");

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
            {evergreen.length > 0 && (
              <section>
                <h2
                  className="text-sm font-medium mb-4 pb-2 border-b"
                  style={{
                    color: "var(--muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  {t("evergreen")}
                </h2>
                <div className="space-y-1">
                  {evergreen.map((entry) => (
                    <GardenCard key={entry._id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {budding.length > 0 && (
              <section>
                <h2
                  className="text-sm font-medium mb-4 pb-2 border-b"
                  style={{
                    color: "var(--muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  {t("growing")}
                </h2>
                <div className="space-y-1">
                  {budding.map((entry) => (
                    <GardenCard key={entry._id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {seedlings.length > 0 && (
              <section>
                <h2
                  className="text-sm font-medium mb-4 pb-2 border-b"
                  style={{
                    color: "var(--muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  {t("seedling")}
                </h2>
                <div className="space-y-1">
                  {seedlings.map((entry) => (
                    <GardenCard key={entry._id} entry={entry} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {entries.length === 0 && (
            <p className="text-center py-12" style={{ color: "var(--muted)" }}>
              {t("empty")}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
