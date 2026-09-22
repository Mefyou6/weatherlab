import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Arbeitszeit from "@/components/Arbeitszeit";

export const metadata: Metadata = { title: "Arbeitszeitdokumentation" };

export default function ArbeitszeitPage() {
  return (
    <>
      <PageHeader
        kicker="Unsere eigene App"
        ueberschrift="Arbeitszeitdokumentation"
        untertitel="Wer hat wann woran wie lange gearbeitet? Die Daten liegen als JSON-Datei im Projekt."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Arbeitszeit />
      </section>
    </>
  );
}
