'use client';

import { EXTENSION_LIVE, EXTENSION_URL } from '@/lib/config';
import WaitlistForm from '@/components/WaitlistForm';
import SchoolsMarquee from '@/components/SchoolsMarquee';

/**
 * Hero overlay over the looping video.
 *   · Left  — headline
 *   · Right — Chrome Web Store badge (extension live) OR email waitlist (pre-launch)
 *
 * Two-column on lg+ (edge-anchored like the mock); stacked + centeredish on
 * smaller screens. Local gradients keep white text legible; the bottom fade
 * merges the video into the footer.
 */
export default function Hero() {
  const caption = (
    <p className="text-[clamp(13px,1.05vw,15px)] font-medium leading-snug text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]">
      Connect with 150,000+ recruiters currently hiring
    </p>
  );

  const badge = (
    <a
      href={EXTENSION_URL || '#'}
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

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Legibility washes — left (headline) and top (header). */}
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
      {/* Bottom fade — merges the video into the dark footer, edge to edge. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32vh]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,16,12,0) 0%, rgba(20,16,12,0.55) 55%, #14100c 100%)',
        }}
      />

      {/* ── Desktop (lg+): headline left (sized to touch the laptop), CTA right ── */}
      <div className="absolute inset-x-0 top-[46%] hidden -translate-y-1/2 items-end justify-between gap-10 pl-[3.5vw] pr-[1.5vw] lg:flex">
        <h1 className="font-sf text-[clamp(2.2rem,3.4vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
          Build a network to
          <br />
          land your next job
        </h1>

        <div className="flex w-[min(34vw,380px)] translate-y-[0.6vw] flex-col items-end gap-3 text-right">
          {EXTENSION_LIVE ? badge : <WaitlistForm align="end" className="ml-auto" />}
          {caption}
        </div>
      </div>

      {/* ── Mobile / tablet (< lg): title up top (left), CTA centered in the fade ── */}
      <div className="flex min-h-[100svh] flex-col px-6 lg:hidden">
        <h1 className="pt-28 font-sf text-[clamp(2rem,7.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
          Build a network to
          <br />
          land your next job
        </h1>

        {/* Email module above the marquee, centered to each other */}
        <div className="mt-auto flex flex-col items-center gap-6 pb-14">
          {EXTENSION_LIVE ? badge : <WaitlistForm align="start" />}
          <SchoolsMarquee />
        </div>
      </div>
    </section>
  );
}
