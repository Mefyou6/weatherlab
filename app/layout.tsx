import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { meta } from "@/content/texte";

/**
 * Einziges Root-Layout für beide Sprachen.
 *
 * Wichtig: Es darf nur EIN Root-Layout geben. Zwei Root-Layouts über
 * Route-Gruppen (app/(en) und app/(de)) haben beim statischen Export dazu
 * geführt, dass die deutschen Seiten ganz ohne <html>, <head> und Stylesheet
 * erzeugt wurden.
 *
 * Deshalb steht hier lang="en" (Standardsprache). Die deutschen Seiten setzen
 * es in app/de/layout.tsx auf "de" um.
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Läuft noch während des Ladens der Seite, also bevor der Browser etwas zeichnet.
 * Ohne das würde beim Aufruf kurz das helle Design aufblitzen.
 * Reihenfolge: gespeicherte Auswahl -> Systemeinstellung -> hell.
 */
const themeSkript = `(function(){try{var t=localStorage.getItem("weatherlab.theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dunkel":"hell";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export const metadata: Metadata = {
  title: {
    default: "WeatherLab",
    template: "%s · WeatherLab",
  },
  description: meta.beschreibung.en,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="hell"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeSkript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
