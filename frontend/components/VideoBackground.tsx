'use client';

import { useEffect, useRef } from 'react';

/**
 * Looping hero background video. It covers exactly the first viewport (100svh)
 * and is absolutely positioned, so it is framed like the example (no extra
 * zoom) and scrolls away with the page as the user scrolls to the footer.
 *
 * Reliability/quality notes:
 *  - Native muted autoplay + sources in markup = the most dependable path
 *    across browsers (muted autoplay is always permitted).
 *  - The poster paints instantly so there is never a black flash.
 *  - Sources are ordered for quality: the crisp 1440p MP4 first, with a WebM
 *    and a lighter 1080p MP4 as fallbacks. The grade keeps white text legible.
 */
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }
    // Nudge playback for browsers that don't honor the autoplay attribute.
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener('canplay', tryPlay, { once: true });
    return () => video.removeEventListener('canplay', tryPlay);
  }, []);

  return (
    <div className="absolute left-0 top-0 z-0 h-[100svh] w-full overflow-hidden bg-[#1a1512]">
      <video
        ref={videoRef}
        className="bg-video h-full w-full object-cover object-center"
        poster="/video/poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        // Color grade: gently darken + warm so the white headline pops while
        // the scene still reads. No bottom fade here (kept for the footer).
        style={{ filter: 'brightness(0.66) contrast(1.05) saturate(1.06)' }}
      >
        <source src="/video/figwork-hero-1440.mp4" type="video/mp4" />
        <source src="/video/figwork-hero-1080.webm" type="video/webm" />
        <source src="/video/figwork-hero-1080.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
