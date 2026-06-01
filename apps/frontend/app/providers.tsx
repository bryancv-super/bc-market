"use client";

import { ReactNode } from "react";
import { AppStateProvider } from "@/lib/mock/store";

export function Providers({ children }: { children: ReactNode }) {
  return <AppStateProvider>{children}</AppStateProvider>;
}
