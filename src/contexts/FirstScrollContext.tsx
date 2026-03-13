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
    const markScrolled = () => setHasScrolled(true);
    // scroll: fires on desktop; on iOS Safari it fires only after scroll stops
    window.addEventListener("scroll", markScrolled, { passive: true });
    // touchmove: fires during scroll on mobile — iOS delays scroll until gesture ends
    window.addEventListener("touchmove", markScrolled, { passive: true });
    return () => {
      window.removeEventListener("scroll", markScrolled);
      window.removeEventListener("touchmove", markScrolled);
    };
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
