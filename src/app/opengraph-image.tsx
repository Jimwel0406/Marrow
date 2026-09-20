import { ImageResponse } from "next/og";

export const alt = `Marrow — Fall/Winter ${new Date().getFullYear()}, Built for What's Next`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0b",
          padding: "72px 80px",
          color: "#f4f1ec",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 46,
              height: 3,
              backgroundColor: "#f4f1ec",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 14,
              fontWeight: 600,
            }}
          >
            MARROW
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              opacity: 0.72,
              marginBottom: 28,
            }}
          >
            {`FALL / WINTER ${new Date().getFullYear()}`}
          </div>
          <div
            style={{
              fontSize: 108,
              lineHeight: 1,
              letterSpacing: 6,
              fontWeight: 500,
            }}
          >
            BUILT FOR
          </div>
          <div
            style={{
              fontSize: 108,
              lineHeight: 1.08,
              letterSpacing: 6,
              fontWeight: 500,
            }}
          >
            {"WHAT'S NEXT"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 4,
            opacity: 0.7,
          }}
        >
          <div>FUNCTIONAL SILHOUETTES. ELEVATED ESSENTIALS.</div>
          <div>MANILA, PH</div>
        </div>
      </div>
    ),
    size,
  );
}
