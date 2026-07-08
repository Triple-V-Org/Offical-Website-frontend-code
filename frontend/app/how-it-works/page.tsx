import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import HowItWorksVideo from '@/components/HowItWorksVideo';

/**
 * "How it works" — a 1:1 build of the designed demo page.
 *   1. "Figwork in action" — looping product video framed on a warm desk photo,
 *      with the three torn-paper annotation stickers.
 *   2. "How it works" — three staggered numbered steps over the dark scene.
 * All artwork is the supplied individual assets; only the copy is live text.
 */

const STEPS = [
  {
    img: '/img/howit/step-1.png',
    // Static (non-interpolated) classes so Tailwind keeps them in the build.
    rowClass: 'justify-center lg:justify-start',
    textClass: 'mt-[-7%] lg:mt-[-14%] lg:pl-[30%]',
    title: 'We find the roles best suited to you...',
    body: 'Quickly review open jobs relevant to you based on your resume and background.',
  },
  {
    img: '/img/howit/step-2.png',
    rowClass: 'justify-center lg:justify-end',
    textClass: 'mt-[-7%] lg:mt-[-16%] lg:pl-[30%]',
    title:
      'And connect you with the right contacts based on your background. Then...',
    body: 'Recruiter, hiring manager, and team lead at company actively hiring.',
  },
  {
    img: '/img/howit/step-3.png',
    rowClass: 'justify-center lg:justify-start',
    textClass: 'mt-[-7%] lg:mt-[-16%] lg:pl-[13%]',
    title: 'Help you craft the best introduction email.',
    body: 'Use our personalized outreach message template-based experience and start connecting with the right people.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="relative bg-[#14100c]">
      <SiteHeader overlay tone="dark" showHowItWorks={false} />

      {/* ───────────────── Figwork in action ───────────────── */}
      <section className="relative overflow-hidden">
        <img
          src="/img/howit/action-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="relative mx-auto max-w-[1040px] px-6 pb-28 pt-28 sm:pt-32">
          <img
            src="/img/howit/action-header.png"
            alt="Figwork in action"
            className="mx-auto w-[clamp(230px,36vw,380px)] select-none"
            draggable={false}
          />

          {/* Video + torn-paper stickers */}
          <div className="relative mx-auto mt-14 w-full max-w-[880px]">
            <HowItWorksVideo />

            <img
              src="/img/howit/sticker-find.png"
              alt="Find jobs best tailored for you"
              className="absolute -left-[3%] -top-[10%] z-20 w-[31%] -rotate-6 select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
              draggable={false}
            />
            <img
              src="/img/howit/sticker-choose.png"
              alt="Choose who to reach out to"
              className="absolute -right-[2%] -top-[11%] z-20 w-[31%] rotate-[5deg] select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
              draggable={false}
            />
            <img
              src="/img/howit/sticker-send.png"
              alt="Send the perfect intro message"
              className="absolute -bottom-[9%] left-[39%] z-20 w-[33%] -rotate-3 select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* ───────────────── How it works ───────────────── */}
      <section className="relative overflow-hidden bg-[#14100c]">
        <img
          src="/img/howit/works-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* seams: top blends from the action photo, bottom into the footer */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#14100c] to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#14100c]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1120px] px-6 pb-24 pt-20 sm:pt-24">
          <img
            src="/img/howit/works-header.png"
            alt="How it works"
            className="mx-auto w-[clamp(210px,32vw,340px)] select-none"
            draggable={false}
          />

          <div className="mt-12 flex flex-col gap-6 sm:mt-16 lg:gap-6">
            {STEPS.map((step) => (
              <div key={step.img} className={`flex ${step.rowClass}`}>
                <div className="flex w-full max-w-[380px] flex-col items-center lg:max-w-[540px] lg:items-stretch">
                  <img
                    src={step.img}
                    alt=""
                    aria-hidden="true"
                    className="w-[82%] select-none lg:w-full"
                    draggable={false}
                  />
                  <div
                    className={`w-full px-2 text-center lg:px-0 lg:text-left ${step.textClass}`}
                  >
                    <h3 className="text-[clamp(18px,4.6vw,20px)] font-bold leading-snug tracking-[-0.01em] text-white">
                      {step.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[34ch] text-[clamp(13.5px,3.6vw,15px)] leading-relaxed text-white/55 lg:mx-0 lg:max-w-[32ch]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
