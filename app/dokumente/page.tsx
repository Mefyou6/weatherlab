import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeerZustand from "@/components/LeerZustand";
import { DOKUMENT_ENDUNGEN, listPublicFiles } from "@/lib/files";

export const metadata: Metadata = { title: "Dokumente" };

// PDFs (und Textdateien) kann der Browser direkt anzeigen – Office-Dateien nur herunterladen.
const IM_BROWSER_ANZEIGBAR = new Set(["PDF", "TXT", "MD"]);

export default function DokumentePage() {
  const dokumente = listPublicFiles("dokumente", DOKUMENT_ENDUNGEN);

  return (
    <>
      <PageHeader
        kicker="Projektdokumentation"
        ueberschrift="Dokumente"
        untertitel="Lastenheft, Pflichtenheft, Protokolle und weitere Unterlagen – zum Ansehen oder Herunterladen."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {dokumente.length === 0 ? (
          <LeerZustand
            titel="Noch keine Dokumente vorhanden"
            text="Lege Dateien (z. B. Lastenheft.pdf, Pflichtenheft.pdf) im Ordner public/dokumente ab und pushe die Änderung – sie erscheinen dann automatisch hier."
          />
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {dokumente.map((d) => {
              const anzeigbar = IM_BROWSER_ANZEIGBAR.has(d.endung);
              return (
                <li
                  key={d.url}
                  className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-soft font-mono text-xs font-semibold text-brand">
                      {d.endung}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{d.titel}</p>
                      <p className="text-xs text-ink-muted">
                        {d.dateiname} · {d.groesse}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    {anzeigbar && (
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
                      >
                        Ansehen
                      </a>
                    )}
                    <a
                      href={d.url}
                      download={d.dateiname}
                      className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                    >
                      Download
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
