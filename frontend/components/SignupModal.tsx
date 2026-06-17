'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function SignupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Reset to a fresh form shortly after closing.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus('idle');
      setMessage('');
      setEmail('');
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }
    setStatus('loading');
    setMessage('');

    // If no backend is configured yet, optimistically confirm so the
    // newsletter flow works in preview. Wire NEXT_PUBLIC_API_URL for real sends.
    if (!API_BASE) {
      setTimeout(() => {
        setStatus('ok');
        setEmail('');
      }, 600);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'website' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('ok');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Network error.');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to the Figwork newsletter"
    >
      <div className="modal-pop relative w-full max-w-[400px] overflow-hidden rounded-3xl border border-white/10 bg-[#1f1915] p-8 text-paper shadow-2xl">
        {/* Subtle warm top glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(60% 100% at 50% 0%, rgba(151,67,21,0.30), rgba(151,67,21,0) 75%)',
          }}
        />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-paper/45 transition hover:bg-white/10 hover:text-paper"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative">
          <img
            src="/img/figwork-mark.png"
            alt="Figwork"
            className="logo-white h-9 w-auto select-none"
            draggable={false}
          />

          {status === 'ok' ? (
            <>
              <h2 className="mt-6 text-[1.35rem] font-bold tracking-[-0.01em] text-white">
                You&apos;re in.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">
                Thanks for subscribing — we&apos;ll keep you posted on what&apos;s
                next.
              </p>
              <button
                onClick={onClose}
                className="mt-6 h-12 w-full rounded-xl bg-white text-[15px] font-semibold text-slate transition hover:bg-white/90"
              >
                Done
              </button>
            </>
          ) : (
            <>
              <h2 className="mt-6 text-[1.35rem] font-bold tracking-[-0.01em] text-white">
                Join the newsletter
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">
                Product updates and early access — straight to your inbox.
              </p>

              <form onSubmit={subscribe} noValidate className="mt-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="you@email.com"
                  aria-label="Email address"
                  autoFocus
                  className="h-12 w-full rounded-xl border border-white/12 bg-white/5 px-4 text-[15px] text-paper outline-none transition placeholder:text-paper/35 focus:border-orange/70 focus:ring-2 focus:ring-orange/25"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-3 h-12 w-full rounded-xl bg-orange text-[15px] font-semibold text-paper transition hover:bg-orange-hover disabled:opacity-50"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
                {status === 'error' && (
                  <p className="mt-3 text-center text-sm text-mauve">{message}</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
