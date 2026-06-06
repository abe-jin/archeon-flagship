// ============================================================
// Archeon 技術ラボ — 上級モーション技術カタログ
// WebGL/シェーダー・3D・物理・ベクター素材・高度トランジション。
// 基本カタログ(techniques.ts)の一段上。重い実演は LazyMount で
// 画面内のみ描画する。各技術に「指示で言う言葉」を添える。
// ============================================================

import type { Technique, Category } from "@/data/techniques";

export type { Technique, Category };

export const PRO_CATEGORIES: Category[] = [
  {
    id: "webgl",
    label: "WebGL / シェーダー系",
    en: "WEBGL · SHADERS",
    blurb: "GPUで画像とピクセルそのものを操る。最も“映える”層。",
    items: [
      { id: "shader-distort", name: "シェーダー画像歪み", phrase: "画像をシェーダーで歪ませる（RGBシフト・波紋・ピクセル化）", pc: true, heavy: true, note: "自作GLSLで波紋・色収差・モザイクを掛ける。" },
      { id: "webgl-transition", name: "WebGL画像トランジション", phrase: "画像を流体的に切り替える（WebGLトランジション）", heavy: true, note: "歪みながら次の画像へ溶けて切り替わる。" },
      { id: "metaball", name: "流体 / メタボール", phrase: "メタボールで液体がにじむ", note: "粒が近づくと一つの液体に融合する。" },
      { id: "gpu-particles", name: "パーティクル場（GPU）", phrase: "GPUで数千粒のパーティクル場", heavy: true, note: "数千の点群が流れ、カーソルから逃げる。" },
      { id: "image-trail", name: "イメージトレイル", phrase: "カーソルに画像の尾を引かせる", pc: true, note: "動かすと残像のように画像が連なる。" },
    ],
  },
  {
    id: "three",
    label: "3D系",
    en: "REAL-TIME 3D",
    blurb: "Three.js / R3F で、奥行きのある世界を触れるものにする。",
    items: [
      { id: "scroll-3d", name: "スクロール連動3Dシーン", phrase: "スクロールでカメラがパスを通る・モデルが回る", heavy: true, note: "スクロールでカメラが動き立体が分解・回転。" },
      { id: "drag-gallery", name: "無限ドラッグ3Dギャラリー", phrase: "全方向に投げて探索できる3Dギャラリー", heavy: true, note: "どこへでも投げて巡れる無限の面。" },
      { id: "tilt-3d", name: "インタラクティブ3Dロゴ / ティルト", phrase: "カーソルで3Dロゴが傾く・素材が変わる", pc: true, heavy: true, note: "カーソルに反応して立体が傾き光る。" },
    ],
  },
  {
    id: "physics",
    label: "物理系",
    en: "PHYSICS",
    blurb: "重力・衝突・慣性。画面に“質量”を持ち込む。",
    items: [
      { id: "physics-real", name: "リアル物理", phrase: "重力で落下・衝突・積層する物理", note: "物体が落ちて衝突し積み上がる（Matter.js）。" },
      { id: "inertia", name: "ドラッグ慣性", phrase: "投げて滑って減速する慣性", note: "投げた勢いで滑り、やがて止まる。" },
    ],
  },
  {
    id: "assets",
    label: "ベクター / モーション素材",
    en: "VECTOR · MOTION ASSETS",
    blurb: "デザイナー製のアニメを、軽量なまま再生する。",
    items: [
      { id: "rive", name: "Rive", phrase: "Riveの素材を軽量再生", note: "ステートマシン付きの軽量ベクターアニメ。" },
      { id: "lottie", name: "Lottie", phrase: "Lottie（After Effects製）を再生", note: "AE製アニメをJSONで軽量に再生。" },
      { id: "svg-morph", name: "SVGモーフィング", phrase: "図形AをBにモーフィング", note: "図形が別の図形へ滑らかに変形（MorphSVG）。" },
      { id: "text-path", name: "テキストオンパス", phrase: "文字を曲線に沿わせる", note: "テキストが曲線に沿って流れる。" },
    ],
  },
  {
    id: "advtrans",
    label: "高度なトランジション / タイポ",
    en: "ADVANCED TRANSITIONS · TYPE",
    blurb: "ページとページ、状態と状態の“間”を仕立てる。",
    items: [
      { id: "flip", name: "FLIP / 共有要素トランジション", phrase: "1枚をFLIPで全画面に開く", note: "サムネがヌルッと全画面へ繋がって開く。" },
      { id: "view-transition", name: "View Transitions API", phrase: "View Transitions APIで滑らかに遷移", note: "ブラウザ標準で状態間を滑らかに繋ぐ。" },
      { id: "variable-font", name: "可変フォントアニメ", phrase: "スクロールで太さ・字幅を変える", note: "可変フォントの軸をスクロールで動かす。" },
      { id: "audio-react", name: "オーディオ反応", phrase: "音に反応してビジュアルが動く", pc: true, note: "音量・周波数にバーや図形が反応する。" },
    ],
  },
];

export const PRO_TOTAL = PRO_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

/** これらを実現するツール（情報のみ・実演なし） */
export interface ToolInfo {
  name: string;
  detail: string;
}
export const TOOLS: { group: string; items: ToolInfo[] }[] = [
  {
    group: "アニメーション",
    items: [
      { name: "GSAP", detail: "ScrollTrigger / SplitText / Flip / Draggable / MorphSVG。Web演出の定番エンジン。" },
      { name: "Lenis", detail: "慣性のあるスムーススクロール。ScrollTriggerと相性◎。" },
      { name: "Theatre.js", detail: "タイムライン型のモーション編集・調整ツール。" },
    ],
  },
  {
    group: "3D / WebGL",
    items: [
      { name: "Three.js", detail: "WebGL3Dの標準ライブラリ。" },
      { name: "React Three Fiber", detail: "ReactでThree.jsを宣言的に書く。" },
      { name: "OGL", detail: "軽量WebGL。シェーダー主体の表現に。" },
    ],
  },
  {
    group: "物理",
    items: [
      { name: "Matter.js", detail: "2D剛体物理。落下・衝突・積層。" },
      { name: "Rapier", detail: "Rust製の高速2D/3D物理（WASM）。" },
      { name: "Cannon.js", detail: "3D物理エンジン（軽量・定番）。" },
    ],
  },
  {
    group: "ベクター素材",
    items: [
      { name: "Rive", detail: "ステートマシン付きの軽量インタラクティブアニメ。" },
      { name: "Lottie", detail: "After Effects製アニメをJSONで再生。" },
    ],
  },
];
