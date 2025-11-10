import { prefetch, trpc } from "@/trpc/server";

/**
 * Prefetches global data
 * @param locale - Locale for the content
 * @returns Prefetch function for global data
 */
export const prefetchGlobal = (locale: string) => {
  return prefetch(trpc.comingSoon.getGlobal.queryOptions({ locale }));
};

/**
 * Prefetches page data by slug
 * @param slug - Page slug
 * @param locale - Locale for the content
 * @returns Prefetch function for page data
 */
export const prefetchPageBySlug = (slug: string, locale: string) => {
  return prefetch(trpc.comingSoon.getPageBySlug.queryOptions({ slug, locale }));
};

/**
 * Prefetches all pages data
 * @param locale - Locale for the content
 * @returns Prefetch function for all pages data
 */
export const prefetchPages = (locale: string) => {
  return prefetch(trpc.comingSoon.getPages.queryOptions({ locale }));
};
