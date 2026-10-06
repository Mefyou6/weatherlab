import type { Text } from "./sprachen";

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
  rolle: Text;
  beschreibung: Text;
  foto?: string;
  bildfokus?: string;
};

export const team: TeamMitglied[] = [
  {
    name: "Andrea Roithmeier",
    rolle: {
      en: "Project manager",
      de: "Projektleiterin",
    },
    beschreibung: {
      en: "Leads the project, keeps an eye on the schedule and is the contact person for the teacher.",
      de: "Leitet das Projekt, hält den Zeitplan im Blick und ist Ansprechperson für die Lehrkraft.",
    },
    foto: "/team/Andrea.jpg",
    bildfokus: "50% 40%",
  },
  {
    name: "David Sageder",
    rolle: {
      en: "Deputy project manager & developer",
      de: "Stv. Projektleiter & Entwickler",
    },
    beschreibung: {
      en: "Deputises for the project management and shares responsibility for the technical implementation.",
      de: "Vertritt die Projektleitung und ist für die technische Umsetzung mitverantwortlich.",
    },
    foto: "/team/David.jpg",
    bildfokus: "50% 34%",
  },
  {
    name: "Julian Weißböck",
    rolle: {
      en: "Secretary",
      de: "Schriftführer",
    },
    beschreibung: {
      en: "Writes the minutes, maintains the documents and records every decision in writing.",
      de: "Führt Protokolle, pflegt die Dokumente und hält alle Entscheidungen schriftlich fest.",
    },
    foto: "/team/Julian.jpg",
    bildfokus: "55% 64%",
  },
  {
    name: "Matthias Winklehner",
    rolle: {
      en: "Web developer",
      de: "Webentwickler",
    },
    beschreibung: {
      en: "Builds the project website and the time tracking.",
      de: "Entwickelt die Projektwebsite und die Arbeitszeitdokumentation.",
    },
    foto: "/team/Matthias.jpg",
    bildfokus: "45% 15%",
  },
  {
    name: "Fabian Seelig",
    rolle: {
      en: "Developer / support",
      de: "Entwickler / Unterstützung",
    },
    beschreibung: {
      en: "Supports the development work and steps in wherever help is needed.",
      de: "Unterstützt bei der Entwicklung und springt dort ein, wo Hilfe gebraucht wird.",
    },
    foto: "/team/Fabian.jpg",
  },
];

export const teamNamen = team.map((m) => m.name);
