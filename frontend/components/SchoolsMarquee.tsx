'use client';

const SCHOOLS = [
  { src: '/img/schools/usc.png', alt: 'USC' },
  { src: '/img/schools/ucsd.png', alt: 'UC San Diego' },
  { src: '/img/schools/cmu.png', alt: 'Carnegie Mellon University' },
];

/**
 * Faded, looping logo strip — "Built by researchers from" followed by the
 * school logos scrolling past with soft edges. Logos are rendered as muted
 * monochrome so they sit quietly over the video.
 */
export default function SchoolsMarquee({ className = '' }: { className?: string }) {
  // Duplicate the set so the -50% loop is seamless.
  const items = [...SCHOOLS, ...SCHOOLS];

  return (
    <div className={`w-full ${className}`}>
      <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
        Built by researchers from
      </p>
      <div className="schools-mask overflow-hidden">
        <ul className="animate-marquee flex w-max items-center gap-10">
          {items.map((s, i) => (
            <li key={i} className="shrink-0">
              <img
                src={s.src}
                alt={i < SCHOOLS.length ? s.alt : ''}
                aria-hidden={i >= SCHOOLS.length}
                className="h-7 w-auto select-none opacity-55"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
