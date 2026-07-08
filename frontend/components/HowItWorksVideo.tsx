'use client';

import { useRef, useState } from 'react';

/**
 * Looping product demo inside the designed video frame.
 *  - Autoplays muted (the only reliably-permitted autoplay), loops forever.
 *  - A speaker toggle lets the visitor unmute/mute the sound.
 *  - The frame PNG overlays the video (pointer-events-none so the toggle stays
 *    clickable). Sources are ordered so desktops get 1080p and phones the
 *    lighter 720p variants.
 */
export default function HowItWorksVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <div className="relative w-full" style={{ aspectRatio: '3207 / 1827' }}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full rounded-[clamp(8px,1vw,16px)] object-cover"
        poster="/video/howit-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/video/howit-1080.mp4"
          type="video/mp4"
          media="(min-width: 900px)"
        />
        <source src="/video/howit-720.webm" type="video/webm" />
        <source src="/video/howit-720.mp4" type="video/mp4" />
      </video>

      {/* Designed frame (border + soft glow) sits on top of the video. */}
      <img
        src="/img/howit/video-frame.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
      />

      {/* Sound toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
        className="absolute bottom-[4.5%] right-[3%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 sm:h-11 sm:w-11"
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 9v6h4l5 4V5L8 9H4z"
              fill="currentColor"
            />
            <path
              d="M16 9l5 6M21 9l-5 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path
              d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
