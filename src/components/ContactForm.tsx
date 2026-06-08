"use client";

import { useState } from "react";

// Web3Forms のアクセスキー（公開しても安全な公開キー）。
// 取得：https://web3forms.com/ で abejin0515@gmail.com を入力 → 届いたキーをここに貼る。
const ACCESS_KEY = "a37fece3-3835-4809-bc77-a2455a4826a2";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-paper/20 bg-paper/5 px-4 py-3 text-paper placeholder-paper/40 outline-none transition-colors focus:border-brand-300";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "【Archeon】サイトからの制作相談");
    data.append("from_name", "Archeon サイト");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 max-w-xl rounded-2xl border border-paper/20 bg-paper/5 px-6 py-8">
        <p className="font-display text-xl text-paper">送信しました。ありがとうございます。</p>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          内容を確認のうえ、できるだけ早くお返事します。返信は abejin0515@gmail.com から届きます（念のため迷惑メールフォルダもご確認ください）。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid max-w-xl gap-4">
      {/* スパム対策（人間には見えないチェック） */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-paper/70">お名前</span>
          <input name="name" type="text" autoComplete="name" placeholder="山田 太郎" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-paper/70">店名・会社名（任意）</span>
          <input name="company" type="text" autoComplete="organization" placeholder="〇〇整体院" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-semibold text-paper/70">
          メールアドレス <span className="text-accent-500">＊必須</span>
        </span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
      </label>

      <label className="block">
        <span className="text-xs font-semibold text-paper/70">
          ご相談内容 <span className="text-accent-500">＊必須</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="やりたいこと・困っていることを、そのままお書きください。（まだ何も決まっていなくて大丈夫です）"
          className={inputClass}
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-accent-500">
          送信できませんでした。お手数ですが{" "}
          <a className="underline" href="mailto:abejin0515@gmail.com?subject=Archeon%20制作のご相談">
            abejin0515@gmail.com
          </a>{" "}
          まで直接ご連絡ください。
        </p>
      )}

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-brand-100 disabled:opacity-60"
        >
          {status === "sending" ? "送信中…" : "この内容で相談する"}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <a
          href="mailto:abejin0515@gmail.com?subject=Archeon%20制作のご相談"
          className="text-xs text-paper/55 underline-offset-2 hover:text-paper/85 hover:underline"
        >
          メールソフトで送る場合はこちら
        </a>
      </div>
    </form>
  );
}
