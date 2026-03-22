"use client";

import { Suspense } from "react";
import { FormbricksProvider } from "./formbricks.provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <FormbricksProvider />
      </Suspense>
      {children}
    </>
  );
}
