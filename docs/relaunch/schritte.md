# Relaunch miriamsparbrod.dev – Schritte und Claude-Code-Prompts

Branch für alles: `feat/positionierung`. `main` bleibt bis zum Go-live unverändert.
Texte: `docs/relaunch/texte.md`. Regeln: `CLAUDE.md` (Abschnitt „Relaunch“).

## So arbeitest du jeden Schritt ab

1. Terminal im Projektordner öffnen: `cd ~/Desktop/Projects/24_10_Sparbrod_WebDEV/my-portfolio-digitalgarden`
2. Auf den Branch wechseln: `git checkout feat/positionierung`
3. Claude Code starten: `claude`
4. Den Prompt des nächsten offenen Schritts einfügen. Claude zeigt zuerst einen Plan, du gibst ihn frei.
5. Prüfen: `npm run dev` → http://localhost:3000/de und /en ansehen (Desktop + Handy-Ansicht, hell + dunkel).
6. Wenn alles passt: Claude committen lassen (oder `git add -A && git commit -m "..."`).
7. Hochladen: `git push -u origin feat/positionierung` → Vercel baut automatisch eine Vorschau-URL für den Branch.
8. Hier den Schritt abhaken.

Faustregel: ein Schritt pro Sitzung, danach `/clear` in Claude Code oder neu starten.

---

## Schritt 1 – Startseite sichtbar, Hero-Texte, Metadaten, Kontakt abgesichert ✅

Erledigt am 21.11.2026 (Commit „feat: Neupositionierung Schritt 1 …“):
- Intro (MERNWriteIntro) und schwarzer Platzhalter entfernt, Startseite wird serverseitig gerendert
- Hero-Texte DE/EN, Tag-Zeile ohne Hashtags
- Metadaten pro Sprache, metadataBase, Open Graph; canonical/hreflang nur auf der Startseite
- Kontakt-API: Zod auf dem Server, HTML-Escaping, Honeypot, Rate-Limit, Empfänger über `CONTACT_TO_EMAIL`
- Kontakttexte in Sie-Form, Footer lokalisiert

---

## Schritt 2 – Lokal prüfen und Vorschau (ohne Claude Code)

- [ ] `npm install` ausführen. Wichtig: `package-lock.json` ist nicht synchron mit `package.json` (es fehlt `@swc/helpers`). `npm install` behebt das, danach die geänderte `package-lock.json` committen.
- [ ] `npm run dev`, Startseite DE und EN ansehen
- [ ] Kontaktformular einmal echt absenden
- [ ] In Vercel die Umgebungsvariable `CONTACT_TO_EMAIL` setzen (z. B. deine Adresse mit eigener Domain), sonst geht die Mail weiter an Gmail
- [ ] `git push -u origin feat/positionierung` und die Vercel-Vorschau ansehen

---

## Schritt 3 – Index-Raster und neue Abschnitte auf der Startseite ✅

Erledigt am 23.11.2026: Spalten „Referenzen“, „Case Studies“, „Leistungsfelder“ (neu, ServicesColumn), „Fachbeiträge“; darunter Leistungsfelder, Vorgehen, Grundsätze, Zusammenarbeit, Profil-Teaser, FAQ (HomeSections, Server Component); Kontakt mit id="kontakt"; Snippets werden auf der Startseite nicht mehr geladen; Open Graph der Startseite vollständig. Geprüft: H1, alle Abschnitte und Metadaten stehen im Server-HTML (DE/EN).

Ursprünglicher Prompt (zur Referenz):

```markdown
Lies CLAUDE.md (Abschnitt „Relaunch“) und docs/relaunch/texte.md. Wir sind auf dem Branch feat/positionierung.

Aufgabe: Startseite inhaltlich umbauen, Layout exakt beibehalten.

1. Analysiere app/_components/home/HomeContentGrid.js, ProjectsColumn.js, WritingColumn.js, SnippetsColumn.js, ThoughtsColumn.js und HomeContactSection.js. Fasse zusammen, welche Klassen und Stile Label und Listen verwenden.
2. Index-Raster:
   - Spalte „Projekte“ bekommt das Label „Referenzen“ / „References“.
   - SnippetsColumn wird ersetzt durch eine neue Komponente ServicesColumn: vier Leistungsfelder (Kurzfassung aus texte.md) als statische Liste aus messages, exakt im Listenstil von ProjectsColumn, Link „Alle Leistungen“ → #leistungen.
   - ThoughtsColumn bekommt das Label „Fachbeiträge“ / „Articles“.
3. Unter dem Raster und vor dem Kontakt neue Abschnitte in dieser Reihenfolge: Leistungsfelder (id="leistungen"), Vorgehen, Grundsätze, Zusammenarbeit, Profil-Teaser, FAQ. Jeder Abschnitt: Container wie HomeContentGrid (mx-auto max-w-2xl px-6), Label wie „Index“ (text-sm font-medium mb-8 pb-2 border-b, color var(--muted)), darunter Liste: Titel wie in ProjectsColumn (text-sm font-medium, var(--ink)), Beschreibung text-sm var(--muted). Keine neuen Farben, Schriften, Abstände oder Animationen.
4. Alle Texte in messages/de.json und messages/en.json (neue Namespaces services, approach, principles, collaboration, profileTeaser, faq). Keine Strings im JSX.
5. Die neuen Abschnitte als Server Components bauen, wo möglich (getTranslations statt useTranslations).
6. HomeContactSection bekommt id="kontakt".
7. npm run lint muss fehlerfrei laufen.

Zeig mir nach Schritt 1 deinen Plan und warte auf mein OK. Committe am Ende mit einer aussagekräftigen Nachricht.
```

