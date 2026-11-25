# Case Studies – Texte für Sanity (Typ `blogPost`)

Aufbau dieser Datei (das Seed-Skript liest sie direkt ein):
- `# Case Study N` beginnt ein Dokument, darunter `slug: …` und `categories: …` (Leistungsbereiche, Slugs aus `LEISTUNGSBEREICHE` im Seed-Skript).
- `## title.de`, `## title.en`, `## excerpt.de`, `## excerpt.en`, `## body.de`, `## body.en` sind die Felder.
- Im Body wird `###` zu einer H2-Überschrift, `-` zu einer Aufzählung, ```sql / ```typescript zu einem Code-Block.
- Titel max. 100 Zeichen, Excerpt max. 200 Zeichen (Sanity-Validierung). `publishedAt` setzt Miriam beim Veröffentlichen im Studio.
- Aufbau jeder Case Study: Auftraggeber/Projekt, Ausgangslage und Zielsetzung, Lösung, Technik, ggf. Betreuung, Ergebnis bzw. Stand.
- Auftraggeber werden nur mit Freigabe genannt (Case Study 1, Case Study 2 nach Rücksprache). Alle anderen bleiben anonym.
- Case Study 1 erst veröffentlichen, wenn der Fix für den Dokumenten-Speicher im Kinderschutz-Portal live ist.
- Case Study 6 beschreibt ein laufendes Projekt und wird ergänzt, sobald erste Bereiche im Einsatz sind.

---

# Case Study 1

slug: fachportal-netzwerk-kinderschutz-fruehe-hilfen
categories: portale-und-plattformen, abloesung-bestehender-systeme, wartung-und-weiterentwicklung

## title.de
Ein Fachportal für das Netzwerk Kinderschutz & Frühe Hilfen im Altenburger Land

## title.en
A specialist portal for the Child Protection & Early Support Network in Altenburger Land

## excerpt.de
Familien, Fachkräfte und Netzwerkpartner finden Angebote, Termine und Anlaufstellen an einem Ort: mit Karte, geschütztem Bereich für Fachkräfte und Redaktionssystem in zwei Sprachen.

## excerpt.en
Families, professionals and network partners find services, events and contact points in one place: with a map, a protected area for professionals and a bilingual editorial system.

## body.de

### Auftraggeber: Netzwerk Kinderschutz & Frühe Hilfen, Landratsamt Altenburger Land

Das Netzwerk Kinderschutz & Frühe Hilfen verbindet im Altenburger Land Einrichtungen und Fachkräfte, die mit Eltern, Kindern und Jugendlichen arbeiten. Es soll dafür sorgen, dass Familien früh die passende Unterstützung finden, besonders werdende Eltern und Familien mit kleinen Kindern. Damit das gelingt, müssen Informationen schnell auffindbar und aktuell sein, für Familien genauso wie für die Fachkräfte im Netzwerk.

### Ausgangslage und Zielsetzung

Das Netzwerk hatte eine WordPress-Seite, die vor allem präsentieren sollte. Inhalte oder Struktur selbst anzupassen, war kaum möglich. Daneben lagen Informationen auf mehreren Portalen, jedes anders gepflegt und unterschiedlich aktuell. Wer als Mutter oder Vater schnell eine Beratungsstelle brauchte, musste erst wissen, wo man überhaupt nachschaut.

Der Landkreis wollte das an einem Ort bündeln: ein Portal für Familien und Netzwerkpartner, eine Karte mit allen Anlaufstellen und einen geschützten Bereich für Fachkräfte. Die Verwaltung sollte Inhalte selbst pflegen und das Portal ohne fremde Hilfe erweitern können.

### Die Lösung

Am Anfang standen viele Fragen: Wer sucht hier was, in welcher Lage, und wie schnell muss die Antwort da sein? Daraus ergab sich der Aufbau des Portals. Es ist nach den Menschen geordnet, die es nutzen. Zuerst wählt man, wer man ist: Eltern, Kinder und Jugendliche oder Fachkraft. Erst danach geht es um Themen. So kommt man auch in einer belastenden Situation in wenigen Schritten zur passenden Stelle.

Zum Portal gehören:

