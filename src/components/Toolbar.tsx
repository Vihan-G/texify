"use client";

import { useState } from "react";
import { exportFormulaPng } from "@/lib/export";
import {
  buildShareUrl,
  encodeLatexHash,
  SHARE_URL_WARNING_THRESHOLD,
} from "@/lib/share";

type Tone = "ok" | "err";

type Props = {
  source: string;
  getFormulaNode: () => HTMLElement | null;
  onToast: (message: string, tone?: Tone) => void;
};

export default function Toolbar({ source, getFormulaNode, onToast }: Props) {
  const [busy, setBusy] = useState<null | "png" | "latex" | "share">(null);
  const disabled = source.trim() === "";

  async function copyLatex() {
    if (busy) return;
    setBusy("latex");
    try {
      await navigator.clipboard.writeText(source);
      onToast("LaTeX copied");
    } catch {
      onToast("Copy failed", "err");
    } finally {
      setBusy(null);
    }
  }

  async function copyPng() {
    if (busy) return;
    const formula = getFormulaNode();
    if (!formula) {
      onToast("Nothing to export", "err");
      return;
    }
    setBusy("png");
    try {
      const result = await exportFormulaPng(formula);
      onToast(result === "copied" ? "PNG copied" : "PNG downloaded");
    } catch {
      onToast("Export failed — try a smaller formula", "err");
    } finally {
      setBusy(null);
    }
  }

  async function shareLink() {
    if (busy) return;
    setBusy("share");
    try {
      const url = buildShareUrl(source);
      window.history.replaceState(null, "", encodeLatexHash(source));
      await navigator.clipboard.writeText(url);
      if (url.length > SHARE_URL_WARNING_THRESHOLD) {
        onToast("Link copied — may be too long for some browsers", "err");
      } else {
        onToast("Share link copied");
      }
    } catch {
      onToast("Copy failed", "err");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <IconButton
        label="Copy LaTeX"
        disabled={disabled || busy !== null}
        onClick={copyLatex}
      >
        <ClipboardIcon />
      </IconButton>
      <IconButton
        label="Copy PNG · ⌘↵"
        disabled={disabled || busy !== null}
        onClick={copyPng}
      >
        <ImageIcon />
      </IconButton>
      <IconButton
        label="Share link"
        disabled={disabled || busy !== null}
        onClick={shareLink}
      >
        <LinkIcon />
      </IconButton>
    </div>
  );
}

type IconButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function IconButton({ label, onClick, disabled, children }: IconButtonProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-zinc-500"
      >
        {children}
      </button>
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] font-medium text-zinc-100 opacity-0 shadow-lg transition group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="8" y="3" width="8" height="4" rx="1" />
      <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.5-1.5" />
    </svg>
  );
}
