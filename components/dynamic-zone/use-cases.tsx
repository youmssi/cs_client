"use client";

import {
  Building2,
  Stethoscope,
  GraduationCap,
  Users,
  Briefcase,
  Heart,
  Shield,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CardContainer, CardItem } from "@/components/aceternity/three-d-card";
import { SectionHeader } from "@/components/global/section-header";
import type { UseCasesBlock } from "@/types";

interface UseCasesProps extends UseCasesBlock {
  accentColor?: string | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
  building: Building2,
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  users: Users,
  briefcase: Briefcase,
  heart: Heart,
  shield: Shield,
  wallet: Wallet,
};

export function UseCases({ header_section, cases, accentColor }: Readonly<UseCasesProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!cases || cases.length === 0) return null;

  return (
    <section
      ref={ref}
      className="w-full border-b border-brand-ink/10 bg-brand-surface"
      style={{ "--product-accent": accentColor ?? "#50B8D9" } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionHeader
            header={header_section}
            defaultHeading="Designed for the people who run the institution"
            defaultSubHeading="Every role gets a workflow that matches their daily reality."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((useCase, idx) => {
            const Icon = useCase.icon_name ? ICON_MAP[useCase.icon_name] : null;
            const bullets = useCase.bullets
              ? useCase.bullets.split("\n").map((b) => b.trim()).filter(Boolean)
              : [];
            return (
              <CardContainer key={useCase.id} containerClassName="py-0">
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                  className="w-full"
                >
                  <CardItem className="w-full h-full rounded-2xl border border-brand-border bg-brand-surface-raised p-6 md:p-8 flex flex-col gap-4">
                    {Icon && (
                      <CardItem
                        translateZ={40}
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${accentColor ?? "#50B8D9"} 15%, transparent)`,
                          color: accentColor ?? "#50B8D9",
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </CardItem>
                    )}
                    <CardItem translateZ={50} as="h3" className="text-lg md:text-xl font-semibold text-brand-ink leading-tight">
                      {useCase.persona_label}
                    </CardItem>
                    {useCase.description && (
                      <CardItem translateZ={30} as="p" className="text-sm md:text-base text-brand-text leading-relaxed">
                        {useCase.description}
                      </CardItem>
                    )}
                    {bullets.length > 0 && (
                      <CardItem translateZ={20} as="ul" className="flex flex-col gap-2 mt-1">
                        {bullets.map((bullet, bIdx) => (
                          <li key={`${useCase.id}-bullet-${bIdx}`} className="flex items-start gap-2 text-sm text-brand-dark/80">
                            <span
                              className="mt-2 h-1 w-1 rounded-full shrink-0"
                              style={{ backgroundColor: accentColor ?? "#50B8D9" }}
                            />
                            {bullet}
                          </li>
                        ))}
                      </CardItem>
                    )}
                  </CardItem>
                </motion.div>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
