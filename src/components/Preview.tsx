"use client";

import { useMemo } from "react";
import { renderLatex } from "@/lib/katex";
import Toolbar from "@/components/Toolbar";
import type { ToastTone } from "@/components/Toast";

type Props = {
  source: string;
  displayMode: boolean;
  onToast: (message: string, tone?: ToastTone) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  getFormulaNode: () => HTMLElement | null;
};

export default function Preview({
  source,
  displayMode,
  onToast,
  containerRef,
  getFormulaNode,
}: Props) {
  const result = useMemo(
    () => renderLatex(source, displayMode),
    [source, displayMode],
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-2 py-1.5 sm:px-3">
        <div className="flex items-center gap-2 px-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Preview
          </span>
          {!result.ok && source.trim() !== "" && (
            <span className="text-[11px] text-red-600">error</span>
          )}
        </div>
        <Toolbar
          source={source}
          getFormulaNode={getFormulaNode}
          onToast={onToast}
        />
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
            ref={containerRef}
            className={
              displayMode
                ? "flex min-h-full items-center justify-center text-center text-2xl"
                : "flex min-h-full flex-wrap items-center justify-center gap-x-2 text-center text-xl leading-relaxed"
            }
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
