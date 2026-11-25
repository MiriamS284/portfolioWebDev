import { jsonLd } from "@/lib/seo";

// Strukturierte Daten für Suchmaschinen (schema.org), serverseitig gerendert.
export default function JsonLd({ data }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}
