# texify

A live LaTeX renderer. You type LaTeX, you get a rendered preview instantly.
Built for math/CS students, Reddit/Discord users, anyone who needs to share a
formula without setting up a full LaTeX environment.

> Status: **Day 1** — live preview works. Day 2–5 add PNG export, share links,
> example gallery, SEO, and ship.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- KaTeX (browser-side LaTeX rendering, no server)
- html2canvas (PNG export — Day 2)
- nanoid + URL-hash encoding for share links (Day 2)

No backend. Fully static. Deploys to Vercel.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## Project layout

```
src/
  app/
    page.tsx          two-panel editor + preview
    layout.tsx        fonts + metadata + KaTeX styles
    globals.css       theme + preview grid
  components/
    Editor.tsx        textarea
    Preview.tsx       KaTeX render output
  lib/
    katex.ts          renderToString wrapper with error handling
```

## Screenshot

_(coming with v1.0.0 release)_

## License

MIT
