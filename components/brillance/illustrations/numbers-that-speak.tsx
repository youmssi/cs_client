import type React from "react";

/**
 * Illustration 4 — "Deliver with confidence"
 * Shows delivery metrics: on-time rate bar chart, replacement guarantee badge, weekly report card.
 */
interface Props {
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: "light" | "dark";
}

const weeks = [
  { label: "W1", value: 72, delivered: true },
  { label: "W2", value: 85, delivered: true },
  { label: "W3", value: 91, delivered: true },
  { label: "W4", value: 100, delivered: true },
];

const NumbersThatSpeak: React.FC<Props> = ({ width = 482, height = 300, className = "", theme = "light" }) => {
  const bg = theme === "light" ? "#ffffff" : "#2a2522";
  const border = theme === "light" ? "rgba(55,50,47,0.12)" : "rgba(255,255,255,0.10)";
  const labelColor = theme === "light" ? "rgba(55,50,47,0.45)" : "rgba(255,255,255,0.40)";
  const textColor = theme === "light" ? "#37322F" : "#F0EFEE";
  const barBg = theme === "light" ? "#EDE9E6" : "rgba(255,255,255,0.08)";
  const maxBarH = 52;

  return (
    <div
      className={className}
      style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}
      role="img"
      aria-label="Delivery confidence metrics dashboard"
    >
      <div style={{ width: 270, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Top stat row */}
        <div style={{ display: "flex", gap: 8 }}>
          {/* On-time delivery */}
          <div style={{ flex: 1, background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "10px 12px", boxShadow: "0px 2px 8px rgba(55,50,47,0.06)" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 500, color: labelColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>On-time delivery</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 4 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 22, color: textColor, lineHeight: 1 }}>97</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, color: textColor }}>%</span>
            </div>
            <div style={{ marginTop: 6, height: 3, background: barBg, borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: "97%", height: "100%", background: "#37322F", borderRadius: 99 }} />
            </div>
          </div>

          {/* Replacement guarantee */}
          <div style={{ flex: 1, background: "#37322F", border: `1px solid #37322F`, borderRadius: 8, padding: "10px 12px", boxShadow: "0px 2px 8px rgba(55,50,47,0.12)" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 500, color: "rgba(255,255,255,0.50)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Replacement</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 4 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 22, color: "#FBFAF9", lineHeight: 1 }}>72</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, color: "#FBFAF9" }}>h</span>
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: "rgba(255,255,255,0.45)", marginTop: 4, display: "block" }}>guaranteed</span>
          </div>
        </div>

        {/* Weekly delivery bar chart */}
        <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "12px", boxShadow: "0px 2px 8px rgba(55,50,47,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 600, color: textColor }}>Weekly delivery rate</span>
            <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 99, padding: "2px 7px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "#059669" }}>↑ Improving</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: maxBarH + 16 }}>
            {weeks.map((w) => (
              <div key={w.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: textColor }}>{w.value}%</span>
                <div style={{ width: "100%", height: Math.round((w.value / 100) * maxBarH), background: w.value === 100 ? "#37322F" : barBg, borderRadius: "3px 3px 0 0", position: "relative", overflow: "hidden" }}>
                  {w.value === 100 && (
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #37322F, #605A57)" }} />
                  )}
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: labelColor }}>{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly report line */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: bg, border: `1px solid ${border}`, borderRadius: 6 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke={labelColor} strokeWidth="1" /><path d="M3.5 4.5h5M3.5 6.5h3.5M3.5 8.5h2" stroke={labelColor} strokeWidth="1" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500, color: textColor }}>Weekly report sent</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: labelColor, marginLeft: "auto" }}>Every Monday</span>
        </div>
      </div>
    </div>
  );
};

export default NumbersThatSpeak;
