import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type GetPageInput = inferInput<typeof trpc.comingSoon.getPage>;
type GetPageBySlugInput = inferInput<typeof trpc.comingSoon.getPageBySlug>;
type GetProductsInput = inferInput<typeof trpc.comingSoon.getProducts>;

/**
 * Prefetch page data
 */
export const prefetchPage = (params: GetPageInput) => {
  return prefetch(trpc.comingSoon.getPage.queryOptions(params));
};

/**
 * Prefetch a single page by slug
 */
export const prefetchPageBySlug = (params: GetPageBySlugInput) => {
  return prefetch(trpc.comingSoon.getPageBySlug.queryOptions(params));
};

/**
 * Prefetch products data
 */
export const prefetchProducts = (params: GetProductsInput) => {
  return prefetch(trpc.comingSoon.getProducts.queryOptions(params));
};
