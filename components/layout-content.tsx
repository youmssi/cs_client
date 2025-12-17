"use client";

import React from "react";
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { ModeToggle } from '@/components/mode-toggle';
import type { Global } from '@/types';

interface LayoutContentProps {
  children: React.ReactNode;
  globalData: Global;
}

export function LayoutContent({ children, globalData }: Readonly<LayoutContentProps>) {
  const { navbar, footer } = globalData;

  if (!navbar || !footer) {
    return <>{children}</>;
  }

  return (
    <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col items-center">
      <div className="relative flex flex-col items-center w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col items-start min-h-screen">
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>
          <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
            <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
              <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]"></div>
              <Navbar navbar={navbar} />
            </div>
            <div className="relative z-0 w-full">
              {children}
            </div>
          </div>
          <div className="relative z-0 w-full">
            <Footer footer={footer} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-60">
        <ModeToggle />
      </div>
    </div>
  );
}
