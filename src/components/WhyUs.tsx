import Reveal from "@/components/Reveal";

const reasons = [
  { title: "窓口は、いつも一人", desc: "営業・ディレクター・実装担当が別々、ということがありません。話したことがそのまま形になり、伝言ゲームで意図がぶれません。連絡も速い。" },
  { title: "作るだけで終わらない", desc: "公開はスタートです。表示速度・SEO・更新のしやすさまで考えて設計し、公開後の小さな改善にも対応します。" },
  { title: "できないことは、先に言う", desc: "事業の言葉で話します。専門用語は噛み砕き、できないことや向かないことは最初に正直にお伝えします。無理な機能や使わない仕組みは勧めません。" },
  { title: "本物の技術を、誠実に", desc: "3D・WebGL・モーションまで実装できますが、派手さのためには使いません。あなたの事業に効く一点に、技術を集中させます。" },
];

export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">Why Archeon</span>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                選ばれる、
                <br />
                理由。
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
                制作会社を選ぶとき、不安なのは「ちゃんと話が通じるか」「公開したあと放っておかれないか」だと思います。
                一人で全工程を担うからこそ、その不安に正面から答えられます。
              </p>

              <blockquote className="mt-10 rounded-2xl border border-line bg-paper-2 p-6">
                <p className="font-display text-xl leading-snug text-ink">「支点さえあれば、地球を動かせる」</p>
                <footer className="mt-3 text-xs leading-relaxed text-ink-muted">
                  Archeon の名は、究極の問題解決者アルキメデスに由来します。
                  小さな支点で、あなたの事業を動かす。それが屋号に込めた意味です。
                </footer>
              </blockquote>
            </div>
          </Reveal>

          <ul className="space-y-px overflow-hidden rounded-3xl border border-line bg-line">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 80}>
                <div className="group bg-paper p-8 transition-colors hover:bg-brand-50/40">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 font-display text-lg text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{r.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
