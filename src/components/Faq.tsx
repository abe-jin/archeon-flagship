"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { faqItems } from "@/data/faq";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">よくある質問</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            相談する前に気になりやすいことを、先にまとめました。ここにない疑問も、メールで気軽にどうぞ。
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="overflow-hidden rounded-2xl border border-line bg-paper">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-ink">{item.q}</span>
                    <span aria-hidden="true" className={`shrink-0 text-brand-600 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
