'use client';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#14100c]">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-10 px-6 pb-12 pt-16 sm:px-10 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <img
            src="/img/figwork-wordmark.png"
            alt="Figwork"
            className="logo-white h-7 w-auto select-none"
            draggable={false}
          />
          <p className="text-[13px] font-medium tracking-wide text-white/40">
            The World&apos;s First AI Headhunter.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-sm font-medium text-white/85">
          <a href="/about" className="transition hover:text-white">
            About Us
          </a>
          <a href="/support" className="transition hover:text-white">
            Support
          </a>
          <a href="/privacy" className="transition hover:text-white">
            Privacy
          </a>
          <a href="/terms" className="transition hover:text-white">
            Terms of Use
          </a>
        </nav>

        <div className="flex items-center justify-center gap-4 md:justify-end">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/85 transition hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/85 transition hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 9h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3v-1.5c0-.28.22-.5.5-.5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
