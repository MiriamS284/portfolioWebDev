/**
 * Seed Case Studies as drafts in Sanity
 *
 * Usage:
 *   node scripts/seed-case-studies.mjs --dry-run   # Preview without writing
 *   node scripts/seed-case-studies.mjs             # Create drafts in Sanity
 *   node scripts/seed-case-studies.mjs --only=slug # Only process one slug
 *
 * Requires SANITY_API_TOKEN in .env.local (never commit this token!)
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dependency needed)
function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // File not found is OK in dry-run mode
  }
}

loadEnv(join(__dirname, "..", ".env.local"));

const DRY_RUN = process.argv.includes("--dry-run");
const ONLY_SLUG = process.argv.find(a => a.startsWith("--only="))?.slice(7);

// ─── Sanity Client ───────────────────────────────────────────────────────────

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── Case Study Data ─────────────────────────────────────────────────────────

const caseStudies = [
  {
    slug: "fachportal-netzwerk-kinderschutz-fruehe-hilfen",
    publishedAt: "2026-11-24",
    title: {
      de: "Ein Fachportal für das Netzwerk Kinderschutz & Frühe Hilfen im Altenburger Land",
      en: "A specialist portal for the Child Protection & Early Support Network in Altenburger Land",
    },
    excerpt: {
      de: "Familien, Fachkräfte und Netzwerkpartner im Landkreis finden Angebote, Termine und Anlaufstellen jetzt an einem Ort. Dazu gehören eine Karte mit allen Anlaufstellen, ein geschützter Bereich für Fachkräfte und eine Redaktion, die alles selbst pflegt, auf Deutsch und Englisch.",
      en: "Families, professionals and network partners in the district now find services, events and contact points in one place. The portal includes a map of all contact points, a protected area for professionals and an editorial back end that the administration runs itself, in German and English.",
    },
    body: {
      de: `### Ausgangslage

Das Netzwerk Kinderschutz & Frühe Hilfen verbindet im Altenburger Land Angebote für Eltern, für Kinder und Jugendliche und für Fachkräfte. Es gab eine WordPress-Seite, die vor allem präsentieren sollte. Inhalte oder Struktur selbst zu ändern, war kaum möglich. Daneben lagen Informationen auf mehreren Portalen, jedes anders gepflegt und unterschiedlich aktuell. Wer als Mutter oder Vater schnell eine Beratungsstelle brauchte, musste erst wissen, wo man überhaupt nachschaut.

Der Landkreis wollte das bündeln: ein Portal für Familien und Netzwerkpartner, eine Karte mit den Anlaufstellen und einen geschützten Bereich für Fachkräfte. Die Verwaltung sollte alles selbst pflegen und erweitern können. Für Wartung und Weiterentwicklung gibt es einen mehrjährigen Rahmen.

### Weniger zeigen, schneller helfen

Informationsportale wachsen mit der Zeit gern in die Breite, bis man darin kaum noch etwas findet. Wer Hilfe sucht, oft in einer belastenden Situation, will in wenigen Schritten bei der passenden Stelle sein. Ich habe das Portal deshalb nach den Menschen sortiert, die es benutzen. Am Anfang steht die Frage, wer man ist: Eltern, Kinder und Jugendliche oder Fachkraft. Erst danach geht es um Themen. Die Karte zeigt Anlaufstellen nach Kategorien gefiltert, und Termine lassen sich mit einem Klick in den eigenen Kalender übernehmen.

### Umsetzung

Das Portal läuft auf Next.js mit TypeScript und Supabase, die Datenbank steht in Frankfurt. Rollen und Rechte für Fachkräfte und Redaktion sind direkt in der Datenbank festgelegt, mit Row Level Security. Deutsch und Englisch liegen in denselben Datensätzen, so pflegt die Redaktion beide Sprachen an einer Stelle.

Weitere Bausteine:

- Termine mit wiederkehrenden Serien und iCal-Export
- „Familiennavi", eine interaktive Karte mit filterbaren Anlaufstellen
- ein Netzwerkdiagramm der Partner
- ein Redaktionsbereich für Termine, Neuigkeiten, Anlaufstellen, Angebote und Dokumente

Das Datenmodell ist über gut 50 Migrationen gewachsen. Playwright-Tests prüfen die wichtigsten Abläufe, auch auf Barrierefreiheit.

### Wer darf welche Datei sehen?

Fachkräfte tauschen über das Portal interne Unterlagen aus. Bei einer Sicherheitsprüfung fiel mir auf, dass diese Dateien in einem öffentlich lesbaren Speicher lagen. Mit der richtigen Adresse hätte man sie ohne Anmeldung öffnen können. Ich habe das an mehreren Stellen geschlossen. Die Datenbank gibt Fachkraft-Dokumente nur an Nutzer mit Fachkraft-Rolle heraus, der Speicher ist privat, und heruntergeladen wird über eine Serverroute. Sie prüft die Berechtigung und erzeugt einen Link, der nach fünf Minuten nicht mehr funktioniert. Hochladen und löschen darf nur die Redaktion.

\`\`\`sql
-- Fachkraft-Dokumente gibt die Datenbank nur an Fachkräfte heraus
create policy documents_read on documents for select
  using (access_level = 'public'
         or (access_level = 'fachkraefte' and is_staff()));

-- Der Speicher ist privat, Dateien sind nicht mehr über die URL erreichbar
UPDATE storage.buckets SET public = false WHERE id = 'documents';
\`\`\`

### Ergebnis

Familien, Fachkräfte und Netzwerkpartner haben jetzt einen gemeinsamen Ort statt mehrerer Portale. Über ihren Einstieg kommen sie in wenigen Schritten zur passenden Information oder zur nächsten Anlaufstelle auf der Karte. Die Redaktion pflegt Inhalte, Termine und Karte selbst, in beiden Sprachen und mit einem Benutzerhandbuch zur Seite. Neue Themen oder Partner lassen sich ergänzen, ohne das Portal umzubauen.

### Rückblick

Am meisten Zeit habe ich anfangs mit Fragen verbracht: Wer sucht hier was, in welcher Lage, und wie schnell muss die Antwort da sein? Die Antworten darauf haben mehr Entscheidungen bestimmt als jede technische Überlegung. Technisch nehme ich mit, Zugriffsregeln von Anfang an in der Datenbank festzulegen. Dort greifen sie auch dann, wenn an der Oberfläche einmal etwas übersehen wird.`,
      en: `### Background

The Child Protection & Early Support Network connects services for parents, for children and young people and for professionals in the district of Altenburger Land. There was a WordPress site, built mainly to present the network. Changing content or structure in-house was hardly possible. On top of that, information sat on several portals, each maintained differently and kept up to date to different degrees. A parent who urgently needed a counselling service first had to know where to look.

The district wanted to bring this together: one portal for families and network partners, a map of contact points and a protected area for professionals. The administration should be able to maintain and extend everything itself. Maintenance and further development run within a multi-year framework.

### Show less, help faster

Information portals tend to grow wider over time until it is hard to find anything in them. People looking for help, often in a stressful situation, want to reach the right place in a few steps. So I organised the portal around the people who use it. It starts with who you are: parent, child or young person, or professional. Topics come after that. The map shows contact points filtered by category, and events can be added to your own calendar with one click.

### How it is built

The portal runs on Next.js with TypeScript and Supabase, with the database in Frankfurt. Roles and permissions for professionals and editors are defined directly in the database using row level security. German and English live in the same records, so editors maintain both languages in one place.

Other building blocks:

- Events with recurring series and iCal export
- "Familiennavi", an interactive map with filterable contact points
- A network diagram of the partners
- An editorial area for events, news, contact points, services and documents

The data model has grown over more than 50 migrations. Playwright tests cover the key flows, including accessibility.

### Who may see which file?

Professionals use the portal to share internal documents. During a security review I noticed that these files were stored in a publicly readable bucket. With the right URL, anyone could have opened them without logging in. I closed this at several points. The database only returns documents for professionals to users with that role, storage is private, and downloads go through a server route. It checks permissions and creates a link that stops working after five minutes. Only editors can upload and delete.

\`\`\`sql
-- The database only returns documents for professionals to professionals
create policy documents_read on documents for select
  using (access_level = 'public'
         or (access_level = 'fachkraefte' and is_staff()));

-- Storage is private, files can no longer be reached by URL
UPDATE storage.buckets SET public = false WHERE id = 'documents';
\`\`\`

### Outcome

Families, professionals and network partners now share one place instead of several portals. From their own entry point, a few steps take them to the right information or to the nearest contact point on the map. The editorial team maintains content, events and the map itself, in both languages and with a user manual to hand. New topics or partners can be added without rebuilding the portal.

### Looking back

Early on, I spent most of my time on questions: who is looking for what here, in which situation, and how quickly do they need an answer? The answers shaped more decisions than any technical consideration. On the technical side, I take away the habit of defining access rules in the database from the start. That way they still hold if something is ever overlooked in the interface.`,
    },
  },
  {
    slug: "von-der-einzelloesung-zur-plattform-coaching-app",
    publishedAt: "2026-11-23",
    title: {
      de: "Wie aus einer Coaching-App für einen Kunden eine Plattform für viele Coaches wird",
      en: "How a coaching app for one client is becoming a platform for many coaches",
    },
    excerpt: {
      de: "2025 habe ich für einen Health Coach eine App für Kunden, Trainingspläne und Termine gebaut. Jetzt entwickle ich sie neu, damit mehrere Coaches sie nutzen können, jeder mit eigenen Kunden, eigenen Daten und klaren Rollen.",
      en: "In 2025 I built an app for a health coach to manage clients, training plans and appointments. I am now rebuilding it so that several coaches can use it, each with their own clients, their own data and clear roles.",
    },
    body: {
      de: `### Ausgangslage

Die erste Version entstand 2025 für einen Health Coach: Kundenverwaltung, Kalender, Trainingspläne und PDF-Dokumente, gebaut mit Next.js und Supabase. Sie ist bis heute im Einsatz. Je mehr dazukam, desto deutlicher wurden die Grenzen. Die App war auf einen einzigen Kunden zugeschnitten, und jede neue Funktion machte sie schwerer zu ändern. Andere Coaches hätten sie in dieser Form nicht nutzen können.

### Umsetzung

Bei der Neuentwicklung habe ich mir zuerst die Struktur vorgenommen. Website und App sind getrennt. Gemeinsame Teile wie Design, Fachlogik, Datenbankzugriff und E-Mails liegen in eigenen Paketen eines Monorepos mit Turborepo und pnpm. Alles ist in TypeScript geschrieben. Regeln wie „Wer darf was?" oder „Welcher Status darf auf welchen folgen?" stehen an genau einer Stelle, unabhängig vom Framework.

Jeder Coach ist ein eigener Mandant. Jede Tabelle hat eine Mandanten-ID, und die Datenbank sorgt per Row Level Security selbst dafür, dass niemand fremde Daten sieht. Es gibt drei Rollen: Admin, Trainer und Kunde. Trainer sehen nur die Kunden, die ihnen zugewiesen sind. Gesundheitsdaten werden erst gespeichert, wenn die Einwilligung vorliegt.

Fachlich übernimmt die Plattform alles aus der ersten Version und baut es aus: Anamnese in acht Schritten, SMART-Ziele, Trainings- und Ernährungspläne, Fortschritt, Journal und Check-ins. Bezahlt wird über Stripe, und ob etwas bezahlt ist, entscheidet allein der Stripe-Webhook. Betrieben wird das Ganze mit Docker und Caddy auf einem eigenen Server.

### Jede Aktion durch dieselbe Tür

Jede Änderung an Daten muss dieselben Fragen beantworten: Wer ist angemeldet, mit welcher Rolle, für welchen Mandanten, mit welchem Recht? Und sind die Eingaben gültig? Ich wollte nicht, dass diese Prüfungen in jeder Funktion neu geschrieben werden und irgendwann an einer Stelle fehlen. Deshalb läuft jede Server Action durch einen gemeinsamen Wrapper, der sie in fester Reihenfolge abarbeitet. Fehler aus der Datenbank übersetzt er in Meldungen, mit denen Nutzer etwas anfangen können, ohne interne Details zu verraten. Dazu prüfen 64 automatisierte Tests, ob die Regeln in der Datenbank wirklich greifen.

\`\`\`typescript
/** Übersetzt Datenbank-Fehler in verständliche Meldungen, ohne Interna preiszugeben. */
export function friendlyError(err: unknown): string {
  const e = errorInfo(err);
  if (e.code === "42501" || e.message?.includes("row-level security"))
    return "Dafür fehlt dir die Berechtigung.";
  if (e.message?.startsWith("invalid_transition"))
    return "Dieser Statuswechsel ist nicht möglich.";
  return "Das hat nicht geklappt. Bitte versuch es noch einmal.";
}
\`\`\`

### Stand

Das Datenbankschema für alle Bereiche der bisherigen App ist fertig, die wichtigsten Module laufen. Der bisherige Kunde ist der erste Mandant. Weitere Coaches können dazukommen, ohne dass sich an der Struktur etwas ändern muss.

### Rückblick

Ohne die erste Version wüsste ich nicht, was Coaches im Alltag wirklich brauchen. Die zweite baue ich so, dass sie mit diesen Anforderungen wachsen kann.`,
      en: `### Background

The first version was built in 2025 for a health coach: client management, calendar, training plans and PDF documents, using Next.js and Supabase. It is still in use today. The more was added, the clearer its limits became. The app was tailored to a single client, and every new feature made it harder to change. Other coaches could not have used it in that form.

### How it is built

For the rebuild, I started with the structure. Website and app are separate. Shared parts such as design, business logic, data access and email live in their own packages in a monorepo with Turborepo and pnpm. Everything is written in TypeScript. Rules like "who may do what?" or "which status may follow which?" are defined in exactly one place, independent of the framework.

Each coach is a separate tenant. Every table has a tenant ID, and the database itself uses row level security to make sure nobody sees anyone else's data. There are three roles: admin, trainer and client. Trainers only see the clients assigned to them. Health data is only stored once consent has been given.

Functionally, the platform takes over everything from the first version and extends it: an eight-step anamnesis, SMART goals, training and nutrition plans, progress, journal and check-ins. Payments run through Stripe, and only the Stripe webhook decides whether something has been paid. The whole thing runs with Docker and Caddy on a self-managed server.

### Every action through the same door

Every change to data has to answer the same questions: who is logged in, with which role, for which tenant, with which permission? And is the input valid? I did not want these checks rewritten in every function, only to go missing somewhere one day. So every server action runs through a shared wrapper that works through them in a fixed order. It turns database errors into messages users can act on, without revealing internal details. On top of that, 64 automated tests check that the database rules really hold.

\`\`\`typescript
/** Translates database errors into clear messages without exposing internals. */
export function friendlyError(err: unknown): string {
  const e = errorInfo(err);
  if (e.code === "42501" || e.message?.includes("row-level security"))
    return "Dafür fehlt dir die Berechtigung.";
  if (e.message?.startsWith("invalid_transition"))
    return "Dieser Statuswechsel ist nicht möglich.";
  return "Das hat nicht geklappt. Bitte versuch es noch einmal.";
}
\`\`\`

### Status

The database schema for every area of the previous app is complete, and the main modules are running. The original client is the first tenant. Further coaches can join without any change to the structure.

### Looking back

Without the first version, I would not know what coaches really need day to day. I am building the second so that it can grow with those needs.`,
    },
  },
  {
    slug: "von-wordpress-zur-dreisprachigen-plattform-konzertpianist",
    publishedAt: "2026-11-22",
    title: {
      de: "Die Website eines Konzertpianisten mit eigenem Redaktionssystem",
      en: "A concert pianist's website with its own editing system",
    },
    excerpt: {
      de: "Die alte WordPress-Seite eines Konzertpianisten habe ich durch eine dreisprachige Anwendung mit Next.js und Sanity ersetzt. Das Redaktionssystem ist auf seinen Alltag zugeschnitten: Wer ein Konzert einträgt, ergänzt damit automatisch das Repertoire, und das Repertoire lässt sich als PDF in drei Sprachen herunterladen.",
      en: "I replaced a concert pianist's old WordPress site with a trilingual application built on Next.js and Sanity. The editing system fits his daily routine: entering a concert automatically updates his repertoire, which can be downloaded as a PDF in three languages.",
    },
    body: {
      de: `### Ausgangslage

Die bisherige Seite lief auf WordPress. Inhalte zu ändern war mühsam, auf dem Smartphone sah sie nicht gut aus, und zum Anspruch eines international auftretenden Pianisten passte sie nicht. Veranstalter, Presse und Publikum kommen aus Deutschland, dem übrigen Europa und Russland, deshalb sollte die neue Seite dreisprachig sein. Und er wollte sie selbst pflegen können, ohne jedes Mal jemanden anrufen zu müssen.

### Umsetzung

Die Seite ist mit Next.js, TypeScript und Tailwind CSS gebaut. Seiten werden vorab erzeugt und nur neu gebaut, wenn sich Inhalte ändern, deshalb lädt sie schnell. Die Inhalte liegen in Sanity, einem Headless CMS. Inhalte und Darstellung sind also getrennt, und das Design kann sich ändern, ohne dass jemand Texte anfassen muss.

Für Konzerte, Repertoire, Aufnahmen, Pressestimmen und die Biografie gibt es ein eigenes Datenmodell, alles auf Deutsch, Englisch und Russisch. Die vorhandenen Texte habe ich per Skript über die Sanity-API übernommen, statt sie abzutippen. Die russischen Empfehlungsschreiben habe ich selbst ins Deutsche und Englische übersetzt.

### Ein Redaktionssystem für genau diesen Nutzer

Sanity bringt ein Standard-Backend mit. Ich habe es so angepasst, dass es zu seinem Alltag passt:

- Das Redaktionssystem ist in die Website eingebunden und über eine eigene Adresse erreichbar. Zusätzliche Software braucht er nicht.
- Was er oft pflegt, Konzerte und Pressestimmen, steht in der Navigation oben. Seltene Einstellungen stehen unten.
- Lange Formulare sind in Reiter aufgeteilt.
- Biografie, Kontakt und Einstellungen gibt es nur einmal. Eine zweite Biografie lässt sich nicht versehentlich anlegen.

Dazu habe ich ein Handbuch geschrieben, mit Glossar und Schritt-für-Schritt-Anleitungen für jemanden, der sonst wenig mit Technik zu tun hat.

### Konzert eintragen, Repertoire pflegt sich mit

Zu jedem Konzert trägt er das Programm ein. Neue Stücke sollten danach auch in seinem Repertoire stehen, ohne dass er sie ein zweites Mal erfasst. Dafür habe ich die Veröffentlichen-Aktion im CMS erweitert: Markierte Werke werden beim Veröffentlichen automatisch als Repertoire-Einträge angelegt. Das Repertoire kann er außerdem jederzeit als PDF herunterladen, in jeder der drei Sprachen und immer auf dem aktuellen Stand.

\`\`\`typescript
/**
 * Erweiterte Veröffentlichen-Aktion: legt aus den Werken eines Konzerts
 * automatisch Repertoire-Einträge an, wenn „addToRepertoire" gesetzt ist.
 */
export const createPublishWithRepertoireAction = (
  originalPublishAction: DocumentActionComponent
): DocumentActionComponent => { /* … */ };
\`\`\`

### Ergebnis

Eine schnelle Website in drei Sprachen, die der Pianist selbst pflegt. Konzerte und Repertoire muss er nicht mehr doppelt eintragen, und für Veranstalter hat er sein Repertoire jederzeit als aktuelles PDF zur Hand.

### Rückblick

Bei diesem Projekt habe ich gelernt, ein CMS vom Alltag der Person her zu denken, die damit arbeitet. Die Repertoire-Automatik war technisch kein großer Aufwand. Ihm spart sie bei jedem Konzert Arbeit.`,
      en: `### Background

The previous site ran on WordPress. Updating content was tedious, it did not look good on a smartphone, and it did not match the standing of an internationally performing pianist. Promoters, press and audiences come from Germany, the rest of Europe and Russia, so the new site needed three languages. And he wanted to maintain it himself without having to call someone every time.

### How it is built

The site is built with Next.js, TypeScript and Tailwind CSS. Pages are generated in advance and only rebuilt when content changes, which keeps it fast. Content lives in Sanity, a headless CMS. Content and presentation are therefore separate, and the design can change without anyone touching the text.

There is a dedicated data model for concerts, repertoire, recordings, press quotes and the biography, all in German, English and Russian. I migrated the existing texts by script via the Sanity API instead of retyping them. I translated the Russian letters of recommendation into German and English myself.

### An editing system for exactly this user

Sanity comes with a standard back end. I adapted it to fit his routine:

- The editing system is built into the website and has its own address. He does not need any extra software.
- What he updates often, concerts and press quotes, sits at the top of the navigation. Rarely used settings sit at the bottom.
- Long forms are split into tabs.
- Biography, contact and settings exist only once. A second biography cannot be created by accident.

I also wrote a manual with a glossary and step-by-step instructions for someone who otherwise has little to do with technology.

### Enter a concert, the repertoire updates itself

For every concert he enters the programme. New pieces should then also appear in his repertoire without being entered twice. I extended the publish action in the CMS for this: flagged works are automatically created as repertoire entries when a concert is published. He can also download the repertoire as a PDF at any time, in any of the three languages and always up to date.

\`\`\`typescript
/**
 * Extended publish action: creates repertoire entries from a concert's works
 * automatically when "addToRepertoire" is set.
 */
export const createPublishWithRepertoireAction = (
  originalPublishAction: DocumentActionComponent
): DocumentActionComponent => { /* … */ };
\`\`\`

### Outcome

A fast website in three languages that the pianist maintains himself. He no longer has to enter concerts and repertoire twice, and he always has an up-to-date repertoire PDF ready for promoters.

### Looking back

This project taught me to design a CMS around the daily routine of the person who works with it. The repertoire automation was not much effort technically. For him, it saves work with every concert.`,
    },
  },
  {
    slug: "linkedin-beitraege-im-eigenen-stil",
    publishedAt: "2026-11-21",
    title: {
      de: "Eine Anwendung für LinkedIn-Beiträge im eigenen Stil",
      en: "An application for LinkedIn posts in your own voice",
    },
    excerpt: {
      de: "Eines meiner ersten Kundenprojekte aus dem Jahr 2024: Die Anwendung erarbeitet mit Nutzerinnen und Nutzern einen persönlichen Stil-Leitfaden und schreibt auf dieser Grundlage LinkedIn-Beiträge. Gebaut mit React, Node.js, MongoDB und der OpenAI API.",
      en: "One of my first client projects, from 2024: the application works out a personal style guide with each user and writes LinkedIn posts on that basis. Built with React, Node.js, MongoDB and the OpenAI API.",
    },
    body: {
      de: `### Ausgangslage

Das Projekt entstand 2024 für einen Auftraggeber, den ich hier nicht nenne, und gehört zu meinen ersten Kundenprojekten. Die Idee: Wer regelmäßig auf LinkedIn schreibt, bekommt Unterstützung von einem Sprachmodell, klingt am Ende aber nach sich selbst. Das sollte auch für Menschen funktionieren, die noch keine eigenen Beispieltexte haben.

### Umsetzung

Das Frontend ist mit React (Vite), React Query und styled-components gebaut, das Backend als REST-API mit Node.js und Express. Nutzer, Stil-Leitfäden und Beiträge liegen in MongoDB. Die Anmeldung läuft über JWT, Passwörter werden mit bcrypt gehasht, und Helmet setzt die Sicherheits-Header. Ein Assistent führt in mehreren Schritten durch Tonalität, Zielgruppe, Themen und Beispiele. Die Beiträge erzeugt die OpenAI API, verwaltet werden sie im Dashboard.

### Der Stil-Leitfaden als Herzstück

Lässt man ein Sprachmodell einfach drauflos schreiben, klingt jeder Beitrag ein bisschen anders. Wichtiger als der API-Aufruf war deshalb der Stil-Leitfaden. Er wird einmal mit der Person erarbeitet, gespeichert und bei jeder Generierung mitgegeben. So bleiben Ton und Themen über viele Beiträge hinweg gleich.

### Ergebnis

Die Anwendung wurde vollständig umgesetzt, von der Anmeldung über den Assistenten bis zur Verwaltung der Beiträge, und an den Auftraggeber übergeben.

### Rückblick

Hier habe ich zum ersten Mal ein Sprachmodell in eine Anwendung eingebaut. Würde ich das Projekt heute neu beginnen, würde ich die Ausgaben strenger prüfen, Prompts versionieren und alles in TypeScript schreiben. So arbeite ich inzwischen in KI-Projekten.`,
      en: `### Background

I built this project in 2024 for a client I do not name here, and it was one of my first client projects. The idea: people who post regularly on LinkedIn get support from a language model but still end up sounding like themselves. It also had to work for people who do not yet have sample texts of their own.

### How it is built

The front end is built with React (Vite), React Query and styled-components, the back end as a REST API with Node.js and Express. Users, style guides and posts are stored in MongoDB. Login uses JWT, passwords are hashed with bcrypt, and Helmet sets the security headers. A wizard guides users through tone, audience, topics and examples in several steps. Posts are generated via the OpenAI API and managed in the dashboard.

### The style guide at the centre

If you let a language model simply write away, every post sounds a little different. The style guide therefore mattered more than the API call. It is worked out once with the person, stored and passed along with every generation. That keeps tone and topics consistent across many posts.

### Outcome

The application was fully built, from login and the wizard to post management, and handed over to the client.

### Looking back

This was the first time I built a language model into an application. If I started the project today, I would check the output more strictly, version the prompts and write everything in TypeScript. That is how I work on AI projects now.`,
    },
  },
];

