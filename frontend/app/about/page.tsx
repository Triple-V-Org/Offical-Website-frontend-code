'use client';

import { useState } from 'react';
import Link from 'next/link';
import SignupModal from '@/components/SignupModal';

export default function AboutPage() {
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

      {/* Manifesto — left aligned, elegant, no background hues */}
      <article className="px-6 pb-36 pt-20 sm:pt-28">
        <div className="mx-auto max-w-[660px]">
          <h1
            className="fade-up text-[clamp(2.4rem,5.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white"
            style={{ animationDelay: '40ms' }}
          >
            Hiring is broken.
          </h1>

          {/* Lead — larger intro */}
          <p
            className="fade-up mt-8 max-w-[44ch] text-[clamp(18px,1.7vw,21px)] leading-[1.7] text-paper/80"
            style={{ animationDelay: '140ms' }}
          >
            Job seekers send applications into systems that give them little
            visibility and even less access to the people making decisions.
            Recruiters jump between disconnected tools, crowded databases, and
            expensive agencies just to find the right person.
          </p>

          {/* Statement */}
          <div className="fade-up mt-16" style={{ animationDelay: '260ms' }}>
            <div className="mb-5 h-px w-10 bg-white/50" aria-hidden="true" />
            <p className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-semibold leading-snug tracking-[-0.02em] text-white">
              We believe hiring should be simpler.
            </p>
          </div>

          {/* Aside — indented, bordered */}
          <p
            className="fade-up mt-8 max-w-[50ch] border-l border-white/12 pl-6 text-[clamp(15px,1.3vw,17px)] leading-[1.85] text-paper/60"
            style={{ animationDelay: '360ms' }}
          >
            The right people should be able to find the right opportunities.
            Recruiters should be able to understand candidates beyond titles,
            keywords, and résumés. Good matches should lead to real conversations,
            not disappear inside an ATS system.
          </p>

          {/* Statement */}
          <div className="fade-up mt-16" style={{ animationDelay: '480ms' }}>
            <div className="mb-5 h-px w-10 bg-white/50" aria-hidden="true" />
            <p className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-semibold leading-snug tracking-[-0.02em] text-white">
              That is what we are building at Figwork.
            </p>
          </div>

          {/* Aside — indented, bordered */}
          <p
            className="fade-up mt-8 max-w-[50ch] border-l border-white/12 pl-6 text-[clamp(15px,1.3vw,17px)] leading-[1.85] text-paper/60"
            style={{ animationDelay: '580ms' }}
          >
            Our platform connects both sides of the hiring market through a model
            that can understand text, audio, and video and turn that information
            into useful hiring signals. Built by researchers from USC and CMU, it
            is designed to understand the context behind a person, a role, and why
            they may belong together.
          </p>

          {/* Closing */}
          <p
            className="fade-up mt-20 text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold leading-tight tracking-[-0.025em] text-white"
            style={{ animationDelay: '720ms' }}
          >
            We have much to build.
          </p>
        </div>
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
