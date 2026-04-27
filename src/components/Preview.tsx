"use client";

import { useMemo } from "react";
import { renderLatex } from "@/lib/katex";

type Props = {
  source: string;
};

export default function Preview({ source }: Props) {
  const result = useMemo(() => renderLatex(source, true), [source]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Preview
        </span>
        <span
          className={`text-[11px] ${
            result.ok ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {result.ok ? "rendered" : "error"}
        </span>
      </div>

      <div
        className="texify-preview-grid flex-1 overflow-auto px-6 py-10"
        aria-live="polite"
      >
        {source.trim() === "" ? (
          <p className="mx-auto max-w-md text-center text-sm text-zinc-400">
            Type LaTeX on the left to see it rendered here.
          </p>
        ) : result.ok ? (
          <div
            className="flex min-h-full items-center justify-center text-center text-2xl"
            dangerouslySetInnerHTML={{ __html: result.html }}
          />
        ) : (
          <pre className="mx-auto max-w-2xl whitespace-pre-wrap break-words rounded-md border border-red-200 bg-red-50 px-4 py-3 font-mono text-[13px] leading-relaxed text-red-700">
            {result.error}
          </pre>
        )}
      </div>
    </div>
  );
}
