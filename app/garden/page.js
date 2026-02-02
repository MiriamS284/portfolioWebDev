import { client } from "@/lib/sanity";
import { allGardenEntriesQuery } from "@/lib/sanity/queries";
import Container from "../_components/shared/Container";
import PageHeader from "../_components/shared/PageHeader";
import GardenGrid from "../_components/garden/GardenGrid";

export const metadata = {
  title: "Digital Garden | Miriam Sparbrod",
  description:
    "Ein lebendiger Raum für Gedanken, Ideen und Wissen - ständig wachsend und sich entwickelnd",
};

export default async function GardenPage() {
  const entries = await client.fetch(allGardenEntriesQuery);

  // Gruppiere nach Growth Stage
  const seedlings = entries.filter((e) => e.growthStage === "seedling");
  const budding = entries.filter((e) => e.growthStage === "budding");
  const evergreen = entries.filter((e) => e.growthStage === "evergreen");

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container size="large">
        <PageHeader
          title="🌱 Digital Garden"
          subtitle="Ein lebendiger Raum für Gedanken, die wachsen, sich verbinden und entwickeln. Manche Ideen sind frisch gepflanzt, andere reifen noch, und wieder andere sind zu ausgereiften Konzepten herangewachsen."
        />

        {/* Info Box */}
        <div
          className="mb-12 p-6 rounded-2xl text-sm"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">🌿</span>
            <div>
              <p className="font-semibold mb-2">Was ist ein Digital Garden?</p>
              <p className="opacity-80 leading-relaxed">
                Anders als ein traditioneller Blog ist dies ein organischer
                Raum, in dem Gedanken gepflanzt, gepflegt und mit anderen
                vernetzt werden. Notizen sind niemals &quot;fertig&quot; – sie
                wachsen, verändern sich und entwickeln sich im Laufe der Zeit.
              </p>
            </div>
          </div>
        </div>

        {evergreen.length > 0 && (
          <GardenSection
            title="🌳 Evergreen - Ausgereifte Gedanken"
            description="Etablierte Konzepte und ausgereifte Ideen"
            entries={evergreen}
          />
        )}

        {budding.length > 0 && (
          <GardenSection
            title="🌿 Budding - In Entwicklung"
            description="Ideen die gerade wachsen und sich entwickeln"
            entries={budding}
          />
        )}

        {seedlings.length > 0 && (
          <GardenSection
            title="🌱 Seedlings - Frische Ideen"
            description="Neue Gedanken und erste Notizen"
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
            <span className="text-5xl mb-4 block">🌱</span>
            <p className="opacity-60">
              Der Garten wird gerade angelegt... Bald wachsen hier erste Ideen!
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

function GardenSection({ title, description, entries }) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-sm opacity-70">{description}</p>
      </div>
      <GardenGrid entries={entries} />
    </section>
  );
}
