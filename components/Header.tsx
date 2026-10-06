"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeUmschalter from "@/components/ThemeUmschalter";
import SprachUmschalter from "@/components/SprachUmschalter";
import { pfad, t, type Sprache } from "@/content/sprachen";
import { ui } from "@/content/texte";

const links = [
  { ziel: "/", label: ui.nav.projekt },
  { ziel: "/team", label: ui.nav.team },
  { ziel: "/fotos", label: ui.nav.fotos },
  { ziel: "/dokumente", label: ui.nav.dokumente },
  { ziel: "/praesentation", label: ui.nav.praesentation },
  { ziel: "/arbeitszeit", label: ui.nav.arbeitszeit },
] as const;

export default function Header({ sprache }: { sprache: Sprache }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const istAktiv = (ziel: string) => {
    const href = pfad(ziel, sprache);
    if (ziel === "/") return pathname === href || pathname === `${href}/`;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={pfad("/", sprache)}
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          {/* Zwei Varianten: die Wolke ist dunkelgrau und wäre auf dunklem Grund unsichtbar */}
          <Image
            src="/logo.png"
            alt="WeatherLab Logo"
            width={664}
            height={114}
            priority
            className="h-7 w-auto sm:h-8 dark:hidden"
          />
          <Image
            src="/logo-dunkel.png"
            alt=""
            aria-hidden="true"
            width={664}
            height={114}
            className="hidden h-7 w-auto sm:h-8 dark:block"
          />
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop-Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.ziel}
                href={pfad(l.ziel, sprache)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  istAktiv(l.ziel)
                    ? "bg-brand-soft text-brand"
                    : "text-ink-soft hover:bg-surface-alt hover:text-ink"
                }`}
              >
                {t(l.label, sprache)}
              </Link>
            ))}
          </nav>

          <SprachUmschalter sprache={sprache} />
          <ThemeUmschalter sprache={sprache} />

          {/* Mobile-Button */}
          <button
            type="button"
            aria-label={t(ui.nav.menueOeffnen, sprache)}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2 text-ink hover:bg-surface-alt lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile-Navigation */}
      {open && (
        <nav className="border-t border-line bg-surface lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.ziel}
                href={pfad(l.ziel, sprache)}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-base font-medium ${
                  istAktiv(l.ziel)
                    ? "bg-brand-soft text-brand"
                    : "text-ink-soft hover:bg-surface-alt"
                }`}
              >
                {t(l.label, sprache)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
