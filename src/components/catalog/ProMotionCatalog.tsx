"use client";

import Link from "next/link";
import { PRO_CATEGORIES, PRO_TOTAL, TOOLS } from "@/data/techniques-pro";
import { TOTAL } from "@/data/techniques";
import { PRO_DEMOS } from "@/components/catalog/pro-demos";
import {
  TechCard,
  PhraseChip,
  CatalogProgress,
  CatalogHeader,
} from "@/components/catalog/shared";
import type { Technique } from "@/data/techniques";

/* ============================================================
   上級カタログ — ハイブリッド分割
   - demo:  PRO_DEMOS に実演がある（新規実演）
   - lab:   ラボ実物へリンク（重い3D/物理/高度タイポは再実装しない）
   - tool:  ツール情報カード（無理に実演しない）
   ============================================================ */

interface LabLink {
  kicker: string;
  url: string;
  cta: string;
}
// 重い実演はラボ実物（本番200）へ送る
const LAB: Record<string, LabLink> = {
  "scroll-3d": {
    kicker: "REVEAL · SCROLL-DRIVEN 3D",
    url: "https://archeon-lab.vercel.app/reveal",
    cta: "REVEAL で実物を見る",
  },
  "drag-gallery": {
    kicker: "OBJET · DRAG & THROW 3D",
    url: "https://archeon-lab.vercel.app/objet",
    cta: "OBJET で実物を見る",
  },
  "physics-real": {
    kicker: "OBJET · SELF-BUILT PHYSICS",
    url: "https://archeon-lab.vercel.app/objet",
    cta: "OBJET で実物を見る",
  },
  inertia: {
    kicker: "OBJET · INERTIA & THROW",
    url: "https://archeon-lab.vercel.app/objet",
    cta: "OBJET で実物を見る",
  },
};

// 実演もリンクもしない＝情報カードに出す外部リファレンス
interface ToolRef {
  blurb: string;
  links: { label: string; url: string }[];
}
const INFO: Record<string, ToolRef> = {
  "webgl-transition": {
    blurb: "画像同士を歪ませながら溶けて切り替える。重い常時GPUのため、実案件では使いどころを絞って実装します。",
    links: [
      { label: "GSAP", url: "https://gsap.com/" },
      { label: "OGL", url: "https://github.com/oframe/ogl" },
    ],
  },
  "gpu-particles": {
    blurb: "数千〜数万の点群をGPUで流す。負荷管理が要のため、案件ごとに粒数とフォールバックを設計します。",
    links: [
      { label: "Three.js", url: "https://threejs.org/" },
      { label: "R3F", url: "https://r3f.docs.pmnd.rs/" },
    ],
  },
  "image-trail": {
    blurb: "カーソル移動に画像の残像を引く。PC前提・画像素材が要るため、素材確定後に実装します。",
    links: [{ label: "GSAP", url: "https://gsap.com/" }],
  },
  rive: {
    blurb: "ステートマシン付きの軽量ベクターアニメ。デザイナーが作った .riv をそのまま再生します。",
    links: [{ label: "Rive 公式", url: "https://rive.app/" }],
  },
  lottie: {
    blurb: "After Effects 製アニメを JSON で軽量再生。素材があれば最小コストで導入できます。",
    links: [{ label: "LottieFiles", url: "https://lottiefiles.com/" }],
  },
  "view-transition": {
    blurb: "ブラウザ標準APIで状態間・ページ間を滑らかに繋ぐ。対応ブラウザで段階的に有効化します。",
    links: [
      {
        label: "MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/API/View_Transitions_API",
      },
    ],
  },
  "audio-react": {
    blurb: "音量・周波数にビジュアルが反応する。再生・ミュート配慮が要るため演出方針とセットで設計します。",
    links: [
      {
        label: "Web Audio API",
        url: "https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API",
      },
    ],
  },
  "text-path": {
    blurb: "文字を曲線（パス）に沿わせて流す。SVG の textPath で実装し、装飾的な見出しやロゴ周りに使います。",
    links: [
      {
        label: "MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/SVG/Element/textPath",
      },
    ],
  },
};

type Kind = "demo" | "lab" | "tool";
const kindOf = (id: string): Kind =>
  PRO_DEMOS[id] ? "demo" : LAB[id] ? "lab" : "tool";

