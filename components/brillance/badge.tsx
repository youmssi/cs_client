import type React from "react";

const BRILLANCE_BADGE_ICONS = {
  bar: (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="4" height="6" stroke="#37322F" strokeWidth="1" fill="none" />
      <rect x="7" y="1" width="4" height="8" stroke="#37322F" strokeWidth="1" fill="none" />
      <rect x="2" y="4" width="1" height="1" fill="#37322F" />
      <rect x="3.5" y="4" width="1" height="1" fill="#37322F" />
      <rect x="2" y="5.5" width="1" height="1" fill="#37322F" />
      <rect x="3.5" y="5.5" width="1" height="1" fill="#37322F" />
      <rect x="8" y="2" width="1" height="1" fill="#37322F" />
      <rect x="9.5" y="2" width="1" height="1" fill="#37322F" />
      <rect x="8" y="3.5" width="1" height="1" fill="#37322F" />
      <rect x="9.5" y="3.5" width="1" height="1" fill="#37322F" />
      <rect x="8" y="5" width="1" height="1" fill="#37322F" />
      <rect x="9.5" y="5" width="1" height="1" fill="#37322F" />
    </svg>
  ),
  grid: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
      <rect x="7" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
      <rect x="1" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
      <rect x="7" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
    </svg>
  ),
  dot: <div className="w-[10.50px] h-[10.50px] outline outline-[1.17px] outline-[#37322F] outline-offset-[-0.58px] rounded-full" />,
} as const;

function getBrillanceBadgeIcon(variant?: string) {
  const key = (variant ?? "").toLowerCase().trim() as keyof typeof BRILLANCE_BADGE_ICONS;
  return BRILLANCE_BADGE_ICONS[key] ?? BRILLANCE_BADGE_ICONS.dot;
}

export function BrillanceBadge({
  icon,
  iconVariant,
  text,
}: {
  icon?: React.ReactNode;
  iconVariant?: "grid" | "dot" | "bar" | string;
  text: string;
}) {
  const finalIcon = icon ?? getBrillanceBadgeIcon(iconVariant);
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{finalIcon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  );
}

export { BRILLANCE_BADGE_ICONS, getBrillanceBadgeIcon };
