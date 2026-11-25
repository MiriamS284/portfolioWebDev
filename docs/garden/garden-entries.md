# Digital Garden – Beiträge für Sanity (Typ `gardenEntry`)

Aufbau dieser Datei (das Seed-Skript `scripts/seed-garden.mjs` liest sie direkt ein):
- `# Entry N` beginnt einen Beitrag, darunter `slug:`, `stage:` (seedling | budding | evergreen) und `connected:` (Slugs verknüpfter Notizen).
- `## title.de`, `## title.en`, `## excerpt.de`, `## excerpt.en`, `## body.de`, `## body.en` sind die Felder.
- Im Body: `###` wird H2, `-` Aufzählung, `>` Zitat.
- Titel max. 100 Zeichen. Beiträge werden als Entwürfe angelegt und im Studio veröffentlicht.
- Der Gedankengang „Von der Sprache zum Code“ ist als Netz angelegt: eine Ausgangsnotiz und zwei Notizen, die nach und nach wachsen und um weitere ergänzt werden.

---

# Entry 1

slug: from-language-to-code
stage: seedling
connected: people-learning-to-talk-to-machines, machines-learning-our-language

## title.de
Von der Sprache zum Code

## title.en
From language to code

## excerpt.de
Erst haben Menschen gelernt, in der Sprache der Maschinen zu schreiben. Heute lernen Maschinen unsere Sprache. Ein Gedankengang, der hier nach und nach wächst.

## excerpt.en
First, people learned to write in the language of machines. Today, machines are learning ours. A line of thought that grows here bit by bit.

## body.de

Bevor ich angefangen habe zu programmieren, habe ich lange zwischen Sprachen übersetzt. Am Anfang hat mich überrascht, wie vertraut sich das Programmieren anfühlte. Auch hier nimmt man etwas, das in einem Kopf klar ist, und bringt es in eine Form, die ein anderer verstehen kann. Nur ist dieser andere eine Maschine, und sie verzeiht keine Ungenauigkeit.

Seitdem beschäftigt mich eine Frage: Wer lernt hier eigentlich wessen Sprache?

### Zwei Richtungen

Lange Zeit war die Antwort eindeutig. Menschen mussten sich der Maschine anpassen. Sie stanzten Löcher in Karten, schrieben Folgen aus Nullen und Einsen und später Befehle in eigens dafür erfundenen Sprachen. Jede neue Programmiersprache war ein Versuch, diesen Abstand ein Stück kleiner zu machen. Davon erzählt die erste Notiz in diesem Gedankengang.

Inzwischen hat sich die Richtung umgedreht. Sprachmodelle lernen aus riesigen Mengen menschlicher Texte, wie wir schreiben, fragen und erklären. Man kann einem Computer heute in ganz gewöhnlichen Sätzen sagen, was er tun soll. Wie es dazu kam und warum es so viele Anläufe brauchte, beschreibt die zweite Notiz.

### Was dazwischen liegt

Mich interessiert vor allem der Raum zwischen diesen beiden Richtungen. Eine Maschine, die unsere Sprache scheinbar versteht, nimmt uns die Aufgabe nicht ab, genau zu sagen, was wir meinen. Beim Übersetzen habe ich gelernt, dass die meisten Missverständnisse zwischen den Zeilen entstehen und selten an einem einzelnen Wort hängen.

In der Softwareentwicklung ist es ähnlich. Bevor ich eine Anwendung entwickle, versuche ich zu verstehen, was Menschen in ihrem Arbeitsalltag tatsächlich brauchen und was sie oft gar nicht aussprechen, weil es für sie selbstverständlich ist. Erst danach wird daraus Code.

### Wie dieser Gedankengang wächst

Diese Notiz ist ein Setzling. Ich ergänze sie, wenn ich etwas Neues lese, ausprobiere oder anders sehe als vorher. Als Nächstes möchte ich mich damit beschäftigen, was Sprachmodelle eigentlich „verstehen“, und damit, was sich für Menschen ändert, die beruflich mit Sprache arbeiten.

## body.en

Before I started programming, I spent a long time translating between languages. At first, I was surprised by how familiar programming felt. Here, too, you take something that is clear in one person's head and put it into a form that someone else can understand. Only this someone else is a machine, and it does not forgive imprecision.

Since then, one question has stayed with me: who is actually learning whose language?

### Two directions

For a long time, the answer was clear. People had to adapt to the machine. They punched holes in cards, wrote sequences of zeros and ones, and later commands in languages invented for that purpose. Every new programming language was an attempt to narrow this gap a little. The first note in this line of thought tells that story.

