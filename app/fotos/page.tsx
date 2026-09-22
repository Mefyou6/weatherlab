import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Galerie from "@/components/Galerie";
import LeerZustand from "@/components/LeerZustand";
import { BILD_ENDUNGEN, listPublicFiles } from "@/lib/files";

export const metadata: Metadata = { title: "Fotos" };

export default function FotosPage() {
  const bilder = listPublicFiles("fotos", BILD_ENDUNGEN);

  return (
    <>
      <PageHeader
        kicker="Einblicke"
        ueberschrift="Fotos vom Projekt"
        untertitel="Eindrücke aus Meetings, Planung und Umsetzung."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {bilder.length === 0 ? (
          <LeerZustand
            titel="Noch keine Fotos vorhanden"
            text="Lege Bilder (JPG, PNG, WebP) im Ordner public/fotos ab und pushe die Änderung – sie erscheinen dann automatisch hier."
          />
        ) : (
          <>
            <p className="mb-6 text-sm text-ink-muted">
              {bilder.length} {bilder.length === 1 ? "Foto" : "Fotos"} · Klicken zum Vergrößern
            </p>
            <Galerie bilder={bilder} />
          </>
        )}
      </section>
    </>
  );
}
