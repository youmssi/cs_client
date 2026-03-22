"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import formbricks from "@formbricks/js";

const ENV_ID = process.env.NEXT_PUBLIC_FORMBRICKS_ENV_ID;
const APP_URL = process.env.NEXT_PUBLIC_FORMBRICKS_APP_URL ?? "https://app.formbricks.com";

export default function FormbricksProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ENV_ID) return;
    formbricks.setup({ environmentId: ENV_ID, appUrl: APP_URL });
  }, []);

  useEffect(() => {
    if (!ENV_ID) return;
    formbricks?.registerRouteChange();
  }, [pathname, searchParams]);

  return null;
}
