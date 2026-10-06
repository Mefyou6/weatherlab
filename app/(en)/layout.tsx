import type { Metadata } from "next";
import "../globals.css";
import Grundgeruest from "@/components/Grundgeruest";
import { meta } from "@/content/texte";

/** Englische Fassung – liegt unter "/" und ist die Standardsprache. */

export const metadata: Metadata = {
  title: {
    default: "WeatherLab",
    template: "%s · WeatherLab",
  },
  description: meta.beschreibung.en,
};

export default function EnglishLayout({ children }: LayoutProps<"/">) {
  return <Grundgeruest sprache="en">{children}</Grundgeruest>;
}
