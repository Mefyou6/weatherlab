import type { Metadata } from "next";
import FotosSeite from "@/components/seiten/FotosSeite";

export const metadata: Metadata = { title: "Fotos" };

export default function Page() {
  return <FotosSeite sprache="de" />;
}
