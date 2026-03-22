"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import formbricks from "@formbricks/js";
import { envClient } from "@/lib/env.client";

export function FormbricksProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID) return;
    formbricks.setup({
      environmentId: envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID,
      appUrl: envClient.NEXT_PUBLIC_FORMBRICKS_APP_URL || "https://app.formbricks.com",
    });
  }, []);

  useEffect(() => {
    if (!envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID) return;
    formbricks?.registerRouteChange();
  }, [pathname, searchParams]);

  return null;
}
