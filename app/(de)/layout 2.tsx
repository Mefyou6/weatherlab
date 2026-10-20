import type { Metadata } from "next";
import "../globals.css";
import Grundgeruest from "@/components/Grundgeruest";
import { meta } from "@/content/texte";

/** Deutsche Fassung – liegt unter "/de". */

export const metadata: Metadata = {
  title: {
    default: "WeatherLab",
    template: "%s · WeatherLab",
  },
  description: meta.beschreibung.de,
};

export default function GermanLayout({ children }: LayoutProps<"/">) {
  return <Grundgeruest sprache="de">{children}</Grundgeruest>;
}
