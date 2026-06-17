'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import SignupModal from '@/components/SignupModal';

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#1a1512] text-paper">
      {/* Top bar */}
      <header className="flex items-center justify-between px-[3.2vw] py-5 sm:py-7">
        <Link href="/" aria-label="Figwork — home" className="inline-flex">
          <img
            src="/img/figwork-mark.png"
            alt="Figwork"
            className="logo-white h-8 w-auto select-none sm:h-9"
            draggable={false}
          />
        </Link>
        <button
          onClick={() => setSignupOpen(true)}
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate shadow-sm transition hover:bg-white/90 active:scale-[0.98]"
        >
          Sign up
        </button>
      </header>

      {/* Content */}
      <article className="legal mx-auto max-w-[760px] px-6 pb-28 pt-10 sm:pt-16">
        <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
          {title}
        </h1>
        {updated && (
          <p className="mt-3 text-sm text-paper/50">Last updated: {updated}</p>
        )}
        <div className="mt-8">{children}</div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 px-[3.2vw] py-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link href="/" aria-label="Figwork — home">
            <img
              src="/img/figwork-wordmark.png"
              alt="Figwork"
              className="logo-white h-6 w-auto select-none"
              draggable={false}
            />
          </Link>
          <nav className="flex items-center gap-8 text-sm font-medium text-paper/75">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/about" className="transition hover:text-white">
              About Us
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Use
            </Link>
          </nav>
        </div>
      </footer>

      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </main>
  );
}