/* ---- ラボ実物カード（リンク） ---- */
function LabCard({ tech, idx, lab }: { tech: Technique; idx: string; lab: LabLink }) {
  return (
    <article className="tech-card flex flex-col">
      <a
        href={lab.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tech-stage group grid place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
        style={{ background: "linear-gradient(150deg,#0b1014 0%,#121a22 55%,#0b1014 100%)" }}
        aria-label={`${tech.name} — ラボで実物を見る`}
      >
        <div className="text-center">
          <p className="text-[0.58rem] tracking-[0.3em] text-cyan-300/80">{lab.kicker}</p>
          <p className="mt-3 inline-flex items-center gap-2 font-display text-base text-white transition-colors group-hover:text-cyan-300">
            {lab.cta}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
          <p className="mt-2 text-[0.6rem] tracking-widest text-white/45">本物が別タブで開きます</p>
        </div>
      </a>
      <div className="p-5">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="font-display text-xs text-ink-muted">{idx}</span>
          <h3 className="font-display text-lg text-ink">{tech.name}</h3>
          <span className="badge">ラボ実物</span>
        </div>
        {tech.note && <p className="mb-3 text-[0.8rem] leading-relaxed text-ink-soft">{tech.note}</p>}
        <PhraseChip phrase={tech.phrase} />
      </div>
    </article>
  );
}

/* ---- ツール情報カード ---- */
function InfoCard({ tech, idx, info }: { tech: Technique; idx: string; info?: ToolRef }) {
  return (
    <article className="tech-card flex flex-col">
      <div
        className="tech-stage grid place-items-center"
        style={{ background: "linear-gradient(180deg,#f6f4ef 0%,#eae7df 100%)" }}
      >
        <div className="px-6 text-center">
          <p className="text-[0.58rem] tracking-[0.3em] text-accent-2">REFERENCE</p>
          <p className="mt-3 max-w-[16rem] text-[0.78rem] leading-relaxed text-ink-soft">
            {info?.blurb ?? tech.note}
          </p>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="font-display text-xs text-ink-muted">{idx}</span>
          <h3 className="font-display text-lg text-ink">{tech.name}</h3>
          <span className="badge">情報</span>
          {tech.heavy && <span className="badge badge-warn">重め</span>}
        </div>
        {info?.links?.length ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {info.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] text-ink-soft transition-colors hover:border-accent/60 hover:text-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}
        <PhraseChip phrase={tech.phrase} />
      </div>
    </article>
  );
}

/* ---- ヒーロー ---- */
function Hero() {
  return (
    <header className="relative mx-auto max-w-6xl px-6 pb-10 pt-20 md:px-10 md:pt-24">
      <p className="kicker mb-6">Archeon · Motion Catalog · 上級</p>
      <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-6xl">
        <span className="lab-grad">歪ませる・融かす・立ち上げる</span>
        <br />
        全{PRO_TOTAL}手法の、上級の辞書。
      </h1>
      <p className="mt-8 max-w-2xl text-base leading-loose text-ink-soft">
        WebGL／シェーダー・リアルタイム3D・物理・ベクター素材・高度トランジション。
        基礎の一段上を、<strong className="text-ink">触れるライブ実演</strong>と
        <strong className="text-ink">ラボの実物</strong>で見せます。
        気に入った演出は、<strong className="text-ink">「指示で言う言葉」</strong>をコピーしてそのまま発注に使えます。
      </p>
      {/* 基礎⇄上級の相互導線 */}
      <div className="mt-8 inline-flex rounded-full border border-line p-1 text-sm">
        <Link
          href="/catalog"
          className="rounded-full px-4 py-1.5 text-ink-muted transition-colors hover:text-accent"
        >
          基礎 {TOTAL}種
        </Link>
        <span className="rounded-full bg-accent px-4 py-1.5 font-medium text-white">
          上級 {PRO_TOTAL}手法
        </span>
      </div>
      <nav className="mt-7 flex flex-wrap gap-2">
        {PRO_CATEGORIES.map((c) => (
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

export default function ProMotionCatalog() {
  let counter = 0;
  return (
    <main className="motion-catalog pb-28">
      <CatalogProgress />
      <CatalogHeader active="pro" />
      <Hero />

      {PRO_CATEGORIES.map((cat) => (
        <section
          key={cat.id}
          id={cat.id}
          className="mx-auto max-w-6xl scroll-mt-6 px-6 py-12 md:px-10"
        >
          <div className="mb-7 border-t border-line pt-7">
            <p className="text-[0.62rem] tracking-[0.3em] text-accent-2">{cat.en}</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{cat.label}</h2>
            <p className="mt-2 text-sm text-ink-muted">{cat.blurb}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cat.items.map((t) => {
              counter += 1;
              const idx = String(counter).padStart(2, "0");
              const kind = kindOf(t.id);
              if (kind === "demo") {
                const Demo = PRO_DEMOS[t.id];
                return (
                  <TechCard key={t.id} tech={t} idx={idx}>
                    <Demo />
                  </TechCard>
                );
              }
              if (kind === "lab") {
                return <LabCard key={t.id} tech={t} idx={idx} lab={LAB[t.id]} />;
              }
              return <InfoCard key={t.id} tech={t} idx={idx} info={INFO[t.id]} />;
            })}
          </div>
        </section>
      ))}

      {/* ツール早見表 */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-7 border-t border-line pt-7">
          <p className="text-[0.62rem] tracking-[0.3em] text-accent-2">TOOLBOX</p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">これらを実現する道具</h2>
          <p className="mt-2 text-sm text-ink-muted">上級の演出を支えるライブラリ群（情報のみ）。</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((g) => (
            <div key={g.group} className="tech-card p-5">
              <p className="mb-3 font-display text-sm text-accent">{g.group}</p>
              <ul className="space-y-3">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <p className="font-display text-sm text-ink">{it.name}</p>
                    <p className="mt-0.5 text-[0.72rem] leading-relaxed text-ink-muted">{it.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto mt-10 max-w-6xl px-6 md:px-10">
        <div className="border-t border-line pt-8 text-[0.72rem] leading-relaxed text-ink-muted">
          Archeon 技術ラボ — 上級モーション{PRO_TOTAL}手法カタログ。新規実演は手法の学習用に自社実装（他社コード・資産は非複製）。
          重い3D・物理は本番のラボ実物（REVEAL / OBJET）で確かめられます。
          <br />
          演出名の「言葉」をコピーして制作依頼に貼れば、その動きをそのまま発注できます。
          <Link href="/catalog" className="ml-1 text-accent hover:underline">
            ← 基礎カタログへ戻る
          </Link>
        </div>
      </footer>
    </main>
  );
}
