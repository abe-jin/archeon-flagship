import Reveal from "@/components/Reveal";

const steps = [
  { no: "01", title: "相談・ヒアリング（無料）", desc: "何のために作るのか、何に困っているのか。まずはお話を伺います。専門知識は不要です。「何から頼めばいいか分からない」を整理するところが最初の仕事です。" },
  { no: "02", title: "ご提案・お見積り", desc: "目的に合わせて、必要な範囲・進め方・費用感をご提案します。お見積りは無料です。納得いただいてからスタートします。" },
  { no: "03", title: "設計・制作", desc: "構成とデザインを固め、実装へ。途中段階を共有しながら、「今どこにいるか分からない」状態にならないよう進めます。方向を変えたくなったら遠慮なくどうぞ。" },
  { no: "04", title: "公開・運用", desc: "公開して終わりにしません。表示や反応を見ながら必要な調整を続け、公開後の保守・更新もご希望に応じてお引き受けします。" },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Process</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl text-ink sm:text-5xl">進め方</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            相談から公開まで、おおよそこう進みます。各段階で何が決まり、次に何をするかを共有しながら進めるので、
            初めての方でも迷いません。窓口は最初から最後まで一人。伝言ゲームで意図がぶれることはありません。
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.no} delay={i * 80}>
              <div className="relative flex h-full flex-col rounded-3xl border border-line bg-paper p-7">
                <span className="font-display text-5xl text-brand-100">{s.no}</span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="absolute -right-3 top-12 hidden text-brand-300 lg:block">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
