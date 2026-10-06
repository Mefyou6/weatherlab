import PageHeader from "@/components/PageHeader";
import LeerZustand from "@/components/LeerZustand";
import PraesentationEinbettung from "@/components/PraesentationEinbettung";
import { listPublicFiles } from "@/lib/files";
import { ui } from "@/content/texte";
import { t, type Sprache } from "@/content/sprachen";

const PRAESENTATION_ENDUNGEN = [".pdf", ".pptx", ".ppt"] as const;

export default function PraesentationSeite({ sprache }: { sprache: Sprache }) {
  const dateien = listPublicFiles("praesentation", PRAESENTATION_ENDUNGEN);

  // PDF wird für die Anzeige bevorzugt – die läuft in jedem Browser ohne Umweg.
  const anzeige = dateien.find((d) => d.endung === "PDF") ?? dateien[0];

  return (
    <>
      <PageHeader
        kicker={t(ui.praesentation.kicker, sprache)}
        ueberschrift={t(ui.praesentation.titel, sprache)}
        untertitel={t(ui.praesentation.untertitel, sprache)}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {!anzeige ? (
          <LeerZustand
            titel={t(ui.praesentation.leerTitel, sprache)}
            text={t(ui.praesentation.leerText, sprache)}
          />
        ) : (
          <>
            <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface-alt p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-ink">{anzeige.titel}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {t(ui.praesentation.hinweis, sprache)}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {dateien.map((d) => (
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
                titel={`${t(ui.praesentation.titel, sprache)}: ${anzeige.titel}`}
                nurOnlineHinweis={t(ui.praesentation.nurOnline, sprache)}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
