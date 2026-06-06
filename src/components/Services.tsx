import Reveal from "@/components/Reveal";

const services = [
  {
    no: "01",
    title: "Web制作",
    desc: "コーポレートサイト・ランディングページ・オウンドメディアまで。企画の整理からデザイン、実装、SEO・OGP、公開後の更新まで通して引き受けます。",
    points: ["コーポレートサイト / LP", "表示速度・レスポンシブ", "SEO・OGP 設定", "3D / スクロール演出（オプション）"],
    anchor: "#works",
    icon: (
      <path d="M3 5.5h18v13H3zM3 9h18M6.5 6.5h.01M9 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    no: "02",
    title: "アプリ開発",
    desc: "Webアプリから、同じコードでのスマホアプリ化まで。地図・検索・お気に入り・データベース連携など、必要な機能を一つずつ形にし、ストア申請まで視野に入れて設計します。",
    points: ["Webアプリ", "スマホアプリ化（iOS / Android）", "地図・検索・DB連携", "ストア申請まで対応"],
    anchor: "#capabilities",
    icon: (
      <path d="M8 3.5h8a1.5 1.5 0 0 1 1.5 1.5v14A1.5 1.5 0 0 1 16 20.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5ZM10.5 17.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Services</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl text-ink sm:text-5xl">できること</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            サービスは2つ。ホームページなどのWeb制作と、アプリ開発です。どちらも、企画の整理から公開後の運用まで通して引き受けます。
            「何を作ればいいか、まだ決まっていない」段階からで構いません。目的を一緒に言葉にするところから始めます。
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="article" key={s.no} delay={i * 90}>
              <div className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_24px_60px_-30px_rgba(8,145,178,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700 ring-1 ring-line">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">{s.icon}</svg>
                  </span>
                  <span className="font-display text-2xl text-line transition-colors group-hover:text-brand-200">{s.no}</span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.desc}</p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-ink-soft">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                          <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <a href={s.anchor} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800">
                  対応した実績を見る
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
