"use client";

export type ToastTone = "ok" | "err";
export type ToastState = { id: number; message: string; tone: ToastTone };

type Props = {
  toast: ToastState | null;
};

export default function Toast({ toast }: Props) {
  const visible = Boolean(toast);
  const tone = toast?.tone ?? "ok";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center"
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          "rounded-full px-4 py-2 text-sm shadow-lg backdrop-blur transition-all duration-200",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
          tone === "err"
            ? "bg-red-600/95 text-white"
            : "bg-zinc-900/95 text-zinc-50",
        ].join(" ")}
      >
        {toast?.message ?? " "}
      </div>
    </div>
  );
}
