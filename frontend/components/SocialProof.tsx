'use client';

/**
 * Quiet social-proof line — active-user count, no stars.
 * Deliberately subtle so it whispers under the CTA.
 */
export default function SocialProof({ className = '' }: { className?: string }) {
  return (
    <p
      className={`whitespace-nowrap text-[clamp(11px,0.9vw,12.5px)] font-normal tracking-[0.01em] text-white/45 ${className}`}
    >
      10,000+ are using Figwork
    </p>
  );
}
