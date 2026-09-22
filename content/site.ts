/**
 * Zentrale Texte für die Projektvorstellung.
 * Hier kannst du alles anpassen – die Startseite liest diese Datei.
 */

export const projekt = {
  name: "WeatherLab",
  claim: "Wetter messen. Daten verstehen. Gemeinsam umsetzen.",
  kurzbeschreibung:
    "WeatherLab ist unser Schulprojekt im Fach Projekt Praktikum. Wir planen, entwickeln und dokumentieren ein Projekt rund um das Thema Wetterdaten – von der Idee über das Lastenheft bis zur fertigen Umsetzung.",
  schule: "Berufsschule · 4bITS",
  fach: "Projekt Praktikum",
  schuljahr: "2026",

  // Was ist das Ziel des Projekts?
  ziele: [
    {
      titel: "Wetterdaten erfassen",
      text: "Temperatur, Luftfeuchtigkeit und Luftdruck werden mit Sensoren gemessen und gespeichert.",
    },
    {
      titel: "Daten sichtbar machen",
      text: "Die Messwerte werden übersichtlich aufbereitet und in einer Oberfläche dargestellt.",
    },
    {
      titel: "Projekt sauber managen",
      text: "Lastenheft, Pflichtenheft, Zeitplan und Arbeitszeitdokumentation nach den Regeln des Projektmanagements.",
    },
  ],

  /**
   * Phasen des Projekts – Grundlage für die Liste und das Gantt-Diagramm.
   *
   * ACHTUNG: Die Datumsangaben sind PLATZHALTER und müssen noch auf euren
   * echten Zeitplan angepasst werden. Format: "JJJJ-MM-TT".
   * status: "erledigt" | "laufend" | "offen"
   */
  phasen: [
    { name: "Projektstart & Idee", status: "erledigt", start: "2026-09-15", ende: "2026-09-15" },
    { name: "Lastenheft", status: "laufend", start: "2026-09-22", ende: "2026-09-29" },
    { name: "Pflichtenheft", status: "laufend", start: "2026-09-22", ende: "2026-09-29" },
    { name: "Umsetzung", status: "offen", start: "2026-09-15", ende: "2026-11-03" },
    { name: "Test & Abnahme", status: "offen", start: "2026-11-03", ende: "2026-11-03" },
    { name: "Präsentation", status: "offen", start: "2026-11-10", ende: "2026-11-10" },
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
  beschreibung:
    "Unsere Arbeitszeiten erfassen wir in Projektzeit Pro. Die Einträge werden zentral gespeichert und sind auf allen Geräten sofort aktuell – ein Login ist dafür nötig.",
};
