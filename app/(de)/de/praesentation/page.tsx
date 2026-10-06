import type { Metadata } from "next";
import PraesentationSeite from "@/components/seiten/PraesentationSeite";

export const metadata: Metadata = { title: "Präsentation" };

export default function Page() {
  return <PraesentationSeite sprache="de" />;
}
