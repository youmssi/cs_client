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
 * Settings → Website & App Connection → Actions (Code type)
 *
 * book-a-call    → triggers "Book a Call" survey    (CTA section button)
 * custom-project → triggers "Custom Project" survey (Custom Budget section button)
 */
export const FORMBRICKS_ACTIONS = {
  BOOK_A_CALL: "book-a-call",
  CUSTOM_PROJECT: "custom-project",
} as const;

/**
 * Trigger a Formbricks survey by action name.
 * Retries once after 1s if the SDK isn't ready yet.
 */
export function triggerSurvey(action: string) {
  if (!envClient.NEXT_PUBLIC_FORMBRICKS_ENV_ID || typeof window === "undefined") return;
  if (!window.__formbricksReady) {
    setTimeout(() => triggerSurvey(action), 1000);
    return;
  }
  try {
    formbricks.track(action);
  } catch {/* silent */}
}
