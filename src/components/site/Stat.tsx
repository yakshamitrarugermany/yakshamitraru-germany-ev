/**
 * Stat — Editorial numeric callout used in hero meta rows.
 * Extracted from artists.tsx / gallery.tsx (was duplicated).
 */
export function Stat({ n, label }: { n: number | string; label: string }) {
  return (
    <div>
      <div className="font-mono text-3xl md:text-4xl text-saffron">{n}</div>
      <div className="eyebrow text-cream/60 mt-1">{label}</div>
    </div>
  );
}
