"use client";

import React from "react";
import type { Global } from '@/types';

import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';

interface LayoutContentProps {
  children: React.ReactNode;
  globalData: Global;
}

/**
 * Brillance landing page shell.
 * We keep data-driven Global navbar/footer (Strapi) but render them in the
 * exact Brillance visual frame (rails, background, spacing).
 */
export function LayoutContent({ children, globalData }: Readonly<LayoutContentProps>) {
  const { navbar, footer } = globalData;

  if (!navbar || !footer) {
    return <>{children}</>;
  }

  return (
    <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
          {/* Left vertical line */}
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0" />

          {/* Right vertical line */}
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0" />

          <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-start items-center gap-0 relative z-10">
            {/* Navigation (Strapi Global) */}
            <Navbar navbar={navbar} />

            {/* Page content (Strapi Dynamic Zone) */}
            <div className="w-full">
              {children}
            </div>

            {/* Footer (Strapi Global) */}
            <Footer footer={footer} />
          </div>
        </div>
      </div>
    </div>
  );
}
