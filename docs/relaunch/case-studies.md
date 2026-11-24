# Case Studies – Texte für Sanity (Typ `blogPost`)

Aufbau dieser Datei (für das Seed-Skript):
- `# Case Study N` beginnt ein Dokument.
- `## title.de`, `## title.en`, `## excerpt.de`, `## excerpt.en`, `## body.de`, `## body.en` sind die Felder.
- Im Body wird `###` zu einer H2-Überschrift, `-` zu einer Aufzählung, ```sql / ```typescript zu einem Code-Block.
- Titel max. 100 Zeichen, Excerpt max. 200 Zeichen (Sanity-Validierung). `publishedAt` setzt Miriam beim Veröffentlichen im Studio.
- Auftraggeber werden nur genannt, wenn eine Freigabe vorliegt (Case Study 1). Alle anderen bleiben anonym.

---

# Case Study 1

slug: fachportal-netzwerk-kinderschutz-fruehe-hilfen

## title.de
Ein Fachportal für das Netzwerk Kinderschutz & Frühe Hilfen im Altenburger Land

## title.en
A specialist portal for the Child Protection & Early Support Network in Altenburger Land

## excerpt.de
Familien, Fachkräfte und Netzwerkpartner finden Angebote, Termine und Anlaufstellen an einem Ort: mit Karte, geschütztem Bereich für Fachkräfte und Redaktionssystem in zwei Sprachen.

## excerpt.en
Families, professionals and network partners find services, events and contact points in one place: with a map, a protected area for professionals and a bilingual editorial system.

## body.de

### Ausgangslage

Das Netzwerk Kinderschutz & Frühe Hilfen verbindet im Altenburger Land Angebote für Eltern, für Kinder und Jugendliche und für Fachkräfte. Es gab eine WordPress-Seite, die vor allem präsentieren sollte. Inhalte oder Struktur selbst zu ändern, war kaum möglich. Daneben lagen Informationen auf mehreren Portalen, jedes anders gepflegt und unterschiedlich aktuell. Wer als Mutter oder Vater schnell eine Beratungsstelle brauchte, musste erst wissen, wo man überhaupt nachschaut.

Der Landkreis wollte das bündeln: ein Portal für Familien und Netzwerkpartner, eine Karte mit den Anlaufstellen und einen geschützten Bereich für Fachkräfte. Die Verwaltung sollte alles selbst pflegen und erweitern können. Für Wartung und Weiterentwicklung gibt es einen mehrjährigen Rahmen.

### Weniger zeigen, schneller helfen

Informationsportale wachsen mit der Zeit gern in die Breite, bis man darin kaum noch etwas findet. Wer Hilfe sucht, oft in einer belastenden Situation, will in wenigen Schritten bei der passenden Stelle sein. Ich habe das Portal deshalb nach den Menschen sortiert, die es benutzen. Am Anfang steht die Frage, wer man ist: Eltern, Kinder und Jugendliche oder Fachkraft. Erst danach geht es um Themen. Die Karte zeigt Anlaufstellen nach Kategorien gefiltert, und Termine lassen sich mit einem Klick in den eigenen Kalender übernehmen.

### Umsetzung

Das Portal läuft auf Next.js mit TypeScript und Supabase, die Datenbank steht in Frankfurt. Rollen und Rechte für Fachkräfte und Redaktion sind direkt in der Datenbank festgelegt, mit Row Level Security. Deutsch und Englisch liegen in denselben Datensätzen, so pflegt die Redaktion beide Sprachen an einer Stelle.

Weitere Bausteine:

- Termine mit wiederkehrenden Serien und iCal-Export
- „Familiennavi“, eine interaktive Karte mit filterbaren Anlaufstellen
- ein Netzwerkdiagramm der Partner
- ein Redaktionsbereich für Termine, Neuigkeiten, Anlaufstellen, Angebote und Dokumente

Das Datenmodell ist über gut 50 Migrationen gewachsen. Playwright-Tests prüfen die wichtigsten Abläufe, auch auf Barrierefreiheit.

### Wer darf welche Datei sehen?

Fachkräfte tauschen über das Portal interne Unterlagen aus. Bei einer Sicherheitsprüfung fiel mir auf, dass diese Dateien in einem öffentlich lesbaren Speicher lagen. Mit der richtigen Adresse hätte man sie ohne Anmeldung öffnen können. Ich habe das an mehreren Stellen geschlossen. Die Datenbank gibt Fachkraft-Dokumente nur an Nutzer mit Fachkraft-Rolle heraus, der Speicher ist privat, und heruntergeladen wird über eine Serverroute. Sie prüft die Berechtigung und erzeugt einen Link, der nach fünf Minuten nicht mehr funktioniert. Hochladen und löschen darf nur die Redaktion.

