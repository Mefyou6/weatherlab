import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { team } from "@/content/team";

export const metadata: Metadata = { title: "Team" };

function initialen(name: string) {
  return name
    .split(" ")
    .map((t) => t[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        kicker="Wer wir sind"
        ueberschrift="Unser Team"
        untertitel="Fünf Personen, klare Rollen. So teilen wir uns die Arbeit im Projekt auf."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article
              key={m.name}
              className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                {m.foto ? (
                  <Image
                    src={m.foto}
                    alt={m.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-semibold text-white">
                    {initialen(m.name)}
                  </span>
                )}
                <div>
                  <h2 className="font-semibold text-ink">{m.name}</h2>
                  <p className="mt-0.5 inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
                    {m.rolle}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{m.beschreibung}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface-alt">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Organigramm</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Die Projektstruktur auf einen Blick.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface p-4 sm:p-8">
            <Image
              src="/organigramm.png"
              alt="Organigramm des WeatherLab-Teams"
              width={800}
              height={960}
              className="mx-auto h-auto w-full max-w-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
