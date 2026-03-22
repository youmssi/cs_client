'use client';
import { useState } from 'react';
import { ANCHORS } from "@/lib/constants";
import type { FAQBlock } from '@/types';

export function FAQ({ heading, sub_heading, faqs }: Readonly<FAQBlock>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id={ANCHORS.FAQ} className="w-full flex justify-center items-start border-b border-[rgba(55,50,47,0.12)]">
      <div className="flex-1 px-4 md:px-12 lg:px-24 py-16 md:py-20 flex flex-col items-center gap-10 md:gap-14">
        {/* Header */}
        <div className="w-full max-w-[640px] flex flex-col items-center gap-3 text-center">
          <h2 className="text-[#49423D] font-semibold leading-tight md:leading-[44px] text-4xl tracking-tight">
            {heading}
          </h2>
          {sub_heading && (
            <p className="text-[#605A57] text-base font-normal leading-7">
              {sub_heading}
            </p>
          )}
        </div>

        {/* Accordion — single open at a time */}
        <div className="w-full max-w-[720px] flex flex-col border-t border-[rgba(73,66,61,0.16)]">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={`faq-${index}`} className="w-full border-b border-[rgba(73,66,61,0.16)] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 text-[#49423D] text-base font-medium leading-6">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 shrink-0 text-[rgba(73,66,61,0.60)] transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    viewBox="0 0 24 24" fill="none"
                  >
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-[18px] text-[#605A57] text-sm font-normal leading-6">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