- das „Familiennavi“, eine interaktive Karte, deren Anlaufstellen sich nach Kategorien filtern lassen
- ein Terminkalender mit wiederkehrenden Serien, aus dem man Termine mit einem Klick in den eigenen Kalender übernimmt
- eine Übersicht des Netzwerks und seiner Partner
- ein geschützter Bereich, in dem Fachkräfte interne Unterlagen austauschen
- ein Redaktionsbereich für Termine, Neuigkeiten, Anlaufstellen, Angebote und Dokumente, auf Deutsch und Englisch

### Zugriffsrechte und Datenschutz

Welche Person welche Inhalte sehen darf, ist direkt in der Datenbank festgelegt. Damit gelten die Regeln an jeder Stelle des Portals. Interne Dokumente liegen in einem privaten Speicher. Ausgeliefert werden sie nur nach einer Berechtigungsprüfung, über Links, die nach wenigen Minuten verfallen. Die Datenbank wird in Frankfurt betrieben.

### Technik

Das Portal ist mit Next.js und TypeScript entwickelt. Die Daten liegen in einer PostgreSQL-Datenbank bei Supabase, die Zugriffsrechte sind mit Row Level Security abgesichert. Das Datenmodell ist über mehr als 50 Migrationen gewachsen. Automatisierte Tests mit Playwright prüfen die wichtigsten Abläufe, auch auf Barrierefreiheit.

### Betreuung und Weiterentwicklung

Für Wartung und Weiterentwicklung gibt es einen mehrjährigen Rahmen. Ich bleibe Ansprechpartnerin der Redaktion, kümmere mich um Updates und Sicherheit und ergänze neue Funktionen, wenn das Netzwerk sie braucht.

### Ergebnis

Familien, Fachkräfte und Netzwerkpartner haben jetzt einen gemeinsamen Ort, wo vorher mehrere Portale waren. Über ihren Einstieg finden sie in wenigen Schritten die passende Information oder die nächste Anlaufstelle auf der Karte. Die Redaktion pflegt Inhalte, Termine und Karte selbst, in beiden Sprachen und mit einem Benutzerhandbuch. Neue Themen oder Partner lassen sich ergänzen, ohne das Portal umzubauen.

## body.en

### Client: Child Protection & Early Support Network, Altenburger Land District Office

The Child Protection & Early Support Network brings together institutions and professionals in Altenburger Land who work with parents, children and young people. Its aim is to help families find the right support early on, especially expectant parents and families with young children. For that to work, information has to be easy to find and up to date, for families as well as for the professionals in the network.

### Starting point and objectives

The network had a WordPress site that was mainly meant to present. Changing content or structure without outside help was hardly possible. On top of that, information was spread across several portals, each maintained differently and up to date to a different degree. A parent who urgently needed a counselling service first had to know where to look.

The district wanted to bring all of this together in one place: a portal for families and network partners, a map of all contact points and a protected area for professionals. The administration should be able to maintain the content itself and extend the portal without outside help.

### The solution

The project started with a lot of questions: who is looking for what here, in what situation, and how quickly does the answer need to be there? The structure of the portal grew out of the answers. It is organised around the people who use it. First you choose who you are: parent, child or young person, or professional. Topics come after that. This way, even someone in a stressful situation reaches the right place in a few steps.

The portal includes:

- the "Familiennavi", an interactive map whose contact points can be filtered by category
- an events calendar with recurring series, from which events can be added to your own calendar with one click
- an overview of the network and its partners
- a protected area where professionals share internal documents
- an editorial area for events, news, contact points, services and documents, in German and English

### Access rights and data protection

Who may see which content is defined directly in the database, so the rules apply everywhere in the portal. Internal documents are kept in private storage. They are only delivered after a permission check, through links that expire after a few minutes. The database is hosted in Frankfurt.

### Technology

The portal is built with Next.js and TypeScript. The data is stored in a PostgreSQL database on Supabase, with access rights secured by Row Level Security. The data model has grown over more than 50 migrations. Automated tests with Playwright check the most important workflows, including accessibility.

### Support and further development

Maintenance and further development are covered by a multi-year framework. I remain the editorial team's point of contact, take care of updates and security, and add new features when the network needs them.

### Outcome

