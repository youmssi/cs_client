'use client';

import React from "react";
import { useGlobal } from '@/features/cs/hooks/use-coming-soon';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { useParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n-config';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from "@/lib/utils";

export default function LocaleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const params = useParams<{ locale: Locale }>();
  const locale = params?.locale ?? 'en';
  const { data: globalData } = useGlobal(locale);

  if (!globalData?.navbar || !globalData?.footer) {
    return <>{children}</>;
  }

  return (
    <div className="relative bg-white dark:bg-black">
      {/* Navbar - outside dot background */}
      <div className="relative z-10">
        <Navbar navbar={globalData.navbar} />
      </div>
      
      {/* Children with Dot Background */}
      <div className="relative">
        {/* Dot Background Pattern - only for children */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[20px_20px]",
            "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        
        {/* Children Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
      
      {/* Footer - outside dot background */}
      <div className="relative z-10">
        <Footer footer={globalData.footer} />
      </div>
      
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </div>
  );
}
