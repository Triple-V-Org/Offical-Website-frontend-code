# Offical-Website-frontend-code

Figwork official website — Next.js frontend with a looping video hero, about (manifesto), privacy, terms, and a newsletter signup modal.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Notes

- Optimized hero video variants live in `frontend/public/video/`.
- The original full-resolution source (`Figwork Extension Video V1 - HD.mp4`, ~160MB) is excluded from git (exceeds GitHub's 100MB limit).
- Set `NEXT_PUBLIC_API_URL` to point the newsletter form at the backend.
