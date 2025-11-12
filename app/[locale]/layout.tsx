import { prefetchGlobal, prefetchLocales } from '@/features/cs/server/prefetch';
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LayoutContent } from '@/components/layout-content';
import { LoadingView, ErrorView } from '@/components/state-views';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;
  const resolvedLocale = locale ?? 'en';
  
  prefetchGlobal(resolvedLocale);
  prefetchLocales();

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Failed to load layout" />}>
        <Suspense fallback={<LoadingView message="Loading..." />}>
          <LayoutContent locale={resolvedLocale}>
            {children}
          </LayoutContent>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
