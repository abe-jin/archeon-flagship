const NAV = [
  { href: "#works", label: "実績" },
  { href: "#capabilities", label: "技術" },
  { href: "#services", label: "できること" },
  { href: "#process", label: "進め方" },
  { href: "#pricing", label: "料金" },
  { href: "#faq", label: "よくある質問" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" aria-hidden="true">
                  <path d="M3 16 L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 14 L9 20 H15 Z" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-lg tracking-tight text-ink">Archeon</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              あなたのビジネスの支点に。Web制作・アプリ開発を一貫して手がける制作スタジオ（屋号）です。
              日本全国オンライン対応。
            </p>
            <a
              href="mailto:abejin0515@gmail.com"
              className="mt-4 inline-block text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              abejin0515@gmail.com
            </a>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-ink-soft transition-colors hover:text-brand-700">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">© 2026 Archeon（アーキオン）. All rights reserved.</p>
          <p className="text-xs text-ink-muted">個人事業（屋号 Archeon）として運営しています。</p>
        </div>
      </div>
    </footer>
  );
}
