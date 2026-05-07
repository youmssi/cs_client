import type { Metadata } from 'next';
import { HydrateClient, getCaller } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import { LayoutContent } from '@/components/layout-content';
import { ErrorView } from '@/components/state-views';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TRPCReactProvider } from '@/trpc/client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { AppProvider } from '@/providers';
import type { Global } from '@/types';
import { generateLocaleStaticParams } from '@/lib/static-params';
import { DEFAULT_METADATA, OG_LOCALE_MAP } from '@/lib/constants';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return generateLocaleStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: DEFAULT_METADATA.TITLE,
      template: `%s — ${DEFAULT_METADATA.SITE_NAME}`,
    },
    description: DEFAULT_METADATA.DESCRIPTION,
    keywords: DEFAULT_METADATA.KEYWORDS,
    openGraph: {
      siteName: DEFAULT_METADATA.SITE_NAME,
      type: 'website',
      locale: OG_LOCALE_MAP[locale] ?? locale,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mrvin100.de';

  const caller = await getCaller();
  let globalData: Global = { seo: null, navbar: null, footer: null, localizations: [] };

  try {
    globalData = await caller.comingSoon.getGlobal({ locale: locale });
  } catch {
    console.warn(`Global data not found for locale: ${locale}`);
  }

  const socialLinks = globalData.footer?.social_media_links ?? [];
  const logoUrl = globalData.navbar?.logo?.image?.url
    ? (globalData.navbar.logo.image.url.startsWith('http')
        ? globalData.navbar.logo.image.url
        : `${siteUrl}${globalData.navbar.logo.image.url}`)
    : `${siteUrl}/mrvin100.svg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: DEFAULT_METADATA.SITE_NAME,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
        },
        sameAs: socialLinks.map((l) => l.URL).filter(Boolean),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: DEFAULT_METADATA.SITE_NAME,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: locale,
      },
    ],
  };

  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NuqsAdapter>
          <AppProvider>
            <HydrateClient>
              <ErrorBoundary fallback={<ErrorView message="Failed to load layout" />}>
                <LayoutContent globalData={globalData}>
                  {children}
                </LayoutContent>
              </ErrorBoundary>
            </HydrateClient>
          </AppProvider>
        </NuqsAdapter>
        <Toaster />
      </ThemeProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </TRPCReactProvider>
  );
}
