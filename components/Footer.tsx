import Image from "next/image";
import Link from "next/link";
import { projekt } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Image
            src="/logo.png"
            alt="WeatherLab"
            width={664}
            height={114}
            className="h-7 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm text-white/70">{projekt.claim}</p>
          <p className="mt-2 text-xs text-white/50">
            {projekt.schule} · {projekt.fach} · {projekt.schuljahr}
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <Link href="/" className="text-white/70 hover:text-white">Projekt</Link>
          <Link href="/team" className="text-white/70 hover:text-white">Team</Link>
          <Link href="/fotos" className="text-white/70 hover:text-white">Fotos</Link>
          <Link href="/dokumente" className="text-white/70 hover:text-white">Dokumente</Link>
          <Link href="/arbeitszeit" className="text-white/70 hover:text-white">Arbeitszeit</Link>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/40 sm:px-6">
          © {new Date().getFullYear()} WeatherLab-Team · Schulprojekt
        </p>
      </div>
    </footer>
  );
}
