import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TRPCReactProvider } from '@/trpc/client';
import { getCaller } from '@/trpc/server';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { DEFAULT_METADATA } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: DEFAULT_METADATA.TITLE,
    template: `%s | ${DEFAULT_METADATA.SITE_NAME}`,
  },
  description: DEFAULT_METADATA.DESCRIPTION,
  keywords: DEFAULT_METADATA.KEYWORDS,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const caller = await getCaller();
  const globalData = await caller.comingSoon.getGlobal({});

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar navbar={globalData.navbar} />
            <main className="flex-1">{children}</main>
            <Footer footer={globalData.footer} />
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