```sql
-- Fachkraft-Dokumente gibt die Datenbank nur an Fachkräfte heraus
create policy documents_read on documents for select
  using (access_level = 'public'
         or (access_level = 'fachkraefte' and is_staff()));

-- Der Speicher ist privat, Dateien sind nicht mehr über die URL erreichbar
UPDATE storage.buckets SET public = false WHERE id = 'documents';
```

### Ergebnis

Familien, Fachkräfte und Netzwerkpartner haben jetzt einen gemeinsamen Ort statt mehrerer Portale. Über ihren Einstieg kommen sie in wenigen Schritten zur passenden Information oder zur nächsten Anlaufstelle auf der Karte. Die Redaktion pflegt Inhalte, Termine und Karte selbst, in beiden Sprachen und mit einem Benutzerhandbuch zur Seite. Neue Themen oder Partner lassen sich ergänzen, ohne das Portal umzubauen.

### Rückblick

Am meisten Zeit habe ich anfangs mit Fragen verbracht: Wer sucht hier was, in welcher Lage, und wie schnell muss die Antwort da sein? Die Antworten darauf haben mehr Entscheidungen bestimmt als jede technische Überlegung. Technisch nehme ich mit, Zugriffsregeln von Anfang an in der Datenbank festzulegen. Dort greifen sie auch dann, wenn an der Oberfläche einmal etwas übersehen wird.

## body.en

### Background

The Child Protection & Early Support Network connects services for parents, for children and young people and for professionals in the district of Altenburger Land. There was a WordPress site, built mainly to present the network. Changing content or structure in-house was hardly possible. On top of that, information sat on several portals, each maintained differently and kept up to date to different degrees. A parent who urgently needed a counselling service first had to know where to look.

The district wanted to bring this together: one portal for families and network partners, a map of contact points and a protected area for professionals. The administration should be able to maintain and extend everything itself. Maintenance and further development run within a multi-year framework.

### Show less, help faster

Information portals tend to grow wider over time until it is hard to find anything in them. People looking for help, often in a stressful situation, want to reach the right place in a few steps. So I organised the portal around the people who use it. It starts with who you are: parent, child or young person, or professional. Topics come after that. The map shows contact points filtered by category, and events can be added to your own calendar with one click.

### How it is built

The portal runs on Next.js with TypeScript and Supabase, with the database in Frankfurt. Roles and permissions for professionals and editors are defined directly in the database using row level security. German and English live in the same records, so editors maintain both languages in one place.

Other building blocks:

- Events with recurring series and iCal export
- “Familiennavi”, an interactive map with filterable contact points
- A network diagram of the partners
- An editorial area for events, news, contact points, services and documents

The data model has grown over more than 50 migrations. Playwright tests cover the key flows, including accessibility.

### Who may see which file?

Professionals use the portal to share internal documents. During a security review I noticed that these files were stored in a publicly readable bucket. With the right URL, anyone could have opened them without logging in. I closed this at several points. The database only returns documents for professionals to users with that role, storage is private, and downloads go through a server route. It checks permissions and creates a link that stops working after five minutes. Only editors can upload and delete.

```sql
-- The database only returns documents for professionals to professionals
create policy documents_read on documents for select
  using (access_level = 'public'
         or (access_level = 'fachkraefte' and is_staff()));

-- Storage is private, files can no longer be reached by URL
UPDATE storage.buckets SET public = false WHERE id = 'documents';
```

### Outcome

Families, professionals and network partners now share one place instead of several portals. From their own entry point, a few steps take them to the right information or to the nearest contact point on the map. The editorial team maintains content, events and the map itself, in both languages and with a user manual to hand. New topics or partners can be added without rebuilding the portal.

### Looking back

Early on, I spent most of my time on questions: who is looking for what here, in which situation, and how quickly do they need an answer? The answers shaped more decisions than any technical consideration. On the technical side, I take away the habit of defining access rules in the database from the start. That way they still hold if something is ever overlooked in the interface.

---

# Case Study 2

slug: von-der-einzelloesung-zur-plattform-coaching-app

## title.de
Eine Coaching-App, die einem Coach die Verwaltung abnimmt und zur Plattform wächst

