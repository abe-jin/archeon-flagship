"use client";

// ============================================================
// モーション技術カタログ — 全32種のライブ実演
// 各デモは小さな自己完結コンポーネント。スクロール駆動系は
// カード内の小さなスクロール領域で「本物の挙動」を体験できる。
// 重い常時再生は IntersectionObserver で画面外は停止する。
// ============================================================

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ---------- 共通フック ---------- */

/** 要素内スクロールの進捗 0→1 を返す */
function useElScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => {
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
    };
    el.addEventListener("scroll", on, { passive: true });
    on();
    return () => el.removeEventListener("scroll", on);
  }, []);
  return [ref, p] as const;
}

/** カードが画面内にあるか（重いデモの間引き用） */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVis(e.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis] as const;
}

const reduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** スクロール駆動デモに付ける「↓ スクロール」ヒント枠 */
function ScrollHint({
  inner,
  children,
}: {
  inner: React.Ref<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div ref={inner} className="tech-scroll">
      {children}
    </div>
  );
}

/* ============================================================
   基本（導入）
   ============================================================ */

function DemoFade() {
  return (
    <div className="grid h-full place-items-center gap-2 px-6">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="fade-bar"
          style={{ animationDelay: `${i * 0.28}s` }}
        />
      ))}
    </div>
  );
}

function DemoProgress() {
  const [ref, p] = useElScroll();
  return (
    <div className="relative h-full">
      <div className="absolute left-0 top-0 z-10 h-1 bg-accent" style={{ width: `${p * 100}%` }} />
      <ScrollHint inner={ref}>
        <div className="space-y-3 p-5">
          <p className="text-xs text-ink-muted">↓ 中をスクロール</p>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-line" style={{ width: `${60 + ((i * 13) % 40)}%` }} />
          ))}
        </div>
      </ScrollHint>
      <div className="pointer-events-none absolute bottom-2 right-3 font-display text-sm text-ink-muted">
        {Math.round(p * 100)}%
      </div>
    </div>
  );
}

