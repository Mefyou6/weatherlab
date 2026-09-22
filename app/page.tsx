import Image from "next/image";
import Link from "next/link";
import { projekt, type PhasenStatus } from "@/content/site";
import { team } from "@/content/team";

const statusStyle: Record<PhasenStatus, { label: string; dot: string; text: string }> = {
  erledigt: { label: "Erledigt", dot: "bg-brand", text: "text-ink" },
  laufend: { label: "In Arbeit", dot: "bg-brand animate-pulse", text: "text-ink" },
  offen: { label: "Offen", dot: "bg-line", text: "text-ink-muted" },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-soft blur-3xl"
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
              {projekt.schule} · {projekt.fach}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {projekt.name}
            </h1>
            <p className="mt-3 text-xl text-ink-soft">{projekt.claim}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              {projekt.kurzbeschreibung}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dokumente"
                className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-dark"
              >
                Dokumente ansehen
              </Link>
              <Link
                href="/team"
                className="rounded-md border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
              >
                Das Team
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="rounded-2xl border border-line bg-surface px-10 py-14 shadow-sm sm:px-14 sm:py-20">
              <Image
                src="/logo.png"
                alt="WeatherLab Logo"
                width={664}
                height={114}
                priority
                className="h-auto w-64 sm:w-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          <Stat wert={String(team.length)} label="Teammitglieder" />
          <Stat wert={String(projekt.phasen.length)} label="Projektphasen" />
          <Stat
            wert={String(projekt.phasen.filter((p) => p.status === "erledigt").length)}
            label="Phasen abgeschlossen"
          />
          <Stat wert={projekt.schuljahr} label="Schuljahr" />
        </div>
      </section>

      {/* Ziele */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Worum geht es?
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Die drei Kernziele unseres Projekts.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projekt.ziele.map((z, i) => (
            <div
              key={z.titel}
              className="rounded-xl border border-line bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft font-mono text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{z.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{z.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phasen */}
      <section className="border-y border-line bg-surface-alt">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Projektverlauf
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Wo wir gerade stehen – von der Idee bis zur Präsentation.
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projekt.phasen.map((p, i) => {
              const s = statusStyle[p.status];
              return (
                <li
                  key={p.name}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4"
                >
                  <span className="font-mono text-sm text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 font-medium ${s.text}`}>{p.name}</span>
                  <span className="flex items-center gap-2 text-xs text-ink-muted">
                    <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Schnellzugriff */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Karte
            href="/fotos"
            titel="Fotos vom Projekt"
            text="Eindrücke aus der Planung, Entwicklung und den Teammeetings."
          />
          <Karte
            href="/arbeitszeit"
            titel="Arbeitszeitdokumentation"
            text="Unsere Arbeitsstunden erfassen wir in Projektzeit Pro – direkt hier nutzbar."
          />
        </div>
      </section>
    </>
  );
}

function Stat({ wert, label }: { wert: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-semibold tracking-tight text-ink">{wert}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </div>
  );
}

function Karte({ href, titel, text }: { href: string; titel: string; text: string }) {
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-surface p-6 transition-all hover:border-brand hover:shadow-md"
    >
      <div>
        <h3 className="text-lg font-semibold text-ink group-hover:text-brand">{titel}</h3>
        <p className="mt-2 text-sm text-ink-soft">{text}</p>
      </div>
      <span className="mt-1 text-brand transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}
