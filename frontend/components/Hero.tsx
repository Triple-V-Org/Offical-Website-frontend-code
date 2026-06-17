'use client';

/**
 * Middle body overlay — positioned to match the example composite exactly:
 *   · Headline anchored to the left edge (~3.2vw), vertically centered at ~46%
 *   · Chrome Web Store badge + caption anchored to the right edge (~4vw),
 *     vertically centered at ~46%
 *
 * Desktop uses absolute, edge-anchored placement (like the 3840px mock);
 * mobile falls back to a clean stacked, centered layout.
 *
 * Local gradients live here (not on the fixed video) so the first screen never
 * shows a bottom black fade — only a soft left/top wash for text legibility.
 */
export default function Hero() {
  const badge = (
    <a
      href="https://chromewebstore.google.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition hover:opacity-90"
      aria-label="Available in the Chrome Web Store"
    >
      <img
        src="/img/chrome-web-store.png"
        alt="Available in the Chrome Web Store"
        className="h-[clamp(48px,4.6vw,68px)] w-auto rounded-md bg-white/95 shadow-md"
        draggable={false}
      />
    </a>
  );

  const caption = (
    <p className="text-[clamp(12px,1.05vw,15px)] font-medium leading-snug text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]">
      Connect with 150,000+ recruiters
      <br />
      currently hiring
    </p>
  );

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Legibility washes — left (headline) and top (header). No bottom fade. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(100deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0) 66%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.38), rgba(0,0,0,0))',
        }}
      />
      {/* Bottom fade — merges the video into the dark footer, edge to edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32vh]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,16,12,0) 0%, rgba(20,16,12,0.55) 55%, #14100c 100%)',
        }}
      />

      {/* ── Desktop: headline + badge in one row, bottom-aligned ── */}
      <div className="absolute inset-x-0 top-[46%] hidden -translate-y-1/2 items-end justify-between pl-[1.6vw] pr-[0.6vw] md:flex">
        <h1 className="font-display text-[clamp(2.1rem,4.1vw,3.7rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
          Build a network to
          <br />
          land your next job
        </h1>

        <div className="flex translate-y-[0.6vw] flex-col items-end gap-2.5 text-right">
          {badge}
          {caption}
        </div>
      </div>

      {/* ── Mobile: stacked, centered ── */}
      <div className="flex min-h-[100svh] flex-col justify-center gap-10 px-6 md:hidden">
        <h1 className="font-display text-[clamp(2.4rem,9vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
          Build a network to land your next job
        </h1>
        <div className="flex flex-col items-start gap-2.5">
          {badge}
          <p className="text-sm font-medium leading-snug text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]">
            Connect with 150,000+ recruiters currently hiring
          </p>
        </div>
      </div>
    </section>
  );
}
