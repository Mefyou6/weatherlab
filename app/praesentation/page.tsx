import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeerZustand from "@/components/LeerZustand";
import PraesentationEinbettung from "@/components/PraesentationEinbettung";
import { listPublicFiles } from "@/lib/files";

export const metadata: Metadata = { title: "Präsentation" };

const PRAESENTATION_ENDUNGEN = [".pdf", ".pptx", ".ppt"] as const;

export default function PraesentationPage() {
  const dateien = listPublicFiles("praesentation", PRAESENTATION_ENDUNGEN);

  // PDF wird für die Anzeige bevorzugt – die läuft in jedem Browser ohne Umweg.
  const anzeige = dateien.find((d) => d.endung === "PDF") ?? dateien[0];
  const downloads = dateien;

  return (
    <>
      <PageHeader
        kicker="Projektabschluss"
        ueberschrift="Präsentation"
        untertitel="Unsere Projektpräsentation – direkt hier durchblättern oder herunterladen."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {!anzeige ? (
          <LeerZustand
            titel="Die Präsentation ist noch in Arbeit"
            text="Sobald sie fertig ist, kommt sie als PDF (empfohlen) oder PPTX in den Ordner public/praesentation und erscheint automatisch hier."
          />
        ) : (
          <>
            <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface-alt p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-ink">{anzeige.titel}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Im Fenster unten durchblättern – oder als Datei herunterladen.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {downloads.map((d) => (
                  <a
                    key={d.url}
                    href={d.url}
                    download={d.dateiname}
                    className="rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                  >
                    {d.endung} ({d.groesse})
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-line shadow-sm">
              <PraesentationEinbettung
                url={anzeige.url}
                istPdf={anzeige.endung === "PDF"}
                titel={`Präsentation: ${anzeige.titel}`}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
