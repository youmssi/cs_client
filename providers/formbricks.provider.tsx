"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import formbricks from "@formbricks/js";
import { envClient } from "@/lib/env.client";

export function FormbricksProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const envId = envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID;
    const appUrl = envClient.NEXT_PUBLIC_FORMBRICKS_APP_URL || "https://app.formbricks.com";
    if (!envId) return;

    formbricks
      .setup({ environmentId: envId, appUrl })
      .then(() => {
        // Mark SDK as ready so track() calls work
        window.__formbricksReady = true;
      })
      .catch((err: unknown) => {
        console.warn("[Formbricks] setup failed:", err);
      });
  }, []);

  useEffect(() => {
    if (!envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID) return;
    formbricks?.registerRouteChange();
  }, [pathname, searchParams]);

  return null;
}

// Extend window type
declare global {
  interface Window {
    __formbricksReady?: boolean;
  }
}
