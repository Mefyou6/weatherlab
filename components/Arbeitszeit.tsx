"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import datenbank from "@/data/arbeitszeiten.json";
import { teamNamen } from "@/content/team";

/**
 * Arbeitszeitdokumentation
 *
 * Datenquelle: `data/arbeitszeiten.json` (die "Datenbank" im Git-Repo).
 * Neue Einträge werden zusätzlich im Browser (localStorage) gespeichert und
 * können als JSON exportiert werden – die exportierte Datei ersetzt dann
 * `data/arbeitszeiten.json`, und nach dem Push sind die Einträge für alle sichtbar.
 */

export type Eintrag = {
  id: string;
  datum: string; // ISO, z. B. 2026-09-22
  person: string;
  taetigkeit: string;
  stunden: number;
};

const STORAGE_KEY = "weatherlab.arbeitszeit.lokal";
const basisEintraege: Eintrag[] = datenbank.eintraege;

function heuteISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDatum(iso: string) {
  const [j, m, t] = iso.split("-");
  return `${t}.${m}.${j}`;
}

function formatStunden(h: number) {
  return h.toLocaleString("de-AT", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " h";
}

/* --- kleiner localStorage-Store, damit React ihn per useSyncExternalStore lesen kann --- */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

function schreibeLokal(eintraege: Eintrag[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eintraege));
  } catch {
    /* Speicher nicht verfügbar – dann eben nicht persistent */
  }
  listeners.forEach((l) => l());
}

function parseEintraege(raw: string): Eintrag[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Eintrag[]) : [];
  } catch {
    return [];
  }
}

