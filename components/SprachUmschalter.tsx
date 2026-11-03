"use client";

import { usePathname } from "next/navigation";
import { pfad, t, type Sprache } from "@/content/sprachen";
import { ui } from "@/content/texte";

/**
 * Wechselt zwischen Englisch (unter "/") und Deutsch (unter "/de").
 *
 * Bewusst ein normales <a> statt next/link: so lädt der Browser die Seite
 * komplett neu. Nur dann läuft das Skript im deutschen Layout wieder, das
 * <html lang> umstellt. Bei einem Wechsel ohne Neuladen bliebe die alte
 * Sprachkennzeichnung stehen.
 */

export default function SprachUmschalter({ sprache }: { sprache: Sprache }) {
  const pathname = usePathname();
  const andere: Sprache = sprache === "en" ? "de" : "en";

  // Sprachpräfix abtrennen, damit der Pfad in der anderen Sprache neu gebaut werden kann
  const ohnePraefix =
    sprache === "de" ? pathname.replace(/^\/de(?=\/|$)/, "") || "/" : pathname;

  return (
    <a
      href={pfad(ohnePraefix, andere)}
      hrefLang={andere}
      title={t(ui.sprache.beschreibung, sprache)}
      aria-label={t(ui.sprache.beschreibung, sprache)}
      className="rounded-md border border-line px-2 py-1 text-xs font-semibold tracking-wide text-ink-soft transition-colors hover:border-brand hover:text-brand"
    >
      {t(ui.sprache.wechselZu, sprache)}
    </a>
  );
}
