/**
 * 技術力（できることの幅）。各能力は必ず実在する works.ts の id で裏付ける。
 * 主張だけを並べず、proofWorkIds で実物（公開URL）へ辿れるようにする。
 * 数値は AURUM のデスクトップ実測値のみ。No.1・最上級・根拠なき数値は使わない（景表法配慮）。
 */
export interface Capability {
  id: string;
  title: string;
  desc: string;
  /** 裏付ける実績の works.ts id（同一実績が複数能力を兼ねてよい＝幅の証明） */
  proofWorkIds: string[];
  /** 中心となる使用技術（事実のみ） */
  tech: string[];
}

export const capabilities: Capability[] = [
  {
    id: "cap-3d",
    title: "3D・インタラクティブ（WebGL / React Three Fiber）",
    desc: "Archeon の技術的な強みです。機械式時計のムーブメント（約45点）や物理オブジェを、画像ではなくコードで3D生成し、スクロールに連動して回転・分解・操作できる没入表現まで、一貫して対応します。",
    proofWorkIds: ["proofs", "reveal", "objet"],
    tech: ["Three.js", "React Three Fiber", "WebGL", "GLSL"],
  },
  {
    id: "cap-motion",
    title: "モーション・キネティックタイポグラフィ",
    desc: "スクロールやマウスに反応する動きを、意味のある演出として設計します。巨大文字のピン留め・スケール、文字が現像されるマスク表現、慣性スクロール、光のスイープなど、GSAP と Lenis を使った緻密なモーション設計が可能です。",
    proofWorkIds: ["aurum", "reveal"],
    tech: ["GSAP", "ScrollTrigger", "Lenis"],
  },
  {
    id: "cap-corporate",
    title: "コーポレート / LP / ブランドサイト",
    desc: "事業紹介サイト、ランディングページ、ブランドサイトまで。食品EC・歯科・パーソナルジム・日本茶・化粧品・ジュエリーなど、業種ごとに必要なトーンと情報設計を作り分けてきました。複数ページ構成・お問い合わせ導線・完全レスポンシブまで一貫対応します。",
    proofWorkIds: ["clinic-demo", "premium-brand", "cosmetics-gekka", "aurum", "wp-corporate-demo", "fortia-gym-lp"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "cap-app",
    title: "Webアプリ・スマホアプリ化",
    desc: "見せるだけのサイトに留まりません。位置情報・地図・検索・データベース連携を備えた Web アプリを設計し、同じコードを土台にスマホアプリ化（iOS / Android）やストア申請まで視野に入れた構成を組めます。",
    proofWorkIds: ["toinavi"],
    tech: ["Next.js", "TypeScript", "地図API", "Supabase"],
  },
  {
    id: "cap-cms",
    title: "CMS / WordPress / サーバーサイド",
    desc: "静的サイトだけでなく、更新しやすい仕組みも作れます。WordPress オリジナルテーマのフルスクラッチ、PHP でのフォームのサーバー側バリデーション・CSRF 対策・メール送信まで実装した実績があります。",
    proofWorkIds: ["wp-corporate-demo", "fortia-gym-lp"],
    tech: ["WordPress", "PHP", "HTML5", "CSS"],
  },
  {
    id: "cap-quality",
    title: "高速・SEO・アクセシビリティ",
    desc: "見た目だけでなく、速さと品質まで。表示速度（Core Web Vitals）とアクセシビリティに配慮して設計します。3D サイトも本文は通常 HTML で JS 無効・低スペック環境でも読め、prefers-reduced-motion（動きを減らす設定）に対応する堅実な作りです。SEO / OGP 設定も標準で対応します。",
    proofWorkIds: ["aurum", "wp-corporate-demo"],
    tech: ["Core Web Vitals", "Lighthouse", "WAI-ARIA"],
  },
];

export const techStrip: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Three.js",
  "React Three Fiber",
  "GSAP",
  "Lenis",
  "WordPress",
  "PHP",
];
