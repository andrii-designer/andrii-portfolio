"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const FirstInteractionContext = createContext<boolean>(false);

/**
 * User-gesture fallback for mobile: listen for first pointerdown, touchstart, or click.
 * Fires when user touches (to scroll) or clicks anywhere — reliable on iOS/Android.
 * Use capture phase so we receive the event before any other handler.
 */
export function FirstInteractionProvider({ children }: { children: ReactNode }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;

    const mark = () => setHasInteracted(true);

    // Capture phase: receive before target handlers; passive for touch/pointer
    document.addEventListener("pointerdown", mark, { capture: true, passive: true });
    document.addEventListener("touchstart", mark, { capture: true, passive: true });
    document.addEventListener("click", mark, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", mark, { capture: true });
      document.removeEventListener("touchstart", mark, { capture: true });
      document.removeEventListener("click", mark, { capture: true });
    };
  }, [hasInteracted]);

  return (
    <FirstInteractionContext.Provider value={hasInteracted}>
      {children}
    </FirstInteractionContext.Provider>
  );
}

export function useFirstInteraction() {
  return useContext(FirstInteractionContext);
}
