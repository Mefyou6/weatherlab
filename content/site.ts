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

  // Phasen / Meilensteine des Projekts
  phasen: [
    { name: "Projektstart & Idee", status: "erledigt" },
    { name: "Lastenheft", status: "laufend" },
    { name: "Pflichtenheft", status: "laufend" },
    { name: "Umsetzung", status: "offen" },
    { name: "Test & Abnahme", status: "offen" },
    { name: "Präsentation", status: "offen" },
  ] as const,
};

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
