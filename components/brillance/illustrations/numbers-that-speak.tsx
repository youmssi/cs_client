import type React from "react";

interface NumbersThatSpeakProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: "light" | "dark";
}

const NumbersThatSpeak: React.FC<NumbersThatSpeakProps> = ({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}) => {
  const themeVars =
    theme === "light"
      ? {
          "--nts-surface": "#ffffff",
          "--nts-text-primary": "#2f3037",
          "--nts-text-secondary": "rgba(47,48,55,0.8)",
          "--nts-text-muted": "rgba(55,50,47,0.7)",
          "--nts-border": "rgba(47,48,55,0.12)",
          "--nts-shadow": "rgba(47,48,55,0.06)",
        }
      : ({
          "--nts-surface": "#ffffff",
          "--nts-text-primary": "#2f3037",
          "--nts-text-secondary": "rgba(47,48,55,0.8)",
          "--nts-text-muted": "rgba(55,50,47,0.7)",
          "--nts-border": "rgba(47,48,55,0.12)",
          "--nts-shadow": "rgba(47,48,55,0.06)",
        } as React.CSSProperties);

  const imgSchedule = "/placeholder.svg?height=271&width=431";

  return (
    <div
      className={className}
      style={
        {
          width,
          height,
          position: "relative",
          background: "transparent",
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="Financial dashboard showing invoiced revenue charts"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "calc(50% + 23.703px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "calc(50% - 19.427px)",
            width: "270px",
            height: "199.565px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <div
              className="border border-[rgba(0,0,0,0.08)]"
              style={{
                width: "270px",
                height: "199.565px",
                background: "var(--nts-surface)",
                borderRadius: "4.696px",
                boxShadow:
                  "0px 0px 0px 0.587px rgba(47,48,55,0.12), 0px 1.174px 2.348px -0.587px rgba(47,48,55,0.06), 0px 1.761px 3.522px -0.88px rgba(47,48,55,0.06)",
                maskImage: `url('${imgSchedule}')`,
                maskPosition: "-81.766px -1.312px",
                maskSize: "430.746px 270.521px",
                maskRepeat: "no-repeat",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "calc(50% + 12.573px)",
            width: "330px",
            height: "243.913px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <div
              className="border border-[rgba(0,0,0,0.08)]"
              style={{
                width: "330px",
                height: "243.913px",
                background: "var(--nts-surface)",
                borderRadius: "5.739px",
                boxShadow:
                  "0px 0px 0px 0.717px rgba(47,48,55,0.12), 0px 1.435px 2.87px -0.717px rgba(47,48,55,0.06), 0px 2.152px 4.304px -1.076px rgba(47,48,55,0.06)",
                maskImage: `url('${imgSchedule}')`,
                maskPosition: "-51.766px -11.138px",
                maskSize: "430.746px 270.521px",
                maskRepeat: "no-repeat",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "calc(50% + 33.573px)",
            width: "360px",
            height: "266.087px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <div
              className="border border-[rgba(0,0,0,0.08)]"
              style={{
                width: "360px",
                height: "266.087px",
                background: "var(--nts-surface)",
                borderRadius: "6.261px",
                boxShadow:
                  "0px 0px 0px 0.783px rgba(47,48,55,0.12), 0px 1.565px 3.13px -0.783px rgba(47,48,55,0.06), 0px 2.348px 4.696px -1.174px rgba(47,48,55,0.06)",
                maskImage: `url('${imgSchedule}')`,
                maskPosition: "-36.766px -21.051px",
                maskSize: "430.746px 270.521px",
                maskRepeat: "no-repeat",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumbersThatSpeak;
