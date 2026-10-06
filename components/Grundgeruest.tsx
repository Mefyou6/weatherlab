import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Sprache } from "@/content/sprachen";

/**
 * Gemeinsames Grundgerüst beider Sprachfassungen.
 *
 * Es gibt pro Sprache ein eigenes Root-Layout (app/(en) und app/(de)), damit
 * das <html lang="..."> stimmt. Alles darin Gleiche steht hier, damit es nicht
 * doppelt gepflegt werden muss.
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

export default function Grundgeruest({
  sprache,
  children,
}: {
  sprache: Sprache;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={sprache}
      data-theme="hell"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Die Regel stammt aus dem alten Pages Router; im App Router gehört das
          Skript laut Next.js-Doku genau hierher, damit es vor dem ersten
          Zeichnen läuft. next/head gibt es im App Router nicht mehr. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeSkript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header sprache={sprache} />
        <main className="flex-1">{children}</main>
        <Footer sprache={sprache} />
      </body>
    </html>
  );
}
