# KTZG SNOW KB-Transformer

Lokale App, die aus einer Anleitung (Word, PDF, Text oder eingefügtem Inhalt) einen ServiceNow-Wissensartikel im Design des KTZG-Templates erstellt (`docs/Template.txt`, `docs/Example.png`).

**Keine Installation nötig:** `KB-Transformer.html` herunterladen und per Doppelklick im Browser (Edge, Chrome, Firefox) öffnen. Alles läuft lokal, nichts wird ins Internet gesendet, die App funktioniert auch offline.

## Bedienung

1. **Quelle:** `.docx`-, `.pdf`-, `.txt`- oder `.html`-Datei wählen bzw. hineinziehen, oder Inhalt (Strg+V) einfügen. Danach **Umwandeln** klicken.
2. **Bearbeiten:** Die App teilt den Inhalt in die Abschnitte *Beschreibung*, *Anleitung* und *Zusätzliche Informationen* auf. Jede Zeile besteht aus einem Bild (links) und einem Text (rechts), wie im Template.
   - Zeilen verschieben, zusammenführen, teilen oder einem anderen Abschnitt zuweisen
   - Bilder ersetzen: anklicken + Strg+V, hineinziehen oder «Bild» wählen
   - «Untertitel» beginnt ein aufklappbares Akkordeon (wie im Template)
   - Logo wählen (wird 90 px breit eingefügt). Häufige Logos lassen sich speichern.
   - Links als `Text | URL` eintragen
3. **Ergebnis:** Mit **HTML-Code kopieren** den Code kopieren und in ServiceNow im Quellcode-Fenster (`<>`) des Artikels einfügen. Alternativ mit **Formatiert kopieren** direkt in den Editor einfügen.

## Was übernommen wird

| Quelle | Text und Struktur | Bilder | Links |
|---|---|---|---|
| Word (.docx) | Überschriften, Listen, Fett/Kursiv, Tabellen | ja (eingebettet) | ja, anklickbar |
| PDF | Absätze und Titel werden aus der Schriftgrösse erkannt | ja | ja, anklickbar |
| Eingefügt (Webseite, Outlook) | ja | ja | ja |
| Eingefügt aus Word | ja | **nein** (Word gibt nur lokale Pfade weiter). Bitte die .docx-Datei verwenden. | ja |
| Text (.txt) | Absätze | – | URLs werden automatisch verlinkt |

- **Abschnitte:** Sie werden anhand von Überschriften wie «Beschreibung», «Problem», «Anleitung», «Lösung», «Weitere Links» oder «Hinweise» zugeordnet. Fehlen solche Überschriften, kommt der erste Block in die *Beschreibung* und der Rest in die *Anleitung*.
- **Bild-Zuordnung:** Steht der Text vor oder nach dem jeweiligen Bild? Das wird in Schritt 1 eingestellt.
- **Bilder:** Sie werden als Base64 direkt ins HTML eingebettet. Falls ServiceNow dies nicht zulässt, unter *Einstellungen* «Platzhalter» wählen. Die Bilder dann mit **Bilder herunterladen** speichern und in ServiceNow einzeln einfügen.
- **Schreibweise:** «ß» wird durch «ss» ersetzt (abschaltbar).

## Entwicklung

- Quellcode: `src/index.html`
- Bibliotheken in `vendor/`: [mammoth.js](https://github.com/mwilliamson/mammoth.js) 1.8.0 (BSD-2) für Word und [pdf.js](https://github.com/mozilla/pdf.js) 3.11.174 (Apache-2.0) für PDF.
- Neu bauen (benötigt nur Node.js, nicht für die Benutzung): `node build.mjs`. Dabei entsteht `KB-Transformer.html` mit allen Bibliotheken eingebettet.
