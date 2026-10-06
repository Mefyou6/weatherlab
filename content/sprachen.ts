/**
 * Grundlagen für die Zweisprachigkeit (Englisch / Deutsch).
 *
 * Englisch ist die Standardsprache und liegt direkt unter "/",
 * Deutsch liegt unter "/de".
 */

export const SPRACHEN = ["en", "de"] as const;
export type Sprache = (typeof SPRACHEN)[number];

/** Ein Textbaustein in beiden Sprachen */
export type Text = Record<Sprache, string>;

/** Holt die passende Fassung eines Textes. */
export function t(text: Text, sprache: Sprache): string {
  return text[sprache];
}

/**
 * Baut einen Link, der die Sprache berücksichtigt.
 * pfad("/team", "de") -> "/de/team"
 * pfad("/team", "en") -> "/team"
 */
export function pfad(pfadOhneSprache: string, sprache: Sprache): string {
  if (sprache === "en") return pfadOhneSprache;
  return pfadOhneSprache === "/" ? "/de" : `/de${pfadOhneSprache}`;
}
