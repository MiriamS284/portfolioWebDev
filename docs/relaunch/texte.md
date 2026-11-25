# Relaunch miriamsparbrod.dev – Texte (DE + EN)

> **Stand 25.11.2026:** Die Seitentexte wurden sprachlich überarbeitet (problemorientiert, ohne Technik-Begriffe auf der Startseite). Maßgeblich sind jetzt `messages/de.json` und `messages/en.json`. Diese Datei dient nur noch als Hintergrund.


Quelle für alle Texte der Neupositionierung. Platzhalter in [eckigen Klammern] NICHT erfinden, sondern als TODO stehen lassen.

**Layout-Regel:** Das Layout bleibt exakt gleich. Neue Inhalte kommen in bestehende Bausteine:

| Bestehender Baustein | Neuer Inhalt |
| --- | --- |
| `HeroShowcase` (H1, line1, line2, philosophy1, philosophy2, Tag-Zeile) | ✅ erledigt (Fassung vom 23.11., siehe unten) |
| Index-Raster, Spalte „Projekte“ (`ProjectsColumn`) | Label „Referenzen“ / „References“ |
| Index-Raster, Spalte „Case Studies“ (`WritingColumn`) | bleibt „Case Studies“ |
| Index-Raster, Spalte „Code-Fragmente“ (`SnippetsColumn`) | „Leistungsfelder“ / „Services“: statische Liste aus messages, gleicher Listenstil, Link „Alle Leistungen“ → `#leistungen` |
| Index-Raster, Spalte „Gedanken“ (`ThoughtsColumn`) | „Fachbeiträge“ / „Articles“ |
| Neu unter dem Raster, Stil wie Label „Index“ + Liste wie `ProjectsColumn` | Leistungsfelder (id="leistungen"), Vorgehen, Grundsätze, Zusammenarbeit, Profil (FAQ auf der Kontaktseite) |
| `HomeContactSection` | „Ihr Vorhaben“ / „Your project“ |

---

## DEUTSCH

### Startseite – Hero (✅ erledigt, Fassung vom 23.11.)

- H1: Probleme verstehen. In Software lösen.
- Zeile 1: Ich entwickle Fachanwendungen, Apps und KI-Funktionen für kleine und mittlere Unternehmen und Organisationen.
- Zeile 2: Mit klaren Zugriffsrechten, mehrsprachig, wo es nötig ist, und sicher betrieben auf Servern in Deutschland.
- Zeile 3: Ich analysiere Ihre Prozesse, entwickle die Software und sorge für einen sicheren Betrieb.
- Zeile 4: Von der Sprache zum Code: Früher habe ich zwischen Sprachen und Kulturräumen übersetzt, heute übersetze ich menschliche Sprache in digitale.
- Tags (als Hashtags): #Fachanwendungen #KI-Integration #DigitaleTransformation #HostingInDeutschland #Datenschutz

### Startseite – Meta (✅ erledigt)

- Title: Miriam Sparbrod – Individualsoftware & KI-Integration
- Description: Webbasierte Fachanwendungen, Apps und KI-Integrationen für KMU und Organisationen. Konzipiert, entwickelt und sicher betrieben in Deutschland.

### Startseite – Leistungsfelder (Kurzfassung für die Index-Spalte)

- **Fachanwendungen und Portale** – Prozesse digitalisieren, die Standardsoftware nicht abbildet.
- **Apps und SaaS-Produkte** – Kunden- und Mitgliederbereiche, mandantenfähig.
- **KI-Integration** – Sprachmodelle dort, wo sie messbar entlasten.
- **Betrieb und Infrastruktur** – Hosting in Deutschland, gehärtet und überwacht.
- Link: Alle Leistungen →

### Startseite – Leistungsfelder (ausführlich, Abschnitt unter dem Raster)

Label: Leistungsfelder

