import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WeatherLab",
    template: "%s · WeatherLab",
  },
  description:
    "WeatherLab – Projektwebsite für das Fach Projekt Praktikum: Projektvorstellung, Team, Fotos, Dokumente und Arbeitszeitdokumentation.",
};

/**
 * Läuft noch während des Ladens der Seite, also bevor der Browser etwas zeichnet.
 * Ohne das würde beim Aufruf kurz das helle Design aufblitzen.
 * Reihenfolge: gespeicherte Auswahl -> Systemeinstellung -> hell.
 */
const themeSkript = `(function(){try{var t=localStorage.getItem("weatherlab.theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dunkel":"hell";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      data-theme="hell"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeSkript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
