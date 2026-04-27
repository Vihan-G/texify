import katex from "katex";

export type RenderResult =
  | { ok: true; html: string }
  | { ok: false; error: string };

export function renderLatex(source: string, displayMode = true): RenderResult {
  if (!source.trim()) {
    return { ok: true, html: "" };
  }
  try {
    const html = katex.renderToString(source, {
      displayMode,
      throwOnError: true,
      strict: "ignore",
      output: "html",
      trust: false,
    });
    return { ok: true, html };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