- **Fachanwendungen und Portale** – Ich digitalisiere Geschäftsprozesse, die mit Standardsoftware nicht abbildbar sind: Fachportale mit differenziertem Rollen- und Rechtekonzept, geschützten Dokumentenbereichen, Redaktionsworkflows und Schnittstellen zu bestehenden Systemen.
- **Apps und SaaS-Produkte** – Kunden- und Mitgliederbereiche, Termin- und Vertragsverwaltung, Zahlungsabwicklung. Auf Wunsch mandantenfähig, sodass Sie Ihre Anwendung später als eigenes Produkt anbieten können. Ich entwickle sie über den Start hinaus kontinuierlich weiter.
- **KI-Integration** – Ich binde große Sprachmodelle dort in Ihre Prozesse ein, wo sie messbar entlasten: Auswertung und Klassifikation von Dokumenten, Entwürfe für Texte und Antworten, Assistenzfunktionen in bestehenden Anwendungen. Datenschutzkonform, nachvollziehbar und mit menschlicher Freigabe an den entscheidenden Stellen.
- **Betrieb und Infrastruktur** – Ich betreibe Ihre Anwendung auf Servern in Deutschland: containerisiert, gehärtet, mit automatisierten Backups, Monitoring und regelmäßigem Patch-Management. Administrative Zugänge sind gesondert abgesichert. Ihre Daten bleiben unter Ihrer Kontrolle.

### Startseite – Vorgehen

Label: Vorgehen

1. **Anforderungsanalyse** – Ich nehme Ihre Prozesse auf, kläre Beteiligte, Datenflüsse und Rahmenbedingungen wie Datenschutz oder Barrierefreiheit.
2. **Fachkonzept und Architektur** – Datenmodell, Rollen- und Rechtekonzept, Schnittstellen und Betriebsmodell. Schriftlich dokumentiert, mit Aufwand und Meilensteinen.
3. **Iterative Entwicklung** – Umsetzung in Meilensteinen auf einer separaten Testumgebung. Sie prüfen jeden Stand, bevor er produktiv geht.
4. **Qualitätssicherung** – Statische Typprüfung, Validierung aller Eingaben, Sicherheits- und Barrierefreiheitsprüfungen vor jedem Release.
5. **Inbetriebnahme und Übergabe** – Deployment, technische und fachliche Dokumentation, Einweisung Ihrer Mitarbeitenden.
6. **Betrieb und Weiterentwicklung** – Wartung, Monitoring und neue Funktionen auf Basis eines Servicevertrags.

Zeile darunter: In der Entwicklung setze ich KI-Werkzeuge nach festen Regeln ein. Jede Änderung wird geprüft, getestet und von mir verantwortet.

### Startseite – Grundsätze

Label: Grundsätze

- **Datenhoheit** – Hosting in Deutschland, keine unnötige Abhängigkeit von US-Cloud-Diensten. Sie wissen jederzeit, wo Ihre Daten liegen.
- **Security by Design** – Zugriffskontrolle, Eingabevalidierung, Begrenzung von Anfragen und verschlüsselte Übertragung sind Teil der Architektur, nicht nachträglich ergänzt.
- **Wartbarkeit** – TypeScript, etablierte Standards und vollständige Dokumentation. Der Quellcode gehört Ihnen.
- **KI mit Augenmaß** – Einsatz nur mit klarem Nutzen, transparenter Datenverarbeitung und menschlicher Kontrolle.

### Startseite – Zusammenarbeit

Label: Zusammenarbeit

- **Erstgespräch (30 Minuten, kostenfrei)** – Sie schildern Ihr Vorhaben, ich gebe eine erste fachliche Einschätzung.
- **Konzeptphase** – Ergebnis ist ein Fachkonzept mit Funktionsumfang, Architektur, Aufwand und Zeitplan, auch als Grundlage für Förder- oder Haushaltsanträge. Umfang und Kosten stimmen wir vorab miteinander ab.
- **Umsetzung** – Verbindliches Angebot, Abrechnung nach Meilensteinen. Für öffentliche Auftraggeber auch über mehrere Haushaltsjahre.
- **Servicevertrag** – Betrieb, Wartung und Weiterentwicklung mit vereinbarten Reaktionszeiten und Kontingent.

Link: Erstgespräch vereinbaren → #kontakt (später Buchungslink)

### Startseite – Profil (Teaser)

Label: Von der Sprache zum Code

