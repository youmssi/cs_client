"use client";

import { trpc } from "@/trpc/client";

/**
 * Hook to fetch global data
 * @param locale - Locale for the content
 * @returns Query result for global data
 */
export function useGlobal(locale = "en") {
  return trpc.comingSoon.getGlobal.useQuery({ locale });
}

/**
 * Hook to fetch page data by slug
 * @param slug - Page slug
 * @param locale - Locale for the content
 * @returns Query result for page data
 */
export function usePageBySlug(slug: string, locale = "en") {
  return trpc.comingSoon.getPageBySlug.useQuery({ slug, locale });
}

/**
 * Hook to fetch all pages
 * @param locale - Locale for the content
 * @returns Query result for all pages
 */
export function usePages(locale = "en") {
  return trpc.comingSoon.getPages.useQuery({ locale });
}

/**
 * Hook to fetch available locales
 * @returns Query result for available locales
 */
export function useLocales() {
  return trpc.comingSoon.getLocales.useQuery();
}