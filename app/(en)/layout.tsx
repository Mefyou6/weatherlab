import Grundgeruest from "@/components/Grundgeruest";

/** Englische Fassung – liegt unter "/" und ist die Standardsprache. */

export default function EnglishLayout({ children }: LayoutProps<"/">) {
  return <Grundgeruest sprache="en">{children}</Grundgeruest>;
}
