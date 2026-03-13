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
    // touchstart: fires on any touch — iOS Safari may steal touchmove for native scroll
    document.addEventListener("touchstart", markScrolled, { passive: true });
    // touchmove: fires during scroll on Android and some iOS cases
    document.addEventListener("touchmove", markScrolled, { passive: true });

    // Fallback: poll scroll position — iOS updates scrollY during gesture even when scroll event is delayed
    const pollScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop ?? 0;
      if (y > 5) {
        markScrolled();
        return;
      }
      rafRef = requestAnimationFrame(pollScroll);
    };
    let rafRef = requestAnimationFrame(pollScroll);
    const timeout = setTimeout(() => cancelAnimationFrame(rafRef), 60000);

    return () => {
      window.removeEventListener("scroll", markScrolled);
      document.removeEventListener("touchstart", markScrolled);
      document.removeEventListener("touchmove", markScrolled);
      cancelAnimationFrame(rafRef);
      clearTimeout(timeout);
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
