"use client";

import { SharedShowreelProvider } from "@/contexts/SharedShowreelContext";
import type { ReactNode } from "react";

export function HomePageClient({ children }: { children: ReactNode }) {
  return <SharedShowreelProvider>{children}</SharedShowreelProvider>;
}
