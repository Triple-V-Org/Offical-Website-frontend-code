'use client';

import { useState } from 'react';
import Link from 'next/link';
import SignupModal from '@/components/SignupModal';
import { EXTENSION_LIVE } from '@/lib/config';

/**
 * Shared top bar.
 *  - `overlay` floats it transparently over the hero video (home page).
 *  - Otherwise it sits in normal flow on the dark pages (about / legal).
 *
 * The "Sign up" button (and its newsletter modal) only appear once the
 * extension is live; in waitlist mode the header is just the logo.
 */
export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [signupOpen, setSignupOpen] = useState(false);

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
            className="logo-white h-8 w-auto select-none sm:h-9"
            draggable={false}
          />
        </Link>

        {EXTENSION_LIVE && (
          <button
            onClick={() => setSignupOpen(true)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate shadow-sm transition hover:bg-white/90 active:scale-[0.98]"
          >
            Sign up
          </button>
        )}
      </header>

      {EXTENSION_LIVE && (
        <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      )}
    </>
  );
}