export default function Arbeitszeit() {
  const lokalRaw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const lokal = useMemo(() => parseEintraege(lokalRaw), [lokalRaw]);
  const [filterPerson, setFilterPerson] = useState<string>("alle");

  // Formular
  const [datum, setDatum] = useState(heuteISO());
  const [person, setPerson] = useState(teamNamen[0]);
  const [taetigkeit, setTaetigkeit] = useState("");
  const [stunden, setStunden] = useState("1");
  const [hinweis, setHinweis] = useState<string | null>(null);

  const alle = useMemo<Eintrag[]>(
    () => [...basisEintraege, ...lokal].sort((a, b) => b.datum.localeCompare(a.datum)),
    [lokal],
  );

  const sichtbar = useMemo(
    () => (filterPerson === "alle" ? alle : alle.filter((e) => e.person === filterPerson)),
    [alle, filterPerson],
  );

  const summeGesamt = alle.reduce((s, e) => s + e.stunden, 0);
  const summeSichtbar = sichtbar.reduce((s, e) => s + e.stunden, 0);

  const proPerson = useMemo(() => {
    const map = new Map<string, number>();
    for (const n of teamNamen) map.set(n, 0);
    for (const e of alle) map.set(e.person, (map.get(e.person) ?? 0) + e.stunden);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [alle]);
  const maxStunden = Math.max(1, ...proPerson.map(([, h]) => h));

  const lokalIds = useMemo(() => new Set(lokal.map((e) => e.id)), [lokal]);

  function hinzufuegen(e: React.FormEvent) {
    e.preventDefault();
    const h = parseFloat(stunden.replace(",", "."));
    if (!taetigkeit.trim() || !Number.isFinite(h) || h <= 0) {
      setHinweis("Bitte Tätigkeit und eine Stundenzahl größer 0 angeben.");
      return;
    }
    const neu: Eintrag = {
      id: `${datum}-${crypto.randomUUID().slice(0, 8)}`,
      datum,
      person,
      taetigkeit: taetigkeit.trim(),
      stunden: Math.round(h * 100) / 100,
    };
    schreibeLokal([...lokal, neu]);
    setTaetigkeit("");
    setStunden("1");
    setHinweis("Eintrag gespeichert (lokal in diesem Browser).");
  }

  function loeschen(id: string) {
    schreibeLokal(lokal.filter((e) => e.id !== id));
  }

  function exportieren() {
    const daten = {
      projekt: datenbank.projekt,
      eintraege: [...basisEintraege, ...lokal].sort((a, b) => a.datum.localeCompare(b.datum)),
    };
    const blob = new Blob([JSON.stringify(daten, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "arbeitszeiten.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Linke Spalte: Auswertung + Tabelle */}
      <div className="space-y-8">
        {/* Kennzahlen */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Kachel wert={formatStunden(summeGesamt)} label="Gesamtstunden" />
          <Kachel wert={String(alle.length)} label="Einträge" />
          <Kachel
            wert={String(lokal.length)}
            label="Noch nicht exportiert"
            akzent={lokal.length > 0}
          />
        </div>

        {/* Stunden pro Person */}
        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-semibold text-ink">Stunden pro Person</h2>
          <ul className="mt-4 space-y-3">
            {proPerson.map(([n, h]) => (
              <li key={n}>
                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setFilterPerson(filterPerson === n ? "alle" : n)}
                    className={`font-medium hover:text-brand ${
                      filterPerson === n ? "text-brand" : "text-ink"
                    }`}
                  >
                    {n}
                  </button>
                  <span className="font-mono text-ink-soft">{formatStunden(h)}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-alt">
                  <div
                    className="h-full rounded-full bg-brand transition-all"
                    style={{ width: `${(h / maxStunden) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tabelle */}
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
            <h2 className="font-semibold text-ink">
              Einträge{" "}
              <span className="font-normal text-ink-muted">
                ({sichtbar.length} · {formatStunden(summeSichtbar)})
              </span>
            </h2>
            <select
              value={filterPerson}
              onChange={(e) => setFilterPerson(e.target.value)}
              className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="alle">Alle Personen</option>
              {teamNamen.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-alt text-left text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Datum</th>
                  <th className="px-5 py-3 font-medium">Person</th>
                  <th className="px-5 py-3 font-medium">Tätigkeit</th>
                  <th className="px-5 py-3 text-right font-medium">Stunden</th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sichtbar.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-ink-muted">
                      Keine Einträge.
                    </td>
                  </tr>
                )}
                {sichtbar.map((e) => {
                  const istLokal = lokalIds.has(e.id);
                  return (
                    <tr key={e.id} className={istLokal ? "bg-brand-soft/40" : undefined}>
                      <td className="whitespace-nowrap px-5 py-3 font-mono text-ink-soft">
                        {formatDatum(e.datum)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-ink">
                        {e.person}
                      </td>
                      <td className="px-5 py-3 text-ink-soft">
                        {e.taetigkeit}
                        {istLokal && (
                          <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                            lokal
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right font-mono text-ink">
                        {formatStunden(e.stunden)}
                      </td>
                      <td className="px-3 py-3 text-right">
                        {istLokal && (
                          <button
                            type="button"
                            onClick={() => loeschen(e.id)}
                            aria-label="Eintrag löschen"
                            className="text-ink-muted hover:text-brand"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rechte Spalte: Formular + Export */}
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <form onSubmit={hinzufuegen} className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-semibold text-ink">Neuer Eintrag</h2>

          <label className="mt-4 block text-xs font-medium text-ink-soft">
            Datum
            <input
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </label>

          <label className="mt-3 block text-xs font-medium text-ink-soft">
            Person
            <select
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            >
              {teamNamen.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-3 block text-xs font-medium text-ink-soft">
            Tätigkeit
            <input
              type="text"
              value={taetigkeit}
              onChange={(e) => setTaetigkeit(e.target.value)}
              placeholder="z. B. Pflichtenheft Kapitel 3"
              required
              className="mt-1 w-full rounded-md border border-line px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none"
            />
          </label>

          <label className="mt-3 block text-xs font-medium text-ink-soft">
            Stunden
            <input
              type="number"
              inputMode="decimal"
              step="0.25"
              min="0.25"
              value={stunden}
              onChange={(e) => setStunden(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Eintrag speichern
          </button>

          {hinweis && <p className="mt-3 text-xs text-ink-muted">{hinweis}</p>}
        </form>

        <div className="rounded-xl border border-line bg-surface-alt p-6 text-sm">
          <h2 className="font-semibold text-ink">Für alle sichtbar machen</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Einträge hier erfassen</li>
            <li>JSON exportieren</li>
            <li>
              Datei als{" "}
              <code className="rounded bg-surface px-1 font-mono text-xs">
                data/arbeitszeiten.json
              </code>{" "}
              im Projekt ersetzen
            </li>
            <li>Committen &amp; pushen – Vercel baut neu</li>
          </ol>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={exportieren}
              className="flex-1 rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
            >
              JSON exportieren
            </button>
            {lokal.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Alle lokalen Einträge löschen?")) schreibeLokal([]);
                }}
                className="rounded-md border border-line px-3 py-2 text-sm text-ink-soft hover:border-brand hover:text-brand"
              >
                Lokale löschen
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Kachel({ wert, label, akzent }: { wert: string; label: string; akzent?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        akzent ? "border-brand bg-brand-soft" : "border-line bg-surface"
      }`}
    >
      <p className={`text-2xl font-semibold tracking-tight ${akzent ? "text-brand" : "text-ink"}`}>
        {wert}
      </p>
      <p className="mt-1 text-xs text-ink-muted">{label}</p>
    </div>
  );
}
