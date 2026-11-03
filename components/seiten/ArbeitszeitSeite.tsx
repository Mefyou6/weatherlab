import PageHeader from "@/components/PageHeader";
import { arbeitszeitApp } from "@/content/site";
import { ui } from "@/content/texte";
import { t, type Sprache } from "@/content/sprachen";

/**
 * Verweist auf die externe Zeiterfassung.
 *
 * Eingebettet war sie früher per <iframe>. Projektzeit Pro sendet inzwischen
 * "X-Frame-Options: DENY" und "frame-ancestors 'none'" – damit verbietet die
 * App jede Einbettung und der Rahmen bliebe leer ("Verbindung abgelehnt").
 * Deshalb hier ein deutlicher Verweis statt eines kaputten Fensters.
 */

export default function ArbeitszeitSeite({ sprache }: { sprache: Sprache }) {
  return (
    <>
      <PageHeader
        kicker={t(ui.arbeitszeit.kicker, sprache)}
        ueberschrift={t(ui.arbeitszeit.titel, sprache)}
        untertitel={t(arbeitszeitApp.beschreibung, sprache)}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-line bg-surface-alt p-8 text-center sm:p-12">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>

          <h2 className="mt-5 text-xl font-semibold text-ink">{arbeitszeitApp.name}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            {t(ui.arbeitszeit.hinweis, sprache)}
          </p>

          <a
            href={arbeitszeitApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            {t(ui.arbeitszeit.neuerTab, sprache)}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
            </svg>
          </a>

          <p className="mt-4 font-mono text-xs text-ink-muted">projektzeit-pro.vercel.app</p>
          <p className="mx-auto mt-6 max-w-sm text-xs leading-relaxed text-ink-muted">
            {t(ui.arbeitszeit.loginHinweis, sprache)}
          </p>
        </div>
      </section>
    </>
  );
}
