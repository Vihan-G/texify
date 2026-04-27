import html2canvas from "html2canvas";

export type ExportResult = "copied" | "downloaded";

export async function exportFormulaPng(
  formulaEl: HTMLElement,
  filename = "formula.png",
): Promise<ExportResult> {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = [
    "position:fixed",
    "top:-10000px",
    "left:-10000px",
    "background:#ffffff",
    "color:#0f0f0f",
    "padding:32px",
    "display:inline-block",
    "font-size:32px",
    "line-height:1.2",
  ].join(";");
  wrapper.appendChild(formulaEl.cloneNode(true));
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(wrapper, {
      backgroundColor: "#ffffff",
      scale: 2,
      logging: false,
    });

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob returned null"))),
        "image/png",
      );
    });

    if (
      typeof ClipboardItem !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.write === "function"
    ) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        return "copied";
      } catch {
        // fall through to download
      }
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return "downloaded";
  } finally {
    document.body.removeChild(wrapper);
  }
}
