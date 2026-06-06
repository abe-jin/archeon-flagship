import Reveal from "@/components/Reveal";
import { capabilities } from "@/data/capabilities";
import { works } from "@/data/works";

function proofLinks(ids: string[]) {
  return ids
    .map((id) => works.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .slice(0, 4);
}

/** 技術の幅。各能力を実在の実績（公開URL）で裏付ける＝「受注できる幅」の証明。 */
export default function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Capabilities</span>
          <h2 className="mt-4 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
            「LPだけ」では、ありません。
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            コーポレートサイトやLPはもちろん、Webアプリのスマホアプリ化から、コードで3Dを生成する没入表現まで。
            設計・実装・公開・運用を一人で一貫して担うからこそ、案件に必要な技術を、必要なぶんだけ選んで提案できます。
            主張だけを並べないよう、それぞれ実際の制作物にリンクしています。
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {capabilities.map((c, i) => {
            const proofs = proofLinks(c.proofWorkIds);
            return (
              <Reveal as="article" key={c.id} delay={(i % 2) * 80}>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-paper p-8">
                  <h3 className="text-xl font-bold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tech.map((t) => (
                      <span key={t} className="rounded-full border border-line bg-paper-2 px-3 py-1 text-xs font-medium text-ink-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-line pt-5">
                    <p className="text-xs font-semibold tracking-wide text-ink-muted">実績で見る</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {proofs.map((w) => (
                        <a
                          key={w.id}
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
                        >
                          {w.title}
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
