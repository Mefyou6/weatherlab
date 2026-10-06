import type { Metadata } from "next";
import TeamSeite from "@/components/seiten/TeamSeite";

export const metadata: Metadata = { title: "Team" };

export default function Page() {
  return <TeamSeite sprache="en" />;
}
