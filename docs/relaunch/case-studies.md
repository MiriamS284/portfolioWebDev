# Case Studies – Texte für Sanity (Typ `blogPost`)

Aufbau dieser Datei (für das Seed-Skript):
- `# Case Study N` beginnt ein Dokument.
- `## title.de`, `## title.en`, `## excerpt.de`, `## excerpt.en`, `## body.de`, `## body.en` sind die Felder.
- Im Body wird `###` zu einer H2-Überschrift, `-` zu einer Aufzählung, ```sql / ```typescript zu einem Code-Block.
- Texte in [eckigen Klammern] unverändert übernehmen (Miriam ergänzt sie im Studio).
- `publishedAt` steuert die Reihenfolge (neueste oben): Vorschlag steht bei jedem Dokument.

---

# Case Study 1

slug: fachportal-netzwerk-kinderschutz-fruehe-hilfen
publishedAt: 2026-11-24

## title.de
Fachportal mit geschütztem Fachkräftebereich: Netzwerk Kinderschutz & Frühe Hilfen Altenburger Land

## title.en
A specialist portal with a protected area for professionals: Child Protection & Early Support Network, Altenburger Land

## excerpt.de
Ein zweisprachiges Fachportal für Familien und Fachkräfte: Angebote nach Zielgruppe und Thema, Termine mit Serien und Kalenderexport, eine interaktive Karte und ein geschützter Bereich, in dem Dokumente nur nach Anmeldung und über zeitlich begrenzte Links abrufbar sind.

## excerpt.en
A bilingual specialist portal for families and professionals: services by audience and topic, events with recurring series and calendar export, an interactive map and a protected area where documents are only available after login and via time-limited links.

## body.de

### Ausgangslage und Ziel

Das Netzwerk Kinderschutz & Frühe Hilfen bündelt im Landkreis Altenburger Land Angebote für Eltern, Kinder und Jugendliche sowie Fachkräfte. Ziel war ein zentraler Ort, an dem Familien Angebote, Termine und Anlaufstellen finden, Fachkräfte geschützt auf interne Unterlagen zugreifen und die Verwaltung alle Inhalte selbst pflegt, ohne technische Vorkenntnisse. [Ausgangslage vorher ergänzen: Wie wurden Informationen bisher verteilt?]

### Lösung und Architektur

- Next.js (App Router) mit TypeScript, Supabase (PostgreSQL, Authentifizierung, Speicher), Datenbank in Frankfurt
- Rollen- und Rechtekonzept für Fachkräfte und Redaktion, durchgesetzt mit Row Level Security direkt in der Datenbank
- Zweisprachige Inhalte (Deutsch/Englisch) auf Datenebene: Die Redaktion pflegt beide Sprachen an einer Stelle
- Informationsarchitektur nach zwei Achsen: Zielgruppe (Eltern, Kinder und Jugendliche, Fachkräfte) und Thema
- Termine mit wiederkehrenden Serien und iCal-Export, „Familiennavi“ als interaktive Karte mit filterbaren Anlaufstellen, Netzwerkdiagramm der Partner
- Redaktions-Dashboard für Termine, Aktuelles, Anlaufstellen, Angebote und Dokumente
- Weiterentwicklung des Datenmodells über mehr als 50 versionierte Migrationen, automatisierte Tests mit Playwright einschließlich Barrierefreiheitsprüfungen

### Die schwierige Stelle: Dokumente, die wirklich geschützt sind

In einer frühen Version lagen Dokumente für Fachkräfte in einem öffentlich lesbaren Speicher. Wer die Adresse kannte, hätte sie ohne Anmeldung öffnen können. Ich habe den Speicher auf privat umgestellt. Downloads laufen seitdem nur noch über eine Serverroute, die zuerst die Berechtigung prüft und dann einen zeitlich begrenzten, signierten Link erzeugt. Hochladen und Löschen ist nur der Redaktion erlaubt. Öffentliche Materialien liegen getrennt davon in einem eigenen Bereich.

