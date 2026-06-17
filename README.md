# Offical-Website-frontend-code

Figwork official website — Next.js frontend with a looping video hero, about (manifesto), privacy, terms, and a newsletter signup modal.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Landing page modes

The hero has **two designs**, toggled by a single env var — no code changes needed:

| Mode | When | Hero CTA | Top-right header |
| --- | --- | --- | --- |
| **Pre-launch (waitlist)** | `NEXT_PUBLIC_EXTENSION_URL` is **unset/empty** (default) | Inline email **waitlist** input | _no_ Sign up button |
| **Extension live** | `NEXT_PUBLIC_EXTENSION_URL` is **set** to the Chrome Web Store URL | **"Available in the Chrome Web Store"** badge (links to that URL) | **Sign up** button (opens the newsletter modal) |

The flag lives in `frontend/lib/config.ts` (`EXTENSION_LIVE`). To switch:

```bash
# frontend/.env.local
# Pre-launch (waitlist): leave this unset.
# Extension live: set it to the store listing.
NEXT_PUBLIC_EXTENSION_URL=https://chromewebstore.google.com/detail/your-extension-id
```

Restart `npm run dev` after changing env vars.

- On mobile both modes keep the title at the top and the CTA (waitlist or badge) anchored at the bottom, inside the fade. In **extension** mode the Sign up button stays in the mobile top bar.

## Backend wiring

- The waitlist posts to `${NEXT_PUBLIC_API_URL}/api/waitlist`; the newsletter modal posts to `${NEXT_PUBLIC_API_URL}/api/newsletter`.
- If `NEXT_PUBLIC_API_URL` is empty, both confirm optimistically (useful for preview). Set it to enable real submissions.

## Notes

- Optimized hero video variants live in `frontend/public/video/`.
- The original full-resolution source (`Figwork Extension Video V1 - HD.mp4`, ~160MB) is excluded from git (exceeds GitHub's 100MB limit).
