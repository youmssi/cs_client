import { BrillanceBadge } from "@/components/brillance/badge";
import type { HeaderSection } from "@/types";

interface SectionHeaderProps {
  header?: HeaderSection | null;
  /**
   * Fallbacks used when the header is partially configured.
   */
  defaultBadgeText?: string;
  defaultBadgeVariant?: string;
  defaultHeading: string;
  defaultSubHeading: string;
}

export function SectionHeader({
  header,
  defaultBadgeText = "",
  defaultBadgeVariant,
  defaultHeading,
  defaultSubHeading,
}: Readonly<SectionHeaderProps>) {
  const badgeVariant = header?.badge?.variant ?? defaultBadgeVariant ?? "dot";
  const badgeText = header?.badge?.text ?? defaultBadgeText;
  const heading = header?.heading ?? defaultHeading;
  const rawSubtitle = header?.sub_heading ?? defaultSubHeading;

  return (
    <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
      {badgeText ? (
        <BrillanceBadge iconVariant={badgeVariant} text={badgeText} />
      ) : null}

      <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
        {heading}
      </div>

      <div className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans whitespace-pre-line">
        {rawSubtitle}
      </div>
    </div>
  );
}


