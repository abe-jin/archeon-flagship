import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Archeon — Web Design & App Development";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg,#06b6d4,#14b8a6)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 16 L21 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 14 L9 20 H15 Z" fill="#fff" />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#14181c", letterSpacing: -1 }}>Archeon</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 800, color: "#14181c", lineHeight: 1.05, letterSpacing: -2 }}>
              Give your business
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
              <span style={{ color: "#14181c" }}>a&nbsp;</span>
              <span style={{ color: "#0e7490" }}>fulcrum</span>
              <span style={{ color: "#14181c" }}>.</span>
            </div>
            <div style={{ marginTop: 26, fontSize: 28, color: "#3a4047" }}>
              Web Design · App Development · 3D / WebGL
            </div>
          </div>

          {/* balance motif */}
          <svg width="240" height="200" viewBox="0 0 240 200">
            <line x1="20" y1="176" x2="220" y2="176" stroke="#d8d2c4" strokeWidth="3" />
            <polygon points="120,86 92,168 148,168" fill="#e7e1d4" stroke="#cfc7b4" strokeWidth="2" />
            <rect x="14" y="80" width="212" height="10" rx="5" fill="#c2974e" />
            <rect x="22" y="44" width="50" height="36" rx="5" fill="#34373d" />
            <circle cx="196" cy="70" r="15" fill="#14b8a6" />
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#6b7178" }}>
          <span>From design to launch — handled end to end.</span>
          <span>Next.js · React · Three.js</span>
        </div>
      </div>
    ),
    size
  );
}
