"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor({ value, onChange }: Props) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0f0f0f]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          LaTeX source
        </span>
        <span className="text-[11px] text-zinc-600">
          {value.length} {value.length === 1 ? "char" : "chars"}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        placeholder={"\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"}
        className="flex-1 resize-none bg-transparent px-4 py-4 font-mono text-[15px] leading-relaxed text-zinc-100 caret-emerald-400 outline-none placeholder:text-zinc-700 selection:bg-emerald-500/30"
      />
    </div>
  );
}
