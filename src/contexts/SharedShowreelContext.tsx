"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import LazyVimeo from "@/components/media/LazyVimeo";

const SHOWREEL_IFRAME_SRC =
  "https://player.vimeo.com/video/1173027362?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0&quality=360p&preload=auto";
const SHOWREEL_POSTER = "/assets/images/thumbs/showreel2026-thumb.webp";

export type ShowreelSlotId =
  | "hero"
  | "video"
  | "bookcall-desktop"
  | "bookcall-mobile";

type SharedShowreelContextValue = {
  activeSlotId: ShowreelSlotId | null;
  registerSlot: (id: ShowreelSlotId, ref: React.RefObject<HTMLDivElement | null>) => void;
  unregisterSlot: (id: ShowreelSlotId) => void;
};

const SharedShowreelContext = createContext<SharedShowreelContextValue | null>(
  null,
);

export function useSharedShowreel() {
  return useContext(SharedShowreelContext);
}

export function SharedShowreelProvider({ children }: { children: ReactNode }) {
  const [activeSlotId, setActiveSlotId] = useState<ShowreelSlotId | null>(null);
  const slotsRef = useRef<Map<ShowreelSlotId, React.RefObject<HTMLDivElement | null>>>(
    new Map(),
  );

  const registerSlot = useCallback(
    (id: ShowreelSlotId, ref: React.RefObject<HTMLDivElement | null>) => {
      slotsRef.current.set(id, ref);
    },
    [],
  );

  const unregisterSlot = useCallback((id: ShowreelSlotId) => {
    slotsRef.current.delete(id);
  }, []);

  const ratiosRef = useRef<Map<Element, number>>(new Map());

  useEffect(() => {
    const slots = Array.from(slotsRef.current.entries());
    if (slots.length === 0) return;

    const elementToId = new Map<Element, ShowreelSlotId>();
    slots.forEach(([id, ref]) => {
      if (ref.current) elementToId.set(ref.current, id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set(entry.target, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let bestId: ShowreelSlotId | null = null;
        ratiosRef.current.forEach((ratio, el) => {
          const id = elementToId.get(el);
          if (id != null && ratio > maxRatio) {
            maxRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && maxRatio > 0) {
          setActiveSlotId(bestId);
        } else if (maxRatio === 0 && !bestId) {
          setActiveSlotId(null);
        }
      },
      { rootMargin: "0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    slots.forEach(([, ref]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Default to hero on first paint so video loads immediately (above-the-fold).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setActiveSlotId((prev) => (prev === null ? "hero" : prev));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const value: SharedShowreelContextValue = {
    activeSlotId,
    registerSlot,
    unregisterSlot,
  };

  return (
    <SharedShowreelContext.Provider value={value}>
      {children}
      <SharedShowreelPortal activeSlotId={activeSlotId} slotsRef={slotsRef} />
    </SharedShowreelContext.Provider>
  );
}

function SharedShowreelPortal({
  activeSlotId,
  slotsRef,
}: {
  activeSlotId: ShowreelSlotId | null;
  slotsRef: React.RefObject<Map<ShowreelSlotId, React.RefObject<HTMLDivElement | null>>>;
}) {
  if (!activeSlotId) return null;

  const ref = slotsRef.current?.get(activeSlotId)?.current;
  if (!ref || typeof document === "undefined") return null;

  const isVideoSection = activeSlotId === "video";

  return createPortal(
    <LazyVimeo
      fill={isVideoSection}
      {...(!isVideoSection && { aspectPadding: "56.25%" })}
      poster=""
      iframeSrc={SHOWREEL_IFRAME_SRC}
      ariaLabel="Showreel 2026"
      playOnVisible
      insertImmediately
      showImmediately
      iframeLoading="eager"
    />,
    ref,
  );
}

export type SharedShowreelSlotProps = {
  id: ShowreelSlotId;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
};

export function SharedShowreelSlot({
  id,
  className,
  style,
  fill = false,
}: SharedShowreelSlotProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const ctx = useSharedShowreel();

  useEffect(() => {
    if (!ctx) return;
    ctx.registerSlot(id, slotRef);
    return () => ctx.unregisterSlot(id);
  }, [id, ctx]);

  if (!ctx) {
    return (
      <div className={className} style={style}>
        <LazyVimeo
          poster={SHOWREEL_POSTER}
          iframeSrc={SHOWREEL_IFRAME_SRC}
          {...(fill ? { fill: true } : { aspectPadding: "56.25%" })}
          ariaLabel="Showreel 2026"
          playOnVisible
        />
      </div>
    );
  }

  const isActive = ctx.activeSlotId === id;

  return (
    <div
      ref={slotRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        ...(fill && { position: "absolute", inset: 0, width: "100%", height: "100%" }),
        ...style,
      }}
    >
    </div>
  );
}
