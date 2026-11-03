import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Sprache } from "@/content/sprachen";

/**
 * Kopf- und Fußbereich einer Sprachfassung.
 *
 * Das <html>/<body>-Gerüst steckt im einzigen Root-Layout (app/layout.tsx).
 * Hier kommt nur dazu, was je Sprache unterschiedlich ist.
 */

export default function Grundgeruest({
  sprache,
  children,
}: {
  sprache: Sprache;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header sprache={sprache} />
      <main className="flex-1">{children}</main>
      <Footer sprache={sprache} />
    </>
  );
}
