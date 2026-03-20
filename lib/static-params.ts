import { getCaller } from '@/trpc/server';

// Must match middleware.ts LOCALES constant
const LOCALES = ['fr', 'en'];

export async function generatePageStaticParams() {
  const caller = await getCaller();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of LOCALES) {
    try {
      const pages = await caller.comingSoon.getPages({ locale });
      for (const page of pages) {
        if (page?.slug) params.push({ locale, slug: page.slug });
      }
    } catch {
      // ignore locales with no pages
    }
  }

  return params;
}

export async function generateLocaleStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
