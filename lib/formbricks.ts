"use client";

import formbricks from "@formbricks/js";
import { envClient } from "@/lib/env.client";

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
  if (!envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID) return;
  try {
    formbricks.track(action);
  } catch {
    // SDK not ready yet — ignore
  }
}

export const SURVEY_IDS = {
  BOOK_A_CALL: envClient.NEXT_PUBLIC_FORMBRICKS_SURVEY_BOOK_A_CALL,
  CUSTOM_PROJECT: envClient.NEXT_PUBLIC_FORMBRICKS_SURVEY_CUSTOM_PROJECT,
} as const;
