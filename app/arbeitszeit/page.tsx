import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { arbeitszeitApp } from "@/content/site";

export const metadata: Metadata = { title: "Arbeitszeitdokumentation" };

export default function ArbeitszeitPage() {
  return (
    <>
      <PageHeader
        kicker="Zeiterfassung"
        ueberschrift="Arbeitszeitdokumentation"
        untertitel={arbeitszeitApp.beschreibung}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Hinweis + Direktlink */}
        <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface-alt p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-ink">{arbeitszeitApp.name}</p>
            <p className="mt-1 text-sm text-ink-soft">
              Unten direkt nutzbar. Falls die Anmeldung im eingebetteten Fenster nicht
              funktioniert, die App in einem eigenen Tab öffnen.
            </p>
          </div>
          <a
            href={arbeitszeitApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            In neuem Tab öffnen
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
        </div>

        {/* Eingebettete App */}
        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-ink shadow-sm">
          <iframe
            src={arbeitszeitApp.url}
            title={`${arbeitszeitApp.name} – Arbeitszeitdokumentation`}
            className="h-[720px] w-full border-0 lg:h-[820px]"
            allow="clipboard-write"
          />
        </div>

        <p className="mt-3 text-xs text-ink-muted">
          Eingebettet von{" "}
          <a
            href={arbeitszeitApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-brand"
          >
            projektzeit-pro.vercel.app
          </a>
        </p>
      </section>
    </>
  );
}