```sql
-- Bucket privat: Fachkraft-Dokumente nicht mehr über die URL abrufbar
UPDATE storage.buckets SET public = false WHERE id = 'documents';

-- Hochladen nur für die Redaktion
CREATE POLICY "CMS users can upload documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND public.is_cms_user());
```

### Ergebnis

Familien und Fachkräfte finden Angebote, Termine und Anlaufstellen an einer Stelle. Die Redaktion pflegt alle Inhalte selbst, unterstützt durch ein ausführliches Benutzerhandbuch. Interne Dokumente sind nur für berechtigte Fachkräfte erreichbar. [Ergebnis oder Zitat der Auftraggeberin ergänzen]

### Was ich mitgenommen habe

Sicherheit gehört in die Datenbank, nicht nur in die Oberfläche. Seitdem plane ich Zugriffsregeln, bevor ich die erste Seite baue.

## body.en

### Context and goal

The Child Protection & Early Support Network brings together services for parents, children and young people, and professionals in the district of Altenburger Land. The goal was a single place where families find services, events and contact points, professionals securely access internal documents, and the administration maintains all content itself without technical knowledge. [Add the previous situation]

### Solution and architecture

- Next.js (App Router) with TypeScript, Supabase (PostgreSQL, authentication, storage), database hosted in Frankfurt
- Role and permission model for professionals and editors, enforced with row level security directly in the database
- Bilingual content (German/English) at data level: editors maintain both languages in one place
- Information architecture along two axes: audience (parents, children and young people, professionals) and topic
- Events with recurring series and iCal export, “Familiennavi” as an interactive map of filterable contact points, a network diagram of partners
- Editorial dashboard for events, news, contact points, services and documents
- Data model evolved through more than 50 versioned migrations, automated tests with Playwright including accessibility checks

### The hard part: documents that are genuinely protected

In an early version, documents for professionals were stored in a publicly readable bucket. Anyone with the URL could have opened them without logging in. I made the bucket private. Downloads now only go through a server route that checks permissions first and then issues a time-limited signed link. Only editors can upload and delete. Public materials are kept separately in their own area.

```sql
-- Private bucket: documents for professionals are no longer reachable by URL
UPDATE storage.buckets SET public = false WHERE id = 'documents';

-- Upload only for editors
CREATE POLICY "CMS users can upload documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND public.is_cms_user());
```

### Outcome

Families and professionals find services, events and contact points in one place. The editorial team maintains all content itself, supported by a detailed user manual. Internal documents are only accessible to authorised professionals. [Add outcome or client quote]

### What I took away

Security belongs in the database, not just in the interface. Since then, I design access rules before I build the first page.

---

# Case Study 2

slug: von-der-einzelloesung-zur-plattform-coaching-app
publishedAt: 2026-11-23

## title.de
Von der Einzellösung zur Plattform: eine mandantenfähige Coaching-App

## title.en
From a single solution to a platform: a multi-tenant coaching app

## excerpt.de
Für einen Health Coach entstand zuerst eine App für Kunden-, Trainings- und Terminverwaltung. Heute entwickle ich sie als mandantenfähige Plattform neu: mit Rollen für Admin, Trainer und Kunden, besonderem Schutz für Gesundheitsdaten und Betrieb auf eigenem Server.

## excerpt.en
It began as an app for a health coach to manage clients, training and appointments. I am now rebuilding it as a multi-tenant platform: with roles for admins, trainers and clients, dedicated protection for health data and operation on a self-managed server.

## body.de

### Ausgangslage und Ziel

2025 entwickelte ich für einen Health Coach eine Web-App mit Kundenverwaltung, Kalender, Trainingsplänen und PDF-Dokumenten, umgesetzt mit Next.js und Supabase. Sie läuft im Alltag. Mit wachsendem Umfang wurde klar: Eine Einzellösung lässt sich schwer erweitern und nicht an weitere Coaches anbieten. Ziel der Neuentwicklung ist dieselbe Fachlichkeit als Plattform, die mehrere Coaches sicher voneinander getrennt nutzen können. [Ausgangslage aus Sicht des Coaches ergänzen]

