import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SupportForm from '@/components/SupportForm';

export const metadata: Metadata = {
  title: 'Support — Figwork',
  description: 'Get in touch with the Figwork team.',
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#1a1512] text-paper">
      <SiteHeader />

      <article className="px-6 pb-36 pt-20 sm:pt-28">
        <div className="mx-auto max-w-[520px]">
          <h1
            className="fade-up text-center text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
            style={{ animationDelay: '40ms' }}
          >
            Get in touch
          </h1>

          <p
            className="fade-up mt-4 text-center text-[clamp(15px,1.5vw,17px)] leading-[1.7] text-paper/70"
            style={{ animationDelay: '140ms' }}
          >
            Have a question, feedback, or need help? Send us a message and
            we&apos;ll get back to you.
          </p>

          <div
            className="fade-up mt-10"
            style={{ animationDelay: '240ms' }}
          >
            <SupportForm />
          </div>

          <p
            className="fade-up mt-10 text-center text-sm text-paper/50"
            style={{ animationDelay: '340ms' }}
          >
            You can also reach us at{' '}
            <a
              href="mailto:support@figwork.ai"
              className="text-orange transition hover:text-orange-hover"
            >
              support@figwork.ai
            </a>
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
            <Link href="/about" className="transition hover:text-white">
              About Us
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
    </main>
  );
}
