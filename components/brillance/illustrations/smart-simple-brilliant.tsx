import type React from "react";

/**
 * Illustration 1 — "Tell us your needs"
 * Shows a project brief form with fields: project type, stack, timeline, submit CTA.
 */
interface Props {
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: "light" | "dark";
}

const SmartSimpleBrilliant: React.FC<Props> = ({ width = 482, height = 300, className = "", theme = "light" }) => {
  const bg = theme === "light" ? "#ffffff" : "#2a2522";
  const border = theme === "light" ? "rgba(55,50,47,0.12)" : "rgba(255,255,255,0.10)";
  const labelColor = theme === "light" ? "rgba(55,50,47,0.50)" : "rgba(255,255,255,0.40)";
  const textColor = theme === "light" ? "#37322F" : "#F0EFEE";
  const inputBg = theme === "light" ? "#F7F5F3" : "rgba(255,255,255,0.06)";
  const tagBg = theme === "light" ? "#EDE9E6" : "rgba(255,255,255,0.10)";

  const tags = ["React", "Node.js", "PostgreSQL", "Docker"];

  return (
    <div
      className={className}
      style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}
      role="img"
      aria-label="Project brief form"
    >
      <div style={{ width: 260, background: bg, borderRadius: 10, border: `1px solid ${border}`, padding: "16px", boxShadow: "0px 4px 16px rgba(55,50,47,0.08)", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#37322F" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 11, color: textColor, letterSpacing: "0.04em", textTransform: "uppercase" }}>New Project Brief</span>
        </div>

        {/* Field: Project type */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500, color: labelColor }}>Project type</span>
          <div style={{ background: inputBg, borderRadius: 5, padding: "6px 8px", border: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 500, color: textColor }}>Web Application</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4L5 6.5L7.5 4" stroke={labelColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>

        {/* Field: Tech stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500, color: labelColor }}>Tech stack</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {tags.map((tag) => (
              <span key={tag} style={{ background: tagBg, borderRadius: 99, padding: "2px 7px", fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500, color: textColor }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Field: Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500, color: labelColor }}>Timeline</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["1 month", "3 months", "6 months+"].map((t, i) => (
              <div key={t} style={{ flex: 1, background: i === 1 ? "#37322F" : inputBg, borderRadius: 5, padding: "5px 0", border: `1px solid ${i === 1 ? "#37322F" : border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500, color: i === 1 ? "#FBFAF9" : textColor }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#37322F", borderRadius: 6, padding: "8px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, color: "#FBFAF9" }}>Submit brief</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="#FBFAF9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>

        {/* Response time note */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: labelColor }}>Response within 24h</span>
        </div>
      </div>
    </div>
  );
};

export default SmartSimpleBrilliant;
