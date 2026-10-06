import type { Metadata } from "next";
import ArbeitszeitSeite from "@/components/seiten/ArbeitszeitSeite";

export const metadata: Metadata = { title: "Arbeitszeit" };

export default function Page() {
  return <ArbeitszeitSeite sprache="de" />;
}
