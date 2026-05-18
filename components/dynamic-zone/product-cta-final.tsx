"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/locale-link";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Spotlight } from "@/components/aceternity/spotlight";
import { DEFAULT_PRODUCT_ACCENT } from "@/lib/constants";
import type { ProductCtaFinalBlock } from "@/types";

interface ProductCtaFinalProps extends ProductCtaFinalBlock {
  accentColor?: string | null;
}

export function ProductCtaFinal({
  eyebrow,
  heading,
  sub_heading,
  primary_cta,
  secondary_cta,
  accentColor,
}: Readonly<ProductCtaFinalProps>) {
  if (!heading && !primary_cta && !secondary_cta) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-brand-ink"
      style={{ "--product-accent": accentColor ?? DEFAULT_PRODUCT_ACCENT } as React.CSSProperties}
    >
      <BackgroundBeams accent={accentColor ?? DEFAULT_PRODUCT_ACCENT} />
      <Spotlight className="-top-32 right-0" fill={accentColor ?? DEFAULT_PRODUCT_ACCENT} />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col items-center text-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {eyebrow && (
            <p
              className="text-sm md:text-base font-medium tracking-wide uppercase"
              style={{ color: accentColor ?? DEFAULT_PRODUCT_ACCENT }}
            >
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="max-w-3xl text-3xl md:text-5xl lg:text-6xl font-serif font-normal leading-[1.1] tracking-tight text-balance text-white">
              {heading}
            </h2>
          )}
          {sub_heading && (
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/70 text-pretty">
              {sub_heading}
            </p>
          )}
          {(primary_cta || secondary_cta) && (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {primary_cta?.URL && (
                <Button
                  asChild
                  size="lg"
                  className="text-white shadow-2xl hover:brightness-110 transition-all"
                  style={{ backgroundColor: accentColor ?? DEFAULT_PRODUCT_ACCENT }}
                >
                  <LocaleLink
                    href={primary_cta.URL}
                    target={primary_cta.target ?? "_self"}
                    rel={primary_cta.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {primary_cta.text ?? "Book a call"}
                  </LocaleLink>
                </Button>
              )}
              {secondary_cta?.URL && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/5 backdrop-blur border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <LocaleLink
                    href={secondary_cta.URL}
                    target={secondary_cta.target ?? "_self"}
                    rel={secondary_cta.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {secondary_cta.text ?? "Learn more"}
                  </LocaleLink>
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
