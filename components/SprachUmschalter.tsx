"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pfad, t, type Sprache } from "@/content/sprachen";
import { ui } from "@/content/texte";

/**
 * Wechselt zwischen Englisch (unter "/") und Deutsch (unter "/de").
 *
 * Der Umschalter führt auf dieselbe Seite in der anderen Sprache:
 * "/team" <-> "/de/team". Die Sprache steht damit in der Adresse und
 * lässt sich auch verschicken – anders als eine Einstellung im Browser.
 */

export default function SprachUmschalter({ sprache }: { sprache: Sprache }) {
  const pathname = usePathname();
  const andere: Sprache = sprache === "en" ? "de" : "en";

  // Sprachpräfix abtrennen, damit der Pfad in der anderen Sprache neu gebaut werden kann
  const ohnePraefix =
    sprache === "de" ? pathname.replace(/^\/de(?=\/|$)/, "") || "/" : pathname;

  return (
    <Link
      href={pfad(ohnePraefix, andere)}
      hrefLang={andere}
      title={t(ui.sprache.beschreibung, sprache)}
      aria-label={t(ui.sprache.beschreibung, sprache)}
      className="rounded-md border border-line px-2 py-1 text-xs font-semibold tracking-wide text-ink-soft transition-colors hover:border-brand hover:text-brand"
    >
      {t(ui.sprache.wechselZu, sprache)}
    </Link>
  );
}
