import type { Metadata } from "next";
import Grundgeruest from "@/components/Grundgeruest";
import { meta } from "@/content/texte";

/**
 * Deutsche Fassung – liegt unter "/de".
 *
 * Das <html lang="en"> kommt aus dem gemeinsamen Root-Layout. Dieses Skript
 * stellt es auf "de" um, noch während die Seite geladen wird – wichtig für
 * Screenreader und die Übersetzungsabfrage des Browsers.
 */

const langSkript = `document.documentElement.lang="de"`;

export const metadata: Metadata = {
  description: meta.beschreibung.de,
};

export default function GermanLayout({ children }: LayoutProps<"/de">) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: langSkript }} />
      <Grundgeruest sprache="de">{children}</Grundgeruest>
    </>
  );
}