// ─── Markdown to Portable Text ───────────────────────────────────────────────

function generateKey() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function markdownToPortableText(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // H2 heading (### in source becomes H2 in Sanity)
    if (line.startsWith("### ")) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: generateKey(), text: line.slice(4).trim(), marks: [] }],
      });
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || "text";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ _type: "code", _key: generateKey(), language, code: codeLines.join("\n") });
      i++;
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      while (i < lines.length && lines[i].startsWith("- ")) {
        blocks.push({
          _type: "block",
          _key: generateKey(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: generateKey(), text: lines[i].slice(2).trim(), marks: [] }],
        });
        i++;
      }
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        blocks.push({
          _type: "block",
          _key: generateKey(),
          style: "normal",
          listItem: "number",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: generateKey(), text: lines[i].replace(/^\d+\.\s/, "").trim(), marks: [] }],
        });
        i++;
      }
      continue;
    }

    // Regular paragraph
    const paragraphLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: generateKey(), text: paragraphLines.join(" "), marks: [] }],
      });
    }
  }

  return blocks;
}

// ─── Build Sanity Documents ──────────────────────────────────────────────────

function buildDocuments() {
  return caseStudies.map((cs) => ({
    _id: `drafts.${cs.slug}`,
    _type: "blogPost",
    title: { de: cs.title.de, en: cs.title.en },
    slug: { _type: "slug", current: cs.slug },
    excerpt: { de: cs.excerpt.de, en: cs.excerpt.en },
    body: { de: markdownToPortableText(cs.body.de), en: markdownToPortableText(cs.body.en) },
    publishedAt: cs.publishedAt,
  }));
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }

  if (!DRY_RUN && !process.env.SANITY_API_TOKEN) {
    console.error("Missing SANITY_API_TOKEN in .env.local (required for write)");
    process.exit(1);
  }

  let documents = buildDocuments();

  if (ONLY_SLUG) {
    documents = documents.filter((d) => d.slug.current === ONLY_SLUG);
    if (documents.length === 0) {
      console.error(`No case study found with slug: ${ONLY_SLUG}`);
      process.exit(1);
    }
  }

  console.log(`\n📄 ${documents.length} Case Stud${documents.length === 1 ? "y" : "ies"} prepared\n`);
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}`);
  console.log(`Mode: ${DRY_RUN ? "DRY RUN (no changes)" : "LIVE (will create drafts)"}\n`);

  for (const doc of documents) {
    console.log(`─────────────────────────────────────────────────────────`);
    console.log(`ID:    ${doc._id}`);
    console.log(`Slug:  ${doc.slug.current}`);
    console.log(`Title: ${doc.title.de}`);
    console.log(`Date:  ${doc.publishedAt}`);
    console.log(`Body DE: ${doc.body.de.length} blocks`);
    console.log(`Body EN: ${doc.body.en.length} blocks`);
  }

  console.log(`─────────────────────────────────────────────────────────\n`);

  if (DRY_RUN) {
    console.log("🔍 DRY RUN complete. Run without --dry-run to create drafts.\n");
    return;
  }

  console.log("Creating drafts in Sanity...\n");

  const transaction = client.transaction();
  for (const doc of documents) {
    transaction.createOrReplace(doc);
  }

  try {
    const result = await transaction.commit();
    console.log(`✅ Created ${result.documentIds.length} drafts:\n`);
    for (const id of result.documentIds) {
      console.log(`   ${id}`);
    }
    console.log("\nOpen Sanity Studio to review and publish.\n");
  } catch (error) {
    console.error("❌ Error creating documents:", error.message);
    process.exit(1);
  }
}

main();
