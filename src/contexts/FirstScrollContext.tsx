"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const FirstScrollContext = createContext<boolean>(false);

export function FirstScrollProvider({ children }: { children: ReactNode }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (hasScrolled) return;
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  return (
    <FirstScrollContext.Provider value={hasScrolled}>
      {children}
    </FirstScrollContext.Provider>
  );
}

export function useFirstScroll() {
  return useContext(FirstScrollContext);
}
