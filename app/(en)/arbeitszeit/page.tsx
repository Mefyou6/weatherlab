import type { Metadata } from "next";
import ArbeitszeitSeite from "@/components/seiten/ArbeitszeitSeite";

export const metadata: Metadata = { title: "Time tracking" };

export default function Page() {
  return <ArbeitszeitSeite sprache="en" />;
}
