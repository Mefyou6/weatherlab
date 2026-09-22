/**
 * Team-Mitglieder und Rollen (laut Organigramm).
 *
 * Foto: Datei in `public/team/` ablegen und hier als `foto: "/team/name.jpg"` eintragen.
 * Ohne Foto werden die Initialen angezeigt.
 *
 * `bildfokus` steuert den Bildausschnitt im runden Rahmen (CSS object-position):
 * "50% 30%" heißt waagrecht mittig, senkrecht im oberen Drittel. Kleinerer zweiter
 * Wert = weiter oben. Nötig, weil Passfotos hochkant sind und das Gesicht oben sitzt.
 */

export type TeamMitglied = {
  name: string;
  rolle: string;
  beschreibung: string;
  foto?: string;
  bildfokus?: string;
};

export const team: TeamMitglied[] = [
  {
    name: "Andrea Roithmeier",
    rolle: "Projektleiterin",
    beschreibung:
      "Leitet das Projekt, hält den Zeitplan im Blick und ist Ansprechperson für die Lehrkraft.",
    foto: "/team/Andrea.jpg",
    bildfokus: "50% 40%",
  },
  {
    name: "David Sageder",
    rolle: "Stv. Projektleiter & Entwickler",
    beschreibung:
      "Vertritt die Projektleitung und ist für die technische Umsetzung mitverantwortlich.",
    foto: "/team/David.jpg",
    bildfokus: "50% 34%",
  },
  {
    name: "Julian Weißböck",
    rolle: "Schriftführer",
    beschreibung:
      "Führt Protokolle, pflegt die Dokumente und hält alle Entscheidungen schriftlich fest.",
    foto: "/team/Julian.jpg",
    bildfokus: "55% 64%",
  },
  {
    name: "Matthias Winklehner",
    rolle: "Webentwickler",
    beschreibung:
      "Entwickelt die Projektwebsite und die Arbeitszeitdokumentation.",
    foto: "/team/Matthias.jpg",
    bildfokus: "45% 15%",
  },
  {
    name: "Fabian Seelig",
    rolle: "Entwickler / Unterstützung",
    beschreibung:
      "Unterstützt bei der Entwicklung und springt dort ein, wo Hilfe gebraucht wird.",
    foto: "/team/Fabian.jpg",
  },
];

export const teamNamen = team.map((m) => m.name);
