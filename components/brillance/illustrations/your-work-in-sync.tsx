import type React from "react";

/**
 * Illustration 2 — "We match your team"
 * Shows 3 developer profile cards with skills, availability badge, and a match score.
 */
interface Props {
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: "light" | "dark";
}

const profiles = [
  { initials: "AK", name: "Armel K.", role: "Full-Stack Dev", skills: ["React", "Node.js"], score: 98, available: true, color: "#4F46E5" },
  { initials: "CM", name: "Carine M.", role: "Backend Engineer", skills: ["Python", "PostgreSQL"], score: 95, available: true, color: "#0EA5E9" },
  { initials: "JN", name: "Jules N.", role: "DevOps Engineer", skills: ["Docker", "AWS"], score: 91, available: false, color: "#10B981" },
];

const YourWorkInSync: React.FC<Props> = ({ width = 482, height = 300, className = "", theme = "light" }) => {
  const bg = theme === "light" ? "#ffffff" : "#2a2522";
  const border = theme === "light" ? "rgba(55,50,47,0.12)" : "rgba(255,255,255,0.10)";
  const labelColor = theme === "light" ? "rgba(55,50,47,0.50)" : "rgba(255,255,255,0.40)";
  const textColor = theme === "light" ? "#37322F" : "#F0EFEE";
  const tagBg = theme === "light" ? "#EDE9E6" : "rgba(255,255,255,0.10)";
  const rowBg = theme === "light" ? "#F7F5F3" : "rgba(255,255,255,0.04)";

  return (
    <div
      className={className}
      style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}
      role="img"
      aria-label="Developer profile matching cards"
    >
      <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 10, color: textColor, letterSpacing: "0.04em", textTransform: "uppercase" }}>Matched Profiles</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: labelColor }}>3 of 12 vetted</span>
        </div>

        {profiles.map((p) => (
          <div key={p.initials} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0px 2px 8px rgba(55,50,47,0.06)" }}>
            {/* Avatar */}
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, color: "#ffffff" }}>{p.initials}</span>
            </div>

            {/* Info */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 10, color: textColor }}>{p.name}</span>
                <div style={{ background: p.available ? "rgba(16,185,129,0.12)" : rowBg, borderRadius: 99, padding: "1px 6px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 500, color: p.available ? "#059669" : labelColor }}>{p.available ? "Available" : "On project"}</span>
                </div>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: labelColor }}>{p.role}</span>
              <div style={{ display: "flex", gap: 3, marginTop: 1 }}>
                {p.skills.map((s) => (
                  <span key={s} style={{ background: tagBg, borderRadius: 99, padding: "1px 6px", fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 500, color: textColor }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Match score */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: textColor }}>{p.score}%</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: labelColor }}>match</span>
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 2 }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM5 3.5v2l1.5 1" stroke={labelColor} strokeWidth="1" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: labelColor }}>Replacement guaranteed within 72h</span>
        </div>
      </div>
    </div>
  );
};

export default YourWorkInSync;
