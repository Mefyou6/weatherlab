import type { Text } from "./sprachen";

/**
 * Alle festen Texte der Oberfläche in beiden Sprachen.
 * Links steht immer Englisch, rechts Deutsch – so sieht man beim Ändern beides.
 */

export const ui = {
  nav: {
    projekt: { en: "Project", de: "Projekt" },
    team: { en: "Team", de: "Team" },
    fotos: { en: "Photos", de: "Fotos" },
    dokumente: { en: "Documents", de: "Dokumente" },
    praesentation: { en: "Presentation", de: "Präsentation" },
    arbeitszeit: { en: "Time tracking", de: "Arbeitszeit" },
    menueOeffnen: { en: "Open menu", de: "Menü öffnen" },
  },

  design: {
    titel: { en: "Light / dark theme", de: "Helles / dunkles Design" },
    beschriftung: {
      en: "Switch between light and dark theme",
      de: "Zwischen hellem und dunklem Design wechseln",
    },
  },

  sprache: {
    // Beschriftung des Umschalters: zeigt die jeweils ANDERE Sprache
    wechselZu: { en: "DE", de: "EN" },
    beschreibung: {
      en: "Diese Seite auf Deutsch anzeigen",
      de: "Show this page in English",
    },
  },

  footer: {
    rechte: { en: "WeatherLab team · school project", de: "WeatherLab-Team · Schulprojekt" },
  },

  start: {
    dokumenteAnsehen: { en: "View documents", de: "Dokumente ansehen" },
    dasTeam: { en: "Meet the team", de: "Das Team" },
    teammitglieder: { en: "Team members", de: "Teammitglieder" },
    projektphasen: { en: "Project phases", de: "Projektphasen" },
    phasenFertig: { en: "Phases completed", de: "Phasen abgeschlossen" },
    schuljahr: { en: "School year", de: "Schuljahr" },
    worumGehtEs: { en: "What is it about?", de: "Worum geht es?" },
    kernziele: {
      en: "The three core goals of our project.",
      de: "Die drei Kernziele unseres Projekts.",
    },
    zeitplan: { en: "Schedule", de: "Zeitplan" },
    zeitplanText: {
      en: "Where we stand right now – from the idea to the presentation.",
      de: "Wo wir gerade stehen – von der Idee bis zur Präsentation.",
    },
    karteFotos: { en: "Photos from the project", de: "Fotos vom Projekt" },
    karteFotosText: {
      en: "Impressions from planning, development and our team meetings.",
      de: "Eindrücke aus der Planung, Entwicklung und den Teammeetings.",
    },
    karteZeit: { en: "Time tracking", de: "Arbeitszeitdokumentation" },
    karteZeitText: {
      en: "We record our working hours in Projektzeit Pro – usable right here.",
      de: "Unsere Arbeitsstunden erfassen wir in Projektzeit Pro – direkt hier nutzbar.",
    },
  },

  zeitplan: {
    erledigt: { en: "Completed", de: "Erledigt" },
    laufend: { en: "In progress", de: "In Arbeit" },
    offen: { en: "Open", de: "Offen" },
    heute: { en: "Today", de: "Heute" },
    tage: { en: "days", de: "Tage" },
  },

  team: {
    kicker: { en: "Who we are", de: "Wer wir sind" },
    titel: { en: "Our team", de: "Unser Team" },
    untertitel: {
      en: "Five people, clearly defined roles. This is how we share the work in the project.",
      de: "Fünf Personen, klare Rollen. So teilen wir uns die Arbeit im Projekt auf.",
    },
    fotoVon: { en: "Photo of", de: "Foto von" },
    organigramm: { en: "Organisation chart", de: "Organigramm" },
    organigrammText: {
      en: "The project structure at a glance.",
      de: "Die Projektstruktur auf einen Blick.",
    },
    organigrammAlt: {
      en: "Organisation chart of the WeatherLab team",
      de: "Organigramm des WeatherLab-Teams",
    },
  },

  fotos: {
    kicker: { en: "Insights", de: "Einblicke" },
    titel: { en: "Photos from the project", de: "Fotos vom Projekt" },
    untertitel: {
      en: "Impressions from our meetings, the planning and the build.",
      de: "Eindrücke aus Meetings, Planung und Umsetzung.",
    },
    leerTitel: { en: "No photos yet", de: "Noch keine Fotos vorhanden" },
    leerText: {
      en: "Put images (JPG, PNG, WebP) into the folder public/fotos and push the change – they will appear here automatically.",
      de: "Lege Bilder (JPG, PNG, WebP) im Ordner public/fotos ab und pushe die Änderung – sie erscheinen dann automatisch hier.",
    },
    einzahl: { en: "photo", de: "Foto" },
    mehrzahl: { en: "photos", de: "Fotos" },
    zumVergroessern: { en: "click to enlarge", de: "Klicken zum Vergrößern" },
    schliessen: { en: "Close", de: "Schließen" },
    vorheriges: { en: "Previous image", de: "Vorheriges Bild" },
    naechstes: { en: "Next image", de: "Nächstes Bild" },
  },

  dokumente: {
    kicker: { en: "Project documentation", de: "Projektdokumentation" },
    titel: { en: "Documents", de: "Dokumente" },
    untertitel: {
      en: "Requirements specification, functional specification, minutes and other files – to view or download.",
      de: "Lastenheft, Pflichtenheft, Protokolle und weitere Unterlagen – zum Ansehen oder Herunterladen.",
    },
    leerTitel: { en: "No documents yet", de: "Noch keine Dokumente vorhanden" },
    leerText: {
      en: "Put files (e.g. Lastenheft.pdf, Pflichtenheft.pdf) into the folder public/dokumente and push the change – they will appear here automatically.",
      de: "Lege Dateien (z. B. Lastenheft.pdf, Pflichtenheft.pdf) im Ordner public/dokumente ab und pushe die Änderung – sie erscheinen dann automatisch hier.",
    },
    ansehen: { en: "View", de: "Ansehen" },
    herunterladen: { en: "Download", de: "Download" },
  },

  praesentation: {
    kicker: { en: "Project conclusion", de: "Projektabschluss" },
    titel: { en: "Presentation", de: "Präsentation" },
    untertitel: {
      en: "Our project presentation – flip through it here or download it.",
      de: "Unsere Projektpräsentation – direkt hier durchblättern oder herunterladen.",
    },
    leerTitel: {
      en: "The presentation is still being worked on",
      de: "Die Präsentation ist noch in Arbeit",
    },
    leerText: {
      en: "As soon as it is ready it goes into the folder public/praesentation as a PDF (recommended) or PPTX and appears here automatically.",
      de: "Sobald sie fertig ist, kommt sie als PDF (empfohlen) oder PPTX in den Ordner public/praesentation und erscheint automatisch hier.",
    },
    hinweis: {
      en: "Flip through it in the window below – or download the file.",
      de: "Im Fenster unten durchblättern – oder als Datei herunterladen.",
    },
    nurOnline: {
      en: "The PowerPoint preview only works on the published website, because Microsoft has to download the file for it. Locally, please download the file instead.",
      de: "Die PowerPoint-Vorschau funktioniert nur auf der veröffentlichten Website, weil Microsoft die Datei dafür herunterladen muss. Lokal bitte die Datei herunterladen.",
    },
    eingebettetVon: { en: "Embedded from", de: "Eingebettet von" },
  },

  arbeitszeit: {
    kicker: { en: "Time tracking", de: "Zeiterfassung" },
    titel: { en: "Working time documentation", de: "Arbeitszeitdokumentation" },
    hinweis: {
      en: "Usable directly below. If signing in does not work inside the embedded window, open the app in its own tab.",
      de: "Unten direkt nutzbar. Falls die Anmeldung im eingebetteten Fenster nicht funktioniert, die App in einem eigenen Tab öffnen.",
    },
    neuerTab: { en: "Open in a new tab", de: "In neuem Tab öffnen" },
    eingebettetVon: { en: "Embedded from", de: "Eingebettet von" },
  },
} satisfies Record<string, Record<string, Text>>;

/** Monatskürzel für das Gantt-Diagramm (fest verdrahtet, damit sie nicht vom Build-Rechner abhängen) */
export const MONATE: Record<"en" | "de", string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  de: ["Jän", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
};

/** Metadaten für den Browser-Tab und Suchmaschinen */
export const meta = {
  beschreibung: {
    en: "WeatherLab – project website for the subject Project Practical: project introduction, team, photos, documents and time tracking.",
    de: "WeatherLab – Projektwebsite für das Fach Projekt Praktikum: Projektvorstellung, Team, Fotos, Dokumente und Arbeitszeitdokumentation.",
  },
} satisfies Record<string, Text>;
