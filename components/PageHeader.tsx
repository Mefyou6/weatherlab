type Props = {
  ueberschrift: string;
  untertitel?: string;
  kicker?: string;
};

export default function PageHeader({ ueberschrift, untertitel, kicker }: Props) {
  return (
    <div className="border-b border-line bg-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {kicker && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">
            {kicker}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {ueberschrift}
        </h1>
        {untertitel && (
          <p className="mt-3 max-w-2xl text-base text-ink-soft sm:text-lg">{untertitel}</p>
        )}
      </div>
    </div>
  );
}
