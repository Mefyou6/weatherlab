"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PublicFile } from "@/lib/files";

export default function Galerie({ bilder }: { bilder: PublicFile[] }) {
  const [aktiv, setAktiv] = useState<number | null>(null);

  // Tastatursteuerung für die Lightbox
  useEffect(() => {
    if (aktiv === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAktiv(null);
      if (e.key === "ArrowRight") setAktiv((i) => (i === null ? null : (i + 1) % bilder.length));
      if (e.key === "ArrowLeft")
        setAktiv((i) => (i === null ? null : (i - 1 + bilder.length) % bilder.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aktiv, bilder.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {bilder.map((b, i) => (
          <button
            key={b.url}
            type="button"
            onClick={() => setAktiv(i)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-surface-alt"
          >
            <Image
              src={b.url}
              alt={b.titel}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {b.titel}
            </span>
          </button>
        ))}
      </div>

      {aktiv !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setAktiv(null)}
        >
          <button
            type="button"
            aria-label="Schließen"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setAktiv(null)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {bilder.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Vorheriges Bild"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setAktiv((aktiv - 1 + bilder.length) % bilder.length);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Nächstes Bild"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setAktiv((aktiv + 1) % bilder.length);
                }}
              >
                ›
              </button>
            </>
          )}

          <figure
            className="flex max-h-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[75vh] w-[90vw] max-w-5xl">
              <Image
                src={bilder[aktiv].url}
                alt={bilder[aktiv].titel}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-sm text-white/80">
              {bilder[aktiv].titel}
              <span className="ml-3 text-white/40">
                {aktiv + 1} / {bilder.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
