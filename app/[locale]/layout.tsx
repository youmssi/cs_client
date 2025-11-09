'use client';

import React from "react";
import { useGlobal } from '@/features/cs/hooks/use-coming-soon';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { useParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n-config';
import { ModeToggle } from '@/components/mode-toggle';

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
    <>
      <Navbar navbar={globalData.navbar} />
      {children}
      <Footer footer={globalData.footer} />
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </>
  );
}