## title.en
A coaching app that takes admin off a coach's hands and is now growing into a platform

## excerpt.de
Für einen Health Coach habe ich ein Portal für Termine, Angebote und Trainingspläne gebaut. Jetzt wird daraus eine Plattform für mehrere Coaches mit Kundenbereich.

## excerpt.en
I built a portal for a health coach covering appointments, quotes and training plans. It is now becoming a platform for several coaches, with a client area.

## body.de

### Ausgangslage

Ein selbständiger Health Coach möchte seine Zeit mit seinen Kunden verbringen. Tatsächlich ging viel davon in Verwaltung: Termine abstimmen, Angebote und Rechnungen schreiben, für jeden Kunden Ziele, Trainings- und Ernährungspläne zusammenstellen und Gesundheitsangaben einholen. Ziel war ein Portal, das diese Arbeit bündelt und so weit wie möglich abnimmt.

### Version 1: ein Portal für den Alltag des Coaches

Die erste Version habe ich 2025 mit Next.js und Supabase gebaut. Sie ist bis heute im Einsatz und deckt die wiederkehrenden Aufgaben ab:

- Termine verwaltet er in einem Kalender, den er auch als Abo in seinen eigenen Kalender übernehmen kann.
- Angebote und Rechnungen entstehen im Portal, fortlaufend nummeriert und als PDF. Ein angenommenes Angebot wird mit einem Klick zur Rechnung.
- Blogbeiträge schreibt und veröffentlicht er selbst.
- Kunden füllen den Anamnesebogen online in ihrem geschützten Bereich aus. Der Coach bekommt die Angaben strukturiert zur Auswertung, ohne dass Gesundheitsdaten per E-Mail hin- und hergehen.

Am meisten Zeit spart die zentrale Bibliothek. Dort legt der Coach SMART-Ziele, Trainingsvorlagen, Rezepte und Ernährungsstrategien einmal an. Für einen neuen Kunden stellt er daraus die Pläne zusammen und passt nur an, was bei diesem Menschen anders ist.

### Warum eine Neuentwicklung

Mit jeder neuen Funktion wurde sichtbar, wo die erste Version an ihre Grenzen kommt. Sie war auf genau einen Coach zugeschnitten, und Änderungen wurden zunehmend aufwendiger. Gleichzeitig zeigte sich, dass andere Coaches vor denselben Aufgaben stehen. Deshalb entwickle ich die App jetzt als Plattform neu.

### Version 2: eine Plattform für viele Coaches

Jeder Coach wird ein eigener Mandant mit eigenen Kunden und eigenen Daten. Jede Tabelle trägt eine Mandanten-ID, und die Datenbank sorgt per Row Level Security selbst dafür, dass niemand fremde Daten sieht. Vorbereitet ist außerdem, dass jeder Coach seinen Auftritt mit eigenen Farben, Logo und Texten erhält.

Neu ist vor allem der Kundenbereich. Kunden sehen dort ihre Ziele, Trainings- und Ernährungspläne, haken erledigte Tagesziele ab und machen einen kurzen Wochen-Check. Sie protokollieren ihr Training, geben Rückmeldung und tragen ihre Werte ein. Ihre Entwicklung sehen sie in vier Bereichen über die Zeit. So können sie ihren Fortschritt selbst verfolgen, und der Coach sieht auf einen Blick, wo er nachsteuern sollte.

Dazu kommen klare Rollen. Admins sehen alles, Trainer nur die Kunden, die ihnen zugewiesen sind. Gesundheitsdaten werden erst gespeichert, wenn die Einwilligung vorliegt. Bezahlt wird über Stripe, und ob etwas bezahlt ist, entscheidet allein der Stripe-Webhook.

Technisch ist die Plattform ein Monorepo mit Turborepo und pnpm, durchgängig in TypeScript. Website und App sind getrennt, gemeinsame Teile wie Design, Fachlogik, Datenbankzugriff und E-Mails liegen in eigenen Paketen. Betrieben wird sie mit Docker und Caddy auf einem eigenen Server.

### Jede Aktion durch dieselbe Tür

Jede Änderung an Daten muss dieselben Fragen beantworten: Wer ist angemeldet, mit welcher Rolle, für welchen Mandanten, mit welchem Recht? Und sind die Eingaben gültig? Ich wollte nicht, dass diese Prüfungen in jeder Funktion neu geschrieben werden und irgendwann an einer Stelle fehlen. Deshalb läuft jede Server Action durch einen gemeinsamen Wrapper, der sie in fester Reihenfolge abarbeitet. Fehler aus der Datenbank übersetzt er in Meldungen, mit denen Nutzer etwas anfangen können, ohne interne Details zu verraten. Dazu prüfen 64 automatisierte Tests, ob die Regeln in der Datenbank wirklich greifen.

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

