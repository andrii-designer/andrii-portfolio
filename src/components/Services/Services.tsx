"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Title from "@/components/Title";
import BookCallButton from "@/components/Button/BookCallButton";
import ServiceItem, { ServiceItemProps } from "./ServiceItem";

/**
 * Services — Services section component
 * Figma node-id: Services section frame
 *
 * Layout specs (from Figma screenshot):
 * - Section padding: 24px top/left/right, 192px bottom
 * - Title to services container gap: 256px
 * - Services list: vertical stack, full width
 * - Only one item active at a time (hover-based activation)
 * - Book a call button positioned at bottom right of container
 *
 * Hover behavior:
 * - Service item expands on mouse hover
 * - Only one item can be active at a time
 * - First item is active by default when no hover
 * - Respects prefers-reduced-motion
 *
 * Tokens used:
 * - Spacing: --token-space-24, --token-space-192, --token-space-256
 * - Colors: --token-color-primary (section background)
 */

/** Service data type */
export type ServiceData = Omit<ServiceItemProps, "active" | "index" | "isLast">;

export type ServicesProps = {
  /** Array of services to display */
  services?: ServiceData[];
  /** Section title (default: "Services") */
  title?: string;
  /** Section index (default: "002") */
  index?: string;
  /** Section label (default: "what can i provide you with") */
  label?: string;
};

/** Default services data matching Figma design */
const defaultServices: ServiceData[] = [
  {
    title: "Web & Mobile Apps",
    description:
      "Web and mobile apps that combine clear product thinking with strong visual design and motion, creating interfaces that are distinctive, intuitive, and ready for development.",
    imageSrc: "/assets/Web & Mobile Apps.png",
    imageAlt: "Web and mobile app design preview",
  },
  {
    title: "Motion design",
    description:
      "Creating immersive 3D visuals and smooth motion graphics that bring your brand to life.",
    imageSrc: "/assets/Motion design.png",
    imageAlt: "Motion design service preview",
  },
  {
    title: "Branding",
    description:
      "Building cohesive brand identities that resonate with your audience and stand out in the market.",
    imageSrc: "/assets/Branding.png",
    imageAlt: "Branding design preview",
  },
  {
    title: "3D, 2D",
    description:
      "Crafting detailed 2D and 3D illustrations that communicate your ideas with visual impact.",
    imageSrc: "/assets/2D.png",
    imageAlt: "3D and 2D illustration preview",
  },
];

const Services = ({
  services = defaultServices,
  title = "Services",
  index = "002",
  label = "what can i provide you with",
}: ServicesProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const heroImageSrc = services[0]?.imageSrc;
  const heroImageAlt = services[0]?.imageAlt ?? "Service preview";

  // Handle hover activation
  const handleHover = (itemIndex: number) => {
    setActiveIndex(itemIndex);
  };

  const containerMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const buttonMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.3 },
      };

  return (
    <motion.section
      {...containerMotion}
      className="services-section flex flex-col w-full"
      style={{
        paddingTop: "var(--token-space-24)", /* 24px top padding */
        paddingBottom: "var(--token-space-192)", /* 192px bottom padding */
      }}
      aria-labelledby="services-title"
      data-node-id="services-section"
    >
      {/* Title — shared; id for aria-labelledby on section */}
      <Title
        index={`( ${index} )`}
        label={label}
        heading={title}
        headingId="services-title"
      />

      {/* Desktop/tablet: hover-based list + CTA (hidden on mobile via CSS) */}
      <div
        className="services-container services-layout-desktop flex flex-col w-full"
        style={{
          marginTop: "var(--token-space-256)", /* 256px gap between title and container */
        }}
      >
        <div className="services-list flex flex-col w-full">
          {services.map((service, serviceIndex) => (
            <ServiceItem
              key={serviceIndex}
              index={serviceIndex}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              imageAlt={service.imageAlt}
              active={activeIndex === serviceIndex}
              isLast={serviceIndex === services.length - 1}
              onHover={() => handleHover(serviceIndex)}
            />
          ))}
        </div>
        <motion.div
          {...buttonMotion}
          className="services-actions flex justify-end w-full"
          style={{
            marginTop: "var(--token-space-48)", /* 48px gap between list and button */
          }}
        >
          <BookCallButton href="/contact" />
        </motion.div>
      </div>

      {/* Mobile only: single hero image + headings-only list + CTA (hidden on desktop/tablet via CSS) */}
      <div
        className="services-layout-mobile w-full"
        style={{
          marginTop: "var(--token-space-256)", /* same title-to-content gap as desktop */
        }}
      >
        {heroImageSrc && (
          <div className="services-hero-visual">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              quality={100}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 50vw"
              className="object-cover"
              style={{ borderRadius: 0 }}
              loading="lazy"
            />
          </div>
        )}
        <ul className="services-list-mobile" role="list">
          {services.flatMap((service, serviceIndex) => {
            const contentItem = (
              <li
                key={serviceIndex}
                className="services-item-mobile"
                style={{
                  paddingTop: "var(--token-space-24)",
                  paddingBottom:
                    serviceIndex === services.length - 1
                      ? 0
                      : "var(--token-space-24)",
                }}
              >
                <div
                  className="services-item-content-mobile"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3 className="services-item-title-mobile">{service.title}</h3>
                  {service.description && (
                    <p
                      className="process-desc services-item-description-mobile"
                      style={{
                        fontFamily: "var(--token-font-family-base)",
                        fontSize: "var(--token-size-body-sm)",
                        fontWeight: "var(--token-weight-semibold)",
                        lineHeight: "var(--token-leading-150)",
                        color: "var(--token-color-accent)",
                        margin: 0,
                        marginTop: "var(--token-space-16)",
                        maxWidth: "448px",
                      }}
                    >
                      {service.description}
                    </p>
                  )}
                </div>
              </li>
            );
            if (serviceIndex === 0) return [contentItem];
            return [
              <li
                key={`divider-${serviceIndex}`}
                className="services-item-divider-li"
                aria-hidden="true"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  margin: 0,
                  listStyle: "none",
                }}
              >
                <div className="services-item-divider" />
              </li>,
              contentItem,
            ];
          })}
        </ul>
        <div className="services-cta-mobile">
          <BookCallButton href="/contact" />
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