Ich habe Romanistik und Übersetzungswissenschaft studiert und sechs Jahre als selbständige Übersetzerin gearbeitet. Seit 2023 entwickle ich Software, heute von der Anforderungsanalyse bis zum Serverbetrieb. Die Kernkompetenz ist geblieben: Anforderungen genau verstehen und präzise in eine funktionierende Lösung übertragen.

Link: Zum Profil →

### FAQ (auf der Kontaktseite /contact#faq, Link im Footer)

Label: Häufige Fragen

- **Entwickeln Sie auch Websites?** – Ja, wenn sie mehr leisten sollen als eine digitale Visitenkarte: mit individuellem CMS, interaktiven Funktionen oder als Teil einer Anwendung. Mein Schwerpunkt liegt auf Software, die ein konkretes Problem löst.
- **Wo werden unsere Daten gespeichert?** – Auf Servern in Deutschland. Datenschutz und Auftragsverarbeitung plane ich von Beginn an mit.
- **Wie gehen Sie bei KI mit sensiblen Daten um?** – Ich wähle Anbieter und Konfiguration so, dass Ihre Daten nicht für das Training von Modellen verwendet werden. Wo nötig, werden personenbezogene Daten vor der Verarbeitung entfernt oder die Verarbeitung findet gar nicht extern statt.
- **Gehört uns der Quellcode?** – Ja, einschließlich Dokumentation. Die Anwendung kann auch von anderen Entwicklern weitergeführt werden.
- **Arbeiten Sie für öffentliche Auftraggeber?** – Ja. Haushaltsvorbehalte und mehrjährige Abrechnung sind mir vertraut.
- **Was kostet ein Projekt?** – Das klärt die Konzeptphase. Danach erhalten Sie ein verbindliches Angebot.

### Startseite – Kontakt (Texte ✅ erledigt, Felder in Schritt 4)

- Label: Kontakt · Titel: Ihr Vorhaben
- Felder neu: Telefon (optional) · Art des Vorhabens (Auswahl: Fachanwendung oder Portal / App oder SaaS-Produkt / KI-Integration / Betrieb und Hosting / Weiterentwicklung bestehender Software) · Checkbox Datenschutz: „Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert werden.“ mit Link zur Datenschutzerklärung

### Navigation / Menü

- PROJEKTE → REFERENZEN · ÜBER MICH → PROFIL
- Menü: „Projekte“ → „Referenzen“ (Untertitel: „Kundenprojekte und eigene Produkte“) · „Digital Garden“ (Untertitel: „Fachbeiträge und Notizen“) · „Kontakt“ (Untertitel: „Ihr Vorhaben besprechen“)

### Profil (/de/about)

- Meta-Title: Profil – Miriam Sparbrod, Softwareentwicklerin
- H1: Miriam Sparbrod
- Unterzeile: Softwareentwicklerin für Fachanwendungen, Apps und KI-Integration. Studierte Übersetzerin.
- **Werdegang:** Ich habe in Jena Romanistik und Übersetzungswissenschaft studiert und anschließend in Argentinien, Uruguay und Chile gelebt und gearbeitet. Von 2017 bis 2023 war ich als selbständige Übersetzerin in Berlin tätig: mit verbindlichen Fristen, vertraulichen Unterlagen und langfristigen Kundenbeziehungen.
- **Wechsel in die Softwareentwicklung:** 2022 habe ich mit der Softwareentwicklung begonnen. Heute verantworte ich Projekte von der Anforderungsanalyse über Architektur und Entwicklung bis zum Serverbetrieb, darunter ein Fachportal für eine Kreisverwaltung mit rollenbasierter Zugriffskontrolle und eine mandantenfähige Plattform für Dienstleister.
- **Was die beiden Berufe verbindet:** Übersetzen und Softwareentwicklung folgen derselben Logik: Eine Anforderung muss vollständig verstanden sein, bevor sie in ein anderes System übertragen wird. Diese Präzision in der Anforderungsanalyse ist heute mein wichtigster Beitrag zu jedem Projekt.
- **Weiterentwicklung:** Ich arbeite kontinuierlich an meinen Methoden und Werkzeugen, aktuell vor allem in den Bereichen KI-Integration und Betrieb auf eigener Infrastruktur. Meine Erkenntnisse dokumentiere ich in Fachbeiträgen.
- **Arbeitsweise:** Direkte Verantwortung (keine Weitergabe, keine Zwischeninstanz) · Dokumentierte Entscheidungen · Sicherheit und Datenschutz als Grundlage · Unabhängigkeit für Sie (Quellcode, Dokumentation und Zugänge gehören Ihnen)
- **Sprachen:** Deutsch, Englisch, Spanisch, Portugiesisch, Französisch. Projekte und Dokumentation auf Deutsch oder Englisch.
- **Technologien:** Anwendungsentwicklung: TypeScript, React, Next.js, Node.js · Daten: PostgreSQL, MongoDB · KI: Claude API, LLM-Integration, Prompt-Design · Betrieb: Linux, Docker, NGINX, CI/CD mit GitHub Actions · Qualität und Sicherheit: Zod, automatisierte Tests, Lighthouse, Sicherheitsprüfungen  [Miriam: nur produktiv Eingesetztes behalten]
- **Abschluss:** Sie planen eine Anwendung oder möchten KI in bestehende Prozesse integrieren? → Erstgespräch vereinbaren
- **Streichen:** „Digital Experiences“, „mit Leidenschaft“, „Durch Machen lernen“, „In den letzten zwei Jahren …“, „MERN Stack“ als Hauptfokus, #Problemlöserin, Rubriken „Learning“ und „Productivity“

