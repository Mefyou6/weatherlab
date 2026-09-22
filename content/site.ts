/**
 * Zentrale Texte für die Projektvorstellung.
 * Hier kannst du alles anpassen – die Startseite liest diese Datei.
 */

export const projekt = {
  name: "WeatherLab",
  claim: "Wetter messen. Daten verstehen. Gemeinsam umsetzen.",
  kurzbeschreibung:
    "WeatherLab ist unser Schulprojekt im Fach Projektmanagement. Wir planen, entwickeln und dokumentieren ein Projekt rund um das Thema Wetterdaten – von der Idee über das Lastenheft bis zur fertigen Umsetzung.",
  schule: "Berufsschule · 4. Klasse",
  fach: "Projektmanagement",
  schuljahr: "2026/27",

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
    { name: "Lastenheft", status: "erledigt" },
    { name: "Pflichtenheft", status: "laufend" },
    { name: "Umsetzung", status: "offen" },
    { name: "Test & Abnahme", status: "offen" },
    { name: "Präsentation", status: "offen" },
  ] as const,
};

export type PhasenStatus = (typeof projekt.phasen)[number]["status"];
