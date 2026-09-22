import { projekt, type PhasenStatus } from "@/content/site";
import HeuteMarkierung from "@/components/HeuteMarkierung";

/**
 * Gantt-Diagramm der Projektphasen.
 *
 * Die Balken werden in Prozent der Gesamtdauer positioniert, dadurch passt sich
 * das Diagramm jeder Breite an. Daten kommen aus `content/site.ts`.
 */

// Fest verdrahtet statt toLocaleDateString: sonst hängt die Beschriftung davon ab,
// welche Sprache auf dem Rechner eingestellt ist, der die Website baut.
const MONATSNAMEN = [
  "Jän", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
];

const TAG_IN_MS = 24 * 60 * 60 * 1000;

function alsDatum(iso: string) {
  return new Date(`${iso}T00:00:00Z`);
}

function formatDatum(iso: string) {
  const d = alsDatum(iso);
  return `${d.getUTCDate()}. ${MONATSNAMEN[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const balkenStil: Record<PhasenStatus, { klasse: string; stil?: React.CSSProperties; label: string }> = {
  erledigt: { klasse: "bg-brand", label: "Erledigt" },
  laufend: {
    klasse: "bg-brand/85",
    // Schraffur macht "in Arbeit" auch ohne Farbe erkennbar
    stil: {
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(255,255,255,.3) 0 6px, transparent 6px 12px)",
    },
    label: "In Arbeit",
  },
  offen: {
    klasse: "border border-dashed border-ink-muted/50 bg-surface-alt",
    label: "Offen",
  },
};

export default function Zeitplan() {
  const phasen = projekt.phasen;

  // Zeitraum des gesamten Diagramms: vom ersten Monatsanfang bis zum letzten Monatsende.
  // ISO-Daten (JJJJ-MM-TT) lassen sich alphabetisch sortieren = zeitlich sortieren.
  const starts = phasen.map((p) => String(p.start)).sort();
  const enden = phasen.map((p) => String(p.ende)).sort();
  const ersterStart = alsDatum(starts[0]);
  const letztesEnde = alsDatum(enden[enden.length - 1]);

  const von = new Date(Date.UTC(ersterStart.getUTCFullYear(), ersterStart.getUTCMonth(), 1));
  const bis = new Date(Date.UTC(letztesEnde.getUTCFullYear(), letztesEnde.getUTCMonth() + 1, 1));
  const gesamt = bis.getTime() - von.getTime();

  const prozent = (d: Date) => ((d.getTime() - von.getTime()) / gesamt) * 100;

  // Monatsspalten für Beschriftung und Rasterlinien
  const monate: { label: string; jahr: number; links: number; breite: number }[] = [];
  for (
    let m = new Date(von);
    m < bis;
    m = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + 1, 1))
  ) {
    const naechster = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + 1, 1));
    monate.push({
      label: MONATSNAMEN[m.getUTCMonth()],
      jahr: m.getUTCFullYear(),
      links: prozent(m),
      breite: prozent(naechster) - prozent(m),
    });
  }

  const isoVon = von.toISOString().slice(0, 10);
  const isoBis = bis.toISOString().slice(0, 10);

  return (
    <div>
      {/* Bei wenig Platz waagrecht scrollbar, damit nichts gequetscht wird */}
      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Kopfzeile mit den Monaten */}
          <div className="flex">
            <div className="w-44 shrink-0" />
            <div className="relative h-8 flex-1">
              {monate.map((m, i) => (
                <div
                  key={`${m.jahr}-${m.label}`}
                  className="absolute top-0 h-full border-l border-line pl-1.5 pt-1 text-[11px] text-ink-muted"
                  style={{ left: `${m.links}%`, width: `${m.breite}%` }}
                >
                  {m.label}
                  {(i === 0 || m.label === "Jän") && (
                    <span className="ml-1 text-ink-muted/70">{m.jahr}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Zeilen je Phase */}
          <div className="relative">
            {phasen.map((p) => {
              const stil = balkenStil[p.status];
              const start = alsDatum(p.start);
              // +1 Tag, damit der Endtag im Balken enthalten ist
              const ende = new Date(alsDatum(p.ende).getTime() + TAG_IN_MS);
              const links = prozent(start);
              const breite = prozent(ende) - links;
              const tage = Math.round((ende.getTime() - start.getTime()) / TAG_IN_MS);

              return (
                <div key={p.name} className="flex items-center border-t border-line">
                  <div className="w-44 shrink-0 py-3 pr-4">
                    <p className="text-sm font-medium text-ink">{p.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-muted">
                      {formatDatum(p.start)} – {formatDatum(p.ende)}
                    </p>
                  </div>

                  <div className="relative h-14 flex-1">
                    {/* Rasterlinien der Monate */}
                    {monate.map((m) => (
                      <div
                        key={`${m.jahr}-${m.label}`}
                        className="absolute inset-y-0 border-l border-line"
                        style={{ left: `${m.links}%` }}
                        aria-hidden="true"
                      />
                    ))}

                    <div
                      title={`${p.name}: ${formatDatum(p.start)} – ${formatDatum(p.ende)} (${tage} Tage)`}
                      className={`absolute top-1/2 h-7 -translate-y-1/2 rounded-md ${stil.klasse}`}
                      style={{ left: `${links}%`, width: `${breite}%`, ...stil.stil }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Senkrechte Linie für den heutigen Tag, über allen Zeilen */}
            <div className="pointer-events-none absolute inset-0 flex">
              <div className="w-44 shrink-0" />
              <div className="relative flex-1">
                <HeuteMarkierung von={isoVon} bis={isoBis} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legende */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-soft">
        {(["erledigt", "laufend", "offen"] as const).map((s) => (
          <span key={s} className="flex items-center gap-2">
            <span
              className={`h-3 w-6 rounded ${balkenStil[s].klasse}`}
              style={balkenStil[s].stil}
            />
            {balkenStil[s].label}
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span className="h-3 w-px bg-brand" />
          Heute
        </span>
      </div>
    </div>
  );
}
