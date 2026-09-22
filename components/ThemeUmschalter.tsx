"use client";

/**
 * Schaltet zwischen hellem und dunklem Design um.
 *
 * Bewusst ohne React-State: welches Design aktiv ist, steht im Attribut
 * data-theme am <html>-Element (gesetzt vom Inline-Skript in layout.tsx).
 * Die beiden Symbole werden per CSS ein- und ausgeblendet. Dadurch sieht das
 * vorab erzeugte HTML immer gleich aus und es gibt keinen Hydrations-Konflikt.
 */

const SPEICHER_SCHLUESSEL = "weatherlab.theme";

export default function ThemeUmschalter() {
  function umschalten() {
    const wurzel = document.documentElement;
    const neu = wurzel.getAttribute("data-theme") === "dunkel" ? "hell" : "dunkel";
    wurzel.setAttribute("data-theme", neu);
    try {
      localStorage.setItem(SPEICHER_SCHLUESSEL, neu);
    } catch {
      /* Speicher gesperrt (z. B. privates Fenster) – gilt dann nur für diesen Besuch */
    }
  }

  return (
    <button
      type="button"
      onClick={umschalten}
      title="Helles / dunkles Design"
      aria-label="Zwischen hellem und dunklem Design wechseln"
      className="rounded-md p-2 text-ink-soft transition-colors hover:bg-surface-alt hover:text-ink"
    >
      {/* Mond – sichtbar im hellen Design */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="dark:hidden"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Sonne – sichtbar im dunklen Design */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="hidden dark:block"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    </button>
  );
}
