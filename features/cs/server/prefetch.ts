import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type GetGlobalInput = inferInput<typeof trpc.comingSoon.getGlobal>;
type GetPageBySlugInput = inferInput<typeof trpc.comingSoon.getPageBySlug>;
type GetPagesInput = inferInput<typeof trpc.comingSoon.getPages>;

/**
 * Prefetches global data
 * @param params - Input parameters
 * @returns Prefetch function for global data
 */
export const prefetchGlobal = (params: GetGlobalInput) => {
  return prefetch(trpc.comingSoon.getGlobal.queryOptions(params));
};

/**
 * Prefetches page data by slug
 * @param params - Input parameters
 * @returns Prefetch function for page data
 */
export const prefetchPageBySlug = (params: GetPageBySlugInput) => {
  return prefetch(trpc.comingSoon.getPageBySlug.queryOptions(params));
};

/**
 * Prefetches all pages data
 * @param params - Input parameters
 * @returns Prefetch function for all pages data
 */
export const prefetchPages = (params: GetPagesInput) => {
  return prefetch(trpc.comingSoon.getPages.queryOptions(params));
};
