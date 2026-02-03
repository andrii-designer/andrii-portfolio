"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * ServiceItem — Individual service item for Services section
 * Figma node-id: Services section
 *
 * Layout specs (from Figma screenshot):
 * Active state:
 * - Parent container: padding top/bottom = 24px, border-bottom: 1px solid accent
 * - Two columns: image on right (533x353 aspect), text block on left
 * - Text container: vertical stack, gap 24px (dot → title → description)
 * - Dot: 6px diameter circle, accent color
 * - Title: h3 size (48px), semibold
 * - Description: paragraph small (14px), semibold
 *
 * Inactive state:
 * - Only shows dot + title
 * - Same padding and border pattern
 *
 * Tokens used:
 * - Typography: --token-size-h3 (48px), --token-size-body-xs (14px)
 * - Spacing: --token-space-6, --token-space-24
 * - Colors: --token-color-accent
 */

export type ServiceItemProps = {
  /** Service index (for accessibility) */
  index: number;
  /** Service title */
  title: string;
  /** Service description (shown only when active) */
  description?: string;
  /** Image source path (shown only when active) */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Whether this service item is currently active */
  active?: boolean;
  /** Whether this is the last item (no border) */
  isLast?: boolean;
};

const ServiceItem = forwardRef<HTMLDivElement, ServiceItemProps>(
  (
    {
      index,
      title,
      description,
      imageSrc,
      imageAlt = "Service preview",
      active = false,
      isLast = false,
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const contentMotion = prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, height: 0 },
          animate: active
            ? { opacity: 1, height: "auto" }
            : { opacity: 0, height: 0 },
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
        };

    const imageMotion = prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, x: 20 },
          animate: active ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 },
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.1 },
        };

    return (
      <div
        ref={ref}
        className="service-item w-full"
        style={{
          paddingTop: "var(--token-space-24)",
          paddingBottom: "var(--token-space-24)",
          borderBottom: isLast ? "none" : "1px solid var(--token-color-accent)",
        }}
        data-active={active}
        data-service-index={index}
      >
        {active ? (
          /* Active state — full layout with image and description */
          <div
            className="service-item-active flex flex-col md:flex-row w-full"
            style={{
              gap: "var(--token-space-24)",
              alignItems: "flex-start",
            }}
          >
            {/* Text Container — dot, title, description */}
            <div
              className="service-text-container flex flex-col flex-1"
              style={{
                gap: "var(--token-space-24)",
                minWidth: 0,
              }}
            >
              {/* Dot indicator */}
              <span
                className="service-dot"
                aria-hidden="true"
                style={{
                  width: "var(--token-space-6)",
                  height: "var(--token-space-6)",
                  borderRadius: "9999px",
                  background: "var(--token-color-accent)",
                  flexShrink: 0,
                }}
              />

              {/* Service Title */}
              <h3
                className="service-title text-accent"
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-h3)", /* 48px */
                  fontWeight: "var(--token-weight-semibold)", /* 600 */
                  lineHeight: "var(--token-leading-110)", /* 1.1 */
                  letterSpacing: "-1px",
                  margin: 0,
                }}
              >
                {title}
              </h3>

              {/* Service Description */}
              {description && (
                <motion.p
                  {...contentMotion}
                  className="service-description text-accent"
                  style={{
                    fontFamily: "var(--token-font-family-base)",
                    fontSize: "var(--token-size-body-xs)", /* 14px */
                    fontWeight: "var(--token-weight-semibold)", /* 600 */
                    lineHeight: "var(--token-leading-150)", /* 1.5 */
                    margin: 0,
                    maxWidth: "320px",
                  }}
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Image Container — aspect ratio 533:353 */}
            {imageSrc && (
              <motion.figure
                {...imageMotion}
                className="service-image-container relative overflow-hidden flex-shrink-0"
                style={{
                  width: "100%",
                  maxWidth: "533px",
                  aspectRatio: "533 / 353",
                  borderRadius: 0,
                }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 533px"
                  className="object-cover"
                  style={{ borderRadius: 0 }}
                  loading="lazy"
                />
              </motion.figure>
            )}
          </div>
        ) : (
          /* Inactive state — only dot and title */
          <div
            className="service-item-inactive flex items-center"
            style={{
              gap: "var(--token-space-24)",
            }}
          >
            {/* Dot indicator */}
            <span
              className="service-dot"
              aria-hidden="true"
              style={{
                width: "var(--token-space-6)",
                height: "var(--token-space-6)",
                borderRadius: "9999px",
                background: "var(--token-color-accent)",
                flexShrink: 0,
              }}
            />

            {/* Service Title */}
            <h3
              className="service-title text-accent"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-h3)", /* 48px */
                fontWeight: "var(--token-weight-medium)", /* 500 - lighter for inactive */
                lineHeight: "var(--token-leading-110)", /* 1.1 */
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              {title}
            </h3>
          </div>
        )}
      </div>
    );
  }
);

ServiceItem.displayName = "ServiceItem";

export default ServiceItem;
