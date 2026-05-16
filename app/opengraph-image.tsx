import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Waffert — Build Global Wealth Every Month";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f2744 0%, #1a3a5c 60%, #065f46 100%)",
          padding: "80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "white",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "900",
              color: "#0f2744",
            }}
          >
            W
          </div>
          <span style={{ color: "white", fontSize: "32px", fontWeight: "700" }}>Waffert</span>
        </div>
        <div
          style={{
            color: "white",
            fontSize: "60px",
            fontWeight: "800",
            lineHeight: "1.1",
            letterSpacing: "-1px",
            marginBottom: "20px",
            maxWidth: "800px",
          }}
        >
          Build global wealth{" "}
          <span style={{ color: "#34d399" }}>every month.</span>
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "26px",
            lineHeight: "1.4",
            maxWidth: "700px",
            marginBottom: "48px",
          }}
        >
          Simple wealth plans for international savers, diaspora families, and halal investors.
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {["🌍 Global Growth", "☪️ Halal Global", "🎓 Education", "💵 USD Protection"].map((b) => (
            <div
              key={b}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "100px",
                padding: "8px 20px",
                color: "white",
                fontSize: "16px",
              }}
            >
              {b}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "18px",
          }}
        >
          waffert.com
        </div>
      </div>
    ),
    { ...size }
  );
}