### Stand

Das Datenbankschema für alle Bereiche der ersten Version ist fertig, die wichtigsten Module laufen, auch der neue Kundenbereich. Der bisherige Coach ist der erste Mandant. Als Nächstes folgen das eigene Erscheinungsbild je Coach und die Zuordnung über die eigene Domain.

### Rückblick

Die erste Version hat einem Coach den Alltag leichter gemacht. Die zweite soll das für viele tun und den Kunden mehr Verantwortung für ihren eigenen Fortschritt geben. Ohne die erste wüsste ich nicht, was Coaches im Alltag wirklich brauchen.

## body.en

### Background

A self-employed health coach wants to spend his time with his clients. In practice, much of it went into admin: scheduling appointments, writing quotes and invoices, putting together goals, training and nutrition plans for each client and collecting health information. The goal was a portal that brings this work together and takes as much of it off his hands as possible.

### Version 1: a portal for the coach's daily work

I built the first version in 2025 with Next.js and Supabase. It is still in use and covers the recurring tasks:

- He manages appointments in a calendar that he can also subscribe to in his own calendar app.
- Quotes and invoices are created in the portal, numbered consecutively and exported as PDF. An accepted quote becomes an invoice with one click.
- He writes and publishes blog posts himself.
- Clients fill in the intake questionnaire online in their protected area. The coach receives the answers in a structured form for review, without health data being sent back and forth by email.

The central library saves the most time. The coach sets up SMART goals, training templates, recipes and nutrition strategies once. For a new client, he puts the plans together from there and only adjusts what is different for that person.

### Why a rebuild

With every new feature it became clearer where the first version reached its limits. It was tailored to exactly one coach, and changes were becoming more and more costly. At the same time, it turned out that other coaches face the same tasks. So I am now rebuilding the app as a platform.

### Version 2: a platform for many coaches

Each coach becomes a separate tenant with their own clients and their own data. Every table carries a tenant ID, and the database itself uses row level security to make sure nobody sees anyone else's data. The groundwork is also in place for each coach to get their own look with their own colours, logo and texts.

The biggest addition is the client area. Clients see their goals and their training and nutrition plans there, tick off completed daily goals and do a short weekly check-in. They log their training, give feedback and enter their measurements. They can see how they develop in four areas over time. This lets them track their own progress, and the coach sees at a glance where to adjust.

On top of that come clear roles. Admins see everything, trainers only the clients assigned to them. Health data is only stored once consent has been given. Payments run through Stripe, and only the Stripe webhook decides whether something has been paid.

Technically, the platform is a monorepo with Turborepo and pnpm, written in TypeScript throughout. Website and app are separate, and shared parts such as design, business logic, data access and email live in their own packages. It runs with Docker and Caddy on a self-managed server.

### Every action through the same door

Every change to data has to answer the same questions: who is logged in, with which role, for which tenant, with which permission? And is the input valid? I did not want these checks rewritten in every function, only to go missing somewhere one day. So every server action runs through a shared wrapper that works through them in a fixed order. It turns database errors into messages users can act on, without revealing internal details. On top of that, 64 automated tests check that the database rules really hold.

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

### Status

The database schema for every area of the first version is complete, and the main modules are running, including the new client area. The original coach is the first tenant. Next come each coach's own look and assignment via their own domain.

### Looking back

The first version made one coach's daily work easier. The second is meant to do that for many, and to give clients more responsibility for their own progress. Without the first, I would not know what coaches really need day to day.

---

# Case Study 3

slug: von-wordpress-zur-dreisprachigen-plattform-konzertpianist

## title.de
Die Website eines Konzertpianisten mit eigenem Redaktionssystem

## title.en
A concert pianist's website with its own editing system

## excerpt.de
Die WordPress-Seite eines Konzertpianisten habe ich durch eine dreisprachige Anwendung ersetzt. Ein eingetragenes Konzert ergänzt automatisch das Repertoire, das es als PDF in drei Sprachen gibt.

## excerpt.en
I replaced a concert pianist's WordPress site with a trilingual application. Entering a concert automatically updates his repertoire, which is available as a PDF in three languages.

## body.de

### Ausgangslage

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

