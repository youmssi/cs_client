import { createTRPCRouter } from "@/trpc/init";
import { comingSoonRouter } from "@/features/cs/server/routers";

export const appRouter = createTRPCRouter({
  comingSoon: comingSoonRouter,
});

export type AppRouter = typeof appRouter;