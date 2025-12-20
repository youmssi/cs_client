"use client";

import { useMemo, useState } from "react";
import type { JSX } from "react";

import type { PricingBlock, PricingPlan } from "@/types";
import { SectionHeader } from "@/components/global/section-header";
import { Button } from "@/components/ui/button";

function normalizePrice(value: number | string | null | undefined): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function normalizeFeatures(features?: string | string[] | null): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features.filter((f) => f.trim() !== "");
  // Treat as multiline text
  return features
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

export function Pricing({
  header_section,
  frequency_toggle_label_monthly,
  frequency_toggle_label_yearly,
  plans,
}: Readonly<PricingBlock>): JSX.Element {
  const [billingPeriod, setBillingPeriod] =
    useState<"monthly" | "annually">("annually");
    

  const effectivePlans: PricingPlan[] = useMemo(() => {
    return Array.isArray(plans) ? plans : [];
  }, [plans]);

  const defaultHeading = "Choose the perfect plan for your business";
  const defaultSubHeading =
    "Scale your operations with flexible pricing that grows with your team.\nStart free, upgrade when you're ready.";

  const monthlyLabel = frequency_toggle_label_monthly ?? "Monthly";
  const yearlyLabel = frequency_toggle_label_yearly ?? "Annually";

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <SectionHeader
          header={header_section ?? null}
          defaultBadgeText="Plans & Pricing"
          defaultBadgeVariant="pricing"
          defaultHeading={defaultHeading}
          defaultSubHeading={defaultSubHeading}
        />
      </div>

      <div className="self-stretch px-6 md:px-16 py-9 relative flex justify-center items-center gap-4">
        <div className="w-full max-w-[1060px] h-0 absolute left-1/2 transform -translate-x-1/2 top-[63px] border-t border-[rgba(55,50,47,0.12)] z-0" />

        <div className="p-3 relative bg-[rgba(55,50,47,0.03)] border border-[rgba(55,50,47,0.02)] backdrop-blur-[44px] backdrop-saturate-150 backdrop-brightness-110 flex justify-center items-center rounded-lg z-20 before:absolute before:inset-0 before:bg-white before:opacity-60 before:rounded-lg before:-z-10">
          <div className="p-[2px] bg-[rgba(55,50,47,0.10)] shadow-[0px_1px_0px_white] rounded-[99px] border-[0.5px] border-[rgba(55,50,47,0.08)] flex justify-center items-center gap-[2px] relative">
            <div
              className={`absolute top-[2px] w-[calc(50%-1px)] h-[calc(100%-4px)] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)] rounded-[99px] transition-all duration-300 ease-in-out ${
                billingPeriod === "annually" ? "left-[2px]" : "right-[2px]"
              }`}
            />

            <Button
              type="button"
              variant="ghost"
              onClick={() => setBillingPeriod("annually")}
              className="px-4 py-1 rounded-[99px] flex justify-center items-center gap-2 transition-colors duration-300 relative z-10 flex-1 bg-transparent hover:bg-transparent"
            >
              <span
                className={`text-[13px] font-medium leading-5 font-sans transition-colors duration-300 ${
                  billingPeriod === "annually" ? "text-[#37322F]" : "text-[#6B7280]"
                }`}
              >
                {yearlyLabel}
              </span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => setBillingPeriod("monthly")}
              className="px-4 py-1 rounded-[99px] flex justify-center items-center gap-2 transition-colors duration-300 relative z-10 flex-1 bg-transparent hover:bg-transparent"
            >
              <span
                className={`text-[13px] font-medium leading-5 font-sans transition-colors duration-300 ${
                  billingPeriod === "monthly" ? "text-[#37322F]" : "text-[#6B7280]"
                }`}
              >
                {monthlyLabel}
              </span>
            </Button>
          </div>

          <div className="w-[3px] h-[3px] absolute left-[5px] top-[5.25px] bg-[rgba(55,50,47,0.10)] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]" />
          <div className="w-[3px] h-[3px] absolute right-[5px] top-[5.25px] bg-[rgba(55,50,47,0.10)] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]" />
          <div className="w-[3px] h-[3px] absolute left-[5px] bottom-[5.25px] bg-[rgba(55,50,47,0.10)] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]" />
          <div className="w-[3px] h-[3px] absolute right-[5px] bottom-[5.25px] bg-[rgba(55,50,47,0.10)] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]" />
        </div>
      </div>

      <div className="self-stretch border-b border-t border-[rgba(55,50,47,0.12)] flex justify-center items-center">
        <div className="flex justify-center items-start w-full">
          <div className="w-12 self-stretch relative overflow-hidden hidden md:block">
            <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={`pattern-left-${i}`}
                  className="self-stretch h-4 -rotate-45 origin-top-left outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 py-12 md:py-0">
            {effectivePlans.map((plan, index) => {
              const isDark = (plan.card_theme ?? "light") === "dark";
              const isPrimary = isDark || index === 1;

              return (
                <PricingCard
                  key={`${plan.name ?? "plan"}-${index}`}
                  variant={isPrimary ? "dark" : "light"}
                  title={plan.name ?? ""}
                  description={plan.description ?? ""}
                  price={normalizePrice(
                    billingPeriod === "monthly"
                      ? plan.monthly_price
                      : plan.annual_price,
                  )}
                  period={billingPeriod}
                  ctaText={isPrimary ? "Get started" : "Start for free"}
                  ctaVariant={isPrimary ? "light" : "dark"}
                  features={normalizeFeatures(plan.features)}
                />
              );
            })}
          </div>

          <div className="w-12 self-stretch relative overflow-hidden hidden md:block">
            <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={`pattern-right-${i}`}
                  className="self-stretch h-4 -rotate-45 origin-top-left outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  variant,
  title,
  description,
  price,
  period,
  ctaText,
  ctaVariant,
  features,
}: {
  variant: "light" | "dark";
  title: string;
  description: string;
  price: number;
  period: "monthly" | "annually";
  ctaText: string;
  ctaVariant: "light" | "dark";
  features: string[];
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "flex-1 max-w-full md:max-w-none self-stretch px-6 py-5 bg-[#37322F] border border-[rgba(50,45,43,0.12)] border-[rgba(55,50,47,0.12)] overflow-hidden flex flex-col justify-start items-start gap-12"
          : "flex-1 max-w-full md:max-w-none self-stretch px-6 py-5 bg-white border border-[#E0DEDB] overflow-hidden flex flex-col justify-start items-start gap-12"
      }
    >
      <div className="self-stretch flex flex-col justify-start items-center gap-9">
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className={isDark ? "text-[#FBFAF9] text-lg font-medium leading-7 font-sans" : "text-[rgba(55,50,47,0.90)] text-lg font-medium leading-7 font-sans"}>
            {title}
          </div>
          <div className={isDark ? "w-full max-w-[242px] text-[#B2AEA9] text-sm font-normal leading-5 font-sans" : "w-full max-w-[242px] text-[rgba(41,37,35,0.70)] text-sm font-normal leading-5 font-sans"}>
            {description}
          </div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className={isDark ? "relative h-[60px] flex items-center text-[#F0EFEE] text-5xl font-medium leading-[60px] font-serif" : "relative h-[60px] flex items-center text-[#37322F] text-5xl font-medium leading-[60px] font-serif"}>
              <span className="invisible">${price}</span>
              <span className="absolute inset-0 flex items-center">${price}</span>
            </div>
            <div className={isDark ? "text-[#D2C6BF] text-sm font-medium font-sans" : "text-[#847971] text-sm font-medium font-sans"}>
              per {period === "monthly" ? "month" : "year"}, per user.
            </div>
          </div>
        </div>

        <div
          className={
            ctaVariant === "light"
              ? "self-stretch px-4 py-[10px] relative bg-[#FBFAF9] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] overflow-hidden rounded-[99px] flex justify-center items-center"
              : "self-stretch px-4 py-[10px] relative bg-[#37322F] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] overflow-hidden rounded-[99px] flex justify-center items-center"
          }
        >
          <div className="w-full h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply" />
          <div className={ctaVariant === "light" ? "max-w-[108px] flex justify-center flex-col text-[#37322F] text-[13px] font-medium leading-5 font-sans" : "max-w-[108px] flex justify-center flex-col text-[#FBFAF9] text-[13px] font-medium leading-5 font-sans"}>
            {ctaText}
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        {features.map((feature, index) => (
          <div key={`${feature}-${index}`} className="self-stretch flex justify-start items-center gap-[13px]">
            <div className="w-4 h-4 relative flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke={isDark ? "#FF8000" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={isDark ? "flex-1 text-[#F0EFEE] text-[12.5px] font-normal leading-5 font-sans" : "flex-1 text-[rgba(55,50,47,0.80)] text-[12.5px] font-normal leading-5 font-sans"}>
              {feature}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
