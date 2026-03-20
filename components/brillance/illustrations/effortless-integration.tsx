import type React from "react";

/**
 * Illustration 3 — "Your SDM takes over"
 * Shows a sprint board with columns: To Do / In Progress / Done, plus a daily standup note.
 */
interface Props {
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: "light" | "dark";
}

const columns = [
  {
    label: "To Do",
    color: "rgba(55,50,47,0.20)",
    tasks: ["API auth module", "DB schema v2"],
  },
  {
    label: "In Progress",
    color: "#F59E0B",
    tasks: ["Dashboard UI", "CI/CD pipeline"],
  },
  {
    label: "Done",
    color: "#10B981",
    tasks: ["Project setup", "Design system"],
  },
];

const EffortlessIntegration: React.FC<Props> = ({ width = 482, height = 300, className = "" }) => {
  const bg = "#ffffff";
  const border = "rgba(55,50,47,0.12)";
  const labelColor = "rgba(55,50,47,0.45)";
  const textColor = "#37322F";

  return (
    <div
      className={className}
      style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}
      role="img"
      aria-label="Sprint board managed by SDM"
    >
      <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* SDM header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#37322F", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 9, color: "#FBFAF9" }}>SDM</span>
            </div>
            <div>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 10, color: textColor }}>Sprint 3 — Week 2</span>
            </div>
          </div>
          <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 99, padding: "2px 7px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "#059669" }}>On track</span>
          </div>
        </div>

        {/* Sprint board */}
        <div style={{ display: "flex", gap: 6 }}>
          {columns.map((col) => (
            <div key={col.label} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Column header */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, paddingBottom: 4, borderBottom: `1.5px solid ${col.color}` }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: col.color }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: labelColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>{col.label}</span>
              </div>
              {/* Tasks */}
              {col.tasks.map((task) => (
                <div key={task} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 5, padding: "5px 7px", boxShadow: "0px 1px 3px rgba(55,50,47,0.06)" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500, color: textColor, lineHeight: 1.4 }}>{task}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Daily standup note */}
        <div style={{ background: "#F7F5F3", border: `1px solid ${border}`, borderRadius: 6, padding: "8px 10px", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
            <path d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 2.5v3l2 1.5" stroke={labelColor} strokeWidth="1" strokeLinecap="round" />
          </svg>
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 600, color: textColor }}>Daily standup — 9:00 AM</span>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: labelColor, margin: "2px 0 0", lineHeight: 1.5 }}>Progress report sent to client. 2 blockers resolved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortlessIntegration;