Families, professionals and network partners now share one place where there used to be several portals. Starting from their entry point, they reach the right information or the nearest contact point on the map in a few steps. The editorial team maintains content, events and the map itself, in both languages and with a user handbook. New topics or partners can be added without rebuilding the portal.

---

# Case Study 2

slug: kundenportal-und-verwaltung-health-coach
categories: fachanwendungen-und-crm, portale-und-plattformen

## title.de
Kundenportal und Verwaltung für Health Coach Karsten Gerth

## title.en
Client portal and back office for health coach Karsten Gerth

## excerpt.de
Für Karsten Gerth habe ich eine Anwendung mit Verwaltungsbereich und Kundenportal entwickelt: Kunden, Termine, Angebote, Rechnungen und individuelle Pläne an einem Ort.

## excerpt.en
For Karsten Gerth, I built an application with a back office and a client portal: clients, appointments, quotes, invoices and individual plans in one place.

## body.de

### Auftraggeber: Karsten Gerth, Health Coach

Karsten Gerth war als Personal Trainer tätig und hat sich zum Health Coach weiterentwickelt. Er begleitet vor allem Eltern, die im Alltag wenig Zeit haben und trotzdem gesünder leben möchten: mit mehr Bewegung, ausgewogener Ernährung und Zielen, die in einen vollen Familienalltag passen. Gerade diese Menschen brauchen eine Begleitung, die ihnen Arbeit abnimmt und keine zusätzliche macht.

### Ausgangslage und Zielsetzung

Als Selbständiger möchte Karsten Gerth seine Zeit mit seinen Kunden verbringen. Tatsächlich ging viel davon in Verwaltung: Termine abstimmen, Angebote und Rechnungen schreiben, für jeden Kunden Ziele, Trainings- und Ernährungspläne zusammenstellen und Gesundheitsangaben einholen. Mit jedem neuen Kunden wuchs dieser Aufwand.

Ziel war eine Anwendung mit zwei Seiten: ein Verwaltungsbereich, der seine wiederkehrenden Aufgaben bündelt, und ein geschützter Zugang für seine Kunden. Gesundheitsangaben sollten sicher übermittelt werden, ohne per E-Mail hin- und herzugehen.

### Die Lösung

Im Verwaltungsbereich laufen die Aufgaben zusammen, die sonst auf viele Stellen verteilt wären:

- Kundenverwaltung mit Kontaktdaten, Anamnese, Zielen und Plänen je Kunde
- Termine in einem Kalender, den er auch als Abo in seinen eigenen Kalender übernehmen kann
- Angebote und Rechnungen, fortlaufend nummeriert und als PDF; ein angenommenes Angebot wird mit einem Klick zur Rechnung
- ein Blog, in dem er Beiträge selbst schreibt und veröffentlicht

Am meisten Zeit spart die zentrale Bibliothek. Dort legt er SMART-Ziele, Trainingsvorlagen, Rezepte und Ernährungsstrategien einmal an. Für einen neuen Kunden stellt er daraus die Pläne zusammen und passt nur an, was bei diesem Menschen anders ist.

Seine Kunden haben einen eigenen, geschützten Zugang. Dort füllen sie den Anamnesebogen online aus. Er erhält die Angaben strukturiert zur Auswertung, und die Gesundheitsdaten bleiben in der Anwendung.

### Technik

Die Anwendung entstand 2025 mit Next.js und Supabase. Verwaltungsbereich und Kundenportal sind getrennt geschützt, Angebote und Rechnungen werden als PDF erzeugt.

### Betreuung und Weiterentwicklung

Die Anwendung ist im Einsatz und wird von mir betreut. Aus der Arbeit damit ist die Idee entstanden, sie auch anderen Coaches anzubieten. Diese Weiterentwicklung zu einer Plattform beschreibe ich in einer eigenen Case Study.

### Ergebnis

Kunden, Termine, Angebote, Rechnungen und Pläne liegen jetzt an einem Ort. Für neue Kunden stellt Karsten Gerth die Betreuung aus seiner Bibliothek zusammen, statt jedes Mal von vorn zu beginnen. Gesundheitsangaben kommen strukturiert und geschützt bei ihm an. So bleibt mehr Zeit für das, worum es ihm geht: Menschen dabei zu helfen, im Alltag gesünder zu leben.

