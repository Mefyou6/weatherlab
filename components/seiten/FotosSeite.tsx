import PageHeader from "@/components/PageHeader";
import Galerie from "@/components/Galerie";
import LeerZustand from "@/components/LeerZustand";
import { BILD_ENDUNGEN, listPublicFiles } from "@/lib/files";
import { ui } from "@/content/texte";
import { t, type Sprache } from "@/content/sprachen";

export default function FotosSeite({ sprache }: { sprache: Sprache }) {
  const bilder = listPublicFiles("fotos", BILD_ENDUNGEN);

  return (
    <>
      <PageHeader
        kicker={t(ui.fotos.kicker, sprache)}
        ueberschrift={t(ui.fotos.titel, sprache)}
        untertitel={t(ui.fotos.untertitel, sprache)}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {bilder.length === 0 ? (
          <LeerZustand
            titel={t(ui.fotos.leerTitel, sprache)}
            text={t(ui.fotos.leerText, sprache)}
          />
        ) : (
          <>
            <p className="mb-6 text-sm text-ink-muted">
              {bilder.length}{" "}
              {bilder.length === 1
                ? t(ui.fotos.einzahl, sprache)
                : t(ui.fotos.mehrzahl, sprache)}{" "}
              · {t(ui.fotos.zumVergroessern, sprache)}
            </p>
            <Galerie bilder={bilder} sprache={sprache} />
          </>
        )}
      </section>
    </>
  );
}
