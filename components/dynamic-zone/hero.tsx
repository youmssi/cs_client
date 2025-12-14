import { HeroSection } from "@/components/hero-section";
import type { HeroBlock } from "@/types";

type HeroProps = {
  heading: string | null;
  sub_heading: string | null;
  CTAs?: HeroBlock["CTAs"] | null;
};

export function Hero({ heading, sub_heading, CTAs }: Readonly<HeroProps>) {
  const primaryCta = CTAs?.[0] ?? null;

  return (
    <HeroSection heading={heading} sub_heading={sub_heading} cta={primaryCta} />
  );
}
