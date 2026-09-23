"use client";

import type { ReactNode } from "react";
import { SiteProvider } from "@/components/site-context";
import { SampleTray } from "@/components/sample-tray";
import { RfqDrawer } from "@/components/rfq-drawer";
import { ProcurementModal } from "@/components/procurement-modal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      {children}
      <SampleTray />
      <RfqDrawer />
      <ProcurementModal />
    </SiteProvider>
  );
}
