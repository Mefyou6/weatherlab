export default function LeerZustand({ titel, text }: { titel: string; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface-alt px-6 py-16 text-center">
      <p className="font-medium text-ink">{titel}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{text}</p>
    </div>
  );
}
