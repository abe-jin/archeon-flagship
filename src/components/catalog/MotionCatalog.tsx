"use client";

import { CATEGORIES, TOTAL } from "@/data/techniques";
import { DEMOS } from "@/components/catalog/demos";
import {
  TechCard,
  CatalogHeader,
  CatalogProgress,
} from "@/components/catalog/shared";

/* ---- ヒーロー：キネティックな見出し（lithos の質感を踏襲） ---- */
function Hero() {
  const line = "削る・太る・せり上がる";
  return (
    <header className="relative mx-auto max-w-6xl px-6 pb-10 pt-20 md:px-10 md:pt-24">
      <p className="kicker mb-6">Archeon · Motion Catalog · 基本</p>
      <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-6xl">
        <span className="lab-grad">{line}</span>
        <br />
        全{TOTAL}種の、動きの辞書。
      </h1>
      <p className="mt-8 max-w-2xl text-base leading-loose text-ink-soft">
        スクロール演出・テキスト・インタラクション・質感。
        Web を“動かす”手法を、<strong className="text-ink">触れるライブ実演</strong>と
        <strong className="text-ink">「指示で言う言葉」</strong>付きでまとめました。
        気に入った演出は、言葉をコピーしてそのまま発注に使えます。
      </p>
      <nav className="mt-9 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-accent/60 hover:text-accent"
          >
            {c.label}
            <span className="ml-1.5 text-ink-muted">{c.items.length}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}

export default function MotionCatalog() {
  let counter = 0;
  return (
    <main className="motion-catalog pb-28">
      <CatalogProgress />
      <CatalogHeader active="basic" />
      <Hero />

      {CATEGORIES.map((cat) => (
        <section key={cat.id} id={cat.id} className="mx-auto max-w-6xl scroll-mt-6 px-6 py-12 md:px-10">
          <div className="mb-7 border-t border-line pt-7">
            <p className="text-[0.62rem] tracking-[0.3em] text-accent-2">{cat.en}</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{cat.label}</h2>
            <p className="mt-2 text-sm text-ink-muted">{cat.blurb}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cat.items.map((t) => {
              counter += 1;
              const Demo = DEMOS[t.id];
              return (
                <TechCard key={t.id} tech={t} idx={String(counter).padStart(2, "0")}>
                  {Demo ? <Demo /> : null}
                </TechCard>
              );
            })}
          </div>
        </section>
      ))}

      <footer className="mx-auto mt-10 max-w-6xl px-6 md:px-10">
        <div className="border-t border-line pt-8 text-[0.72rem] leading-relaxed text-ink-muted">
          Archeon 技術ラボ — モーション{TOTAL}種カタログ（基本）。各実演は手法の学習用に自社実装（他社コード・資産は非複製）。
          <br />
          演出名の「言葉」をコピーして制作依頼に貼れば、その動きをそのまま発注できます。
        </div>
      </footer>
    </main>
  );
}