### Lösung und Architektur

- Monorepo mit Turborepo und pnpm: öffentliche Website je Mandant und geschützte App getrennt, gemeinsame Pakete für Design-System, Fachlogik, Datenbankzugriff und E-Mails
- TypeScript durchgängig. Fachliche Regeln wie Rollen, Rechte, Statusübergänge und Validierung liegen framework-unabhängig in einem eigenen Paket
- Mandantentrennung in der Datenbank: Jede Tabelle trägt eine Mandanten-ID, der Zugriff läuft ausschließlich über Row Level Security
- Rollen Admin, Trainer und Kunde. Trainer sehen nur ihre zugewiesenen Kunden, Gesundheitsdaten werden erst nach Einwilligung erfasst
- Module: Anamnese-Assistent, SMART-Ziele, Trainings- und Ernährungspläne, Fortschritt, Journal, Check-ins
- Zahlungen über Stripe: Ausschließlich der Webhook darf einen Vorgang als bezahlt markieren
- Betrieb mit Docker und Caddy auf eigenem Server

### Die schwierige Stelle: jede Aktion gleich sicher

Jede schreibende Aktion muss dieselben Fragen beantworten: Ist jemand angemeldet? Mit welcher Rolle, für welchen Mandanten? Hat die Person das nötige Recht? Sind die Eingaben gültig? Statt das in jeder Funktion neu zu schreiben, läuft jede Server Action durch einen Wrapper, der genau diese Reihenfolge erzwingt. Fehler aus der Datenbank übersetzt er in verständliche Meldungen, ohne interne Details preiszugeben. 64 automatisierte Sicherheitstests prüfen zusätzlich, dass die Regeln in der Datenbank greifen.

```typescript
/** Übersetzt Datenbank-Fehler in verständliche Meldungen, ohne Interna preiszugeben. */
export function friendlyError(err: unknown): string {
  const e = errorInfo(err);
  if (e.code === "42501" || e.message?.includes("row-level security"))
    return "Dafür fehlt dir die Berechtigung.";
  if (e.message?.startsWith("invalid_transition"))
    return "Dieser Statuswechsel ist nicht möglich.";
  return "Das hat nicht geklappt. Bitte versuch es noch einmal.";
}
```

### Stand und Ergebnis

Das Datenbankschema für alle Bereiche der bisherigen App steht, die Kernmodule sind umgesetzt. Erster Mandant ist der bisherige Kunde. Die Plattform ist so angelegt, dass weitere Coaches hinzukommen können. [Stand vor Veröffentlichung aktualisieren]

### Was ich mitgenommen habe

Die erste Version hat gezeigt, was im Alltag gebraucht wird. Die zweite zeigt, was es braucht, damit Software wachsen kann.

## body.en

### Context and goal

