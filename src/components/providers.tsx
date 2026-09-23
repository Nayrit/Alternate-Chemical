"use client";

import type { ReactNode } from "react";
import { SiteProvider } from "@/components/site-context";
import { SampleTray } from "@/components/sample-tray";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      {children}
      <SampleTray />
    </SiteProvider>
  );
}
