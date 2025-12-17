"use client";

import { useEffect, useState } from "react";
import type { TestimonialsBlock } from "@/types";
import { getStrapiMediaUrl } from "@/lib/media.strapi";

export function Testimonials(props: Readonly<TestimonialsBlock>) {
  const { items } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const list = items && items.length > 0 ? items : [];

  useEffect(() => {
    if (list.length === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % list.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 300);
    }, 12000);

    return () => clearInterval(interval);
  }, [list.length]);

  const handleNavigationClick = (index: number) => {
    if (list.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  if (list.length === 0) return null;

  const current = list[activeIndex];

  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      <div className="self-stretch px-2 overflow-hidden flex justify-start items-center bg-background border border-b border-l-0 border-r-0 border-t-0">
        <div className="flex-1 py-16 md:py-17 flex flex-col md:flex-row justify-center items-end gap-6">
          <div className="self-stretch px-3 md:px-12 justify-center items-start gap-4 flex flex-col md:flex-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-48 h-50 md:w-48 md:h-50 rounded-lg object-cover transition-all duration-700 ease-in-out"
              style={{
                opacity: isTransitioning ? 0.6 : 1,
                transform: isTransitioning ? "scale(0.95)" : "scale(1)",
                transition:
                  "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
              }}
              src={getStrapiMediaUrl(current?.image?.url)}
              alt={current?.name || "Testimonial"}
            />
            <div className="flex-1 px-6 py-6 shadow-[0px_0px_0px_0.75px_rgba(50,45,43,0.12)] overflow-hidden flex flex-col justify-start items-start gap-6 shadow-none pb-0 pt-0">
              <div
                className="self-stretch justify-start flex flex-col text-[#49423D] text-2xl md:text-[32px] font-medium leading-10 md:leading-[42px] h-[200px] md:h-[210px] overflow-hidden line-clamp-5 transition-all duration-700 ease-in-out tracking-tight"
                style={{
                  filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  transition: "filter 0.7s ease-in-out",
                }}
              >
                &ldquo;{current?.quote}&rdquo;
              </div>
              <div
                className="self-stretch flex flex-col justify-start items-start gap-1 transition-all duration-700 ease-in-out"
                style={{
                  filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  transition: "filter 0.7s ease-in-out",
                }}
              >
                <div className="self-stretch justify-center flex flex-col text-[rgba(73,66,61,0.90)] text-lg font-medium leading-[26px]">
                  {current?.name}
                </div>
                <div className="self-stretch justify-center flex flex-col text-[rgba(73,66,61,0.70)] text-lg font-medium leading-[26px]">
                  {current?.company}
                </div>
              </div>
            </div>
          </div>

          <div className="pr-6 justify-start items-start gap-[14px] flex">
            <button
              type="button"
              onClick={() =>
                handleNavigationClick(
                  (activeIndex - 1 + list.length) % list.length
                )
              }
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] justify-center items-center gap-2 flex hover:bg-gray-50 transition-colors"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#46413E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                handleNavigationClick((activeIndex + 1) % list.length)
              }
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] justify-center items-center gap-2 flex hover:bg-gray-50 transition-colors"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#46413E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
