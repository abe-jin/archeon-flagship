"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { works } from "@/data/works";
import { techStrip } from "@/data/capabilities";

const FulcrumCanvas = dynamic(() => import("@/components/hero/FulcrumCanvas"), {
  ssr: false,
});

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** SSR でも描画される均衡ポスター（フォールバック兼 LCP安定化のベース層）。 */
function BalancePoster() {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full"
      role="img"
      aria-label="支点の上で均衡する天秤の図"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 接地線 */}
      <line x1="120" y1="356" x2="480" y2="356" stroke="#d8d2c4" strokeWidth="2" />
      {/* 三角支点（石灰岩） */}
      <polygon points="300,196 256,330 344,330" fill="#e7e1d4" stroke="#cfc7b4" strokeWidth="2" />
      {/* 梁（真鍮）— 均衡＝水平 */}
      <rect x="96" y="188" width="408" height="14" rx="7" fill="#c2974e" />
      <rect x="96" y="188" width="408" height="5" rx="2.5" fill="#d9b878" opacity="0.8" />
      {/* 左：御影石の塊 */}
      <rect x="120" y="138" width="74" height="50" rx="6" fill="#34373d" />
      {/* 右：ティールの分銅（出力点） */}
      <circle cx="452" cy="172" r="20" fill="#14b8a6" />
      <rect x="448" y="146" width="8" height="14" rx="3" fill="#0e7a6f" />
    </svg>
  );
}

export default function FulcrumHero() {
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && supportsWebGL()) setUseCanvas(true);
  }, []);

  return (
    <section id="top" className="fulcrum-scroll relative" style={{ height: "165vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 視覚レイヤー：静的ポスター（ベース）＋ 後乗せ canvas */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[68vh] w-full max-w-5xl translate-y-[8vh] sm:translate-y-[6vh]">
              <BalancePoster />
            </div>
          </div>
          {useCanvas && (
            <div className="absolute inset-0">
              <FulcrumCanvas />
            </div>
          )}
        </div>

        {/* テキスト可読性のための紙のグラデ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-paper via-paper/55 to-paper/80 sm:bg-gradient-to-r sm:from-paper sm:via-paper/70 sm:to-transparent"
        />

        {/* コピー層 */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-ink-soft backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              Web制作・アプリ開発スタジオ / 日本全国オンライン対応
            </span>

            <h1 className="mt-7 font-display text-5xl leading-[1.02] text-ink sm:text-6xl md:text-7xl">
              あなたのビジネスの、
              <br />
              <span className="relative inline-block">
                支点
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                />
              </span>
              に。
            </h1>

            <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
              小さな力でも、支点があれば重いものを動かせる。Archeon（アーキオン）は、
              設計から実装・公開・その後の更新までを一人で担う制作スタジオです。
              窓口がひとつだから、話が速い。判断がぶれない。
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brand-700"
              >
                メールで相談する（無料）
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper/70 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                制作実績を見る
              </a>
            </div>

            {/* 信頼の即証バー（件数は捏造防止のため works から算出） */}
            <dl className="mt-12 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-paper/85 px-5 py-4 backdrop-blur-sm">
                <dt className="font-display text-2xl text-ink">{works.length}</dt>
                <dd className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                  制作実績（すべて公開URLで確認できます）
                </dd>
              </div>
              <div className="bg-paper/85 px-5 py-4 backdrop-blur-sm">
                <dt className="font-display text-2xl text-ink">一貫</dt>
                <dd className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                  設計から公開・運用まで一人で
                </dd>
              </div>
            </dl>

            {/* 技術ストリップ */}
            <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-ink-muted">
              {techStrip.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brand-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* スクロールヒント */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] font-semibold tracking-[0.3em] text-ink-muted">
          SCROLL — 支点で均衡させる
        </div>
      </div>
    </section>
  );
}
