"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#works", label: "実績" },
  { href: "#capabilities", label: "技術" },
  { href: "/catalog", label: "動きの辞書" },
  { href: "#services", label: "できること" },
  { href: "#process", label: "進め方" },
  { href: "#pricing", label: "料金" },
  { href: "#faq", label: "よくある質問" },
];

const MAIL = "mailto:abejin0515@gmail.com?subject=" + encodeURIComponent("Archeon 制作のご相談");

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Archeon ホーム">
          <LogoMark />
          <span className="font-display text-lg tracking-tight text-ink">Archeon</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-700"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href={MAIL}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-brand-700"
          >
            無料で相談する
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>

      <div
        inert={!open}
        className={`overflow-hidden border-t border-line bg-paper/95 backdrop-blur-md lg:hidden transition-[max-height] duration-300 ${
          open ? "max-h-[28rem]" : "max-h-0 border-t-transparent"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-paper-2 hover:text-brand-700"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={MAIL}
              onClick={() => setOpen(false)}
              className="block rounded-full bg-ink px-5 py-3 text-center text-base font-semibold text-paper"
            >
              無料で相談する
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 shadow-sm">
      {/* 支点に乗る梁 — アルキメデスのてこ */}
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" aria-hidden="true">
        <path d="M3 16 L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 14 L9 20 H15 Z" fill="currentColor" />
      </svg>
    </span>
  );
}
