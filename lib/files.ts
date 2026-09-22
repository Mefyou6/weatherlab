import fs from "node:fs";
import path from "node:path";

/**
 * Liest beim Build alle Dateien aus einem Unterordner von `public/`.
 * Läuft nur auf dem Server (Server Components) – nie im Browser.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

export type PublicFile = {
  /** URL, z. B. "/fotos/bild.jpg" */
  url: string;
  /** Dateiname ohne Endung, hübsch formatiert */
  titel: string;
  dateiname: string;
  endung: string;
  groesse: string;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function prettyName(basename: string): string {
  return basename
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function listPublicFiles(
  subdir: string,
  extensions: readonly string[],
): PublicFile[] {
  const dir = path.join(PUBLIC_DIR, subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => !name.startsWith(".") && name.toLowerCase() !== "readme.md")
    .filter((name) => extensions.includes(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "de"))
    .map((name) => {
      const ext = path.extname(name).toLowerCase();
      const stat = fs.statSync(path.join(dir, name));
      return {
        url: `/${subdir}/${encodeURIComponent(name)}`,
        titel: prettyName(path.basename(name, ext)),
        dateiname: name,
        endung: ext.replace(".", "").toUpperCase(),
        groesse: formatBytes(stat.size),
      };
    });
}

export const BILD_ENDUNGEN = [".jpg", ".jpeg", ".png", ".webp", ".gif"] as const;
export const DOKUMENT_ENDUNGEN = [
  ".pdf",
  ".docx",
  ".doc",
  ".xlsx",
  ".xls",
  ".pptx",
  ".ppt",
  ".txt",
  ".md",
] as const;
