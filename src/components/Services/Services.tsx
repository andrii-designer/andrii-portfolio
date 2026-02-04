"use client";

import { useState } from "react";
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
      "We'll discuss your goals, define the scope, and outline a clear plan so you know exactly what to expect.",
    imageSrc: "/assets/images/services/placeholder.svg",
    imageAlt: "Web and mobile app design preview",
  },
  {
    title: "3D & Motion design",
    description:
      "Creating immersive 3D visuals and smooth motion graphics that bring your brand to life.",
    imageSrc: "/assets/images/services/placeholder.svg",
    imageAlt: "3D and motion design preview",
  },
  {
    title: "Branding",
    description:
      "Building cohesive brand identities that resonate with your audience and stand out in the market.",
    imageSrc: "/assets/images/services/placeholder.svg",
    imageAlt: "Branding design preview",
  },
  {
    title: "3D, 2D",
    description:
      "Crafting detailed 2D and 3D illustrations that communicate your ideas with visual impact.",
    imageSrc: "/assets/images/services/placeholder.svg",
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
      className="flex flex-col w-full"
      style={{
        paddingTop: "var(--token-space-24)", /* 24px top padding */
        paddingBottom: "var(--token-space-192)", /* 192px bottom padding */
      }}
      aria-label="Services"
      data-node-id="services-section"
    >
      {/* Title Component — reusable */}
      <Title
        index={`( ${index} )`}
        label={label}
        heading={title}
      />

      {/* Services Container — holds list and actions */}
      <div
        className="services-container flex flex-col w-full"
        style={{
          marginTop: "var(--token-space-256)", /* 256px gap between title and container */
        }}
      >
        {/* Services List */}
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

        {/* Services Actions — Book a call button */}
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
    </motion.section>
  );
};

export default Services;