### Referenzen (/de/projects)

- H1: Referenzen
- Intro: Kundenprojekte und eigene Produkte aus den Bereichen Fachanwendungen, Apps und KI-Integration.
- Meta-Description: Referenzen von Miriam Sparbrod: Fachportale, mandantenfähige Plattformen und KI-Integrationen für Unternehmen und Organisationen.
- Projekttexte selbst stehen in Sanity (Studio portfolioMS).

### Case Studies (/de/case-studies)

- Intro: Projekte im Detail: Ausgangslage, Architektur, Herausforderung und Ergebnis.
- Inhalte in Sanity, Ich-Form, Zahlen nur mit Beleg.

---

## ENGLISH

### Home – hero (✅ done, version of 23 Nov)

- H1: Understand the problem. Solve it in software.
- Line 1: I develop business applications, apps and AI features for small and medium-sized enterprises and organisations.
- Line 2: With clear access rights, multilingual where needed, and securely operated on servers in Germany.
- Line 3: I analyse your processes, build the software and keep it running securely.
- Line 4: From language to code: I used to translate between languages and cultures; today I translate human language into the language of software.
- Tags (as hashtags): #BusinessApplications #AIIntegration #DigitalTransformation #HostedInGermany #Privacy

### Home – services (index column)

- **Business applications and portals** – Digitising processes that standard software cannot handle.
- **Apps and SaaS products** – Client and member areas, multi-tenant.
- **AI integration** – Language models where they deliver measurable relief.
- **Operations and infrastructure** – Hosting in Germany, hardened and monitored.
- Link: All services →

### Home – services (full section)

Label: Services

- **Business applications and portals** – I digitise business processes that standard software cannot handle: specialist portals with granular role and permission models, protected document areas, editorial workflows and interfaces to existing systems.
- **Apps and SaaS products** – Client and member areas, scheduling and contract management, payment processing. Multi-tenant on request, so you can later offer your application as a product in its own right. I continue to develop it well beyond launch.
- **AI integration** – I integrate large language models where they deliver measurable relief: analysing and classifying documents, drafting texts and replies, assistant features within existing applications. Privacy-compliant, traceable and with human approval at the decisive points.
- **Operations and infrastructure** – I run your application on servers in Germany: containerised, hardened, with automated backups, monitoring and regular patch management. Administrative access is separately secured. Your data stays under your control.

### Home – approach

Label: Approach

