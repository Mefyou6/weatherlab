"use client";

import { useSyncExternalStore } from "react";

/**
 * Bettet die Präsentation ein.
 *
 * - PDF  -> wird direkt vom Browser angezeigt (funktioniert überall, auch lokal)
 * - PPTX -> wird über den Office-Online-Viewer von Microsoft angezeigt.
 *           Der braucht eine öffentlich erreichbare Adresse, deshalb bauen wir
 *           sie zur Laufzeit aus der aktuellen Domain zusammen. Lokal
 *           (localhost) kann Microsoft die Datei nicht laden – dort zeigen wir
 *           stattdessen einen Hinweis.
 */

type Props = {
  /** z. B. "/praesentation/Abschlusspraesentation.pdf" */
  url: string;
  istPdf: boolean;
  titel: string;
};

const RAHMEN = "h-[70vh] min-h-[480px] w-full border-0 bg-surface-alt";

// Die Domain steht erst im Browser fest – beim Vorab-Rendern ist sie leer.
const nichtsAbonnieren = () => () => {};
const domainImBrowser = () => window.location.origin;
const domainBeimBauen = () => "";

export default function PraesentationEinbettung({ url, istPdf, titel }: Props) {
  const origin = useSyncExternalStore(nichtsAbonnieren, domainImBrowser, domainBeimBauen);

  if (istPdf) {
    return <iframe src={url} title={titel} className={RAHMEN} />;
  }

  // Noch kein Browser-Kontext (Vorab-Rendern / erster Hydrations-Durchlauf)
  if (!origin) {
    return <div className={RAHMEN} />;
  }

  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return (
      <div className="flex h-[70vh] min-h-[480px] items-center justify-center bg-surface-alt px-6 text-center">
        <p className="max-w-md text-sm text-ink-soft">
          Die PowerPoint-Vorschau funktioniert nur auf der veröffentlichten Website, weil
          Microsoft die Datei dafür herunterladen muss. Lokal bitte die Datei herunterladen.
        </p>
      </div>
    );
  }

  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    origin + url,
  )}`;

  return <iframe src={viewerUrl} title={titel} allowFullScreen className={RAHMEN} />;
}
