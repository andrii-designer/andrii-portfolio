"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const FirstScrollContext = createContext<boolean>(false);

/**
 * Detects scroll/touch for loadOnFirstScroll fallback (e.g. direct link to #section).
 * Primary trigger is preloaderHidden from PreloaderContext — set when overlay hides.
 */
export function FirstScrollProvider({ children }: { children: ReactNode }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (hasScrolled) return;

    const markScrolled = () => setHasScrolled(true);

    window.addEventListener("scroll", markScrolled, { passive: true });
    document.addEventListener("touchstart", markScrolled, { passive: true });
    document.addEventListener("touchmove", markScrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll", markScrolled);
      document.removeEventListener("touchstart", markScrolled);
      document.removeEventListener("touchmove", markScrolled);
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
