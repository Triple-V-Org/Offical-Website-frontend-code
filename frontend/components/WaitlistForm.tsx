'use client';

import { useState } from 'react';
import { API_BASE, isValidEmail } from '@/lib/config';

/**
 * Inline email waitlist (no modal). Used in the hero before the extension ships.
 * Submits to the backend when configured; otherwise confirms optimistically so
 * the flow works in preview.
 */
export default function WaitlistForm({
  className = '',
  align = 'start',
}: {
  className?: string;
  align?: 'start' | 'end';
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }
    setStatus('loading');
    setMessage('');

    if (!API_BASE) {
      setTimeout(() => setStatus('ok'), 500);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'website-waitlist' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('ok');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Network error.');
    }
  }

  if (status === 'ok') {
    return (
      <p
        className={`w-full max-w-[380px] rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm font-medium text-white backdrop-blur ${className}`}
      >
        You&apos;re on the waitlist — we&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={`w-full max-w-[380px] ${className}`}
    >
      <div className="flex items-stretch gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Enter your email"
          aria-label="Email address"
          className="h-12 min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-[15px] text-white outline-none backdrop-blur transition placeholder:text-white/55 focus:border-white/50 focus:bg-white/[0.16]"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-12 shrink-0 whitespace-nowrap rounded-xl bg-orange px-5 text-[15px] font-semibold text-paper transition hover:bg-orange-hover disabled:opacity-60"
        >
          {status === 'loading' ? 'Joining…' : 'Join'}
        </button>
      </div>
      {status === 'error' && (
        <p
          className={`mt-2 text-sm text-mauve ${
            align === 'end' ? 'text-right' : 'text-left'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