---

## Schritt 4 – Kontaktformular erweitern ✅

Erledigt am 24.11.2026: Felder Telefon (optional), Art des Vorhabens (inkl. „Website mit individuellem CMS“), Pflicht-Checkbox Datenschutz; Validierungstexte aus messages; API prüft alle Felder serverseitig; Versandfehler von Resend werden jetzt erkannt (vorher meldete das Formular trotzdem Erfolg). Getestet: gültig, fehlende Einwilligung, falsche Auswahl, ungültige Telefonnummer, Honeypot, Rate-Limit, Versandfehler.

Ursprünglicher Prompt (zur Referenz):

```markdown
Lies CLAUDE.md und docs/relaunch/texte.md (Abschnitt Kontakt). Branch feat/positionierung.

1. Ergänze im ContactForm (app/_components/contact/ContactForm.js) die Felder Telefon (optional) und „Art des Vorhabens“ (select mit den Optionen aus texte.md) sowie eine Pflicht-Checkbox Datenschutz mit Link auf /privatepolicy. Gleicher Feldstil wie die bestehenden Felder (Unterstrich-Input, Label in font-mono).
2. Die Validierungsmeldungen aus dem JSX in messages verschieben (contact.validation).
3. app/api/contact/route.js: neue Felder ins Zod-Schema aufnehmen (projectType als enum, phone optional max 50, privacy muss true sein) und in Text- und HTML-Mail ausgeben (HTML escapen wie bisher).
4. Teste mit einem kurzen Skript oder curl gegen localhost: gültige Anfrage → 200, fehlende Pflichtfelder → 400, ausgefülltes Honeypot-Feld website → 200 ohne Mailversand.
5. npm run lint fehlerfrei. Plan zuerst zeigen, dann umsetzen und committen.
```

---

## Schritt 5 – Profil-Seite und Navigation ✅

Erledigt am 24.11.2026: Profilseite als Server-Page mit Metadaten, neue Texte DE/EN (Werdegang, Arbeitsweise und Ziel), Hashtags aus messages, Tech Stack erweitert (AI Integration, Accessibility u. a.), Navigation/Menü/Footer: Profil, Referenzen.

Ursprünglicher Prompt (zur Referenz):

```markdown
Lies CLAUDE.md und docs/relaunch/texte.md (Profil, Navigation). Branch feat/positionierung.

1. app/[locale]/about/page.js ist komplett "use client" und kann deshalb keine Metadaten haben. Mache daraus eine Server-Page mit generateMetadata (Title/Description pro Sprache, canonical /{locale}/about, hreflang de/en/x-default). Interaktive Teile bleiben als Client-Komponenten.
2. AboutHero: neue Texte aus texte.md (Werdegang, Wechsel, Verbindung, Weiterentwicklung, Arbeitsweise, Sprachen), alles aus messages (Namespace about). Optik unverändert.
3. TechStackArchitecture: auf die Kategorien und Einträge aus texte.md reduzieren. Rubriken „Learning“ und „Productivity“ entfernen. Zwischenüberschrift „Werkzeuge, mit denen ich arbeite“ mit dem Satz aus texte.md.
4. Navigation und Menü (messages navigation, menu): PROJEKTE → REFERENZEN, ÜBER MICH → PROFIL, Untertitel laut texte.md. Routen bleiben gleich (/projects, /about).
5. Abschluss-Link „Erstgespräch vereinbaren“ → /#kontakt.
6. npm run lint fehlerfrei. Plan zuerst, dann umsetzen und committen.
```

---

## Schritt 6 – Inhalte in Sanity (ohne Claude Code, im Studio)

