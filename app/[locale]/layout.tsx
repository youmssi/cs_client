import { HydrateClient, getCaller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { LayoutContent } from '@/components/layout-content';
import { ErrorView } from '@/components/state-views';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;
  const resolvedLocale = locale ?? 'en';
  
  // Server-side data fetching for SSG
  const caller = await getCaller();
  const globalData = await caller.comingSoon.getGlobal({ locale: resolvedLocale });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Failed to load layout" />}>
        <LayoutContent globalData={globalData}>
          {children}
        </LayoutContent>
      </ErrorBoundary>
    </HydrateClient>
  );
}
