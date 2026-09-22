"use client";

import { useSyncExternalStore } from "react";

/**
 * Senkrechte "Heute"-Linie im Zeitplan.
 *
 * Wird bewusst erst im Browser berechnet: Die Website wird beim Deploy einmal
 * statisch erzeugt – ein beim Bauen gesetztes Datum würde danach stehenbleiben
 * und mit der Zeit falsch werden.
 */

const nichtsAbonnieren = () => () => {};
const heuteImBrowser = () => new Date().toISOString().slice(0, 10);
const heuteBeimBauen = () => "";

type Props = {
  /** Beginn des Diagramms, "JJJJ-MM-TT" */
  von: string;
  /** Ende des Diagramms, "JJJJ-MM-TT" */
  bis: string;
};

function alsZahl(iso: string) {
  return Date.parse(`${iso}T00:00:00Z`);
}

export default function HeuteMarkierung({ von, bis }: Props) {
  const heute = useSyncExternalStore(nichtsAbonnieren, heuteImBrowser, heuteBeimBauen);

  if (!heute) return null;

  const start = alsZahl(von);
  const ende = alsZahl(bis);
  const jetzt = alsZahl(heute);
  if (jetzt < start || jetzt > ende) return null;

  const position = ((jetzt - start) / (ende - start)) * 100;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-10 w-px bg-brand"
      style={{ left: `${position}%` }}
      aria-hidden="true"
    >
      <span className="absolute -top-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand" />
    </div>
  );
}