- [ ] Studio starten: `cd ~/Desktop/Projects/portfolioMS && npm run dev`
- [ ] Projekte umschreiben: Titel + Tagline in Kundensprache, DE und EN (Fachportal nach Freigabe, Coaching-Plattform, LinkedGen, Rechnungs- und Angebotsmodul)
- [ ] Pianisten-Website von der Startseite nehmen (nicht „featured“) oder ganz ausblenden
- [ ] Case Study Personal Trainer: Ich-Form, auf die mandantenfähige Plattform umschreiben, Zahlen nur mit Beleg
- [ ] Gedanken/Garden: den Beitrag zum Impostor-Syndrom nicht mehr auf der Startseite zeigen (Reihenfolge/Datum oder Feld „featured“)
- [ ] Optional mit Claude Code prüfen lassen: „Lies schemaTypes/*.js im Repo portfolioMS und liste alle Textfelder auf, die keine englische Variante haben.“

---

## Schritt 7 – SEO vollständig

```markdown
Lies CLAUDE.md. Branch feat/positionierung.

1. Alle Seiten auf generateMetadata pro Locale umstellen: projects, case-studies, case-studies/[slug], garden, garden/[slug], snippets, snippets/[slug], contact, imprint, privatepolicy. Jede Seite: title, description, canonical /{locale}/pfad, hreflang de/en/x-default. Sanity-Felder immer nach locale wählen (aktuell nutzt case-studies/[slug] immer .de).
2. OG-Bild 1200x630 per app/[locale]/opengraph-image.js im bestehenden Farbschema (Anthrazit/Gold, Libellen-Logo aus public/), Text = metadata.ogTitle.
3. JSON-LD als Server-Komponente: ProfessionalService + Person auf der Startseite (Name, URL, Logo, areaServed Deutschland, knowsLanguage de/en/es/pt/fr, Leistungen), FAQPage für die FAQ, Article auf Case-Study-Seiten.
4. sitemap.js: lastModified aus Sanity (_updatedAt) statt new Date(); /contact entfernen, falls die Seite nur auf die Startseite verweist.
5. Genau eine H1 pro Seite. Footer-Überschriften „Navigation“/„Connect“ nicht als H3, sondern als normaler Text.
6. Prüfe mit curl das Server-HTML jeder Seite (title, description, canonical, hreflang, og:*, ld+json) und gib mir eine Tabelle.
```

---

## Schritt 8 – Performance und Aufräumen

```markdown
Lies CLAUDE.md. Branch feat/positionierung.

1. Ausgangsstand messen: @next/bundle-analyzer einrichten, Build, die 10 größten Module der Startseite auflisten. Lighthouse mobil für /de und /de/about notieren.
2. Unbenutzte Dateien entfernen: app/_components/MERNWriteIntro.js, CinematicIntro.js, CinematicIntroPro.js, LandingLead.js, home/WhoIAm.js, home/BuildingSection.js, home/CallToAction.js, home/SnippetsColumn.js (falls in Schritt 3 ersetzt), leere layout/Header.js und layout/Container.js. Vorher mit grep prüfen, dass nichts sie importiert.
3. "use client" so tief wie möglich: Liste alle Client-Komponenten auf und schlage vor, welche Server Components werden können. Nach meinem OK umsetzen.
4. react-syntax-highlighter nur auf Snippet-Seiten dynamisch laden (next/dynamic). Framer Motion nur dort, wo nötig, über LazyMotion + domAnimation.
5. package.json: Tailwind-Versionen vereinheitlichen (aktuell tailwindcss ^3 und @tailwindcss/postcss ^4), next und react auf den aktuellen Patch-Stand, npm audit. middleware.js mit dem Next-Codemod zu proxy.js migrieren.
6. CLAUDE.md auf den aktuellen Stand bringen (next-intl statt LanguageProvider, kein Intro mehr, Struktur unter app/[locale]).
7. Erneut messen, Vorher/Nachher-Tabelle (JS-Größe, Lighthouse Performance/Accessibility/Best Practices/SEO, LCP, CLS, TBT). Ziel: Lighthouse mobil ≥ 95 überall.
8. Das Erscheinungsbild darf sich nicht ändern. Screenshots vorher/nachher vergleichen.
```

---

## Schritt 9 – Go-live

- [ ] Vercel-Vorschau des Branches komplett durchklicken (DE/EN, Handy, hell/dunkel, Formular)
- [ ] Pull Request `feat/positionierung` → `main` auf GitHub anlegen, Diff durchsehen, mergen
- [ ] Nach dem Deployment: Google Search Console, Sitemap einreichen, URL-Prüfung der Startseite
- [ ] Link in LinkedIn teilen und Vorschau prüfen
