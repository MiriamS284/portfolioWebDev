import { client } from "@/lib/sanity";
import { allGardenEntriesQuery } from "@/lib/sanity/queries";
import GardenPageClient from "./GardenPageClient";

export const metadata = {
  title: "Digital Garden | Miriam Sparbrod",
  description:
    "Ein lebendiger Raum für Gedanken, Ideen und Wissen - ständig wachsend und sich entwickelnd",
};

export const revalidate = 60;

export default async function GardenPage() {
  const entries = await client.fetch(allGardenEntriesQuery);

  return <GardenPageClient entries={entries || []} />;
}
