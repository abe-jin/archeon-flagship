export interface Work {
  id: string;
  title: string;
  category: string;
  /** 事実ベースの一言。誇張・最上級は使わない。 */
  blurb: string;
  stack: string[];
  thumbnail: string;
  url: string;
  /** デモ・架空案件である旨の注記（あれば表示） */
  note?: string;
}

/**
 * 制作実績。すべて事実のみ。
 * デモ／架空案件はその旨を note に明記する（景表法配慮）。
 */
export const works: Work[] = [
  {
    id: "fortia-gym-lp",
    title: "パーソナルジム LP",
    category: "ランディングページ",
    blurb:
      "PHP でフォームのサーバー側バリデーション・CSRF 対策・メール送信まで実装。FAQ アコーディオンやスクロール演出にも対応。",
    stack: ["HTML5", "Sass", "JavaScript", "PHP"],
    thumbnail: "/works/fortia-gym-lp.png",
    url: "https://php-lp-demo.vercel.app",
    note: "デモ制作",
  },
  // 一時退避（2026-06-06）: archeon-rice-demo は Deployment Protection 解除待ちで未公開（404）。
  // 公開（200）確認後にこのエントリを復帰し、cap-corporate / cap-cms / cap-quality の
  // proofWorkIds に "rice-shop-corporate" を戻す。壊れリンクを出さないための暫定措置。
  // {
  //   id: "rice-shop-corporate",
  //   title: "食品EC コーポレートサイト",
  //   category: "コーポレートサイト",
  //   blurb:
  //     "トップ・商品・事業内容・会社案内・ブログ・お問い合わせの複数ページ構成。EC 導線とブログ、SEO 対応まで一括で。",
  //   stack: ["Next.js", "React", "Tailwind CSS"],
  //   thumbnail: "/works/rice-shop-corporate.png",
  //   url: "https://archeon-rice-demo.vercel.app",
  //   note: "デモ制作（架空・伏字）",
  // },
  {
    id: "wp-corporate-demo",
    title: "コーポレートサイト（WordPress）",
    category: "コーポレートサイト",
    blurb:
      "WordPress オリジナルテーマを 5 ページ構成でフルスクラッチ。固定ページテンプレート・メニュー・問い合わせフォームまで対応。",
    stack: ["WordPress", "PHP", "HTML5", "CSS"],
    thumbnail: "/works/wp-corporate-demo.png",
    url: "https://wp-corporate-demo.vercel.app",
    note: "デモ制作（架空・伏字）",
  },
  {
    id: "premium-brand",
    title: "高級日本茶ブランドサイト",
    category: "ブランドサイト",
    blurb:
      "和の高級感を、明朝タイポ・縦組み見出し・余白で表現。フリー素材の写真を全セクションに配置し、スクロール演出・完全レスポンシブまで対応。",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    thumbnail: "/works/premium-brand.png",
    url: "https://premium-brand-demo.vercel.app",
    note: "デモ制作（架空・伏字）",
  },
  {
    id: "clinic-demo",
    title: "歯科クリニックサイト",
    category: "クリニックサイト",
    blurb:
      "清潔感と安心感を軸にした医院サイト。診療案内・院内設備・FAQ・アクセスまでの構成で、医療広告ガイドラインに配慮した表現に対応。",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    thumbnail: "/works/clinic-demo.png",
    url: "https://clinic-demo-beta.vercel.app",
    note: "デモ制作（架空・伏字）",
  },
  {
    id: "toinavi",
    title: "ToiNavi（トイレ検索アプリ）",
    category: "Webアプリ",
    blurb:
      "位置情報から近いトイレを距離順に表示するWebアプリ。地図表示・設備や評価の確認・キーワード検索まで、一画面で完結する設計。",
    stack: ["Next.js", "React", "TypeScript", "地図API"],
    thumbnail: "/works/toilet-finder.png",
    url: "https://toilet-finder-lovat.vercel.app",
  },
  {
    id: "cosmetics-gekka",
    title: "高級スキンケアブランドサイト",
    category: "ブランドサイト",
    blurb:
      "月光をテーマにした化粧品ブランドサイト。明朝の縦組みタイポと余白で上質感を表現し、Lenis慣性スクロール・フィルムグレイン・スクロール進捗などの演出を実装。製品・成分・使い方・ギフトまでを1ページで構成し、JS無効でも本文が読め、prefers-reduced-motion・薬機法（化粧品の効能効果の範囲）に配慮した表現に対応。",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lenis"],
    thumbnail: "/works/cosmetics-demo.png",
    url: "https://cosmetics-demo-gamma.vercel.app",
    note: "デモ制作（架空・伏字）",
  },
  {
    id: "lithos",
    title: "LITHOS（キネティックタイポ実験）",
    category: "インタラクティブ・タイポグラフィ",
    blurb:
      "ブランドマニフェストを題材にしたキネティックタイポグラフィの実験。GSAP ScrollTrigger でスクロールに合わせて巨大な文字をピン留め・スケールさせ、ScrambleText とマスクで文字が現像される演出を実装。",
    stack: ["Next.js", "React", "TypeScript", "GSAP"],
    thumbnail: "/works/lithos.png",
    url: "https://archeon-lab.vercel.app/lithos",
    note: "自社技術デモ（ラボ・架空）",
  },
  {
    id: "reveal",
    title: "REVEAL（時計機構のシネマティック分解ツアー）",
    category: "3D・インタラクティブ",
    blurb:
      "機械式時計のムーブメントを手続き的にコード生成し、縦スクロールを「映写機のハンドル」に見立てた三幕構成のシネマティック・ツアー。スクロールに連れて対象以外の部品が放射状に「はけて」主役にカメラが寄り、各部品の解説がフェードインする。カメラは毎フレームの指数lerp追従で逆スクロールにも対応し、prefers-reduced-motion では静的な解説にフォールバック。",
    stack: ["Next.js", "React Three Fiber", "Three.js", "WebGL", "TypeScript"],
    thumbnail: "/works/movement.png",
    url: "https://archeon-lab.vercel.app/reveal",
    note: "自社技術デモ（ラボ・架空／3DはCG）",
  },
  {
    id: "objet",
    title: "OBJET（自前物理3D）",
    category: "3D・インタラクティブ",
    blurb:
      "ガラス・金属・粘土のオブジェを掴んで放れる3Dプレイグラウンド。物理エンジンを使わず、速度積分・反発・相互衝突・投擲を自前の軽量物理で実装。React Three Fiber／Three.js に N8AO・SMAA・Bloom を適用。",
    stack: ["Next.js", "React Three Fiber", "Three.js", "WebGL", "TypeScript"],
    thumbnail: "/works/objet.png",
    url: "https://archeon-lab.vercel.app/objet",
    note: "自社技術デモ（ラボ・架空／3DはCG）",
  },
  {
    id: "aurum",
    title: "高級ジュエリーブランドサイト",
    category: "ブランドサイト",
    blurb:
      "「光を、纏う。」をコンセプトにしたダーク・シネマティックなジュエリーサイト。大型セリフのキネティックタイポ・金の光スイープ・Lenis慣性スクロールを実装。表示速度とアクセシビリティに配慮した設計です。",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Lenis"],
    thumbnail: "/works/aurum.png",
    url: "https://aurum-demo-liart.vercel.app",
    note: "デモ制作（架空・伏字）",
  },
];
