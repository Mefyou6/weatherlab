import type { Metadata } from "next";
import FotosSeite from "@/components/seiten/FotosSeite";

export const metadata: Metadata = { title: "Photos" };

export default function Page() {
  return <FotosSeite sprache="en" />;
}