## body.en

### Client: Karsten Gerth, health coach

Karsten Gerth worked as a personal trainer and has since become a health coach. He mainly supports parents who have little time in their daily lives but still want to live more healthily: with more exercise, a balanced diet and goals that fit into a busy family life. These are exactly the people who need support that takes work off their plate and doesn't add more.

### Starting point and objectives

As a self-employed coach, Karsten Gerth wants to spend his time with his clients. In practice, much of it went into admin: arranging appointments, writing quotes and invoices, putting together goals, training and nutrition plans for each client, and collecting health information. With every new client, this effort grew.

The goal was an application with two sides: a back office that brings his recurring tasks together, and a protected login for his clients. Health information should be transmitted securely without going back and forth by email.

### The solution

The back office brings together tasks that would otherwise be spread across many places:

- client management with contact details, health history, goals and plans for each client
- appointments in a calendar that he can also subscribe to in his own calendar
- quotes and invoices, numbered consecutively and as PDF; an accepted quote becomes an invoice with one click
- a blog where he writes and publishes posts himself

The central library saves the most time. He creates SMART goals, training templates, recipes and nutrition strategies there once. For a new client, he puts the plans together from these building blocks and only adjusts what is different for that person.

His clients have their own protected login, where they fill in the health questionnaire online. He receives the information in a structured form for review, and the health data stays inside the application.

### Technology

The application was built in 2025 with Next.js and Supabase. The back office and the client portal are protected separately, and quotes and invoices are generated as PDFs.

### Support and further development

The application is in use and I look after it. Working with it led to the idea of offering it to other coaches as well. I describe this development into a platform in a separate case study.

### Outcome

Clients, appointments, quotes, invoices and plans are now in one place. For new clients, Karsten Gerth puts together their programme from his library instead of starting from scratch each time. Health information reaches him in a structured, protected way. This leaves more time for what matters to him: helping people live more healthily in everyday life.

---

# Case Study 3

slug: von-der-einzelloesung-zur-plattform-coaching-app
categories: portale-und-plattformen, wartung-und-weiterentwicklung

## title.de
Eine mandantenfähige Plattform für Coaches und ihre Kunden

## title.en
A multi-tenant platform for coaches and their clients

## excerpt.de
Aus der Anwendung für einen Coach entsteht eine Plattform für viele: jeder Coach mit eigenem Bereich und Erscheinungsbild, seine Kunden mit eigenem Zugang zu Plänen und Fortschritt.

## excerpt.en
The application for one coach is becoming a platform for many: each coach with their own space and branding, their clients with their own access to plans and progress.

## body.de

### Über das Projekt

Die Plattform baut auf der Anwendung auf, die ich für Health Coach Karsten Gerth entwickelt habe. Sie richtet sich an selbständige Coaches, die ihren Kunden eine professionelle digitale Begleitung bieten möchten, ohne eigene Software entwickeln zu lassen. Karsten Gerth ist der erste Coach auf der Plattform.

### Ausgangslage und Zielsetzung

Mit jeder neuen Funktion zeigte sich, wo die erste Version an ihre Grenzen kommt. Sie war auf genau einen Coach zugeschnitten, und Änderungen wurden zunehmend aufwendiger. Gleichzeitig wurde deutlich, dass andere Coaches vor denselben Aufgaben stehen.

Ziel ist eine Plattform, die mehrere Coaches unabhängig voneinander nutzen, jeder mit eigenen Kunden, eigenen Daten und eigenem Auftritt. Ihre Kunden sollen dabei mehr Verantwortung für den eigenen Fortschritt übernehmen können.

### Die Lösung

Jeder Coach erhält einen eigenen Bereich auf der Plattform. Seine Daten sind von denen anderer Coaches vollständig getrennt, und er kann den Auftritt mit eigenen Farben, Logo und Texten an sein Angebot anpassen.

Neu ist vor allem der Kundenbereich. Kunden sehen dort ihre Ziele, Trainings- und Ernährungspläne, haken erledigte Tagesziele ab und machen einen kurzen Wochen-Check. Sie protokollieren ihr Training, geben Rückmeldung und tragen ihre Werte ein. Ihre Entwicklung sehen sie in vier Bereichen über die Zeit. So verfolgen sie ihren Fortschritt selbst, und der Coach sieht auf einen Blick, wo er nachsteuern sollte.

