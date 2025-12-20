import type { HeroBlock } from "@/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero({ heading, sub_heading, CTAs }: Readonly<HeroBlock>) {
  return (
    <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-[108px] pb-8 sm:pb-12 md:pb-16">
      {/* Decorative background pattern overlay */}
      <div className="absolute top-[232px] sm:top-[248px] md:top-[132px] lg:top-[320px] left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
        <Image
          src="/mask-group-pattern.svg"
          alt=""
          width={936}
          height={936}
          className="w-[936px] sm:w-[1404px] md:w-[2106px] lg:w-[2808px] h-auto opacity-30 sm:opacity-40 md:opacity-50 mix-blend-multiply"
          style={{
            filter: "hue-rotate(15deg) saturate(0.7) brightness(1.2)",
          }}
        />
      </div>

      <div className="w-full max-w-[937px] lg:w-[937px] mx-auto px-2 sm:px-4 md:px-8 lg:px-0 relative z-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Hero Content */}
          <div className="self-stretch rounded-[3px] flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <h1 className="w-full max-w-[748.71px] lg:w-[748.71px] text-center text-[#37322F] text-[24px] xs:text-[28px] sm:text-[36px] md:text-[52px] lg:text-[80px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-24 font-serif px-2 sm:px-4 md:px-0">
              {heading}
            </h1>
            <p className="w-full max-w-[506.08px] lg:w-[506.08px] text-center text-[rgba(55,50,47,0.80)] text-sm sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-[1.5] lg:leading-7 font-sans px-2 sm:px-4 md:px-0 font-medium">
              {sub_heading}
            </p>
          </div>

          {/* CTA Buttons */}
          {CTAs && CTAs.length > 0 && (
            <div className="w-full max-w-[497px] lg:w-[497px] flex justify-center items-center gap-4 mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex-wrap">
              {CTAs.map((cta, index) => (
                <Button
                  key={index}
                  variant={cta.variant ?? "default"}
                  size="default"
                  asChild
                >
                  <Link
                    href={cta.URL ?? "#"}
                    target={cta.target ?? "_self"}
                    rel={cta.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {cta.text ?? "Get Started"}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
