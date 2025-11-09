'use client';

import React from "react";
import { useGlobal } from '@/features/cs/hooks/use-coming-soon';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { useParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n-config';
import { ModeToggle } from '@/components/mode-toggle';
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function LocaleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const params = useParams<{ locale: Locale }>();
  const locale = params?.locale ?? 'en';
  const { data: globalData, isLoading, error } = useGlobal(locale);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading global data</div>;

  if (!globalData?.navbar || !globalData?.footer) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen">
      <DottedGlowBackground
        className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-100"
        opacity={1}
        gap={12}
        radius={2}
        colorLightVar="--color-neutral-400"
        glowColorLightVar="--color-neutral-500" 
        colorDarkVar="--color-neutral-600"
        glowColorDarkVar="--color-primary"
        backgroundOpacity={0}
        speedMin={0.2}
        speedMax={1.0}
        speedScale={0.8}
      />
      <div className="relative z-10">
        <Navbar navbar={globalData.navbar} />
        {children}
        <Footer footer={globalData.footer} />
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </div>
  );
}
