"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Sector } from "@/lib/data";

export type RfqIntent = "sample" | "quotation";

export type RfqLaunch = {
  intent: RfqIntent;
  productIds: string[];
  sector?: Sector;
};

type SiteContextValue = {
  rfqOpen: boolean;
  rfqSession: number;
  launch: RfqLaunch;
  openRfq: (launch?: Partial<RfqLaunch>) => void;
  closeRfq: () => void;
  procurementOpen: boolean;
  openProcurement: () => void;
  closeProcurement: () => void;
  tray: string[];
  toggleTray: (id: string) => void;
  clearTray: () => void;
  filter: Sector | "all";
  setFilter: (filter: Sector | "all") => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const emptyLaunch: RfqLaunch = { intent: "quotation", productIds: [] };

export function SiteProvider({ children }: { children: ReactNode }) {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqSession, setRfqSession] = useState(0);
  const [launch, setLaunch] = useState<RfqLaunch>(emptyLaunch);
  const [procurementOpen, setProcurementOpen] = useState(false);
  const [tray, setTray] = useState<string[]>([]);
  const [filter, setFilter] = useState<Sector | "all">("all");

  const openRfq = useCallback((next?: Partial<RfqLaunch>) => {
    setLaunch({
      intent: next?.intent ?? "quotation",
      productIds: next?.productIds ?? [],
      sector: next?.sector,
    });
    setRfqSession((session) => session + 1);
    setRfqOpen(true);
    setProcurementOpen(false);
  }, []);

  const closeRfq = useCallback(() => setRfqOpen(false), []);
  const openProcurement = useCallback(() => {
    setProcurementOpen(true);
    setRfqOpen(false);
  }, []);
  const closeProcurement = useCallback(() => setProcurementOpen(false), []);

  const toggleTray = useCallback((id: string) => {
    setTray((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }, []);

  const clearTray = useCallback(() => setTray([]), []);

  const value = useMemo(
    () => ({
      rfqOpen,
      rfqSession,
      launch,
      openRfq,
      closeRfq,
      procurementOpen,
      openProcurement,
      closeProcurement,
      tray,
      toggleTray,
      clearTray,
      filter,
      setFilter,
    }),
    [
      rfqOpen,
      rfqSession,
      launch,
      openRfq,
      closeRfq,
      procurementOpen,
      openProcurement,
      closeProcurement,
      tray,
      toggleTray,
      clearTray,
      filter,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within SiteProvider");
  }
  return context;
}
