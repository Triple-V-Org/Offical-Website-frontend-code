'use client';

import { useState } from 'react';
import { API_BASE, isValidEmail } from '@/lib/config';

export default function SupportForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email.');
      return;
    }

    if (!subject.trim()) {
      setStatus('error');
      setErrorMessage('Please enter a subject.');
      return;
    }

    if (!message.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your message.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    if (!API_BASE) {
      setTimeout(() => setStatus('ok'), 500);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('ok');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Network error.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange/20">
          <svg className="h-7 w-7 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Message sent!</h3>
        <p className="mt-2 text-paper/70">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-paper/80">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Your name"
          className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-[15px] text-white outline-none backdrop-blur transition placeholder:text-white/55 focus:border-white/50 focus:bg-white/[0.16]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-paper/80">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="you@example.com"
          className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-[15px] text-white outline-none backdrop-blur transition placeholder:text-white/55 focus:border-white/50 focus:bg-white/[0.16]"
        />
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-paper/80">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="How can we help?"
          className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-[15px] text-white outline-none backdrop-blur transition placeholder:text-white/55 focus:border-white/50 focus:bg-white/[0.16]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-paper/80">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Tell us more..."
          rows={5}
          className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[15px] text-white outline-none backdrop-blur transition placeholder:text-white/55 focus:border-white/50 focus:bg-white/[0.16]"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-mauve">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="h-12 w-full rounded-xl bg-orange px-6 text-[15px] font-semibold text-paper transition hover:bg-orange-hover disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
