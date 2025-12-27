import { HydrateClient, getCaller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { LayoutContent } from '@/components/layout-content';
import { ErrorView } from '@/components/state-views';
import type { Global } from "@/types";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Allow dynamic routes for newly added locales
export const dynamicParams = true;

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;
  // Locale is always provided by middleware, but fallback just in case
  const resolvedLocale = locale;
  
  // Server-side data fetching for SSG (must be resilient for builds when Strapi is offline)
  const caller = await getCaller();
  let globalData: Global = { seo: null, navbar: null, footer: null, localizations: [] };

  try {
    globalData = await caller.comingSoon.getGlobal({ locale: resolvedLocale });
  } catch {
    console.warn(`Global data not found for locale: ${resolvedLocale}`);
  }

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
