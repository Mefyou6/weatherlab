import type { Metadata } from "next";
import DokumenteSeite from "@/components/seiten/DokumenteSeite";

export const metadata: Metadata = { title: "Dokumente" };

export default function Page() {
  return <DokumenteSeite sprache="de" />;
}