Dazu kommen klare Rollen: Admins sehen alles, Trainer nur die Kunden, die ihnen zugewiesen sind. Gesundheitsdaten werden erst gespeichert, wenn die Einwilligung vorliegt. Bezahlt wird über Stripe.

### Sicherheit

Jede Änderung an Daten muss dieselben Fragen beantworten: Wer ist angemeldet, mit welcher Rolle, für welchen Coach, mit welchem Recht? Und sind die Eingaben gültig? Diese Prüfungen laufen an einer zentralen Stelle in fester Reihenfolge ab, damit sie in keiner Funktion fehlen können. Zusätzlich sorgt die Datenbank selbst dafür, dass niemand Daten eines anderen Coaches sieht. 64 automatisierte Tests prüfen, ob diese Regeln greifen.

### Technik

Die Plattform ist durchgängig in TypeScript geschrieben und als Monorepo mit Turborepo und pnpm aufgebaut. Website und Anwendung sind getrennt, gemeinsame Teile wie Design, Fachlogik, Datenbankzugriff und E-Mails liegen in eigenen Paketen. Die Mandantentrennung ist mit Row Level Security in der Datenbank umgesetzt. Betrieben wird die Plattform mit Docker und Caddy auf einem eigenen Server in Deutschland.

### Stand

Das Datenbankschema für alle Bereiche ist fertig, die wichtigsten Module laufen, auch der neue Kundenbereich. Als Nächstes folgen das eigene Erscheinungsbild je Coach und die Zuordnung über die eigene Domain. Die Erfahrungen aus der ersten Version fließen in jede Entscheidung ein: Ohne sie wüsste ich nicht, was Coaches im Alltag wirklich brauchen.

## body.en

### About the project

The platform builds on the application I developed for health coach Karsten Gerth. It is aimed at self-employed coaches who want to offer their clients professional digital support without commissioning their own software. Karsten Gerth is the first coach on the platform.

### Starting point and objectives

With every new feature, it became clearer where the first version reached its limits. It was tailored to exactly one coach, and changes were becoming increasingly complex. At the same time, it became apparent that other coaches face the same tasks.

The goal is a platform that several coaches use independently of each other, each with their own clients, their own data and their own branding. Their clients should be able to take more responsibility for their own progress.

### The solution

Each coach gets their own space on the platform. Their data is completely separated from that of other coaches, and they can adapt the look with their own colours, logo and texts to match their offering.

The main new feature is the client area. Clients see their goals, training and nutrition plans, tick off completed daily goals and do a short weekly check-in. They log their training, give feedback and enter their measurements. They can follow their development in four areas over time. This way, they track their progress themselves, and the coach sees at a glance where to adjust.

On top of that come clear roles: admins see everything, trainers only the clients assigned to them. Health data is only stored once consent has been given. Payments are handled via Stripe.

### Security

Every change to data has to answer the same questions: who is logged in, with which role, for which coach, with which permission? And is the input valid? These checks run in one central place in a fixed order, so they cannot be missing from any function. In addition, the database itself ensures that nobody sees another coach's data. 64 automated tests check that these rules hold.

### Technology

The platform is written entirely in TypeScript and set up as a monorepo with Turborepo and pnpm. The website and the application are separate; shared parts such as design, business logic, database access and emails live in their own packages. Tenant separation is implemented with Row Level Security in the database. The platform runs with Docker and Caddy on its own server in Germany.

### Status

The database schema for all areas is complete, and the most important modules are running, including the new client area. Next come individual branding per coach and assignment via each coach's own domain. The experience from the first version informs every decision: without it, I wouldn't know what coaches really need in their daily work.

---

# Case Study 4

slug: von-wordpress-zur-dreisprachigen-plattform-konzertpianist
categories: abloesung-bestehender-systeme

## title.de
Eine moderne Webpräsenz mit eigenem Redaktionssystem für einen Konzertpianisten

## title.en
A modern web presence with its own editing system for a concert pianist

