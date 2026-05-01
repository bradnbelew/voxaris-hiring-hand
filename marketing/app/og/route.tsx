import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0b",
          color: "#fafafa",
          padding: "72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Volumetric beam */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34, 215, 126, 0.18) 0%, transparent 60%)",
          }}
        />

        {/* Top brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#22d77e",
              boxShadow: "0 0 24px #22d77e",
            }}
          />
          <span style={{ fontSize: 26, fontWeight: 500 }}>Hiring Hand</span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            marginTop: 90,
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(250, 250, 250, 0.5)",
            fontFamily: "monospace",
            zIndex: 1,
          }}
        >
          An AI hiring agent for high-volume roles
        </div>

        {/* H1 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 88,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <span>Every applicant.</span>
            <span style={{ color: "#22d77e", fontStyle: "italic", fontWeight: 400 }}>
              Interviewed.
            </span>
            <span style={{ color: "#22d77e", fontStyle: "italic", fontWeight: 400 }}>
              Scored.
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 8 }}>
            On your desk by morning.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 48,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 16,
              color: "rgba(250, 250, 250, 0.55)",
              fontFamily: "monospace",
            }}
          >
            <span style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>
              hiringhand.io
            </span>
            <span style={{ color: "rgba(250, 250, 250, 0.4)" }}>
              A Voxaris product
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 16,
              fontFamily: "monospace",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#22d77e",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#22d77e",
              }}
            />
            14m to scored shortlist
          </div>
        </div>
      </div>
    ),
    SIZE
  );
}
