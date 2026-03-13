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
 * Detects when the user has "engaged" so we can load below-fold videos.
 *
 * Primary trigger: preloaderhidden — when the preloader hides (Hero has played),
 * we immediately start loading. This is device-agnostic and works on all mobile
 * browsers (iOS Safari, Chrome, etc.) where scroll/touch events can be unreliable.
 *
 * Fallbacks: scroll, touchstart, touchmove — for navigation paths where the
 * preloader might not fire (e.g. direct link to anchor).
 */
export function FirstScrollProvider({ children }: { children: ReactNode }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (hasScrolled) return;

    const markScrolled = () => setHasScrolled(true);

    // Primary: preloader hidden — Hero has played, user can see the page
    const onPreloaderHidden = () => markScrolled();
    window.addEventListener("preloaderhidden", onPreloaderHidden);

    // Fallbacks: scroll/touch for direct navigation to #section
    window.addEventListener("scroll", markScrolled, { passive: true });
    document.addEventListener("touchstart", markScrolled, { passive: true });
    document.addEventListener("touchmove", markScrolled, { passive: true });

    return () => {
      window.removeEventListener("preloaderhidden", onPreloaderHidden);
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
