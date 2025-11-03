import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from '@/lib/trpc/client';
import { api } from '@/lib/trpc/server';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'MRVIN100 - Software for Everyone, Everywhere',
    template: '%s | MRVIN100',
  },
  description: 'Build globally usable software solutions accessible to communities worldwide.',
  keywords: [
    'open source software',
    'community-driven development',
    'global software solutions',
    'free software',
    'managed hosting',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let globalData = null;
  try {
    globalData = await api.global.get();
  } catch (error) {
    console.error('Error loading global data:', error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {globalData && <Navbar navbar={globalData.navbar} />}
            <main className="flex-1">{children}</main>
            {globalData && <Footer footer={globalData.footer} />}
            <Toaster />
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
