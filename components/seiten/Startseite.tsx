import Image from "next/image";
import Link from "next/link";
import { projekt } from "@/content/site";
import { team } from "@/content/team";
import { ui } from "@/content/texte";
import { pfad, t, type Sprache } from "@/content/sprachen";
import Zeitplan from "@/components/Zeitplan";

export default function Startseite({ sprache }: { sprache: Sprache }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-soft blur-3xl"
        />
        {/* relative: sonst zeichnet der absolut positionierte Schleier oben über den Text */}
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
              {t(projekt.schule, sprache)} · {t(projekt.fach, sprache)}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {projekt.name}
            </h1>
            <p className="mt-3 text-xl text-ink-soft">{t(projekt.claim, sprache)}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              {t(projekt.kurzbeschreibung, sprache)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={pfad("/dokumente", sprache)}
                className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-dark"
              >
                {t(ui.start.dokumenteAnsehen, sprache)}
              </Link>
              <Link
                href={pfad("/team", sprache)}
                className="rounded-md border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
              >
                {t(ui.start.dasTeam, sprache)}
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
                className="h-auto w-64 sm:w-80 dark:hidden"
              />
              <Image
                src="/logo-dunkel.png"
                alt=""
                aria-hidden="true"
                width={664}
                height={114}
                className="hidden h-auto w-64 sm:w-80 dark:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          <Stat wert={String(team.length)} label={t(ui.start.teammitglieder, sprache)} />
          <Stat wert={String(projekt.phasen.length)} label={t(ui.start.projektphasen, sprache)} />
          <Stat
            wert={String(projekt.phasen.filter((p) => p.status === "erledigt").length)}
            label={t(ui.start.phasenFertig, sprache)}
          />
          <Stat wert={projekt.schuljahr} label={t(ui.start.schuljahr, sprache)} />
        </div>
      </section>

      {/* Ziele */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {t(ui.start.worumGehtEs, sprache)}
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">{t(ui.start.kernziele, sprache)}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projekt.ziele.map((z, i) => (
            <div
              key={z.titel.en}
              className="rounded-xl border border-line bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft font-mono text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{t(z.titel, sprache)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(z.text, sprache)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zeitplan */}
      <section className="border-y border-line bg-surface-alt">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t(ui.start.zeitplan, sprache)}
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">{t(ui.start.zeitplanText, sprache)}</p>
          <div className="mt-10 rounded-xl border border-line bg-surface p-5 sm:p-8">
            <Zeitplan sprache={sprache} />
          </div>
        </div>
      </section>

      {/* Schnellzugriff */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Karte
            href={pfad("/fotos", sprache)}
            titel={t(ui.start.karteFotos, sprache)}
            text={t(ui.start.karteFotosText, sprache)}
          />
          <Karte
            href={pfad("/arbeitszeit", sprache)}
            titel={t(ui.start.karteZeit, sprache)}
            text={t(ui.start.karteZeitText, sprache)}
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
