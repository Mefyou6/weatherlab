# WeatherLab – Projektwebsite

Projektwebsite für das Fach Projekt Praktikum. Gebaut mit Next.js + Tailwind CSS, gehostet auf Vercel.

## Sprachen

Die Website gibt es auf **Englisch (Standard)** und **Deutsch**. Die Sprache steht in der Adresse:

| Sprache  | Adresse            |
| -------- | ------------------ |
| Englisch | `/`, `/team`, …    |
| Deutsch  | `/de`, `/de/team`, … |

Umgeschaltet wird über den `DE`/`EN`-Knopf oben rechts. Weil die Sprache in der Adresse steht, kann man auch einen Link in einer bestimmten Sprache verschicken.

**Texte übersetzen:** Jeder Text steht in beiden Sprachen nebeneinander, z. B.
`{ en: "Our team", de: "Unser Team" }`. Drei Dateien:

- `content/texte.ts` – alle festen Texte der Oberfläche (Navigation, Knöpfe, Überschriften)
- `content/site.ts` – Projektbeschreibung, Ziele, Projektphasen
- `content/team.ts` – Rollen und Beschreibungen der Teammitglieder

Neue Seite anlegen? Dann die Seite als Komponente in `components/seiten/` schreiben und je eine kleine Datei unter `app/(en)/…` und `app/(de)/de/…` anlegen (siehe die vorhandenen Seiten – sie sind nur 5 Zeilen lang).

## Seiten

| Seite (EN / DE)                    | Inhalt                                             | Wo bearbeiten?              |
| ---------------------------------- | -------------------------------------------------- | --------------------------- |
| `/` · `/de`                        | Projektvorstellung, Ziele, Zeitplan                | `content/site.ts`           |
| `/team` · `/de/team`               | Teammitglieder mit Rollen + Organigramm            | `content/team.ts`           |
| `/fotos` · `/de/fotos`             | Fotogalerie                                        | Bilder in `public/fotos/`   |
| `/dokumente` · `/de/dokumente`     | Dokumente ansehen / downloaden                     | Dateien in `public/dokumente/` |
| `/praesentation` · `/de/praesentation` | Projektpräsentation (eingebettet + Download)   | Datei in `public/praesentation/` |
| `/arbeitszeit` · `/de/arbeitszeit` | Externe Zeiterfassung „Projektzeit Pro“ (eingebettet) | `content/site.ts` (`arbeitszeitApp`) |

## Inhalte pflegen

- **Fotos:** JPG/PNG/WebP einfach in `public/fotos/` legen. Der Dateiname wird als Bildtitel angezeigt (`Teammeeting_1.jpg` → „Teammeeting 1“).
- **Dokumente:** PDFs (oder DOCX, XLSX, …) in `public/dokumente/` legen, z. B. `Lastenheft.pdf`, `Pflichtenheft.pdf`.
- **Teamfotos:** Bild in `public/team/` legen und in `content/team.ts` bei der Person `foto: "/team/name.jpg"` eintragen. `bildfokus` steuert den Ausschnitt im runden Rahmen (`"50% 30%"` = waagrecht mittig, senkrecht weiter oben).
- **Zeitplan:** Phasen mit Datum (`"JJJJ-MM-TT"`) und Status (`erledigt` / `laufend` / `offen`) in `content/site.ts` unter `phasen`.
- **Präsentation:** Datei in `public/praesentation/` legen. **PDF wird empfohlen** (PowerPoint: _Datei → Exportieren → PDF_) – das zeigt jeder Browser direkt an. Eine `.pptx` funktioniert auch, wird dann aber über den Office-Online-Viewer von Microsoft angezeigt und ist nur auf der veröffentlichten Website sichtbar, nicht lokal. Du kannst beide Dateien ablegen: PDF zum Ansehen, PPTX zusätzlich zum Download.
- **Arbeitszeiten:** Läuft in der externen App [Projektzeit Pro](https://projektzeit-pro.vercel.app/). Die Seite `/arbeitszeit` bettet sie ein und verlinkt sie. Ändert sich die Adresse, nur `arbeitszeitApp.url` in `content/site.ts` anpassen.

## Lokal starten

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen.

## Veröffentlichen (Vercel)

Jede Änderung muss auf GitHub gepusht werden – Vercel baut die Seite dann automatisch neu:

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Nach 1–2 Minuten ist die neue Version live.
