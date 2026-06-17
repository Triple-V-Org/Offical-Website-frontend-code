/**
 * Site configuration & feature flags.
 *
 * The landing page has two modes:
 *  - Extension live  → show the "Available in the Chrome Web Store" badge and the
 *    "Sign up" newsletter button in the header.
 *  - Pre-launch      → show an inline email waitlist and hide the header sign-up.
 *
 * The mode is driven by whether a Chrome Web Store URL is configured. Set
 * NEXT_PUBLIC_EXTENSION_URL once the extension ships to flip to the live layout.
 */
export const EXTENSION_URL = process.env.NEXT_PUBLIC_EXTENSION_URL ?? '';
export const EXTENSION_LIVE = EXTENSION_URL.trim().length > 0;

/** Base URL of the backend API. Empty = optimistic/no-op in preview. */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

/** Shared email format check. */
export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
