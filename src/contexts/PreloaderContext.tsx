"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PreloaderContextValue = {
  registerVideo: (id: string) => () => void;
  markVideoLoaded: (id: string) => void;
  reset: () => void;
  allVideosLoaded: boolean;
  hasVideos: boolean;
  preloaderHidden: boolean;
  setPreloaderHidden: (value: boolean) => void;
};

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function PreloaderContextProvider({ children }: { children: ReactNode }) {
  const [registered, setRegistered] = useState<Set<string>>(() => new Set());
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const [preloaderHidden, setPreloaderHidden] = useState(false);

  const reset = useCallback(() => {
    setRegistered(() => new Set());
    setLoaded(() => new Set());
    setPreloaderHidden(false);
  }, []);

  const registerVideo = useCallback((id: string) => {
    setRegistered((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    return () => {
      setRegistered((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    };
  }, []);

  const markVideoLoaded = useCallback((id: string) => {
    setLoaded((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const hasVideos = registered.size > 0;
  const allVideosLoaded =
    hasVideos && loaded.size >= registered.size;

  const value = useMemo(
    () => ({
      registerVideo,
      markVideoLoaded,
      reset,
      allVideosLoaded,
      hasVideos,
      preloaderHidden,
      setPreloaderHidden,
    }),
    [registerVideo, markVideoLoaded, reset, allVideosLoaded, hasVideos, preloaderHidden]
  );

  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