## excerpt.de
Die WordPress-Seite eines Konzertpianisten habe ich durch eine dreisprachige Anwendung ersetzt. Ein eingetragenes Konzert ergänzt automatisch das Repertoire, das es als PDF in drei Sprachen gibt.

## excerpt.en
I replaced a concert pianist's WordPress site with a trilingual application. Entering a concert automatically updates his repertoire, which is available as a PDF in three languages.

## body.de

### Auftraggeber: ein international auftretender Konzertpianist

Der Auftraggeber ist ein Konzertpianist, der in Deutschland, im übrigen Europa und in Russland auftritt. Veranstalter, Presse und Publikum informieren sich über seine Website über Konzerte, Repertoire, Aufnahmen und Pressestimmen. Sie ist damit ein wichtiger Teil seiner Arbeit, und sie muss in mehreren Sprachen überzeugen.

### Ausgangslage und Zielsetzung

Die bisherige Seite lief auf WordPress. Inhalte zu ändern war mühsam, auf dem Smartphone sah sie nicht gut aus, und zum Anspruch eines international auftretenden Pianisten passte sie nicht.

Ziel war eine moderne, schnelle Webpräsenz auf Deutsch, Englisch und Russisch, die er selbst pflegen kann, ohne jedes Mal jemanden um Hilfe bitten zu müssen. Wiederkehrende Arbeit, etwa die Pflege seines Repertoires, sollte ihm die Anwendung so weit wie möglich abnehmen.

### Die Lösung

Für Konzerte, Repertoire, Aufnahmen, Pressestimmen und die Biografie gibt es ein eigenes Datenmodell, durchgehend in drei Sprachen. Die vorhandenen Inhalte habe ich per Skript übernommen. Die russischen Empfehlungsschreiben habe ich selbst ins Deutsche und Englische übersetzt.

Das Redaktionssystem ist auf seinen Alltag zugeschnitten:

- Es ist in die Website eingebunden und über eine eigene Adresse erreichbar. Zusätzliche Software braucht er nicht.
- Was er oft pflegt, Konzerte und Pressestimmen, steht in der Navigation oben. Seltene Einstellungen stehen unten.
- Lange Formulare sind in Reiter aufgeteilt.
- Biografie, Kontakt und Einstellungen gibt es nur einmal. Eine zweite Biografie lässt sich nicht versehentlich anlegen.

Zu jedem Konzert trägt er das Programm ein. Beim Veröffentlichen werden markierte Werke automatisch in sein Repertoire übernommen, ohne dass er sie ein zweites Mal erfasst. Das Repertoire kann er jederzeit als PDF herunterladen, in jeder der drei Sprachen und immer auf dem aktuellen Stand. Dazu gibt es ein Handbuch mit Glossar und Schritt-für-Schritt-Anleitungen, geschrieben für jemanden, der sonst wenig mit Technik zu tun hat.

### Technik

Die Website ist mit Next.js, TypeScript und Tailwind CSS entwickelt. Seiten werden vorab erzeugt und nur neu gebaut, wenn sich Inhalte ändern, deshalb lädt sie schnell. Die Inhalte liegen im Headless CMS Sanity, getrennt von der Darstellung. So kann sich das Design ändern, ohne dass jemand Texte anfassen muss. Die automatische Übernahme ins Repertoire ist als eigene Veröffentlichen-Aktion im CMS umgesetzt.

### Ergebnis

Der Pianist pflegt seine Website selbst, in drei Sprachen und auf jedem Gerät gut lesbar. Ein neues Konzert einzutragen genügt, damit Programm und Repertoire aktuell sind. Für Veranstalter hat er sein Repertoire jederzeit als aktuelles PDF zur Hand.

## body.en

### Client: an internationally performing concert pianist

The client is a concert pianist who performs in Germany, elsewhere in Europe and in Russia. Promoters, press and audiences use his website to find out about concerts, repertoire, recordings and reviews. It is an important part of his work, and it has to be convincing in several languages.

### Starting point and objectives

The previous site ran on WordPress. Changing content was tedious, it did not look good on smartphones, and it did not match the standards of an internationally performing pianist.

The goal was a modern, fast web presence in German, English and Russian that he can maintain himself without having to ask someone for help every time. Recurring work, such as keeping his repertoire up to date, should be taken off his hands by the application as far as possible.

