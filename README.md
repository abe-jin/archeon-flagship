# Archeon — 自社フラッグシップサイト

個人事業（屋号 Archeon）の制作スタジオ・サイト。受注直結（信頼感・技術力・説得力）を目的とした最上位の自社サイト。
Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + React Three Fiber / Three.js + GSAP + Lenis。

## デザイン思想

- 編集的で信頼できる基盤 ×「ここぞ」の技術的見せ場は1つ（one-wow）。奇抜さより商談で勝つことを優先。
- ヒーロー **THE FULCRUM（支点の天秤）**：石灰岩の三角支点に真鍮の梁が一点で乗り、左に重い御影石（顧客の課題）、右に小さなティールの分銅（Archeon）。スクロールという「小さな入力」でてこ比が効き、均衡へ到達する＝ブランド核（アルキメデスのてこ）を物理で実演。
- 温かみのある紙/石灰岩（paper #faf9f6 / ink #14181c）の地に、シアン/ティール（#06b6d4 / #14b8a6）を抑制的アクセント。

## 堅牢性（必達要件）

- **二層フォールバック**：SSR に静的SVGの均衡ポスター（LCP対象＝テキスト見出し）。動きOK×WebGL対応時のみ Canvas を後乗せ。`prefers-reduced-motion` / JS無効 / 非WebGL でも本文・CTA・連絡先が完全成立。
- CLS=0（sticky ヒーロー＋SSRポスター）、可視時のみ描画（IntersectionObserver + visibilitychange）。
- 件数は `works.length` から動的算出（捏造防止）。No.1・最上級・根拠なき数値は不使用（景表法配慮）。拠点都市は未明記（「日本全国オンライン対応」のみ）。料金は無料見積もり方式（金額非表示）。

## 構成

ヒーロー → 対応領域 → 実績（3D先頭・タブ絞り込み）→ 技術の幅（6能力×実在実績リンク）→ できること → 進め方 → 選ばれる理由 → 料金 → FAQ → 相談（mailto）→ フッター

## 開発・確認（Richard が実行）

```powershell
npm install
npm run build
npx next start -p 3100   # ローカル本番確認: http://localhost:3100
```

## 公開（会長承認後のみ）

対外公開は事業判断のため会長決裁が必要。承認後：

```powershell
npx vercel --prod --yes   # 新規プロジェクト archeon-flagship。既存LPには触れない
```

公開後、性能は GPU有効Lighthouse もしくは pagespeed.web.dev で実測（ヘッドレス --disable-gpu は過小評価のため不可）。
本番ドメインは `src/lib/site.ts` の `SITE_URL`（環境変数 `NEXT_PUBLIC_SITE_URL` で上書き可）。

## 関連

- 制作報告: `my-company/報告書/2026-06-05-archeon-flagship-build.md`
- 既存の抑制的静的版: `archeon-v2`（安全なフォールバックとして温存）
