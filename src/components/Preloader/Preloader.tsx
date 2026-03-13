"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PreloaderContextProvider, usePreloader } from "@/contexts/PreloaderContext";

const NO_VIDEOS_DELAY_MS = 800;
const MAX_WAIT_MS = 10000;

function PreloaderOverlay() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const preloader = usePreloader();
  const preloaderRef = useRef(preloader);
  preloaderRef.current = preloader;
  const isFirstMount = useRef(true);

  // Show preloader on each navigation (not on initial mount—already visible)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    preloaderRef.current?.reset?.();
    setIsVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (!isVisible) return;

    const start = Date.now();

    const hide = () => {
      preloaderRef.current?.setPreloaderHidden?.(true);
      setIsVisible(false);
    };

    const checkHide = () => {
      const p = preloaderRef.current;
      const elapsed = Date.now() - start;
      const videosReady = p?.allVideosLoaded ?? false;
      const noVideos = !p?.hasVideos;
      const noVideosElapsed = noVideos && elapsed >= NO_VIDEOS_DELAY_MS;
      const maxWaitReached = elapsed >= MAX_WAIT_MS;

      const canHide = videosReady || noVideosElapsed || maxWaitReached;

      if (canHide) hide();
    };

    const timer = setInterval(checkHide, 100);
    return () => clearInterval(timer);
  }, [isVisible, pathname]);

  return (
    <AnimatePresence>
        {isVisible && (
          <motion.div
            className="preloader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--token-color-primary)",
              pointerEvents: "auto",
            }}
            aria-hidden="true"
          >
            <motion.div
              className="preloader-logo"
              animate={{
                opacity: [1, 0.78, 1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/hero-assets/logo.svg"
                alt=""
                width={69}
                height={70}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </motion.div>
        )}
    </AnimatePresence>
  );
}

export function PreloaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreloaderContextProvider>
      {children}
      <PreloaderOverlay />
    </PreloaderContextProvider>
  );
}
