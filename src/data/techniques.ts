// ============================================================
// Archeon 技術ラボ — モーション技術カタログ
// スクロール演出・テキスト・インタラクション・質感の全32種。
// 各技術に「指示で言う言葉」(phrase) を添える。これをコピーして
// 制作指示に貼れば、その演出を依頼できる、という発注辞書。
// ============================================================

export interface Technique {
  /** デモ登録キー（demos.tsx の DEMOS と一致） */
  id: string;
  /** 日本語名 */
  name: string;
  /** 指示で言う言葉（そのままコピーして発注に使う） */
  phrase: string;
  /** 一言の補足 */
  note?: string;
  /** PC向け（カーソル前提）演出 */
  pc?: boolean;
  /** 負荷が重い */
  heavy?: boolean;
}

export interface Category {
  id: string;
  label: string;
  /** セクションの英字ラベル */
  en: string;
  blurb: string;
  items: Technique[];
}

export const CATEGORIES: Category[] = [
  {
    id: "basic",
    label: "基本（導入）",
    en: "FOUNDATIONS",
    blurb: "どのサイトにも効く、最初の一手。",
    items: [
      { id: "fade", name: "フェードイン / スライドイン", phrase: "下からフェードイン", note: "要素が視界に入ったら下からふわっと出す。" },
      { id: "progress", name: "進捗バー", phrase: "スクロール進捗バー", note: "ページ上部に読み進み具合のバー。" },
      { id: "snap", name: "スクロールスナップ", phrase: "1画面ずつスナップ", note: "1セクション単位でピタッと吸着。" },
    ],
  },
  {
    id: "scrub",
    label: "スクロール連動（scrub系）",
    en: "SCROLL-SCRUBBED",
    blurb: "スクロール量＝アニメの再生位置。巻き戻しも自在。",
    items: [
      { id: "scrub", name: "スクロールスクラブ", phrase: "scrub: trueでスクロールに同期", note: "スクロールに完全同期して再生。" },
      { id: "pin", name: "ピン留め", phrase: "セクションをピン留め", note: "背景を固定して前景だけ進める。" },
      { id: "parallax", name: "パララックス", phrase: "層ごとに速度を変えてパララックス", note: "奥と手前で動く速度を変えて奥行き。" },
      { id: "scalerotate", name: "拡大・回転", phrase: "スクロールで拡大＋回転（scrub）", note: "スクロールに合わせて大きく・回す。" },
      { id: "horizontal", name: "横スクロール区間", phrase: "横スクロールのギャラリー", note: "縦スクロールが横移動に化ける。" },
      { id: "sequence", name: "画像コマ送り", phrase: "連番フレームをコマ送り", note: "連番画像をスクロールでパラパラ再生。" },
      { id: "svgpath", name: "SVGパス描画", phrase: "SVGの線をスクロールで描画", note: "線がスクロールに沿って描かれる。" },
      { id: "skew", name: "速度skew", phrase: "スクロール速度でskew", note: "速く動かすほど要素が傾く。" },
      { id: "bgcolor", name: "背景色変化", phrase: "スクロールで背景色を変える", note: "進むごとに背景が滑らかに変色。" },
      { id: "mask", name: "マスク / ワイプ", phrase: "画像をマスクで開く", note: "マスクが開いて画像が現れる。" },
      { id: "stack", name: "スティッキー積み重ね", phrase: "カードをsticky stackで重ねる", note: "カードが重なって積み上がる。" },
    ],
  },
  {
    id: "text",
    label: "テキスト演出",
    en: "KINETIC TYPE",
    blurb: "文字そのものを動かして、言葉に体温を持たせる。",
    items: [
      { id: "split", name: "1文字ずつ（split）", phrase: "見出しを1文字ずつstagger", note: "見出しを1字ずつ時間差で出す。" },
      { id: "typewriter", name: "タイプライター", phrase: "タイプライターで打つ", note: "1字ずつ打鍵するように表示。" },
      { id: "scramble", name: "スクランブル（解読）", phrase: "スクランブルから解読表示", note: "ランダム文字から正解へ収束。" },
      { id: "glitch", name: "グリッチ", phrase: "ロゴにグリッチ", note: "RGBずれ＋ノイズで電子的に乱れる。" },
      { id: "countup", name: "カウントアップ", phrase: "数字を0からカウントアップ", note: "実績数字を0から駆け上げる。" },
      { id: "rolling", name: "桁ローリング", phrase: "数字を桁ごとにローリング", note: "桁が回転するオドメーター。" },
      { id: "marquee", name: "マーキー", phrase: "無限マーキーの帯", note: "途切れず流れ続ける帯。" },
    ],
  },
  {
    id: "cursor",
    label: "カーソル / インタラクティブ",
    en: "POINTER PLAY",
    blurb: "手の動きに反応する。PCで効く“触れる”表現。",
    items: [
      { id: "magnetic", name: "マグネティックボタン", phrase: "ボタンをマグネティックに", pc: true, note: "近づくとボタンが吸い付く。" },
      { id: "cursor", name: "カスタムカーソル", phrase: "追従カーソル", pc: true, note: "独自カーソルが遅れて追従。" },
      { id: "hoverpreview", name: "ホバー画像プレビュー", phrase: "ホバーで画像プレビュー", pc: true, note: "項目に乗せると画像が出る。" },
      { id: "tilt", name: "ティルトカード", phrase: "ホバーで3Dティルト", pc: true, note: "カードが3D的に傾く。" },
      { id: "draginertia", name: "ドラッグ慣性スライダー", phrase: "慣性付きスライダー", note: "投げると慣性で滑り続ける。" },
      { id: "dotgrid", name: "反応ドットグリッド", phrase: "カーソルに反応するドット背景", pc: true, note: "カーソル周りのドットが避ける。" },
      { id: "gooey", name: "グーイ（融合ブロブ）", phrase: "グーイなブロブを追従", pc: true, note: "粘性のある塊が溶け合って追う。" },
    ],
  },
  {
    id: "load",
    label: "ロード / 遷移 / 質感",
    en: "LOAD · TRANSITION · TEXTURE",
    blurb: "最初の数秒と、ページの“肌触り”を仕立てる。",
    items: [
      { id: "loader", name: "イントロローダー", phrase: "ローダーからヒーローへの出現", note: "読込→主役へ滑らかに受け渡す。" },
      { id: "transition", name: "ページ遷移トランジション", phrase: "帯のトランジション", note: "帯が画面を覆って切り替える。" },
      { id: "particles", name: "パーティクル背景", phrase: "パーティクルの背景", heavy: true, note: "光の粒が漂う背景。" },
      { id: "grain", name: "アニメグレイン", phrase: "動くグレインノイズを薄く重ねる", note: "フィルム質感のノイズを微量に。" },
    ],
  },
];

export const TOTAL = CATEGORIES.reduce((n, c) => n + c.items.length, 0);
