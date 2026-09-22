# WeatherLab – Projektwebsite

Projektwebsite für das Fach Projektmanagement. Gebaut mit Next.js + Tailwind CSS, gehostet auf Vercel.

## Seiten

| Seite            | Inhalt                                             | Wo bearbeiten?              |
| ---------------- | -------------------------------------------------- | --------------------------- |
| `/`              | Projektvorstellung, Ziele, Projektphasen           | `content/site.ts`           |
| `/team`          | Teammitglieder mit Rollen + Organigramm            | `content/team.ts`           |
| `/fotos`         | Fotogalerie                                        | Bilder in `public/fotos/`   |
| `/dokumente`     | Dokumente ansehen / downloaden                     | Dateien in `public/dokumente/` |
| `/arbeitszeit`   | Externe Zeiterfassung „Projektzeit Pro“ (eingebettet) | `content/site.ts` (`arbeitszeitApp`) |

## Inhalte pflegen

- **Fotos:** JPG/PNG/WebP einfach in `public/fotos/` legen. Der Dateiname wird als Bildtitel angezeigt (`Teammeeting_1.jpg` → „Teammeeting 1“).
- **Dokumente:** PDFs (oder DOCX, XLSX, …) in `public/dokumente/` legen, z. B. `Lastenheft.pdf`, `Pflichtenheft.pdf`.
- **Teamfotos:** Bild in `public/team/` legen und in `content/team.ts` bei der Person `foto: "/team/name.jpg"` eintragen.
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
