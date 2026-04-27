import { ImageResponse } from "next/og";

export const alt = "texify — live LaTeX renderer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f0f0f",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 96px",
          fontFamily:
            '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#71717a",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          live LaTeX renderer
        </div>

        <div
          style={{
            fontSize: 220,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -8,
            marginTop: 24,
          }}
        >
          texify
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            color: "#a1a1aa",
            fontSize: 32,
            letterSpacing: -0.5,
            maxWidth: 900,
          }}
        >
          Type LaTeX. Render instantly. Copy as PNG or share a link.
        </div>

        <div
          style={{
            position: "absolute",
            right: 96,
            bottom: 80,
            color: "#52525b",
            fontSize: 22,
            letterSpacing: 1,
          }}
        >
          texify-phi.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
