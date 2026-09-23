"use client";

import type { ReactNode } from "react";
import { SiteProvider } from "@/components/site-context";
import { RfqDrawer } from "@/components/rfq-drawer";
import { ProcurementModal } from "@/components/procurement-modal";
import { SampleTray } from "@/components/sample-tray";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      {children}
      <RfqDrawer />
      <ProcurementModal />
      <SampleTray />
    </SiteProvider>
  );
}