Eine schnelle Website in drei Sprachen, die der Pianist selbst pflegt. Konzerte und Repertoire muss er nicht mehr doppelt eintragen, und für Veranstalter hat er sein Repertoire jederzeit als aktuelles PDF zur Hand.

### Rückblick

Bei diesem Projekt habe ich gelernt, ein CMS vom Alltag der Person her zu denken, die damit arbeitet. Die Repertoire-Automatik war technisch kein großer Aufwand. Ihm spart sie bei jedem Konzert Arbeit.

## body.en

### Background

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

A fast website in three languages that the pianist maintains himself. He no longer has to enter concerts and repertoire twice, and he always has an up-to-date repertoire PDF ready for promoters.

### Looking back

This project taught me to design a CMS around the daily routine of the person who works with it. The repertoire automation was not much effort technically. For him, it saves work with every concert.

---

# Case Study 4

slug: linkedin-beitraege-im-eigenen-stil

## title.de
Eine Anwendung für LinkedIn-Beiträge im eigenen Stil

## title.en
An application for LinkedIn posts in your own voice

## excerpt.de
Eines meiner ersten Kundenprojekte (2024): eine Anwendung, die mit Nutzern einen Stil-Leitfaden erarbeitet und darauf abgestimmte LinkedIn-Beiträge schreibt. React, Node.js, OpenAI API.

## excerpt.en
One of my first client projects (2024): an application that works out a style guide with each user and writes LinkedIn posts on that basis. React, Node.js and the OpenAI API.

## body.de

### Ausgangslage

Das Projekt entstand 2024 für einen Auftraggeber, den ich hier nicht nenne, und gehört zu meinen ersten Kundenprojekten. Die Idee: Wer regelmäßig auf LinkedIn schreibt, bekommt Unterstützung von einem Sprachmodell, klingt am Ende aber nach sich selbst. Das sollte auch für Menschen funktionieren, die noch keine eigenen Beispieltexte haben.

### Umsetzung

Das Frontend ist mit React (Vite), React Query und styled-components gebaut, das Backend als REST-API mit Node.js und Express. Nutzer, Stil-Leitfäden und Beiträge liegen in MongoDB. Die Anmeldung läuft über JWT, Passwörter werden mit bcrypt gehasht, und Helmet setzt die Sicherheits-Header. Ein Assistent führt in mehreren Schritten durch Tonalität, Zielgruppe, Themen und Beispiele. Die Beiträge erzeugt die OpenAI API, verwaltet werden sie im Dashboard.

### Der Stil-Leitfaden als Herzstück

Lässt man ein Sprachmodell einfach drauflos schreiben, klingt jeder Beitrag ein bisschen anders. Wichtiger als der API-Aufruf war deshalb der Stil-Leitfaden. Er wird einmal mit der Person erarbeitet, gespeichert und bei jeder Generierung mitgegeben. So bleiben Ton und Themen über viele Beiträge hinweg gleich.

### Ergebnis

Die Anwendung wurde vollständig umgesetzt, von der Anmeldung über den Assistenten bis zur Verwaltung der Beiträge, und an den Auftraggeber übergeben.

### Rückblick

Hier habe ich zum ersten Mal ein Sprachmodell in eine Anwendung eingebaut. Würde ich das Projekt heute neu beginnen, würde ich die Ausgaben strenger prüfen, Prompts versionieren und alles in TypeScript schreiben. So arbeite ich inzwischen in KI-Projekten.

## body.en

### Background

I built this project in 2024 for a client I do not name here, and it was one of my first client projects. The idea: people who post regularly on LinkedIn get support from a language model but still end up sounding like themselves. It also had to work for people who do not yet have sample texts of their own.

### How it is built

The front end is built with React (Vite), React Query and styled-components, the back end as a REST API with Node.js and Express. Users, style guides and posts are stored in MongoDB. Login uses JWT, passwords are hashed with bcrypt, and Helmet sets the security headers. A wizard guides users through tone, audience, topics and examples in several steps. Posts are generated via the OpenAI API and managed in the dashboard.

### The style guide at the centre

If you let a language model simply write away, every post sounds a little different. The style guide therefore mattered more than the API call. It is worked out once with the person, stored and passed along with every generation. That keeps tone and topics consistent across many posts.

### Outcome

The application was fully built, from login and the wizard to post management, and handed over to the client.

### Looking back

This was the first time I built a language model into an application. If I started the project today, I would check the output more strictly, version the prompts and write everything in TypeScript. That is how I work on AI projects now.