### The solution

Concerts, repertoire, recordings, reviews and the biography each have their own data model, in three languages throughout. I migrated the existing content by script. I translated the Russian letters of recommendation into German and English myself.

The editing system is tailored to his daily routine:

- It is built into the website and reachable at its own address. He doesn't need any additional software.
- What he updates often, concerts and reviews, is at the top of the navigation. Rarely used settings are at the bottom.
- Long forms are split into tabs.
- Biography, contact and settings exist only once. A second biography cannot be created by accident.

For each concert, he enters the programme. When he publishes, selected works are automatically added to his repertoire, without him having to enter them a second time. He can download the repertoire as a PDF at any time, in any of the three languages and always up to date. There is also a handbook with a glossary and step-by-step instructions, written for someone who otherwise has little to do with technology.

### Technology

The website is built with Next.js, TypeScript and Tailwind CSS. Pages are generated in advance and only rebuilt when content changes, which is why it loads quickly. The content lives in the headless CMS Sanity, separate from the presentation. This means the design can change without anyone having to touch the texts. The automatic transfer to the repertoire is implemented as a custom publish action in the CMS.

### Outcome

The pianist maintains his website himself, in three languages and easy to read on any device. Entering a new concert is enough to keep programme and repertoire up to date. For promoters, he always has his repertoire to hand as a current PDF.

---

# Case Study 5

slug: linkedin-beitraege-im-eigenen-stil
categories: ki-und-automatisierung

## title.de
KI-gestützte LinkedIn-Beiträge im eigenen Stil

## title.en
AI-assisted LinkedIn posts in your own voice

## excerpt.de
Eines meiner ersten Kundenprojekte (2024): eine Anwendung, die mit Nutzern einen Stil-Leitfaden erarbeitet und darauf abgestimmte LinkedIn-Beiträge schreibt. React, Node.js, OpenAI API.

## excerpt.en
One of my first client projects (2024): an application that works out a style guide with each user and writes LinkedIn posts on that basis. React, Node.js and the OpenAI API.

## body.de

### Über das Projekt

Das Projekt entstand 2024 für einen Auftraggeber, den ich hier nicht nenne, und gehört zu meinen ersten Kundenprojekten. Es richtet sich an Menschen, die LinkedIn beruflich nutzen und regelmäßig sichtbar sein möchten, im Alltag aber wenig Zeit zum Schreiben haben.

### Ausgangslage und Zielsetzung

Sprachmodelle können in Sekunden einen Beitrag formulieren. Lässt man sie einfach schreiben, klingt das Ergebnis allerdings austauschbar und selten nach der Person, unter deren Namen es erscheint.

Ziel war eine Anwendung, die beim Schreiben unterstützt und dafür sorgt, dass die Beiträge nach ihren Verfassern klingen. Das sollte auch für Menschen funktionieren, die noch keine eigenen Beispieltexte haben.

### Die Lösung

Ein Assistent führt in mehreren Schritten durch Tonalität, Zielgruppe, Themen und Beispiele. Daraus entsteht ein persönlicher Stil-Leitfaden. Er wird gespeichert und bei jedem neuen Beitrag automatisch mitgegeben, sodass Ton und Themen über viele Beiträge hinweg gleich bleiben.

Die Beiträge entstehen auf Knopfdruck und werden in einem Dashboard verwaltet. Dort lassen sie sich überarbeiten, bevor sie veröffentlicht werden. Die Entscheidung, was erscheint, bleibt bei der Person selbst.

### Technik

Das Frontend ist mit React (Vite), React Query und styled-components gebaut, das Backend als REST-API mit Node.js und Express. Nutzer, Stil-Leitfäden und Beiträge liegen in MongoDB. Die Anmeldung läuft über JWT, Passwörter werden mit bcrypt gehasht, und Helmet setzt die Sicherheits-Header. Die Texte erzeugt die OpenAI API.

### Ergebnis

Die Anwendung wurde vollständig umgesetzt, von der Anmeldung über den Assistenten bis zur Verwaltung der Beiträge, und an den Auftraggeber übergeben. Hier habe ich zum ersten Mal ein Sprachmodell in eine Anwendung eingebunden. In heutigen KI-Projekten prüfe ich die Ausgaben strenger, versioniere Prompts und arbeite durchgängig mit TypeScript.

