"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import ExampleGallery from "@/components/ExampleGallery";
import Toast, { type ToastState, type ToastTone } from "@/components/Toast";
import { decodeLatexHash } from "@/lib/share";
import { exportFormulaPng } from "@/lib/export";

const DEFAULT_LATEX = String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`;

export default function Home() {
  const [source, setSource] = useState(DEFAULT_LATEX);
  const [displayMode, setDisplayMode] = useState(true);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastIdRef = useRef(0);
  const formulaContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const decoded = decodeLatexHash(window.location.hash);
    if (decoded !== null) setSource(decoded);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = toast.id;
    const timer = window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string, tone: ToastTone = "ok") => {
    toastIdRef.current += 1;
    setToast({ id: toastIdRef.current, message, tone });
  }, []);

  const getFormulaNode = useCallback((): HTMLElement | null => {
    const container = formulaContainerRef.current;
    if (!container || !container.isConnected) return null;
    return (
      (container.querySelector(".katex-display") as HTMLElement | null) ??
      (container.querySelector(".katex") as HTMLElement | null) ??
      container
    );
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key === "Enter";
      if (!isShortcut) return;
      event.preventDefault();
      const node = getFormulaNode();
      if (!node) {
        showToast("Nothing to export", "err");
        return;
      }
      exportFormulaPng(node)
        .then((result) => {
          showToast(result === "copied" ? "PNG copied" : "PNG downloaded");
        })
        .catch(() => {
          showToast("Export failed — try a smaller formula", "err");
        });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [getFormulaNode, showToast]);

  return (
    <div className="flex flex-1 flex-col bg-[#0f0f0f] text-zinc-100">
      <header className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3">
        <div className="flex items-baseline gap-2">
          <h1 className="font-mono text-base font-semibold tracking-tight text-zinc-100">
            texify
          </h1>
          <span className="hidden text-[11px] text-zinc-500 sm:inline">
            live LaTeX renderer
          </span>
        </div>
        <div className="flex items-center gap-3">
          <DisplayToggle value={displayMode} onChange={setDisplayMode} />
          <a
            href="https://github.com/Vihan-G/texify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-zinc-500 transition hover:text-zinc-200"
          >
            source
          </a>
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <section className="min-h-[55vh] border-b border-white/5 md:min-h-0 md:border-b-0 md:border-r md:border-white/5">
          <Editor value={source} onChange={setSource} />
        </section>
        <section className="min-h-[55vh] md:min-h-0">
          <Preview
            source={source}
            displayMode={displayMode}
            onToast={showToast}
            containerRef={formulaContainerRef}
            getFormulaNode={getFormulaNode}
          />
        </section>
      </main>

      <ExampleGallery onSelect={setSource} />
      <Toast toast={toast} />
    </div>
  );
}

function DisplayToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  const baseBtn =
    "rounded px-2 py-1 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400";
  return (
    <div
      role="group"
      aria-label="Render mode"
      className="flex items-center rounded-md border border-white/10 p-0.5 text-[10px] font-medium uppercase tracking-wider"
    >
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={value}
        className={`${baseBtn} ${
          value ? "bg-white/10 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        display
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!value}
        className={`${baseBtn} ${
          !value ? "bg-white/10 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        inline
      </button>
    </div>
  );
}
