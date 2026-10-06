import PageHeader from "@/components/PageHeader";
import LeerZustand from "@/components/LeerZustand";
import { DOKUMENT_ENDUNGEN, listPublicFiles } from "@/lib/files";
import { ui } from "@/content/texte";
import { t, type Sprache } from "@/content/sprachen";

// PDFs (und Textdateien) kann der Browser direkt anzeigen – Office-Dateien nur herunterladen.
const IM_BROWSER_ANZEIGBAR = new Set(["PDF", "TXT", "MD"]);

export default function DokumenteSeite({ sprache }: { sprache: Sprache }) {
  const dokumente = listPublicFiles("dokumente", DOKUMENT_ENDUNGEN);

  return (
    <>
      <PageHeader
        kicker={t(ui.dokumente.kicker, sprache)}
        ueberschrift={t(ui.dokumente.titel, sprache)}
        untertitel={t(ui.dokumente.untertitel, sprache)}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {dokumente.length === 0 ? (
          <LeerZustand
            titel={t(ui.dokumente.leerTitel, sprache)}
            text={t(ui.dokumente.leerText, sprache)}
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
                        {t(ui.dokumente.ansehen, sprache)}
                      </a>
                    )}
                    <a
                      href={d.url}
                      download={d.dateiname}
                      className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                    >
                      {t(ui.dokumente.herunterladen, sprache)}
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