In 2025 I built a web app for a health coach with client management, calendar, training plans and PDF documents, using Next.js and Supabase. It is in daily use. As it grew, it became clear that a single-client solution is hard to extend and cannot be offered to other coaches. The goal of the rebuild is the same functionality as a platform that several coaches can use, securely separated from each other. [Add the coach's perspective]

### Solution and architecture

- Monorepo with Turborepo and pnpm: a public website per tenant and a protected app, with shared packages for the design system, business logic, data access and email
- TypeScript throughout. Business rules such as roles, permissions, status transitions and validation live in a framework-independent package
- Tenant isolation in the database: every table carries a tenant ID, and access runs exclusively through row level security
- Roles for admin, trainer and client. Trainers only see their assigned clients; health data is only collected after consent
- Modules: anamnesis wizard, SMART goals, training and nutrition plans, progress, journal, check-ins
- Payments via Stripe: only the webhook may mark a transaction as paid
- Operated with Docker and Caddy on a self-managed server

### The hard part: every action equally secure

Every write action must answer the same questions: Is someone logged in? With which role, for which tenant? Do they have the required permission? Is the input valid? Rather than repeating this in every function, each server action runs through a wrapper that enforces exactly this order. It translates database errors into clear messages without exposing internals. In addition, 64 automated security tests verify that the database rules hold.

```typescript
/** Translates database errors into clear messages without exposing internals. */
export function friendlyError(err: unknown): string {
  const e = errorInfo(err);
  if (e.code === "42501" || e.message?.includes("row-level security"))
    return "Dafür fehlt dir die Berechtigung.";
  if (e.message?.startsWith("invalid_transition"))
    return "Dieser Statuswechsel ist nicht möglich.";
  return "Das hat nicht geklappt. Bitte versuch es noch einmal.";
}
```

### Status and outcome

The database schema for all areas of the previous app is complete, and the core modules are implemented. The first tenant is the original client. The platform is designed so that further coaches can join. [Update status before publishing]

### What I took away

The first version showed what is needed day to day. The second shows what it takes for software to grow.

---

# Case Study 3

slug: von-wordpress-zur-dreisprachigen-plattform-konzertpianist
publishedAt: 2026-11-22

## title.de
Von WordPress zur dreisprachigen Plattform: ein individuelles CMS für einen Konzertpianisten

## title.en
From WordPress to a trilingual platform: a custom CMS for a concert pianist

## excerpt.de
Der bisherige Auftritt auf PHP/WordPress-Basis wurde durch eine dreisprachige Anwendung mit Next.js und dem Headless CMS Sanity ersetzt. Die Inhaltsverwaltung ist auf den Künstler zugeschnitten und kennt seine Arbeitsabläufe: Ein veröffentlichtes Konzert ergänzt automatisch sein Repertoire, und das Repertoire gibt es jederzeit als PDF in drei Sprachen.

## excerpt.en
The previous PHP/WordPress site was replaced with a trilingual application built on Next.js and the headless CMS Sanity. Content management is tailored to the artist and knows his workflows: publishing a concert automatically extends his repertoire, which can be downloaded as a PDF in three languages at any time.

## body.de

### Ausgangslage und Ziel

Der bisherige Auftritt basierte auf PHP/WordPress. Inhalte zu pflegen war umständlich, die Seite war nicht für alle Endgeräte optimiert und entsprach nicht dem künstlerischen Anspruch. Veranstalter, Presse und Publikum kommen aus Deutschland, Europa und Russland. Ziel war ein schneller, dreisprachiger Auftritt, den der Künstler ohne Vorkenntnisse selbst pflegt. [prüfen und ergänzen]

### Lösung und Architektur

- Next.js (App Router) mit TypeScript und Tailwind CSS, statisch generierte Seiten, die bei Inhaltsänderungen gezielt aktualisiert werden
- Sanity als Headless CMS mit eigenem Datenmodell: Konzerte, Repertoire, Aufnahmen, Referenzen, Biografie
- Drei Sprachen (Deutsch, Englisch, Russisch) mit next-intl, alle Inhalte im CMS in drei Sprachen gepflegt
- Übernahme der bestehenden Inhalte per Skript über die Sanity-API statt händischem Abtippen
- Kontaktformular mit Validierung und Mailversand
- Empfehlungsschreiben aus dem Russischen selbst ins Deutsche und Englische übersetzt

### Headless CMS und eine eigene, zugängliche Inhaltsverwaltung

Inhalte und Darstellung sind getrennt: Sanity verwaltet die Inhalte, Next.js stellt sie dar. So lässt sich das Design ändern, ohne Inhalte anzufassen, und dieselben Inhalte können später auch andere Kanäle bedienen, etwa ein Presse-PDF. Die Inhaltsverwaltung habe ich nicht als Standard-Backend übernommen, sondern auf den Künstler zugeschnitten:

- Das Redaktionssystem ist direkt in die Website eingebunden und über eine eigene Adresse erreichbar, ohne zusätzliche Software
- Die Navigation folgt seinem Alltag: Was er am häufigsten pflegt, etwa Konzerte und Pressestimmen, steht oben, seltene Einstellungen unten
- Eingabemasken sind in thematische Reiter gegliedert, sodass jedes Formular übersichtlich bleibt
- Einmalige Inhalte wie Biografie, Kontakt und Einstellungen gibt es genau einmal und nicht als Liste, in der man versehentlich Duplikate anlegt
- Dazu kommt ein Benutzerhandbuch mit Glossar und Schritt-für-Schritt-Anleitungen, geschrieben für jemanden ohne Technikerfahrung

### Die schwierige Stelle: ein CMS, das mitdenkt

Der Künstler trägt zu jedem Konzert das Programm ein. Werke, die er neu ins Programm nimmt, sollten auch in seinem Repertoire erscheinen, ohne dass er sie ein zweites Mal erfasst. Dafür habe ich die Veröffentlichen-Aktion im CMS erweitert: Beim Veröffentlichen eines Konzerts werden markierte Werke automatisch als Repertoire-Einträge angelegt. Das Repertoire lässt sich außerdem jederzeit als PDF herunterladen, in drei Sprachen und erzeugt aus den aktuellen Daten.

```typescript
/**
 * Erweiterte Veröffentlichen-Aktion: legt aus den Werken eines Konzerts
 * automatisch Repertoire-Einträge an, wenn „addToRepertoire“ gesetzt ist.
 */
export const createPublishWithRepertoireAction = (
  originalPublishAction: DocumentActionComponent
): DocumentActionComponent => { /* … */ };
```

### Ergebnis

Eine schnelle, dreisprachige Website, die der Künstler selbst pflegt. Dazu gehört eine ausführliche Bedienungsanleitung mit Glossar und Schritt-für-Schritt-Anleitungen. Doppelte Pflege von Konzerten und Repertoire entfällt. [Ergebnis oder Zitat ergänzen]

### Was ich mitgenommen habe

Ein gutes CMS ist nicht das mit den meisten Feldern, sondern das, das die Abläufe der Person kennt, die es benutzt.

## body.en

### Context and goal

The previous site was built on PHP/WordPress. Updating content was cumbersome, the site was not optimised for all devices and did not reflect the artist's standing. Promoters, press and audiences come from Germany, Europe and Russia. The goal was a fast, trilingual presence that the artist can maintain himself without prior knowledge. [Check and add]

### Solution and architecture

- Next.js (App Router) with TypeScript and Tailwind CSS, statically generated pages that are selectively refreshed when content changes
- Sanity as a headless CMS with a custom data model: concerts, repertoire, recordings, references, biography
- Three languages (German, English, Russian) with next-intl, all content maintained in three languages in the CMS
- Existing content migrated by script via the Sanity API instead of being retyped
- Contact form with validation and email delivery
- Letters of recommendation translated from Russian into German and English

### Headless CMS and a custom, accessible content management

Content and presentation are separated: Sanity manages the content, Next.js renders it. The design can change without touching content, and the same content can later serve other channels, such as a press PDF. Rather than using a standard back end as is, I tailored content management to the artist:

- The editing environment is embedded in the website and available at its own address, with no extra software
- Navigation follows his day-to-day work: what he updates most often, such as concerts and press quotes, is at the top; rarely used settings are at the bottom
- Input forms are organised into thematic tabs so each form stays clear
- One-off content such as biography, contact and settings exists exactly once, not as a list where duplicates could be created by mistake
- A user guide with a glossary and step-by-step instructions, written for someone without technical experience

### The hard part: a CMS that thinks ahead

The artist enters the programme for every concert. Works he adds to a programme should also appear in his repertoire without entering them twice. I extended the publish action in the CMS: when a concert is published, flagged works are automatically created as repertoire entries. The repertoire can also be downloaded as a PDF at any time, in three languages, generated from the current data.

```typescript
/**
 * Extended publish action: creates repertoire entries from a concert's works
 * automatically when "addToRepertoire" is set.
 */
export const createPublishWithRepertoireAction = (
  originalPublishAction: DocumentActionComponent
): DocumentActionComponent => { /* … */ };
```

### Outcome

A fast, trilingual website that the artist maintains himself, with a detailed user guide including a glossary and step-by-step instructions. Concerts and repertoire no longer need to be maintained twice. [Add outcome or quote]

### What I took away

A good CMS is not the one with the most fields, but the one that knows the workflows of the person using it.

---

# Case Study 4

slug: linkedgen-ki-gestuetzte-content-erstellung
publishedAt: 2026-11-21

## title.de
KI mit Stil: persönliche Stil-Leitfäden und LinkedIn-Beiträge per Sprachmodell

## title.en
AI with style: personal style guides and LinkedIn posts generated by a language model

## excerpt.de
Eine Web-Anwendung, die aus Angaben zur Person einen individuellen Stil-Leitfaden erstellt und darauf abgestimmte LinkedIn-Beiträge erzeugt. Entwickelt mit React, Node.js, MongoDB und der OpenAI API und an den Auftraggeber übergeben.

## excerpt.en
A web application that creates an individual style guide from a person's details and generates LinkedIn posts that match it. Built with React, Node.js, MongoDB and the OpenAI API, and handed over to the client.

## body.de

### Ausgangslage und Ziel

Wer regelmäßig auf LinkedIn schreibt, will wiedererkennbar klingen. Allgemeine KI-Texte klingen dagegen austauschbar. Ziel war eine Anwendung, die Texte im Stil und in der Tonalität der jeweiligen Person erzeugt, mit oder ohne vorhandene Beispieltexte. [Auftraggeber und Ausgangslage ergänzen]

### Lösung und Architektur

- Frontend mit React (Vite), React Query und styled-components; Backend als REST-API mit Node.js und Express
- MongoDB mit Mongoose für Nutzer, Stil-Leitfäden und Beiträge
- Anmeldung mit JWT, Passwörter mit bcrypt gehasht, Sicherheits-Header mit Helmet
- Mehrstufiger Assistent für den Stil-Leitfaden: Tonalität, Zielgruppe, Themen, Beispiele
- Generierung über die OpenAI API, Verwaltung der Beiträge (anlegen, bearbeiten, löschen) im Dashboard

### Die schwierige Stelle: Struktur statt Zufall

Ein Sprachmodell liefert ohne klaren Rahmen beliebige Ergebnisse. Der Kern der Anwendung war deshalb nicht der Aufruf der API, sondern der Stil-Leitfaden als strukturierte Vorgabe: Er wird einmal mit der Person erarbeitet, gespeichert und steuert danach jede Generierung. So bleiben Ton und Inhalt über viele Beiträge hinweg konsistent.

### Ergebnis

Die Anwendung wurde fertiggestellt und an den Auftraggeber übergeben. [Ergebnis oder Zitat ergänzen]

### Was ich mitgenommen habe

LinkedGen war mein Einstieg in die KI-Integration. Heute würde ich die Ausgaben des Modells strenger prüfen, Prompts versionieren und die Anwendung durchgängig in TypeScript schreiben. Genau so setze ich KI-Projekte inzwischen um.

## body.en

### Context and goal

Anyone who posts regularly on LinkedIn wants to sound recognisable, whereas generic AI text sounds interchangeable. The goal was an application that writes in the style and tone of the individual person, with or without existing sample texts. [Add client and context]

### Solution and architecture

- Frontend with React (Vite), React Query and styled-components; backend as a REST API with Node.js and Express
- MongoDB with Mongoose for users, style guides and posts
- Authentication with JWT, passwords hashed with bcrypt, security headers via Helmet
- Multi-step wizard for the style guide: tone, audience, topics, examples
- Generation via the OpenAI API, post management (create, edit, delete) in the dashboard

### The hard part: structure instead of chance

Without a clear frame, a language model produces arbitrary results. The core of the application was therefore not the API call but the style guide as a structured brief: it is developed once with the person, stored, and then drives every generation. This keeps tone and content consistent across many posts.

### Outcome

The application was completed and handed over to the client. [Add outcome or quote]

### What I took away

LinkedGen was my entry into AI integration. Today I would validate model output more strictly, version the prompts and write the application in TypeScript throughout. That is how I approach AI projects now.
