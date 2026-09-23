import { ImageResponse } from "next/og";

export const alt = "Alternate Chemical Industry Ltd. Agro-industrial starch from Habiganj, Bangladesh.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#081C15",
          color: "#ffffff",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#6BB634" }}>
          ALTERNATE CHEMICAL INDUSTRY LTD.
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 62, lineHeight: 1.05, fontWeight: 700, maxWidth: 980 }}>
            Agro-industrial starch from Bangladesh
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#d7e7d4" }}>
            150 TPD corn wet mill. Habiganj. Commissioning early 2027.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
