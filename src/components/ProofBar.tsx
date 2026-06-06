const DOMAINS = [
  "コーポレートサイト",
  "ランディングページ",
  "ブランドサイト",
  "WordPress",
  "Webアプリ",
  "3D・インタラクティブ",
];

/** ヒーロー直下の薄帯。対応領域を一行で先出しし、実績へ橋渡しする。 */
export default function ProofBar() {
  return (
    <section aria-label="対応領域" className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft sm:gap-x-8">
          {DOMAINS.map((d, i) => (
            <li key={d} className="flex items-center gap-6 sm:gap-8">
              {i > 0 && <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-brand-300 sm:block" />}
              <span className="font-medium">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
