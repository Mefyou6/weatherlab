/**
 * Team-Mitglieder und Rollen (laut Organigramm).
 *
 * Optionales Foto: Datei in `public/team/` ablegen und hier als `foto: "/team/name.jpg"` eintragen.
 * Ohne Foto werden die Initialen angezeigt.
 */

export type TeamMitglied = {
  name: string;
  rolle: string;
  beschreibung: string;
  foto?: string;
};

export const team: TeamMitglied[] = [
  {
    name: "Andrea Roithmeier",
    rolle: "Projektleiterin",
    beschreibung:
      "Leitet das Projekt, hält den Zeitplan im Blick und ist Ansprechperson für die Lehrkraft.",
  },
  {
    name: "David Sageder",
    rolle: "Stv. Projektleiter & Entwickler",
    beschreibung:
      "Vertritt die Projektleitung und ist für die technische Umsetzung mitverantwortlich.",
  },
  {
    name: "Julian Weißböck",
    rolle: "Schriftführer",
    beschreibung:
      "Führt Protokolle, pflegt die Dokumente und hält alle Entscheidungen schriftlich fest.",
  },
  {
    name: "Matthias Winklehner",
    rolle: "Webentwickler",
    beschreibung:
      "Entwickelt die Projektwebsite und die Arbeitszeitdokumentation.",
  },
  {
    name: "Fabian Seelig",
    rolle: "Entwickler / Unterstützung",
    beschreibung:
      "Unterstützt bei der Entwicklung und springt dort ein, wo Hilfe gebraucht wird.",
  },
];

export const teamNamen = team.map((m) => m.name);
