"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { works, type Work } from "@/data/works";

// 並び戦略：WOW → 実需 → 3D技術群（会長指示 2026-06-05）。
// 先頭に最強の見せ場(REVEAL)で掴み、コーポレート/LP/クリニック等の
// 受注しやすい実需を中盤に、最後に3D技術デモでダメ押しする。
const ORDER = [
  "proofs", "reveal",                                          // WOW（掴み）：コード表現＋シネマ3D
  "rice-shop-corporate", "clinic-demo", "wp-corporate-demo", "fortia-gym-lp", // 実需：コーポレート/LP
  "premium-brand", "aurum", "cosmetics-gekka",                 // ブランド（実需と技術の橋渡し）
  "toinavi",                                                   // アプリ
  "objet",                                                     // 3D技術群（ダメ押し）
];

type TabKey = "all" | "3d" | "corp" | "brand" | "app";

const TABS: { key: TabKey; label: string; match: (w: Work) => boolean }[] = [
  { key: "all", label: "すべて", match: () => true },
  { key: "3d", label: "3D・モーション", match: (w) => w.category.includes("3D") || w.category.includes("タイポグラフィ") },
  { key: "corp", label: "コーポレート・LP", match: (w) => ["コーポレートサイト", "ランディングページ", "クリニックサイト"].includes(w.category) },
  { key: "brand", label: "ブランド", match: (w) => w.category === "ブランドサイト" },
  { key: "app", label: "アプリ", match: (w) => w.category === "Webアプリ" },
];

export default function Works() {
  const [tab, setTab] = useState<TabKey>("all");

  const ordered = useMemo(() => {
    const idx = (id: string) => {
      const i = ORDER.indexOf(id);
      return i === -1 ? 999 : i;
    };
    return [...works].sort((a, b) => idx(a.id) - idx(b.id));
  }, []);

  const active = TABS.find((t) => t.key === tab)!;
  const list = ordered.filter(active.match);

  return (
    <section id="works" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Works</span>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">実績で、技術力を確かめてください。</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              これまで手がけたものを、実際に動くサイトとして公開しています。コーポレートやLPはもちろん、
              3Dやスクロール演出まで。リンク先で実物を確かめられます。すべて本物の制作物です。
            </p>
          </div>
        </Reveal>

        {/* フィルタタブ */}
        <Reveal delay={60}>
          <div className="mt-10 flex flex-wrap gap-2">
            {TABS.map((t) => {
              const count = ordered.filter(t.match).length;
              const on = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-pressed={on ? "true" : "false"}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper text-ink-soft hover:border-brand-300 hover:text-brand-700"
                  }`}
                >
                  {t.label}
                  <span className={`ml-1.5 text-xs ${on ? "text-paper/60" : "text-ink-muted"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {list.map((w, i) => (
            <Reveal as="article" key={w.id} delay={(i % 2) * 80}>
              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_30px_70px_-35px_rgba(8,145,178,0.4)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                  <Image
                    src={w.thumbnail}
                    alt={`${w.title} のスクリーンショット`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold text-ink-soft backdrop-blur-sm">
                    {w.category}
                  </span>
                  {w.note && (
                    <span className="absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-paper backdrop-blur-sm">
                      {w.note}
                    </span>
                  )}
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-ink">{w.title}</h3>
                    <span className="mt-1 shrink-0 text-ink-muted transition-colors group-hover:text-brand-600">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{w.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {w.stack.map((t) => (
                      <span key={t} className="rounded-full border border-line bg-paper-2 px-3 py-1 text-xs font-medium text-ink-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-line bg-paper-2 px-6 py-10 text-center">
            <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
              このサイト自体も、設計から実装まで Archeon が制作しています。
              気になる表現や、近い業種の実績があれば、同じ作り方であなたの事業にも応用できます。
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brand-700"
            >
              制作を相談する
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
