import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Deine Sanity Projekt-Konfiguration
export const client = createClient({
  projectId: "jkt2hana", 
  dataset: "production",
  apiVersion: "2025-01-30",
  useCdn: true,
});

// Helper-Funktion für Bilder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}