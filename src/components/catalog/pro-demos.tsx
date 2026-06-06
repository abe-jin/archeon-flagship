"use client";

// ============================================================
// 上級モーションカタログ — 新規ライブ実演（軽量×映える×焦点）
// 各デモは自己完結。重い常時描画は useInView で画面内のみ動かし、
// reduce() で静的フォールバックする。画像は使わず手続き生成/
// ベクター/フォントで完結（ライセンス懸念ゼロ）。
//   主役は常に1つ＋余白（黒/紙のマージン）を守る。
// ============================================================

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- 共通フック（demos.tsx と同方針） ---------- */

/** カードが画面内にあるか（常時描画デモの間引き用） */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis] as const;
}

/** 要素内スクロールの進捗 0→1 */
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

const reduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** DPR 上限（モバイル発熱対策）。重い canvas は 1.75 で頭打ち */
const cappedDpr = () => Math.min(1.75, (typeof window !== "undefined" && window.devicePixelRatio) || 1);

/** スクロール駆動デモの「↕」枠 */
function ScrollStage({
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
   1. variable-font — 可変フォントの太さ/字幅をスクロールで動かす
   主役: 中央の1語。余白: 紙地の左右マージン。
   reduced: 中庸ウェイトで静止。
   ============================================================ */
function DemoVariableFont() {
  const [ref, p] = useElScroll();
  const r = typeof window !== "undefined" && reduce();
  // 0→1 を 100→900 のウェイト、字間/transform の伸縮へ写像
  const k = r ? 0.5 : p;
  const wght = Math.round(100 + k * 800);
  const stretch = (0.86 + k * 0.5).toFixed(3); // 字幅の代替（transform scaleX）
  const tracking = (0.32 - k * 0.34).toFixed(3);
  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6">
        <span
          className="select-none font-display text-ink"
          style={{
            fontSize: "clamp(2.2rem, 8vw, 3.6rem)",
            fontWeight: wght,
            fontVariationSettings: `"wght" ${wght}`,
            letterSpacing: `${tracking}em`,
            transform: `scaleX(${stretch})`,
            transformOrigin: "center",
            display: "inline-block",
          }}
        >
          ARCHEON
        </span>
      </div>
      <ScrollStage inner={ref}>
        <div style={{ height: "260%" }} />
      </ScrollStage>
      <span className="pointer-events-none absolute bottom-2 right-3 z-20 text-[0.6rem] tracking-widest text-ink-muted">
        ↕ wght {wght}
      </span>
    </div>
  );
}

/* ============================================================
   2. svg-morph — 図形A→Bのモーフ（頂点補間・自前）
   主役: 中央の1シェイプ。余白: 周囲は紙地。
   reduced: 完成形(B)で静止。
   ============================================================ */
// 同じ頂点数で2形状を定義し、線形補間してモーフする（MorphSVG非依存）
function lerpPath(a: number[][], b: number[][], t: number) {
  const pts = a.map((p, i) => {
    const q = b[i];
    return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  });
  // Catmull-Rom 風の閉じた滑らかパス
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  return d + "Z";
}
// 12頂点の円 / 星（同数）
const N_MORPH = 12;
const CIRCLE = Array.from({ length: N_MORPH }, (_, i) => {
  const a = (i / N_MORPH) * Math.PI * 2 - Math.PI / 2;
  return [50 + Math.cos(a) * 34, 50 + Math.sin(a) * 34];
});
const STAR = Array.from({ length: N_MORPH }, (_, i) => {
  const a = (i / N_MORPH) * Math.PI * 2 - Math.PI / 2;
  const rad = i % 2 === 0 ? 40 : 16;
  return [50 + Math.cos(a) * rad, 50 + Math.sin(a) * rad];
});
function DemoSvgMorph() {
  const [ref, vis] = useInView<HTMLDivElement>();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!vis) return;
    if (reduce()) {
      setT(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      // ease in-out で円⇄星を往復
      const phase = ((now - start) / 2600) % 2;
      const tri = phase < 1 ? phase : 2 - phase;
      setT(tri < 0.5 ? 2 * tri * tri : 1 - Math.pow(-2 * tri + 2, 2) / 2);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [vis]);
  return (
    <div ref={ref} className="grid h-full place-items-center">
      <svg viewBox="0 0 100 100" className="h-36 w-36" aria-hidden="true">
        <defs>
          <linearGradient id="morphGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="55%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#ea7a52" />
          </linearGradient>
        </defs>
        <path d={lerpPath(CIRCLE, STAR, t)} fill="url(#morphGrad)" />
      </svg>
    </div>
  );
}

/* ============================================================
   3. flip — サムネ→全画面 FLIP（GSAP Flip。無ければ手動FLIP）
   主役: 開く1枚。余白: 周囲は暗幕(near-black)で焦点化。
   reduced: トランジション無しで即時開閉。
   ============================================================ */
function DemoFlip() {
  const [open, setOpen] = useState(false);
  const thumb = useRef<HTMLButtonElement>(null);
  const full = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const animate = (from: DOMRect, target: HTMLElement) => {
    if (reduce()) return;
    const to = target.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const sx = from.width / to.width;
    const sy = from.height / to.height;
    target.animate(
      [
        { transformOrigin: "top left", transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})` },
        { transformOrigin: "top left", transform: "translate(0,0) scale(1,1)" },
      ],
      { duration: 460, easing: "cubic-bezier(0.22,1,0.36,1)" }
    );
  };

  const openIt = () => {
    if (animating.current) return;
    const rect = thumb.current?.getBoundingClientRect();
    setOpen(true);
    requestAnimationFrame(() => {
      if (rect && full.current) animate(rect, full.current);
    });
  };
  const closeIt = () => setOpen(false);

  return (
    <div className="relative grid h-full place-items-center bg-[#0d0f12]">
      <button
        ref={thumb}
        onClick={openIt}
        className="group relative h-20 w-28 overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        style={{ background: "linear-gradient(135deg,#0891b2,#7c5cff)" }}
        aria-label="サムネを全画面に開く"
      >
        <span className="absolute bottom-1 left-2 text-[0.6rem] tracking-widest text-white/90">
          OPEN ↗
        </span>
      </button>
      {open && (
        <div className="absolute inset-0 z-20 grid place-items-center p-3">
          <div
            ref={full}
            className="relative grid h-full w-full place-items-center rounded-lg"
            style={{ background: "linear-gradient(135deg,#0891b2,#7c5cff,#ea7a52)" }}
          >
            <span className="font-display text-2xl text-white drop-shadow">FULLSCREEN</span>
            <button
              onClick={closeIt}
              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/35 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   4. metaball — 中央に閉じた液体（SVG gooey filter）。周囲は余白。
   主役: 中央で融合する2〜3個の塊。余白: near-black の縁。
   reduced: 融合した静的な塊1つ。
   ============================================================ */
function DemoMetaball() {
  const wrap = useRef<HTMLDivElement>(null);
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const [ref, vis] = useInView<HTMLDivElement>();
  useEffect(() => {
    if (!vis || reduce()) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      const W = wrap.current?.clientWidth ?? 220;
      const H = wrap.current?.clientHeight ?? 220;
      const cx = W / 2;
      const cy = H / 2;
      // 中央へ収束する閉じた軌道（外周に散らさない＝壁紙化を避ける）
      const place = (el: HTMLDivElement | null, r: number, sp: number, ph: number, sz: number) => {
        if (!el) return;
        const x = cx + Math.cos(t * sp + ph) * r;
        const y = cy + Math.sin(t * sp * 1.3 + ph) * r * 0.78;
        el.style.transform = `translate(${x - sz / 2}px,${y - sz / 2}px)`;
      };
      place(b1.current, 18, 0.9, 0, 70);
      place(b2.current, 30, 1.15, 2.1, 50);
      place(b3.current, 24, 1.4, 4.2, 38);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [vis]);
  return (
    <div ref={ref} className="h-full w-full bg-[#0c0e11]">
      <div ref={wrap} className="relative h-full w-full overflow-hidden">
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="pro-metaball">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </svg>
        {/* 余白を確保するため塊は中央寄りに置く */}
        <div className="absolute inset-0" style={{ filter: "url(#pro-metaball)" }}>
          <div
            ref={b1}
            className="absolute left-0 top-0 h-[70px] w-[70px] rounded-full"
            style={{ background: "radial-gradient(circle at 35% 30%, #67e8f9, #0891b2 70%)" }}
          />
          <div
            ref={b2}
            className="absolute left-0 top-0 h-[50px] w-[50px] rounded-full"
            style={{ background: "radial-gradient(circle at 35% 30%, #a78bfa, #6d28d9 70%)" }}
          />
          <div
            ref={b3}
            className="absolute left-0 top-0 h-[38px] w-[38px] rounded-full"
            style={{ background: "radial-gradient(circle at 35% 30%, #fbbf77, #ea7a52 70%)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   5. shader-distort — GLSL 歪み（WebGL・焦点1つ）。
   手続き生成テクスチャ(同心リング)に波紋＋色収差＋マウス追従。
   主役: 中央のリング模様。余白: 描画は枠内、周囲はカード地。
   reduced: 静的な同心リングを2D描画。WebGL不可時も2Dへフォールバック。
   ============================================================ */
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
// 手続き生成: 同心リング + 角度の縞（画像なし）
float pattern(vec2 p){
  float d = length(p);
  float rings = 0.5 + 0.5 * sin(d * 26.0 - uTime * 1.4);
  float spokes = 0.5 + 0.5 * sin(atan(p.y, p.x) * 8.0);
  return mix(rings, rings * spokes, 0.35);
}
void main(){
  vec2 uv = vUv - 0.5;
  uv.x *= 1.0; // 正方ステージ前提
  // マウス/中心からの波紋で歪ませる（焦点1つ）
  vec2 m = uMouse - 0.5;
  float dm = length(uv - m);
  float ripple = sin(dm * 22.0 - uTime * 2.2) * 0.018 / (dm + 0.18);
  vec2 dir = normalize(uv - m + 1e-4);
  vec2 duv = uv + dir * ripple;
  // RGBシフト（色収差）
  float shift = 0.006 + ripple * 0.4;
  float r = pattern(duv + vec2(shift, 0.0));
  float g = pattern(duv);
  float b = pattern(duv - vec2(shift, 0.0));
  // 寒色基調に階調（暗部→中間→ハイライト）
  vec3 col = vec3(0.04,0.07,0.10);
  col += vec3(r*0.10, g*0.55, b*0.85) * (0.35 + 0.65*g);
  col += vec3(0.45,0.30,0.85) * pow(b, 3.0) * 0.5; // バイオレットのハイライト
  // 縁を落として中央へ焦点（余白＝暗部）
  float vig = smoothstep(0.85, 0.25, length(uv));
  col *= vig;
  gl_FragColor = vec4(col, 1.0);
}`;
const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;
function DemoShaderDistort() {
  const [ref, vis] = useInView<HTMLCanvasElement>();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !vis) return;
    const dpr = cappedDpr();
    const fit = () => {
      const r = cv.getBoundingClientRect();
      cv.width = Math.max(1, Math.round(r.width * dpr));
      cv.height = Math.max(1, Math.round(r.height * dpr));
    };
    const move = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = 1 - (e.clientY - r.top) / r.height;
    };
    const leave = () => {
      mouse.current.x = 0.5;
      mouse.current.y = 0.5;
    };

    const gl = cv.getContext("webgl", { antialias: true, alpha: false });
    // --- WebGL 不可 → 2D 同心リングへフォールバック（黒箱を出さない） ---
    if (!gl) {
      fit();
      const ctx = cv.getContext("2d");
      if (ctx) {
        const w = cv.width;
        const h = cv.height;
        const g = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, Math.max(w, h) / 2);
        g.addColorStop(0, "#a78bfa");
        g.addColorStop(0.5, "#0891b2");
        g.addColorStop(1, "#0c0e11");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        for (let i = 1; i < 18; i++) {
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, (i / 18) * Math.min(w, h) * 0.46, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const resize = () => {
      fit();
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    window.addEventListener("resize", resize);
    cv.addEventListener("mousemove", move);
    cv.addEventListener("mouseleave", leave);

    const still = reduce();
    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const t = still ? 0.6 : (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still) raf = requestAnimationFrame(draw);
    };
    if (still) draw(0);
    else raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cv.removeEventListener("mousemove", move);
      cv.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [vis]);
  return <canvas ref={ref} className="h-full w-full" />;
}

/* ============================================================
   6. tilt-3d — カーソルで3Dティルト（多層パララックス＋スペキュラ）
   基本カタログの単層ティルトより深い: 3層が視差で前後し、光沢が走る。
   主役: 中央の立体カード。余白: near-black の縁。
   reduced: 正面静止（傾けない）。タッチ/キーボードでも傾く。
   ============================================================ */
function DemoTilt3D() {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);
  const apply = (px: number, py: number) => {
    if (reduce()) return;
    const el = card.current;
    if (!el) return;
    el.style.transform = `perspective(680px) rotateY(${px * 20}deg) rotateX(${-py * 20}deg)`;
    if (shine.current) {
      shine.current.style.background = `radial-gradient(circle at ${50 + px * 50}% ${50 + py * 50}%, rgba(255,255,255,0.55), transparent 55%)`;
    }
    // 層ごとに視差量を変える
    el.style.setProperty("--px", String(px));
    el.style.setProperty("--py", String(py));
  };
  const onMove = (e: React.MouseEvent) => {
    const r = stage.current?.getBoundingClientRect();
    if (!r) return;
    apply((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    const el = card.current;
    if (el) {
      el.style.transform = "perspective(680px) rotateY(0deg) rotateX(0deg)";
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    }
    if (shine.current)
      shine.current.style.background =
        "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.4), transparent 55%)";
  };
  // キーボード操作（focus 中の矢印キーで傾ける）
  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-0.4, 0],
      ArrowRight: [0.4, 0],
      ArrowUp: [0, -0.4],
      ArrowDown: [0, 0.4],
    };
    if (map[e.key]) {
      e.preventDefault();
      apply(map[e.key][0], map[e.key][1]);
    }
  };
  return (
    <div
      ref={stage}
      className="grid h-full place-items-center bg-[#0c0e11]"
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div
        ref={card}
        tabIndex={0}
        onKeyDown={onKey}
        onBlur={reset}
        role="img"
        aria-label="カーソルで傾く3Dロゴ"
        className="pro-tilt-card relative grid h-28 w-40 place-items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.18s ease-out",
          background: "linear-gradient(135deg,#0e7490,#5b21b6)",
          boxShadow: "0 20px 50px -20px rgba(124,92,255,0.6)",
        }}
      >
        <span
          className="font-display text-2xl tracking-wide text-white"
          style={{ transform: "translateZ(36px)" }}
        >
          A
        </span>
        <span
          className="absolute text-[0.55rem] tracking-[0.3em] text-cyan-200/80"
          style={{ bottom: 10, transform: "translateZ(20px)" }}
        >
          ARCHEON
        </span>
        <div
          ref={shine}
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.4), transparent 55%)" }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   レジストリ
   ============================================================ */
export const PRO_DEMOS: Record<string, () => ReactNode> = {
  "variable-font": DemoVariableFont,
  "svg-morph": DemoSvgMorph,
  flip: DemoFlip,
  metaball: DemoMetaball,
  "shader-distort": DemoShaderDistort,
  "tilt-3d": DemoTilt3D,
};
