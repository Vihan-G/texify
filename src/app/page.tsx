"use client";

import { useState } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

const DEFAULT_LATEX = String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`;

export default function Home() {
  const [source, setSource] = useState(DEFAULT_LATEX);

  return (
    <div className="flex flex-1 flex-col bg-[#0f0f0f] text-zinc-100">
      <header className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div className="flex items-baseline gap-2">
          <h1 className="font-mono text-base font-semibold tracking-tight text-zinc-100">
            texify
          </h1>
          <span className="text-[11px] text-zinc-500">live LaTeX renderer</span>
        </div>
        <a
          href="https://github.com/Vihan-G/texify"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-zinc-500 transition hover:text-zinc-200"
        >
          source
        </a>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <section className="min-h-[55vh] border-b border-white/5 md:min-h-0 md:border-b-0 md:border-r md:border-white/5">
          <Editor value={source} onChange={setSource} />
        </section>
        <section className="min-h-[55vh] md:min-h-0">
          <Preview source={source} />
        </section>
      </main>
    </div>
  );
}
