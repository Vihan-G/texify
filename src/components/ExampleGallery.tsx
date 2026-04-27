"use client";

import { useMemo } from "react";
import { renderLatex } from "@/lib/katex";

type Example = {
  label: string;
  latex: string;
};

const EXAMPLES: Example[] = [
  {
    label: "Quadratic formula",
    latex: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`,
  },
  {
    label: "Euler's identity",
    latex: String.raw`e^{i\pi} + 1 = 0`,
  },
  {
    label: "Maxwell — Gauss",
    latex: String.raw`\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}`,
  },
  {
    label: "Fourier transform",
    latex: String.raw`\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x)\, e^{-2\pi i x \xi}\, dx`,
  },
  {
    label: "Gaussian integral",
    latex: String.raw`\int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}`,
  },
  {
    label: "Bayes' theorem",
    latex: String.raw`P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}`,
  },
  {
    label: "Navier–Stokes",
    latex: String.raw`\rho \left( \frac{\partial \mathbf{v}}{\partial t} + \mathbf{v} \cdot \nabla \mathbf{v} \right) = -\nabla p + \mu \nabla^2 \mathbf{v} + \mathbf{f}`,
  },
  {
    label: "Schrödinger",
    latex: String.raw`i\hbar \frac{\partial}{\partial t} \Psi = \hat{H} \Psi`,
  },
  {
    label: "Taylor series",
    latex: String.raw`f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n`,
  },
  {
    label: "Binomial theorem",
    latex: String.raw`(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^{n-k} y^k`,
  },
  {
    label: "Triple integral",
    latex: String.raw`\iiint_V f(x,y,z)\, dV`,
  },
  {
    label: "2×2 determinant",
    latex: String.raw`\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc`,
  },
];

type Props = {
  onSelect: (latex: string) => void;
};

export default function ExampleGallery({ onSelect }: Props) {
  const cards = useMemo(
    () =>
      EXAMPLES.map((ex) => {
        const result = renderLatex(ex.latex, true);
        return {
          ...ex,
          html: result.ok ? result.html : "",
        };
      }),
    [],
  );

  return (
    <section
      aria-label="Example formulas"
      className="border-t border-white/5 bg-[#0a0a0a]"
    >
      <div className="flex items-center justify-between px-5 pb-2 pt-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Examples
        </span>
        <span className="hidden text-[11px] text-zinc-600 sm:inline">
          click to load
        </span>
      </div>
      <div className="overflow-x-auto pb-4">
        <ul className="flex gap-3 px-5">
          {cards.map((ex) => (
            <li key={ex.label} className="flex-shrink-0">
              <button
                type="button"
                onClick={() => onSelect(ex.latex)}
                aria-label={`Load ${ex.label}`}
                className="flex h-[88px] w-[176px] flex-col gap-2 rounded-md border border-white/10 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-white/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <div
                  className="flex flex-1 items-center justify-center overflow-hidden text-zinc-900"
                  style={{ fontSize: 11 }}
                  dangerouslySetInnerHTML={{ __html: ex.html }}
                />
                <span className="truncate text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  {ex.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
