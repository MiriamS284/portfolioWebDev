"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import { LiaSeedlingSolid } from "react-icons/lia";
import { GiPlantRoots, GiSunflower } from "react-icons/gi";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import GardenGrid from "@/app/_components/garden/GardenGrid";

const texts = {
  de: {
    back: "Zurück",
    label: "Digitaler Garten",
    title: "Digital Garden",
    subtitle:
      "Ein lebendiger Raum für Gedanken, die wachsen, sich verbinden und entwickeln.",
    infoTitle: "Was ist ein Digital Garden?",
    infoText:
      "Anders als ein traditioneller Blog ist dies ein organischer Raum, in dem Gedanken gepflanzt, gepflegt und mit anderen vernetzt werden. Notizen sind niemals 'fertig' – sie wachsen, verändern sich und entwickeln sich im Laufe der Zeit.",
    evergreen: "Evergreen",
    evergreenDesc: "Ausgereifte Gedanken und etablierte Konzepte",
    growing: "Growing",
    growingDesc: "Ideen die gerade wachsen und sich entwickeln",
    seedling: "Seedlings",
    seedlingDesc: "Neue Gedanken und erste Notizen",
    empty: "Der Garten wird gerade angelegt... Bald wachsen hier erste Ideen!",
  },
  en: {
    back: "Back",
    label: "Digital Garden",
    title: "Digital Garden",
    subtitle:
      "A living space for thoughts that grow, connect, and evolve over time.",
    infoTitle: "What is a Digital Garden?",
    infoText:
      "Unlike a traditional blog, this is an organic space where thoughts are planted, nurtured, and connected. Notes are never 'finished' – they grow, change, and evolve over time.",
    evergreen: "Evergreen",
    evergreenDesc: "Mature thoughts and established concepts",
    growing: "Growing",
    growingDesc: "Ideas that are currently developing",
    seedling: "Seedlings",
    seedlingDesc: "New thoughts and initial notes",
    empty: "The garden is being planted... Ideas will grow here soon!",
  },
};

export default function GardenPageClient({ entries }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <BackLink href="/">{t.back}</BackLink>

          <div
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--muted)", opacity: 0.5 }}
          >
            {t.label}
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              textShadow:
                "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
            }}
          >
            {t.title}
          </h1>

          <p
            className="text-lg md:text-xl mb-12 max-w-2xl"
            style={{ color: "var(--muted)" }}
          >
            {t.subtitle}
          </p>

          <div
            className="mb-16 p-6 rounded-2xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start gap-4">
              <GiPlantRoots
                className="w-8 h-8 flex-shrink-0 mt-0.5"
                style={{ color: "var(--muted)", opacity: 0.6 }}
              />
              <div>
                <p
                  className="font-semibold mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  {t.infoTitle}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {t.infoText}
                </p>
              </div>
            </div>
          </div>

          {evergreen.length > 0 && (
            <GardenSection
              icon={GiSunflower}
              title={t.evergreen}
              description={t.evergreenDesc}
              entries={evergreen}
            />
          )}

          {budding.length > 0 && (
            <GardenSection
              icon={GiPlantRoots}
              title={t.growing}
              description={t.growingDesc}
              entries={budding}
            />
          )}

          {seedlings.length > 0 && (
            <GardenSection
              icon={LiaSeedlingSolid}
              title={t.seedling}
              description={t.seedlingDesc}
              entries={seedlings}
            />
          )}

          {entries.length === 0 && (
            <div
              className="text-center py-20 rounded-2xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <LiaSeedlingSolid
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "var(--muted)", opacity: 0.5 }}
              />
              <p style={{ color: "var(--muted)" }}>{t.empty}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function GardenSection({ icon: Icon, title, description, entries }) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex items-center gap-3">
        <Icon
          className="w-6 h-6"
          style={{ color: "var(--muted)", opacity: 0.7 }}
        />
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--ink)" }}>
            {title}
          </h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {description}
          </p>
        </div>
      </div>
      <GardenGrid entries={entries} />
    </section>
  );
}
