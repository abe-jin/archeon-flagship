import Reveal from "@/components/Reveal";

const factors = [
  { title: "規模", desc: "ページ数や構成の大きさ。1枚のLPか、複数ページのコーポレートサイトかで変わります。" },
  { title: "機能", desc: "お問い合わせフォーム、ブログ、EC導線、地図・検索、3D演出など。必要なものだけ選べます。" },
  { title: "納期", desc: "通常進行か、お急ぎか。原稿や写真の準備状況によっても前後します。" },
];

/**
 * 料金 — 具体的な金額は内容により大きく異なるため、誠実に「決まり方」と
 * 「見積もり無料・支払いの柔軟さ」を提示する。根拠のない定価は掲げない（景表法配慮）。
 */
export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl text-ink sm:text-5xl">料金の決まり方</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            料金は、作るものの内容によって変わります。決まった定価をあてはめるのではなく、
            目的とご予算をうかがってから、必要なぶんだけのお見積りをお出しします。お見積りは無料です。
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {factors.map((f, i) => (
            <Reveal as="article" key={f.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-paper p-8">
                <span className="font-display text-3xl text-brand-200">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 grid gap-6 rounded-3xl border border-line bg-paper p-8 sm:grid-cols-2 sm:p-10">
            <div>
              <h3 className="text-lg font-bold text-ink">お支払い・進め方</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "お見積り・初回のご相談は無料です。",
                  "お支払いは、着手時と納品後に分けることもできます。",
                  "ご予算が決まっている場合は、その範囲でできることをご提案します。",
                  "公開後の保守・更新は、月額でのご相談も承ります。",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                        <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-paper-2 p-7">
              <p className="text-sm leading-relaxed text-ink-soft">
                「これくらいの予算で、何ができますか？」というご相談が、いちばん多いです。
                まずは予算感だけでも教えてください。無理のない形を一緒に考えます。
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brand-700"
              >
                無料で見積もりを相談する
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