## body.en

### About the project

The project was built in 2024 for a client I don't name here, and it is one of my first client projects. It is aimed at people who use LinkedIn professionally and want to be visible regularly, but have little time for writing.

### Starting point and objectives

Language models can draft a post in seconds. Left to their own devices, however, the result sounds interchangeable and rarely like the person whose name it appears under.

The goal was an application that helps with writing and makes sure the posts sound like their authors. It also had to work for people who don't yet have any sample texts of their own.

### The solution

A wizard guides users step by step through tone, audience, topics and examples. This produces a personal style guide. It is saved and automatically included with every new post, so tone and topics stay consistent across many posts.

Posts are generated at the click of a button and managed in a dashboard, where they can be edited before publishing. The decision about what gets published stays with the person.

### Technology

The frontend is built with React (Vite), React Query and styled-components, the backend as a REST API with Node.js and Express. Users, style guides and posts are stored in MongoDB. Login uses JWT, passwords are hashed with bcrypt, and Helmet sets the security headers. The texts are generated by the OpenAI API.

### Outcome

The application was fully implemented, from login through the wizard to post management, and handed over to the client. This was the first time I integrated a language model into an application. In my AI projects today, I check the output more strictly, version prompts and work in TypeScript throughout.

---

# Case Study 6

slug: website-und-unterrichtsportal-sopranistin
categories: portale-und-plattformen, fachanwendungen-und-crm

## title.de
Website und Unterrichtsportal für eine Sopranistin

## title.en
Website and teaching portal for a soprano

## excerpt.de
Eine moderne Website mit eigenem Redaktionssystem und ein Portal für den Gesangsunterricht: Unterlagen für Schüler, Terminbuchung und Rechnungen an einem Ort. Laufendes Projekt.

## excerpt.en
A modern website with its own editing system and a portal for singing lessons: materials for students, lesson booking and invoicing in one place. Ongoing project.

## body.de

### Auftraggeberin: eine Sopranistin

Die Auftraggeberin steht als Sopranistin auf der Bühne und unterrichtet Gesang. Beides gehört zu ihrer Arbeit, und beides stellt eigene Anforderungen: als Künstlerin braucht sie einen überzeugenden Auftritt, als Lehrerin eine verlässliche Organisation ihres Unterrichts.

### Ausgangslage und Zielsetzung

Ziel ist eine Anwendung, die beide Seiten abdeckt. Nach außen eine moderne Website, die sie selbst pflegt. Nach innen ein Portal für ihren Unterricht, in dem ihre Schülerinnen und Schüler alles Wichtige finden und in dem Terminbuchung und Abrechnung zusammenlaufen.

### Die Lösung

Die Website erhält ein eigenes Redaktionssystem, zugeschnitten auf das, was sie regelmäßig pflegt. Für den Unterricht entsteht ein Portal mit eigenem Zugang für jede Schülerin und jeden Schüler:

- Unterlagen und Materialien, die sie für den Unterricht bereitstellt
- ein Buchungssystem für Unterrichtsstunden
- Rechnungen, die direkt aus den gebuchten Stunden entstehen
- eine Verwaltung ihrer Schülerinnen und Schüler

### Stand

Das Projekt befindet sich in der Umsetzung. Ich ergänze diese Case Study, sobald die ersten Bereiche im Einsatz sind.

## body.en

### Client: a soprano

The client performs on stage as a soprano and teaches singing. Both are part of her work, and each has its own requirements: as an artist, she needs a convincing presence; as a teacher, she needs reliable organisation of her lessons.

### Starting point and objectives

The goal is an application that covers both sides. Outwardly, a modern website that she maintains herself. Inwardly, a portal for her teaching where her students find everything they need, and where lesson booking and invoicing come together.

### The solution

The website gets its own editing system, tailored to what she updates regularly. For her teaching, a portal is being built with its own login for each student:

- documents and materials she provides for lessons
- a booking system for lessons
- invoices created directly from booked lessons
- management of her students

### Status

The project is currently being implemented. I will extend this case study as soon as the first parts are in use.
