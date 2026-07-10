'use client';

import { useState } from 'react';
import Link from 'next/link';
import SignupModal from '@/components/SignupModal';
import { EXTENSION_LIVE } from '@/lib/config';

export default function SiteHeader({
  overlay = false,
  tone = 'light',
  showHowItWorks = true,
}: {
  overlay?: boolean;
  tone?: 'light' | 'dark';
  showHowItWorks?: boolean;
}) {
  const [signupOpen, setSignupOpen] = useState(false);
  const dark = tone === 'dark';

  return (
    <>
      <header
        className={`z-30 flex items-center justify-between px-[3.2vw] py-5 sm:py-7 ${
          overlay ? 'absolute inset-x-0 top-0' : 'relative'
        }`}
      >
        <Link href="/" aria-label="Figwork — home" className="inline-flex">
          <img
            src="/img/figwork-mark.png"
            alt="Figwork"
            className={`h-8 w-auto select-none sm:h-9 ${dark ? '' : 'logo-white'}`}
            draggable={false}
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {showHowItWorks && (
            <Link
              href="/how-it-works"
              className={`shine-ring rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${
                dark
                  ? 'border-slate/25 text-slate hover:bg-slate/10'
                  : 'border-white/25 text-white hover:bg-white/10'
              }`}
            >
              How it works
            </Link>
          )}

          {EXTENSION_LIVE && (
            <button
              onClick={() => setSignupOpen(true)}
              className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition active:scale-[0.98] ${
                dark
                  ? 'bg-slate text-white hover:bg-slate/90'
                  : 'bg-white text-slate hover:bg-white/90'
              }`}
            >
              Sign up
            </button>
          )}
        </div>
      </header>

      {EXTENSION_LIVE && (
        <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      )}
    </>
  );
}
