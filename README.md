# texify

A live LaTeX renderer. Type LaTeX, get a rendered preview instantly. Copy as
PNG or share a link. No setup, no signup, no tracking.

**Live:** https://texify-phi.vercel.app

![texify](https://texify-phi.vercel.app/opengraph-image)

## Features

- **Live preview** — KaTeX renders as you type, with inline error messages on
  invalid input (it never crashes the page)
- **Copy PNG** — one click writes the rendered formula to your clipboard;
  falls back to a download if the browser can't put images on the clipboard
- **Share link** — encodes the LaTeX into the URL hash so a link round-trips
  without a backend
- **Twelve example formulas** — quadratic, Euler's identity, Maxwell, Fourier,
  Gaussian, Bayes, Navier–Stokes, Schrödinger, Taylor, binomial, triple
  integral, 2×2 determinant — click to load
- **Display vs inline** mode toggle
- **⌘↵ / Ctrl+Enter** anywhere on the page exports the formula as PNG
- Mobile-friendly (panels stack below 768px)

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- KaTeX for client-side LaTeX rendering
- html2canvas for PNG export
- Deployed on Vercel — fully static, no backend

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project layout

```
src/
  app/
    page.tsx              two-panel editor + preview, hash-load, ⌘↵ shortcut
    layout.tsx            metadata, fonts, KaTeX styles
    opengraph-image.tsx   1200x630 OG card (next/og)
    icon.svg              favicon
    globals.css           theme + preview grid background
  components/
    Editor.tsx            textarea
    Preview.tsx           KaTeX render + error box
    Toolbar.tsx           Copy LaTeX / Copy PNG / Share link
    ExampleGallery.tsx    twelve formula cards
    Toast.tsx             inline toast pill
  lib/
    katex.ts              renderToString wrapper with typed result
    export.ts             html2canvas → clipboard or download
    share.ts              base64url encode/decode of LaTeX in #l= hash
```

## License

MIT
