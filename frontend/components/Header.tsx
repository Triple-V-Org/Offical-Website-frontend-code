'use client';

export default function Header({ onSignup }: { onSignup: () => void }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[3.2vw] py-5 sm:py-7">
      <a href="/" aria-label="Figwork — home" className="inline-flex">
        <img
          src="/img/figwork-mark.png"
          alt="Figwork"
          className="logo-white h-8 w-auto select-none sm:h-9"
          draggable={false}
        />
      </a>

      <button
        onClick={onSignup}
        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate shadow-sm transition hover:bg-white/90 active:scale-[0.98]"
      >
        Sign up
      </button>
    </header>
  );
}
