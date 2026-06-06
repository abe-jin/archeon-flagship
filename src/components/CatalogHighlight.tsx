"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { CATEGORIES, TOTAL } from "@/data/techniques";
import { PRO_CATEGORIES, PRO_TOTAL } from "@/data/techniques-pro";
import { DEMOS } from "@/components/catalog/demos";
import { TechCard } from "@/components/catalog/shared";
import { works } from "@/data/works";
import styles from "./CatalogHighlight.module.css";

/**
 * トップの「動きの辞書」— Cinematic Dark の劇場。
 * 方向: design-sense=Cinematic Dark / ui-ux-pro-max=Motion-Driven。
 * TRUTH=「言葉が、動きになる」。near-black の暗闇で、各モーションカード
 * (.motion-catalog=light) を“光るスクリーン”として見せる。
 * 上級(WebGL/3D/物理)は本物の実例(REVEAL/OBJET)で証明。
 * 注: catalog/demos/techniques は会長作業中のため import 再利用のみ（編集しない）。
 */
const PICKS = ["scramble", "split", "mask", "countup", "tilt", "marquee"];
const ALL = CATEGORIES.flatMap((c) => c.items);
const picked = PICKS.map((id) => ALL.find((t) => t.id === id)).filter(
  (t): t is NonNullable<typeof t> => Boolean(t)
);

const findWork = (id: string) => works.find((w) => w.id === id);
const reveal = findWork("reveal");
const objet = findWork("objet");
const proLabels = PRO_CATEGORIES.map((c) => c.label);

export default function CatalogHighlight() {
  return (
    <section id="catalog" className={`${styles.theater} scroll-mt-24`}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.inner} mx-auto max-w-6xl px-6 py-28 sm:py-36`}>
        <Reveal>
          <p className={styles.eyebrow}>Motion Catalog</p>
          <h2 className={styles.title}>言葉が、動きになる。</h2>
          <p className={styles.lead}>
            発注の一言が、その場で本物の動きに。<strong>「指示で言う言葉」</strong>をコピーすれば、
            その演出をそのまま依頼できます。下は全{TOTAL}種からの抜粋です。
          </p>
        </Reveal>

        {/* 光るスクリーン群（内側は light の .motion-catalog） */}
        <div className={`${styles.screens} motion-catalog`}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {picked.map((t, i) => {
              const Demo = DEMOS[t.id];
              return (
                <Reveal key={t.id} delay={(i % 3) * 70}>
                  <TechCard tech={t} idx={String(i + 1).padStart(2, "0")}>
                    {Demo ? <Demo /> : null}
                  </TechCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* 上級：WebGL / 3D / 物理 — 実例で証明 */}
        <Reveal>
          <div className={styles.advanced}>
            <p className={styles.eyebrowSm}>
              ADVANCED · WEBGL · 3D · PHYSICS · {PRO_TOTAL} techniques
            </p>
            <h3 className={styles.advTitle}>さらに上の層へ。</h3>
            <p className={styles.advLead}>
              WebGL／シェーダー・リアルタイム3D・物理シミュレーション。重い表現も、
              実際に動く実例で確かめられます。
            </p>

            <div className={styles.exGrid}>
              {reveal && (
                <a className={styles.exCard} href={reveal.url} target="_blank" rel="noopener noreferrer">
                  <p className={styles.exKicker}>SCROLL-DRIVEN 3D</p>
                  <p className={styles.exName}>{reveal.title}</p>
                  <p className={styles.exDesc}>
                    スクロールを「映写機のハンドル」に見立て、時計機構が分解していく
                    シネマティック3Dツアー。
                  </p>
                </a>
              )}
              {objet && (
                <a className={styles.exCard} href={objet.url} target="_blank" rel="noopener noreferrer">
                  <p className={styles.exKicker}>SELF-BUILT PHYSICS 3D</p>
                  <p className={styles.exName}>{objet.title}</p>
                  <p className={styles.exDesc}>
                    物理エンジンを使わず、掴んで放れるガラス・金属・粘土のオブジェ。
                    速度積分・衝突・投擲を自前実装。
                  </p>
                </a>
              )}
            </div>

            <div className={styles.chips}>
              {proLabels.map((l) => (
                <span key={l} className={styles.chip}>
                  {l}
                </span>
              ))}
            </div>

            <div className={styles.advCtaWrap}>
              <Link href="/catalog/pro" className={styles.ctaGhost}>
                上級カタログ（全{PRO_TOTAL}手法）を開く
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.ctaWrap}>
            <Link href="/catalog" className={styles.cta}>
              全{TOTAL}種の辞書を開く
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
