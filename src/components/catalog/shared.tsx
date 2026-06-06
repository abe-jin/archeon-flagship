"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Technique } from "@/data/techniques";

/* 「指示で言う言葉」チップ（クリックでコピー） */
export function PhraseChip({ phrase }: { phrase: string }) {
  const [copied, setCopied] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copy = () => {
    navigator.clipboard?.writeText(`「${phrase}」`).then(() => {
      setCopied(true);
      if (t.current) clearTimeout(t.current);
      t.current = setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <button onClick={copy} className="phrase-chip group" title="クリックでコピー">
      <span className="phrase-quote">「</span>
      {phrase}
      <span className="phrase-quote">」</span>
      <span className="phrase-copy">{copied ? "✓ コピー" : "⧉"}</span>
    </button>
  );
}

/* 技術カード（実演ステージ + 名前 + 言葉）。stage は呼び出し側が供給 */
export function TechCard({
  tech,
  idx,
  children,
}: {
  tech: Technique;
  idx: string;
  children: ReactNode;
}) {
  return (
    <article className="tech-card">
      <div className="tech-stage">{children}</div>
      <div className="p-5">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="font-display text-xs text-ink-muted">{idx}</span>
          <h3 className="font-display text-lg text-ink">{tech.name}</h3>
          {tech.pc && <span className="badge">PC向け</span>}
          {tech.heavy && <span className="badge badge-warn">重め</span>}
        </div>
        {tech.note && <p className="mb-3 text-[0.8rem] leading-relaxed text-ink-soft">{tech.note}</p>}
        <PhraseChip phrase={tech.phrase} />
      </div>
    </article>
  );
}

/* 重いCanvas/WebGLを画面内のときだけ mount（離れたら unmount してGPUコンテキストを解放） */
export function LazyMount({
  children,
  poster,
}: {
  children: () => ReactNode;
  poster?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setMounted(e.isIntersecting),
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-full w-full">
      {mounted ? children() : poster ?? <div className="poster-fallback" />}
    </div>
  );
}

/* トップナビ（← Archeon へ戻る）。基本/上級タブは上級カタログ完成まで省略 */
export function CatalogHeader(_props: { active: "basic" | "pro" }) {
  return (
    <div className="sticky top-0 z-[70] flex items-center justify-between border-b border-line bg-void/85 px-6 py-3 backdrop-blur md:px-10">
      <Link
        href="/"
        className="text-xs tracking-[0.18em] text-ink-soft transition-colors hover:text-accent"
      >
        ← Archeon
      </Link>
      <span className="text-[0.62rem] tracking-[0.3em] text-ink-muted">MOTION CATALOG</span>
    </div>
  );
}

/* カタログ全体のスクロール進捗バー */
export function CatalogProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProg(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="catalog-progress" style={{ transform: `scaleX(${prog})` }} />;
}

/* 共通: reduced-motion 判定 */
export const prefersReduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