In the meantime, the direction has reversed. Language models learn from vast amounts of human text how we write, ask and explain. Today, you can tell a computer what to do in perfectly ordinary sentences. How this came about, and why it took so many attempts, is the subject of the second note.

### What lies in between

What interests me most is the space between these two directions. A machine that seems to understand our language does not relieve us of the task of saying precisely what we mean. Translating taught me that most misunderstandings arise between the lines and rarely depend on a single word.

Software development is similar. Before I build an application, I try to understand what people really need in their daily work, including what they often leave unsaid because it seems obvious to them. Only then does it become code.

### How this line of thought grows

This note is a seedling. I add to it when I read something new, try something out or see something differently than before. Next, I want to explore what language models actually "understand", and what changes for people who work with language professionally.

---

# Entry 2

slug: people-learning-to-talk-to-machines
stage: seedling
connected: from-language-to-code, machines-learning-our-language

## title.de
Als Menschen lernten, mit Maschinen zu sprechen

## title.en
When people learned to talk to machines

## excerpt.de
Lochkarten, Maschinencode, die ersten Compiler: wie Menschen lernten, Maschinen Anweisungen zu geben, und wie diese Sprache Schritt für Schritt menschlicher wurde.

## excerpt.en
Punched cards, machine code, the first compilers: how people learned to give machines instructions, and how this language became more human step by step.

## body.de

Die ersten Anweisungen an eine Maschine waren Löcher. Anfang des 19. Jahrhunderts steuerte Joseph-Marie Jacquard seine Webstühle mit gelochten Karten. Wo ein Loch war, hob sich ein Faden, wo keines war, blieb er liegen. So ließ sich ein Muster beliebig oft wiederholen. Die Karte war das Programm, auch wenn es dieses Wort noch nicht gab.

### Ein Gedanke, der seiner Zeit voraus war

1843 übersetzte Ada Lovelace einen Aufsatz über die Analytical Engine, eine Rechenmaschine, die Charles Babbage entworfen, aber nie fertig gebaut hatte. Ihre eigenen Anmerkungen zu diesem Text wurden länger als der Text selbst. Darin beschrieb sie Schritt für Schritt, wie die Maschine eine bestimmte Zahlenfolge berechnen könnte. Und sie überlegte, ob eine solche Maschine eines Tages auch mit anderen Symbolen umgehen könnte, zum Beispiel mit Musik.

Dass ausgerechnet eine Übersetzung am Anfang der Geschichte des Programmierens steht, gefällt mir bis heute.

### Von Lochkarten zu Nullen und Einsen

Für die Volkszählung in den USA im Jahr 1890 ließ Herman Hollerith die Daten auf Lochkarten erfassen und maschinell auszählen. Aus seiner Firma ging später IBM hervor.

Mit den ersten elektronischen Rechnern in den 1940er-Jahren wurde die Sprache der Maschine noch knapper. Befehle bestanden aus Zahlen, letztlich aus Nullen und Einsen. Wer programmierte, musste denken wie die Maschine, und ein einziger Fehler machte das Ergebnis unbrauchbar. Konrad Zuse stellte 1941 in Berlin die Z3 fertig und entwarf in den folgenden Jahren mit dem Plankalkül eine der ersten höheren Programmiersprachen. Vollständig veröffentlicht wurde sie erst Jahrzehnte später.

### Die Maschine übersetzt selbst

Einen entscheidenden Schritt machte Grace Hopper. Anfang der 1950er-Jahre entwickelte sie einen der ersten Compiler, ein Programm, das Anweisungen in eine Form übersetzt, die der Rechner ausführen kann. Sie war überzeugt, dass Menschen Programme in einer Sprache schreiben sollten, die Wörtern näher ist als Zahlen. Viele hielten das damals für unmöglich. Ihre Arbeit prägte später COBOL, eine Sprache für Geschäftsanwendungen, die bis heute in Banken und Verwaltungen läuft.

1957 erschien FORTRAN für wissenschaftliche Berechnungen. Von da an wurde jede Generation von Programmiersprachen ein wenig lesbarer. Heute schreibe ich Zeilen, die man fast laut vorlesen kann: Wenn die Person angemeldet ist, zeige ihr das Dashboard.

### Was geblieben ist

