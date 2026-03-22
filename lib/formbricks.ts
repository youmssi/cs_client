"use client";

import formbricks from "@formbricks/js";
import { envClient } from "@/lib/env.client";

declare global {
  interface Window {
    __formbricksReady?: boolean;
  }
}

/**
 * Named actions — must match exactly what's configured in Formbricks dashboard
 * under Settings → Website & App Connection → Actions
 */
export const FORMBRICKS_ACTIONS = {
  BOOK_A_CALL: "book-a-call",
  CUSTOM_PROJECT: "custom-project",
} as const;

/**
 * Trigger a Formbricks survey by action name.
 * The survey must be set to trigger on this action in the Formbricks dashboard.
 */
export function triggerSurvey(action: string) {
  if (!envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID) {
    console.warn("[Formbricks] triggerSurvey: ENV_ID not set");
    return;
  }
  if (typeof window === "undefined") return;
  if (!window.__formbricksReady) {
    console.warn("[Formbricks] triggerSurvey: SDK not ready yet, retrying in 1s...");
    setTimeout(() => triggerSurvey(action), 1000);
    return;
  }
  formbricks.track(action).catch((err: unknown) => {
    console.warn("[Formbricks] track failed:", err);
  });
}

export const SURVEY_IDS = {
  BOOK_A_CALL: envClient.NEXT_PUBLIC_FORMBRICKS_SURVEY_BOOK_A_CALL,
  CUSTOM_PROJECT: envClient.NEXT_PUBLIC_FORMBRICKS_SURVEY_CUSTOM_PROJECT,
} as const;