function DemoSnap() {
  const tints = ["#eef1f0", "#f0ebf4", "#e9f0f1"];
  return (
    <div className="tech-scroll snap-y snap-mandatory">
      {["ONE", "TWO", "THREE"].map((t, i) => (
        <div
          key={t}
          className="flex h-full snap-start items-center justify-center"
          style={{ background: tints[i] }}
        >
          <span className="font-display text-3xl text-ink">{t}</span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   スクロール連動（scrub系）
   ============================================================ */

function ScrubStage({
  render,
  tall = 2.4,
}: {
  render: (p: number) => ReactNode;
  tall?: number;
}) {
  const [ref, p] = useElScroll();
  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
        {render(p)}
      </div>
      <ScrollHint inner={ref}>
        <div style={{ height: `${tall * 100}%` }} />
      </ScrollHint>
      <span className="pointer-events-none absolute bottom-2 right-3 text-[0.6rem] tracking-widest text-ink-muted">
        ↕ SCRUB
      </span>
    </div>
  );
}

function DemoScrub() {
  return (
    <ScrubStage
      render={(p) => (
        <div className="text-center">
          <div
            className="mx-auto h-16 w-16 rounded-lg"
            style={{
              background: "linear-gradient(135deg,#7cf3d0,#a98bff)",
              transform: `rotate(${p * 360}deg)`,
            }}
          />
          <p className="mt-3 font-display text-lg text-ink">{Math.round(p * 100)}</p>
        </div>
      )}
    />
  );
}

function DemoPin() {
  const [ref, p] = useElScroll();
  return (
    <div className="relative h-full">
      <div ref={ref} className="tech-scroll">
        <div style={{ height: "340%" }}>
          {/* この帯がスクロールしても上に「固定」され続ける */}
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-accent/45 bg-void/95 px-4 py-3 backdrop-blur">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[0.7rem] text-void">★</span>
            <div>
              <p className="font-display text-sm leading-none text-accent">ここが固定される</p>
              <p className="mt-1 text-[0.58rem] text-ink-muted">下の前景だけが流れる</p>
            </div>
          </div>
          {/* 帯の下を流れていく前景 */}
          <div className="space-y-3 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded bg-line/70 px-4 py-4 text-sm text-ink-soft">
                流れる前景 {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-2 right-3 text-[0.6rem] tracking-widest text-ink-muted">
        ↓ スクロール {Math.round(p * 100)}%
      </div>
    </div>
  );
}

function DemoParallax() {
  return (
    <ScrubStage
      tall={2}
      render={(p) => (
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-x-0 text-center" style={{ top: `${30 - p * 10}%` }}>
            <span className="font-display text-5xl text-line">奥</span>
          </div>
          <div className="absolute inset-x-0 text-center" style={{ top: `${30 + p * 8}%` }}>
            <span className="font-display text-4xl text-ink-muted">中</span>
          </div>
          <div className="absolute inset-x-0 text-center" style={{ top: `${30 + p * 26}%` }}>
            <span className="font-display text-3xl text-accent">手前</span>
          </div>
        </div>
      )}
    />
  );
}

function DemoScaleRotate() {
  return (
    <ScrubStage
      render={(p) => (
        <div
          className="font-display text-4xl text-ink"
          style={{ transform: `scale(${0.5 + p * 1.1}) rotate(${p * 180}deg)` }}
        >
          ✦
        </div>
      )}
    />
  );
}

function DemoHorizontal() {
  // 「縦スクロールが横移動に化ける」本来の挙動：内部の縦スクロール量 p で
  // カードの列を横へ送る（PCでもホイール/トラックパッドの縦操作で動く）。
  const [ref, p] = useElScroll();
  return (
    <div className="relative h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
        <div className="flex gap-3 px-4" style={{ transform: `translateX(${-p * 70}%)`, willChange: "transform" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid h-[120px] w-[120px] shrink-0 place-items-center rounded-lg font-display text-2xl text-ink"
              style={{ background: `hsl(${180 + i * 26} 52% 84%)` }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <ScrollHint inner={ref}>
        <div style={{ height: "280%" }} />
      </ScrollHint>
      <span className="pointer-events-none absolute bottom-2 right-3 text-[0.6rem] tracking-widest text-ink-muted">
        ↓ 縦スクロール → 横移動
      </span>
    </div>
  );
}

function DemoSequence() {
  // 連番フレームを模した CSS グラデの位相をスクロールで進める
  return (
    <ScrubStage
      tall={2}
      render={(p) => {
        const frame = Math.floor(p * 23); // 0..23
        const ang = frame * 15;
        return (
          <div className="text-center">
            <div
              className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-line"
              style={{ background: `conic-gradient(from ${ang}deg, #7cf3d0, #a98bff, #ff9d7a, #7cf3d0)` }}
            >
              <span className="font-display text-sm text-void">{String(frame).padStart(2, "0")}</span>
            </div>
            <p className="mt-2 text-[0.6rem] tracking-widest text-ink-muted">FRAME {frame}/23</p>
          </div>
        );
      }}
    />
  );
}

function DemoSvgPath() {
  return (
    <ScrubStage
      render={(p) => (
        <svg viewBox="0 0 200 100" className="h-24 w-48">
          <path
            d="M10 80 C 50 10, 90 10, 100 50 S 150 90, 190 20"
            fill="none"
            stroke="#7cf3d0"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 - p }}
          />
        </svg>
      )}
    />
  );
}

function DemoSkew() {
  const ref = useRef<HTMLDivElement>(null);
  const [skew, setSkew] = useState(0);
  const last = useRef({ t: 0, top: 0 });
  const target = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let running = true;
    last.current = { t: performance.now(), top: el.scrollTop }; // cold-start: 初回dtの暴走防止
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(8, now - last.current.t);
      const v = (el.scrollTop - last.current.top) / dt; // px/ms
      last.current = { t: now, top: el.scrollTop };
      // 速いほど大きく傾ける（ゲイン↑・上限18°）
      target.current = Math.max(-18, Math.min(18, v * 26));
    };
    // 連続ループ：傾きは目標へ追従しつつ、目標は毎フレーム減衰＝速い直後に
    // しっかり傾き、止めると滑らかに戻る（以前は次フレームで即0に消えていた）。
    const tick = () => {
      if (!running) return;
      target.current *= 0.85;
      setSkew((s) => {
        const next = s + (target.current - s) * 0.45;
        return Math.abs(next) < 0.05 ? 0 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="relative h-full">
      <div ref={ref} className="tech-scroll">
        <div className="space-y-4 p-5" style={{ transform: `skewY(${skew.toFixed(2)}deg)`, willChange: "transform" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded bg-line/70 px-4 py-3 text-sm text-ink-soft">速くスクロールすると傾く {i + 1}</div>
          ))}
        </div>
      </div>
      <span className="pointer-events-none absolute bottom-2 right-3 text-[0.6rem] tracking-widest text-ink-muted">
        ↕ 速いほど傾く
      </span>
    </div>
  );
}

function DemoBgColor() {
  const stops = ["#e7f0ef", "#efe9f3", "#f3ece6", "#e8eef3"];
  const [ref, p] = useElScroll();
  const idx = Math.min(stops.length - 1, Math.floor(p * stops.length));
  return (
    <div className="h-full transition-colors duration-300" style={{ background: stops[idx] }}>
      <ScrollHint inner={ref}>
        <div style={{ height: "300%" }} className="grid place-items-center">
          <span className="sticky top-1/2 font-display text-2xl text-ink">SCROLL ↓</span>
        </div>
      </ScrollHint>
    </div>
  );
}

function DemoMask() {
  return (
    <ScrubStage
      render={(p) => (
        <div
          className="grid h-24 w-40 place-items-center rounded-lg font-display text-xl text-void"
          style={{
            background: "linear-gradient(135deg,#7cf3d0,#ff9d7a)",
            clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
          }}
        >
          REVEAL
        </div>
      )}
    />
  );
}

function DemoStack() {
  const cards = ["#e3edec", "#e9e4f1", "#f1e9e4"];
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="tech-scroll">
      <div className="px-6 py-4" style={{ height: "280%" }}>
        {cards.map((c, i) => (
          <div
            key={i}
            className="sticky grid h-[110px] place-items-center rounded-xl border border-line font-display text-xl text-ink shadow-lg"
            style={{ top: `${10 + i * 14}px`, background: c, marginBottom: 14 }}
          >
            CARD {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   テキスト演出
   ============================================================ */

function DemoSplit() {
  const txt = "STAGGER";
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (reduce()) return;
    const t = setInterval(() => setKey((k) => k + 1), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid h-full place-items-center">
      <div key={key} className="flex font-display text-3xl text-ink">
        {txt.split("").map((c, i) => (
          <span key={i} className="split-char" style={{ animationDelay: `${i * 0.06}s` }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function DemoTypewriter() {
  const full = "タイプライターで打つ。";
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce()) {
      setN(full.length);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i = i >= full.length + 6 ? 0 : i + 1;
      setN(Math.min(i, full.length));
    }, 180);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid h-full place-items-center px-4">
      <p className="font-display text-lg text-ink">
        {full.slice(0, n)}
        <span className="type-caret">|</span>
      </p>
    </div>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@";
function DemoScramble() {
  const target = "DECODE";
  const [txt, setTxt] = useState(target);
  useEffect(() => {
    if (reduce()) return;
    let frame = 0;
    let lock = 0;
    const t = setInterval(() => {
      frame++;
      if (frame % 3 === 0 && lock < target.length) lock++;
      if (lock >= target.length && frame % 40 !== 0) return;
      if (frame % 40 === 0) {
        lock = 0;
        frame = 0;
      }
      setTxt(
        target
          .split("")
          .map((c, i) => (i < lock ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
    }, 50);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid h-full place-items-center">
      <span className="font-display text-3xl tracking-[0.15em] text-accent">{txt}</span>
    </div>
  );
}

function DemoGlitch() {
  return (
    <div className="grid h-full place-items-center">
      <span className="glitch font-display text-4xl text-ink" data-text="ARCHEON">
        ARCHEON
      </span>
    </div>
  );
}

function DemoCountup() {
  const [ref, vis] = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!vis) return;
    if (reduce()) {
      setN(98);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1600);
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 98));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [vis]);
  return (
    <div ref={ref} className="grid h-full place-items-center">
      <span className="font-display text-5xl text-ink">
        {n}
        <span className="text-accent">%</span>
      </span>
    </div>
  );
}

function Digit({ value }: { value: number }) {
  return (
    <span className="roll-window font-display text-4xl text-ink">
      <span className="roll-col" style={{ transform: `translateY(${-value * 10}%)` }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="roll-cell">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}
function DemoRolling() {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduce()) {
      setV(427);
      return;
    }
    const t = setInterval(() => setV((x) => (x + 37) % 1000), 1400);
    return () => clearInterval(t);
  }, []);
  const d = String(v).padStart(3, "0").split("").map(Number);
  return (
    <div className="flex h-full items-center justify-center gap-1">
      {d.map((n, i) => (
        <Digit key={i} value={n} />
      ))}
    </div>
  );
}

function DemoMarquee() {
  const word = "ARCHEON · MOTION · ";
  return (
    <div className="grid h-full content-center gap-3 overflow-hidden">
      <div className="marquee">
        <span className="marquee-track font-display text-2xl text-ink">{word.repeat(6)}</span>
      </div>
      <div className="marquee">
        <span className="marquee-track marquee-rev font-display text-2xl text-line">{word.repeat(6)}</span>
      </div>
    </div>
  );
}

/* ============================================================
   カーソル / インタラクティブ
   ============================================================ */

function DemoMagnetic() {
  const btn = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = btn.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };
  const reset = () => {
    if (btn.current) btn.current.style.transform = "translate(0,0)";
  };
  return (
    <div className="grid h-full place-items-center" onMouseMove={onMove} onMouseLeave={reset}>
      <button ref={btn} className="magnetic-btn" onMouseLeave={reset}>
        HOVER ME
      </button>
    </div>
  );
}

function DemoCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = wrap.current;
    if (!w || reduce()) return;
    const pos = { x: 0, y: 0 };
    const r = { x: 0, y: 0 };
    let raf = 0;
    const move = (e: MouseEvent) => {
      const b = w.getBoundingClientRect();
      pos.x = e.clientX - b.left;
      pos.y = e.clientY - b.top;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px,${pos.y}px)`;
    };
    const loop = () => {
      r.x += (pos.x - r.x) * 0.12;
      r.y += (pos.y - r.y) * 0.12;
      if (ring.current) ring.current.style.transform = `translate(${r.x}px,${r.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    w.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      w.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={wrap} className="relative h-full cursor-none overflow-hidden">
      <div className="grid h-full place-items-center text-xs tracking-widest text-ink-muted">
        ここでマウスを動かす
      </div>
      <div ref={ring} className="cur-ring" />
      <div ref={dot} className="cur-dot" />
    </div>
  );
}

function DemoHoverPreview() {
  const items = [
    { t: "AURORA", c: "linear-gradient(135deg,#7cf3d0,#137a64)" },
    { t: "VIOLET", c: "linear-gradient(135deg,#a98bff,#4a2f8f)" },
    { t: "EMBER", c: "linear-gradient(135deg,#ff9d7a,#a3422a)" },
  ];
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="relative grid h-full grid-cols-2">
      <ul className="flex flex-col justify-center gap-1 px-5">
        {items.map((it, i) => (
          <li
            key={it.t}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`cursor-pointer font-display text-xl transition-colors ${
              hover === i ? "text-accent" : "text-ink-muted"
            }`}
          >
            {it.t}
          </li>
        ))}
      </ul>
      <div className="relative">
        {items.map((it, i) => (
          <div
            key={it.t}
            className="absolute inset-3 rounded-lg transition-opacity duration-300"
            style={{ background: it.c, opacity: hover === i ? 1 : 0 }}
          />
        ))}
        {hover === null && (
          <div className="grid h-full place-items-center text-[0.6rem] tracking-widest text-ink-muted">
            ホバー →
          </div>
        )}
      </div>
    </div>
  );
}

function DemoTilt() {
  const card = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${px * 22}deg) rotateX(${-py * 22}deg)`;
  };
  const reset = () => {
    if (card.current) card.current.style.transform = "perspective(600px) rotateY(0) rotateX(0)";
  };
  return (
    <div className="grid h-full place-items-center" onMouseMove={onMove} onMouseLeave={reset}>
      <div ref={card} className="tilt-card">
        <span className="font-display text-xl text-void">3D TILT</span>
      </div>
    </div>
  );
}

function DemoDragInertia() {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    let v = 0;
    let lastX = 0;
    let raf = 0;
    const momentum = () => {
      if (Math.abs(v) < 0.3) return;
      el.scrollLeft -= v;
      v *= 0.94;
      raf = requestAnimationFrame(momentum);
    };
    const dn = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      lastX = e.clientX;
      startScroll = el.scrollLeft;
      cancelAnimationFrame(raf);
      el.setPointerCapture(e.pointerId);
    };
    const mv = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
      v = e.clientX - lastX;
      lastX = e.clientX;
    };
    const up = () => {
      if (!down) return;
      down = false;
      raf = requestAnimationFrame(momentum);
    };
    el.addEventListener("pointerdown", dn);
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", dn);
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="relative h-full">
      <div ref={track} className="drag-track">
        <div className="flex h-full items-center gap-3 px-4" style={{ width: "max-content" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="grid h-[90px] w-[90px] shrink-0 select-none place-items-center rounded-lg font-display text-2xl text-ink"
              style={{ background: `hsl(${260 + i * 18} 45% 85%)` }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <span className="pointer-events-none absolute bottom-2 right-3 text-[0.6rem] tracking-widest text-ink-muted">
        ドラッグして投げる
      </span>
    </div>
  );
}

function DemoDotGrid() {
  const [ref, vis] = useInView<HTMLCanvasElement>();
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !vis || reduce()) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0,
      h = 0;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const gap = 22;
    const mouse = { x: -999, y: -999 };
    const move = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const leave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    cv.addEventListener("mousemove", move);
    cv.addEventListener("mouseleave", leave);
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let x = gap; x < w; x += gap) {
        for (let y = gap; y < h; y += gap) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.hypot(dx, dy);
          const push = Math.max(0, 1 - d / 90);
          const ox = (dx / (d || 1)) * push * 14;
          const oy = (dy / (d || 1)) * push * 14;
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, 1.4 + push * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = push > 0.05 ? `rgba(124,243,208,${0.3 + push * 0.7})` : "rgba(132,132,140,0.4)";
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", fit);
    return () => {
      cv.removeEventListener("mousemove", move);
      cv.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", fit);
      cancelAnimationFrame(raf);
    };
  }, [vis]);
  return <canvas ref={ref} className="h-full w-full" />;
}

function DemoGooey() {
  const wrap = useRef<HTMLDivElement>(null);
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = wrap.current;
    if (!w || reduce()) return;
    const p = { x: 80, y: 60 };
    const a = { x: 80, y: 60 };
    const b = { x: 80, y: 60 };
    let raf = 0;
    const move = (e: MouseEvent) => {
      const r = w.getBoundingClientRect();
      p.x = e.clientX - r.left;
      p.y = e.clientY - r.top;
    };
    const loop = () => {
      a.x += (p.x - a.x) * 0.18;
      a.y += (p.y - a.y) * 0.18;
      b.x += (a.x - b.x) * 0.12;
      b.y += (a.y - b.y) * 0.12;
      if (b1.current) b1.current.style.transform = `translate(${a.x - 26}px,${a.y - 26}px)`;
      if (b2.current) b2.current.style.transform = `translate(${b.x - 18}px,${b.y - 18}px)`;
      raf = requestAnimationFrame(loop);
    };
    w.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      w.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={wrap} className="relative h-full overflow-hidden">
      <svg className="absolute h-0 w-0">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" />
        </filter>
      </svg>
      <div className="grid h-full place-items-center text-[0.6rem] tracking-widest text-ink-muted">
        マウスを動かす
      </div>
      <div className="absolute inset-0" style={{ filter: "url(#gooey)" }}>
        <div ref={b1} className="goo-blob h-[52px] w-[52px]" />
        <div ref={b2} className="goo-blob h-[36px] w-[36px]" />
      </div>
    </div>
  );
}

/* ============================================================
   ロード / 遷移 / 質感
   ============================================================ */

function DemoLoader() {
  const [phase, setPhase] = useState<"load" | "hero">("load");
  const [n, setN] = useState(0);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (reduce()) {
      setPhase("hero");
      setN(100);
      return;
    }
    setPhase("load");
    setN(0);
    let v = 0;
    const t = setInterval(() => {
      v = Math.min(100, v + Math.random() * 18);
      setN(Math.round(v));
      if (v >= 100) {
        clearInterval(t);
        setTimeout(() => setPhase("hero"), 350);
        setTimeout(() => setKey((k) => k + 1), 3200); // ループ再演
      }
    }, 130);
    return () => clearInterval(t);
  }, [key]);
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute inset-0 z-10 grid place-items-center bg-void transition-transform duration-500"
        style={{ transform: phase === "hero" ? "translateY(-100%)" : "translateY(0)" }}
      >
        <span className="font-display text-3xl text-ink-muted">{n}</span>
      </div>
      <div className="grid h-full place-items-center">
        <span className={`font-display text-3xl ${phase === "hero" ? "hero-pop" : "opacity-0"}`}>
          <span className="lab-grad">HELLO</span>
        </span>
      </div>
    </div>
  );
}

function DemoTransition() {
  const [n, setN] = useState(0);
  const labels = ["HOME", "WORK", "ABOUT"];
  const [wiping, setWiping] = useState(false);
  useEffect(() => {
    if (reduce()) return;
    const t = setInterval(() => {
      setWiping(true);
      setTimeout(() => setN((x) => (x + 1) % labels.length), 350);
      setTimeout(() => setWiping(false), 700);
    }, 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-full overflow-hidden">
      <div className="grid h-full place-items-center">
        <span className="font-display text-3xl text-ink">{labels[n]}</span>
      </div>
      <div className={`wipe-band ${wiping ? "is-wiping" : ""}`} />
    </div>
  );
}

function DemoParticles() {
  const [ref, vis] = useInView<HTMLCanvasElement>();
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !vis || reduce()) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0,
      h = 0;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const N = 46;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6,
    }));
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,243,208,0.7)";
        ctx.fill();
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 70) {
            ctx.strokeStyle = `rgba(169,139,255,${0.18 * (1 - d / 70)})`;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      cancelAnimationFrame(raf);
    };
  }, [vis]);
  return <canvas ref={ref} className="h-full w-full" />;
}

function DemoGrain() {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg,#e6f0f0,#ece6f3,#f3e9e6)" }}
      />
      <div className="grid h-full place-items-center">
        <span className="font-display text-2xl text-ink/90">FILM GRAIN</span>
      </div>
      <div className="grain-overlay" />
    </div>
  );
}

/* ============================================================
   レジストリ
   ============================================================ */

export const DEMOS: Record<string, () => ReactNode> = {
  fade: DemoFade,
  progress: DemoProgress,
  snap: DemoSnap,
  scrub: DemoScrub,
  pin: DemoPin,
  parallax: DemoParallax,
  scalerotate: DemoScaleRotate,
  horizontal: DemoHorizontal,
  sequence: DemoSequence,
  svgpath: DemoSvgPath,
  skew: DemoSkew,
  bgcolor: DemoBgColor,
  mask: DemoMask,
  stack: DemoStack,
  split: DemoSplit,
  typewriter: DemoTypewriter,
  scramble: DemoScramble,
  glitch: DemoGlitch,
  countup: DemoCountup,
  rolling: DemoRolling,
  marquee: DemoMarquee,
  magnetic: DemoMagnetic,
  cursor: DemoCursor,
  hoverpreview: DemoHoverPreview,
  tilt: DemoTilt,
  draginertia: DemoDragInertia,
  dotgrid: DemoDotGrid,
  gooey: DemoGooey,
  loader: DemoLoader,
  transition: DemoTransition,
  particles: DemoParticles,
  grain: DemoGrain,
};
