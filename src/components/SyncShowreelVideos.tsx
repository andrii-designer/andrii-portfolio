"use client";

import { useEffect } from "react";

/**
 * SyncShowreelVideos
 *
 * Keeps all homepage showreel videos (hero, full-width section, Book a call)
 * roughly in sync so that when the user scrolls, they don't see the clip
 * restart from the beginning each time.
 *
 * Implementation:
 * - All participating <video> elements share the "showreel-video" class.
 * - The first instance in DOM order is treated as the "master".
 * - Other instances ("slaves") periodically copy currentTime and play/pause
 *   state from the master on timeupdate and when they become ready.
 */
export function SyncShowreelVideos() {
  useEffect(() => {
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>(".showreel-video"),
    );

    if (videos.length <= 1) return;

    const [master, ...slaves] = videos;

    const syncSlave = (slave: HTMLVideoElement) => {
      if (!master || master.readyState < 1 || slave.readyState < 1) return;

      try {
        // Align playback position
        if (Math.abs(slave.currentTime - master.currentTime) > 0.1) {
          slave.currentTime = master.currentTime;
        }

        // Mirror play/pause state
        if (master.paused && !slave.paused) {
          slave.pause();
        } else if (!master.paused && slave.paused) {
          void slave.play().catch(() => {
            // Ignore autoplay blocking — videos are muted so this should generally succeed
          });
        }
      } catch {
        // Best-effort sync; ignore errors from seeking/playing
      }
    };

    const handleMasterTimeUpdate = () => {
      slaves.forEach(syncSlave);
    };

    const slaveListeners: Array<{
      el: HTMLVideoElement;
      onLoadedMeta: () => void;
      onPlay: () => void;
    }> = [];

    master.addEventListener("timeupdate", handleMasterTimeUpdate);

    slaves.forEach((slave) => {
      const onLoadedMeta = () => syncSlave(slave);
      const onPlay = () => syncSlave(slave);

      slave.addEventListener("loadedmetadata", onLoadedMeta);
      slave.addEventListener("play", onPlay);

      slaveListeners.push({ el: slave, onLoadedMeta, onPlay });
    });

    // Initial sync attempt once all are queried
    slaves.forEach(syncSlave);

    return () => {
      master.removeEventListener("timeupdate", handleMasterTimeUpdate);
      slaveListeners.forEach(({ el, onLoadedMeta, onPlay }) => {
        el.removeEventListener("loadedmetadata", onLoadedMeta);
        el.removeEventListener("play", onPlay);
      });
    };
  }, []);

  return null;
}

