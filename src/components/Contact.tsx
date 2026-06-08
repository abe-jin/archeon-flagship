import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink px-8 py-16 sm:px-16 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-brand-500/40 to-accent-500/30 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-700/30 blur-3xl" />

            <div className="relative max-w-2xl">
              <span className="text-xs font-bold tracking-[0.22em] text-brand-300">CONTACT</span>
              <h2 className="mt-4 font-display text-4xl text-paper sm:text-5xl">
                まずは、
                <br />
                一通のメールから。
              </h2>
              <p className="mt-6 text-base leading-relaxed text-paper/70">
                「まだ何も決まっていない」で大丈夫です。やりたいことを一言いただければ、内容を確認のうえ返信します。
                話を聞いて、目的と予算に合うものを一緒に考えます。相談に費用はかかりません。
                重いものを動かす支点を、ここから一緒に置きましょう。
              </p>

              <ContactForm />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="https://x.com/Archeon0000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper/60"
                >
                  X（旧Twitter）でつながる
                </a>
              </div>

              <p className="mt-8 text-xs text-paper/45">
                ご連絡先：abejin0515@gmail.com ／ 内容を確認のうえ、できるだけ早くお返事します。
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