So menschlich Programmiersprachen inzwischen aussehen, sie bleiben streng. Ein fehlendes Zeichen, und nichts funktioniert mehr. Die Menschen haben sich weit auf die Maschine zubewegt, die Maschine ein Stück auf uns zu. In der Mitte getroffen haben sie sich lange nicht. Wie die Bewegung in die andere Richtung begann, beschreibt die nächste Notiz.

## body.en

The first instructions given to a machine were holes. At the beginning of the 19th century, Joseph-Marie Jacquard controlled his looms with punched cards. Where there was a hole, a thread was lifted; where there was none, it stayed down. This way, a pattern could be repeated as often as needed. The card was the program, even though the word did not yet exist.

### An idea ahead of its time

In 1843, Ada Lovelace translated an article about the Analytical Engine, a calculating machine that Charles Babbage had designed but never completed. Her own notes on the text grew longer than the text itself. In them, she described step by step how the machine could calculate a particular sequence of numbers. And she wondered whether such a machine might one day handle other symbols too, music for example.

I still like the fact that a translation stands at the beginning of the history of programming.

### From punched cards to zeros and ones

For the 1890 census in the United States, Herman Hollerith had the data recorded on punched cards and tabulated by machine. His company later became part of IBM.

With the first electronic computers in the 1940s, the language of the machine became even more terse. Instructions consisted of numbers, ultimately of zeros and ones. Anyone programming had to think like the machine, and a single mistake made the result useless. In 1941, Konrad Zuse completed the Z3 in Berlin, and in the following years he designed Plankalkül, one of the first high-level programming languages. It was only published in full decades later.

### The machine translates for itself

Grace Hopper took a decisive step. In the early 1950s, she developed one of the first compilers, a program that translates instructions into a form the computer can execute. She was convinced that people should write programs in a language closer to words than to numbers. Many thought this was impossible at the time. Her work later shaped COBOL, a language for business applications that still runs in banks and public administrations today.

FORTRAN followed in 1957 for scientific computing. From then on, each generation of programming languages became a little more readable. Today, I write lines that you can almost read aloud: if the person is logged in, show them the dashboard.

### What has remained

However human programming languages look today, they remain strict. One missing character and nothing works anymore. People moved a long way towards the machine, and the machine a little way towards us. For a long time, they did not meet in the middle. The next note describes how the movement in the other direction began.

---

# Entry 3

slug: machines-learning-our-language
stage: seedling
connected: from-language-to-code, people-learning-to-talk-to-machines

## title.de
Als Maschinen begannen, unsere Sprache zu lernen

## title.en
When machines began to learn our language

## excerpt.de
Von einem Übersetzungsexperiment im Jahr 1954 bis zu heutigen Sprachmodellen: warum es so lange gedauert hat, bis Computer mit menschlicher Sprache umgehen konnten.

## excerpt.en
From a translation experiment in 1954 to today's language models: why it took so long for computers to be able to handle human language.

## body.de

1950 stellte Alan Turing eine Frage, die bis heute nachwirkt. Wenn man sich schriftlich mit einer Maschine unterhält und nicht mehr erkennen kann, ob ein Mensch oder ein Rechner antwortet, könnte man dann sagen, dass sie denkt? Seitdem gilt Sprache als Prüfstein für künstliche Intelligenz.

### Der große Optimismus

Im Januar 1954 führten die Georgetown University und IBM in New York ein Experiment vor. Ein Rechner übersetzte mehr als sechzig russische Sätze ins Englische, auf der Grundlage eines kleinen Wörterbuchs und einer Handvoll Grammatikregeln. Die Beteiligten waren überzeugt, dass die maschinelle Übersetzung in wenigen Jahren gelöst sein würde.

Es kam anders. Sprache ließ sich nicht in Regeln fassen. Fast jedes Wort hat mehrere Bedeutungen, und welche gemeint ist, ergibt sich aus dem Zusammenhang, oft aus Wissen über die Welt, das nirgends im Text steht. 1966 kam ein Bericht im Auftrag der US-Regierung zu dem Schluss, dass maschinelle Übersetzung langsamer, ungenauer und teurer sei als menschliche. Die Förderung brach daraufhin weitgehend ein.

### Eine Maschine, die zuhört

Etwa zur gleichen Zeit stellte Joseph Weizenbaum am MIT das Programm ELIZA vor, das wie ein Gesprächstherapeut antwortete. Es verstand nichts. Es erkannte Schlüsselwörter und formte die Sätze seines Gegenübers zu Rückfragen um. Trotzdem vertrauten Menschen dem Programm Persönliches an.

