import type { Text } from "./sprachen";

/**
 * Zentrale Texte für die Projektvorstellung.
 * Jeder Text steht in beiden Sprachen: { en: "...", de: "..." }
 */

export const projekt = {
  name: "WeatherLab",
  claim: {
    en: "Measure the weather. Understand the data. Build it together.",
    de: "Wetter messen. Daten verstehen. Gemeinsam umsetzen.",
  },
  kurzbeschreibung: {
    en: "WeatherLab is our school project in the subject Project Practical. We plan, build and document a project around weather data – from the first idea and the requirements specification through to the finished result.",
    de: "WeatherLab ist unser Schulprojekt im Fach Projekt Praktikum. Wir planen, entwickeln und dokumentieren ein Projekt rund um das Thema Wetterdaten – von der Idee über das Lastenheft bis zur fertigen Umsetzung.",
  },
  schule: {
    en: "Vocational School · 4bITS",
    de: "Berufsschule · 4bITS",
  },
  fach: {
    en: "Project Practical",
    de: "Projekt Praktikum",
  },
  schuljahr: "2026",

  // Was ist das Ziel des Projekts?
  ziele: [
    {
      titel: {
        en: "Record weather data",
        de: "Wetterdaten erfassen",
      },
      text: {
        en: "Temperature, humidity and air pressure are measured with sensors and stored.",
        de: "Temperatur, Luftfeuchtigkeit und Luftdruck werden mit Sensoren gemessen und gespeichert.",
      },
    },
    {
      titel: {
        en: "Make the data visible",
        de: "Daten sichtbar machen",
      },
      text: {
        en: "The readings are prepared clearly and shown in a user interface.",
        de: "Die Messwerte werden übersichtlich aufbereitet und in einer Oberfläche dargestellt.",
      },
    },
    {
      titel: {
        en: "Manage the project properly",
        de: "Projekt sauber managen",
      },
      text: {
        en: "Requirements specification, functional specification, schedule and time tracking – following the rules of project management.",
        de: "Lastenheft, Pflichtenheft, Zeitplan und Arbeitszeitdokumentation nach den Regeln des Projektmanagements.",
      },
    },
  ] as { titel: Text; text: Text }[],

  /**
   * Phasen des Projekts – Grundlage für das Gantt-Diagramm.
   *
   * Datumsformat: "JJJJ-MM-TT".
   * status: "erledigt" | "laufend" | "offen"
   */
  phasen: [
    {
      name: { en: "Project start & idea", de: "Projektstart & Idee" },
      status: "erledigt",
      start: "2026-09-15",
      ende: "2026-09-15",
    },
    {
      name: { en: "Requirements specification", de: "Lastenheft" },
      status: "laufend",
      start: "2026-09-22",
      ende: "2026-09-29",
    },
    {
      name: { en: "Functional specification", de: "Pflichtenheft" },
      status: "laufend",
      start: "2026-09-22",
      ende: "2026-09-29",
    },
    {
      name: { en: "Implementation", de: "Umsetzung" },
      status: "laufend",
      start: "2026-09-15",
      ende: "2026-11-03",
    },
    {
      name: { en: "Testing & acceptance", de: "Test & Abnahme" },
      status: "offen",
      start: "2026-11-03",
      ende: "2026-11-03",
    },
    {
      name: { en: "Presentation", de: "Präsentation" },
      status: "offen",
      start: "2026-11-10",
      ende: "2026-11-10",
    },
  ] as const,
};

export type Phase = (typeof projekt.phasen)[number];

export type PhasenStatus = (typeof projekt.phasen)[number]["status"];

/**
 * Externe Arbeitszeitdokumentation ("Projektzeit Pro").
 * Wird auf der Seite /arbeitszeit eingebettet und verlinkt.
 */
export const arbeitszeitApp = {
  name: "Projektzeit Pro",
  url: "https://projektzeit-pro.vercel.app/",
  beschreibung: {
    en: "We track our working hours in Projektzeit Pro. Entries are stored centrally and are up to date on every device straight away – a login is required for this.",
    de: "Unsere Arbeitszeiten erfassen wir in Projektzeit Pro. Die Einträge werden zentral gespeichert und sind auf allen Geräten sofort aktuell – ein Login ist dafür nötig.",
  },
};