1. **Requirements analysis** – I map your processes, stakeholders, data flows and constraints such as data protection or accessibility.
2. **Functional specification and architecture** – Data model, role and permission model, interfaces and operating model. Documented in writing, with effort and milestones.
3. **Iterative development** – Delivery in milestones on a separate staging environment. You review each stage before it goes live.
4. **Quality assurance** – Static type checking, validation of all inputs, security and accessibility checks before every release.
5. **Go-live and handover** – Deployment, technical and user documentation, training for your staff.
6. **Operations and further development** – Maintenance, monitoring and new features under a service agreement.

Line below: I use AI tools in development under strict rules. Every change is reviewed, tested and owned by me.

### Home – principles

Label: Principles

- **Data sovereignty** – Hosting in Germany, no unnecessary dependence on US cloud services. You always know where your data resides.
- **Security by design** – Access control, input validation, rate limiting and encrypted transport are part of the architecture, not added later.
- **Maintainability** – TypeScript, established standards and complete documentation. The source code is yours.
- **AI with judgement** – Used only where the benefit is clear, with transparent data processing and human oversight.

### Home – working together

Label: Working together

- **Initial consultation (30 minutes, free of charge)** – You outline your project; I provide an initial professional assessment.
- **Concept phase** – The result is a functional specification covering scope, architecture, effort and timeline, also suitable as a basis for funding or budget applications. We agree on scope and cost beforehand.
- **Development** – A binding quote, invoiced by milestone. For public-sector clients, also across several budget years.
- **Service agreement** – Operations, maintenance and further development with agreed response times and a set number of hours.

Link: Book an initial consultation → #kontakt

### Home – profile teaser

Label: From language to code

I studied Romance languages and translation and worked as a self-employed translator for six years. Since 2023 I have been developing software, today from requirements analysis to server operations. The core skill has remained the same: understanding requirements precisely and translating them into a solution that works.

Link: View profile →

### FAQ (on the contact page /contact#faq, footer link)

Label: Frequently asked questions

- **Do you also build websites?** – Yes, when they need to do more than serve as a digital business card: with a custom CMS, interactive features or as part of an application. My focus is software that solves a specific problem.
- **Where is our data stored?** – On servers in Germany. Data protection and data processing agreements are planned from the outset.
- **How do you handle sensitive data with AI?** – I select providers and configurations so that your data is not used to train models. Where necessary, personal data is removed before processing, or processing does not take place externally at all.
- **Do we own the source code?** – Yes, including documentation. Other developers can continue the work.
- **Do you work for public-sector clients?** – Yes. I am familiar with budget reservations and multi-year invoicing.
- **What does a project cost?** – The concept phase establishes this. You then receive a binding quote.

### Contact (texts ✅ done, fields in step 4)

- New fields: Phone (optional) · Type of project (Business application or portal / App or SaaS product / AI integration / Operations and hosting / Further development of existing software) · Checkbox: “I agree that my details will be stored in order to process my enquiry.” with link to privacy policy

### Navigation / menu

- PROJECTS → REFERENCES · ABOUT → PROFILE

### Profile (/en/about)

- Meta title: Profile – Miriam Sparbrod, Software Developer
- H1: Miriam Sparbrod
- Subline: Software developer for business applications, apps and AI integration. Trained translator.
- **Background:** I studied Romance languages and translation in Jena and then lived and worked in Argentina, Uruguay and Chile. From 2017 to 2023 I worked as a self-employed translator in Berlin: with binding deadlines, confidential documents and long-term client relationships.
- **Move into software development:** I began developing software in 2022. Today I am responsible for projects from requirements analysis through architecture and development to server operations, including a specialist portal for a district administration with role-based access control and a multi-tenant platform for service providers.
- **What connects both professions:** Translation and software development follow the same logic: a requirement must be fully understood before it can be carried over into another system. This precision in requirements analysis is my most important contribution to every project.
- **Continuous development:** I continually refine my methods and tools, currently with a focus on AI integration and operating my own infrastructure. I document my findings in articles.
- **How I work:** Direct accountability · Documented decisions · Security and data protection as a foundation · Independence for you
- **Languages:** German, English, Spanish, Portuguese, French. Projects and documentation in German or English.
- **Closing:** Planning an application or looking to integrate AI into existing processes? → Book an initial consultation

### References (/en/projects)

- H1: References
- Intro: Client projects and own products in business applications, apps and AI integration.
