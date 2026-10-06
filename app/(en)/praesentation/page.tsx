import type { Metadata } from "next";
import PraesentationSeite from "@/components/seiten/PraesentationSeite";

export const metadata: Metadata = { title: "Presentation" };

export default function Page() {
  return <PraesentationSeite sprache="en" />;
}
