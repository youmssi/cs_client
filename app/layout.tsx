import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TRPCReactProvider } from '@/trpc/client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { DEFAULT_METADATA } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: ['400'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: DEFAULT_METADATA.TITLE,
    template: `%s — ${DEFAULT_METADATA.SITE_NAME}`,
  },
  description: DEFAULT_METADATA.DESCRIPTION,
  keywords: DEFAULT_METADATA.KEYWORDS,
  metadataBase: new URL('https://mrvin100.de'),
  openGraph: {
    siteName: DEFAULT_METADATA.SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <main>{children}</main>
            </NuqsAdapter>
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