Weizenbaum, 1923 in Berlin geboren, erschrak darüber. Er wurde zu einem der wichtigsten Kritiker eines unbedachten Vertrauens in Computer. Diese Warnung halte ich heute für wichtiger denn je.

### Aus Regeln werden Wahrscheinlichkeiten

Der Durchbruch kam erst, als man aufhörte, der Maschine Sprache zu erklären, und sie stattdessen aus Beispielen lernen ließ. Um 1990 werteten Forscher bei IBM die zweisprachigen Protokolle des kanadischen Parlaments aus und berechneten, welche Wörter und Wendungen einander in der jeweils anderen Sprache wahrscheinlich entsprechen. Nach diesem statistischen Prinzip arbeitete ab 2006 auch Google Translate.

2016 stellte Google auf neuronale Netze um, 2017 kam DeepL aus Köln hinzu. Die Übersetzungen wurden auf einmal flüssig. In diesen Jahren habe ich selbst als Übersetzerin gearbeitet und die Veränderung aus der Nähe erlebt.

### Sprachmodelle

Ebenfalls 2017 erschien ein Fachaufsatz mit dem Titel „Attention Is All You Need“. Er beschrieb die Transformer-Architektur, auf der heutige Sprachmodelle beruhen. Diese Modelle lernen aus enormen Textmengen, welche Wörter in welchem Zusammenhang aufeinander folgen. Dabei erfassen sie erstaunlich viel von Bedeutung, Tonfall und Kontext. Seit Ende 2022 kann sich jeder in ganz gewöhnlicher Sprache mit ihnen unterhalten.

### Was sie lernen und was nicht

Nach rund siebzig Jahren hat sich die Richtung also umgedreht: Die Maschine lernt unsere Sprache. Ob sie dabei auch versteht, was sie sagt, ist eine offene Frage, auf die ich in einer eigenen Notiz zurückkommen möchte.

Für meine Arbeit ziehe ich daraus eine einfache Konsequenz. Sprachmodelle können viel Arbeit abnehmen, wenn man genau weiß, was man von ihnen erwartet, und ihre Antworten prüft. Weizenbaums Warnung gehört für mich zu jedem KI-Projekt dazu.

## body.en

In 1950, Alan Turing asked a question that still resonates today. If you are having a written conversation with a machine and can no longer tell whether a person or a computer is answering, could you say that it thinks? Ever since, language has been seen as a touchstone for artificial intelligence.

### The great optimism

In January 1954, Georgetown University and IBM demonstrated an experiment in New York. A computer translated more than sixty Russian sentences into English, based on a small dictionary and a handful of grammar rules. Those involved were convinced that machine translation would be solved within a few years.

It turned out differently. Language could not be captured in rules. Almost every word has several meanings, and which one is meant depends on context, often on knowledge about the world that appears nowhere in the text. In 1966, a report commissioned by the US government concluded that machine translation was slower, less accurate and more expensive than human translation. Funding then largely collapsed.

### A machine that listens

Around the same time, Joseph Weizenbaum presented ELIZA at MIT, a program that responded like a psychotherapist. It understood nothing. It recognised keywords and turned the other person's sentences into questions. Even so, people confided personal matters to the program.

Weizenbaum, born in Berlin in 1923, was alarmed by this. He became one of the most important critics of thoughtless trust in computers. I consider this warning more important today than ever.

### From rules to probabilities

The breakthrough only came when people stopped explaining language to the machine and let it learn from examples instead. Around 1990, researchers at IBM analysed the bilingual records of the Canadian parliament and calculated which words and phrases were likely to correspond to each other in the other language. From 2006, Google Translate also worked on this statistical principle.

In 2016, Google switched to neural networks, and in 2017 DeepL from Cologne joined the field. Suddenly, translations sounded fluent. During those years, I was working as a translator myself and experienced the change at close range.

### Language models

Also in 2017, a research paper titled "Attention Is All You Need" was published. It described the transformer architecture on which today's language models are based. These models learn from enormous amounts of text which words follow one another in which context. In doing so, they capture a remarkable amount of meaning, tone and context. Since the end of 2022, anyone can talk to them in ordinary language.

### What they learn and what they don't

After around seventy years, the direction has reversed: the machine is learning our language. Whether it also understands what it says is an open question, one I want to return to in a separate note.

For my work, I draw a simple conclusion from this. Language models can take a lot of work off our hands if we know exactly what we expect from them and check their answers. For me, Weizenbaum's warning belongs in every AI project.
