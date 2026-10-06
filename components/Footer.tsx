import Image from "next/image";
import Link from "next/link";
import { projekt } from "@/content/site";
import { ui } from "@/content/texte";
import { pfad, t, type Sprache } from "@/content/sprachen";

const links = [
  { ziel: "/", label: ui.nav.projekt },
  { ziel: "/team", label: ui.nav.team },
  { ziel: "/fotos", label: ui.nav.fotos },
  { ziel: "/dokumente", label: ui.nav.dokumente },
  { ziel: "/praesentation", label: ui.nav.praesentation },
  { ziel: "/arbeitszeit", label: ui.nav.arbeitszeit },
] as const;

export default function Footer({ sprache }: { sprache: Sprache }) {
  return (
    <footer className="mt-24 border-t border-line bg-invert text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Image
            src="/logo.png"
            alt="WeatherLab"
            width={664}
            height={114}
            className="h-7 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm text-white/70">{t(projekt.claim, sprache)}</p>
          <p className="mt-2 text-xs text-white/50">
            {t(projekt.schule, sprache)} · {t(projekt.fach, sprache)} · {projekt.schuljahr}
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.ziel}
              href={pfad(l.ziel, sprache)}
              className="text-white/70 hover:text-white"
            >
              {t(l.label, sprache)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/40 sm:px-6">
          © {new Date().getFullYear()} {t(ui.footer.rechte, sprache)}
        </p>
      </div>
    </footer>
  );
}
