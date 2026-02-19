"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Title from "@/components/Title";
import TestimonialCard, { TestimonialData } from "./TestimonialCard";

/** Mobile breakpoint (max-width: 767px) for testimonials layout and title */
const MOBILE_MAX_WIDTH = 767;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

/**
 * Testimonials — Testimonials section with accessible 3-item slider
 *
 * Layout specs (from Figma reference):
 * - Section uses .section-wrap + .section-inner pattern
 * - Title index: "( 004 )", label: "WHAT DO CLIENTS SAY", heading: "Testimonials"
 * - Testimonial text: h4 token (36px, semibold), max-width 1038px
 * - Gap between testimonial text and control row: 80px
 * - Control row: avatar (70x70 square), client info (name + role + LinkedIn), slider controls
 * - Client name: h6 token (20px, semibold)
 * - Role/LinkedIn/indicator: Label Medium (16px, medium weight, 0px letter spacing, 115% line height)
 * - Gap avatar to text: 24px
 * - Gap indicator to arrows: 64px
 * - Slider: 3 testimonials, prev/next arrows (70x70px), page indicator "1/3"
 * - Arrow behavior: both arrows active (dark bg) in middle slides, disabled arrow has no bg
 *
 * Accessibility:
 * - Carousel region with aria-label
 * - Slides with role="group" aria-roledescription="slide"
 * - Navigation buttons with aria-labels
 * - aria-disabled for disabled buttons
 * - Respects prefers-reduced-motion
 *
 * Tokens used:
 * - Spacing: --token-space-24, --token-space-64, --token-space-80, --token-space-192
 * - Typography: --token-size-h4, --token-size-h6, --token-size-label-md, --token-leading-115
 * - Colors: --token-color-accent, --token-color-base
 */

export type TestimonialsProps = {
  /** Array of testimonials (default: 3 testimonials) */
  testimonials?: TestimonialData[];
};

/** Default testimonials data matching design */
const defaultTestimonials: TestimonialData[] = [
  {
    id: "1",
    text: "Andrii executed his work excellently. He was reliable, communicated effectively, and adhered to the schedule. His skills and quality of work met my expectations, and I'm likely to recommend him.",
    clientName: "Joe Jesuele",
    clientRole: "Founder of HomeJab",
    avatarSrc: "/assets/images/testimonials/avatar-1.png",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id: "2",
    text: "Working with Andrii was a fantastic experience. His attention to detail and creative approach brought our vision to life. The final product exceeded our expectations.",
    clientName: "Sarah Chen",
    clientRole: "Product Manager at TechCorp",
    avatarSrc: "/assets/images/testimonials/avatar-2.png",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id: "3",
    text: "Andrii's design expertise transformed our platform. He understood our needs perfectly and delivered a solution that was both beautiful and functional. Highly recommended.",
    clientName: "Michael Torres",
    clientRole: "CEO at StartupXYZ",
    avatarSrc: "/assets/images/testimonials/avatar-3.png",
    linkedInUrl: "https://linkedin.com",
  },
];

const Testimonials = ({ testimonials = defaultTestimonials }: TestimonialsProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSlides = testimonials.length;
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;
  const currentTestimonial = testimonials[currentIndex];

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    if (!isFirstSlide) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isFirstSlide]);

  const goToNext = useCallback(() => {
    if (!isLastSlide) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastSlide]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    },
    [goToPrevious, goToNext]
  );

  // Touch/swipe support
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Animation variants
  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 1 },
        center: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        enter: (direction: number) => ({
          x: direction > 0 ? 50 : -50,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (direction: number) => ({
          x: direction < 0 ? 50 : -50,
          opacity: 0,
        }),
      };

  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // Track direction for animation
  }, [currentIndex]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0 && !isLastSlide) {
      setCurrentIndex((prev) => prev + 1);
    } else if (newDirection < 0 && !isFirstSlide) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Container animation
  const containerMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  return (
    <motion.div
      {...containerMotion}
      className="testimonials-wrapper flex flex-col w-full"
      style={{
        paddingTop: "var(--token-space-24)" /* 24px top padding */,
        paddingBottom: "var(--token-space-192)" /* 192px bottom padding */,
      }}
      role="region"
      aria-label="Testimonials carousel"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      {/* Title Component — "Feedback" on mobile only (max-width: 767px) */}
      <Title
        index="( 004 )"
        label="what do clients say"
        heading={isMobile ? "Feedback" : "Testimonials"}
      />

      {/* Testimonials Content Container */}
      <div
        className="testimonials-content"
        style={{
          marginTop: "var(--token-space-256)" /* 256px gap from title */,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isMobile ? (
          /* Mobile (max-width: 767px): single article per slide — quote, text, avatar, meta, controls */
          <div
            className="testimonials-slides"
            style={{
              position: "relative",
              width: "100%",
              minHeight: "var(--token-size-192)",
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }
                }
                className="testimonial-item"
                aria-label={`Slide ${currentIndex + 1} of ${totalSlides}`}
              >
                <TestimonialCard
                  testimonial={currentTestimonial}
                  isActive={true}
                  slideIndex={currentIndex + 1}
                  totalSlides={totalSlides}
                />
                <div className="testimonial-avatar-block">
                  <Image
                    src={currentTestimonial.avatarSrc}
                    alt={`${currentTestimonial.clientName} avatar`}
                    width={64}
                    height={64}
                    className="testimonial-avatar"
                  />
                </div>
                <div className="testimonial-meta">
                  <div className="testimonial-name">{currentTestimonial.clientName}</div>
                  <div className="testimonial-role-or-desc">
                    {currentTestimonial.clientRole}
                    {currentTestimonial.linkedInUrl && (
                      <>
                        {" • "}
                        <a
                          href={currentTestimonial.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label-link-md"
                        >
                          LinkedIn
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div
                  className="testimonial-controls"
                  role="group"
                  aria-label="Feedback controls"
                >
                  <div
                    className="testimonial-pagination"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {currentIndex + 1}/{totalSlides}
                  </div>
                  <div className="testimonial-controls-arrows">
                    <button
                      type="button"
                      onClick={() => paginate(-1)}
                      disabled={isFirstSlide}
                      aria-disabled={isFirstSlide}
                      aria-label="Previous"
                      className="testimonial-control prev"
                    >
                      <Image
                        src={
                          isFirstSlide
                            ? "/assets/images/testimonials/disabled arrow.svg"
                            : "/assets/images/testimonials/active arrow.svg"
                        }
                        alt=""
                        width={25}
                        height={16}
                        aria-hidden="true"
                        style={{
                          transform: isFirstSlide ? "none" : "rotate(180deg)",
                        }}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => paginate(1)}
                      disabled={isLastSlide}
                      aria-disabled={isLastSlide}
                      aria-label="Next"
                      className="testimonial-control next"
                    >
                      <Image
                        src={
                          isLastSlide
                            ? "/assets/images/testimonials/disabled arrow.svg"
                            : "/assets/images/testimonials/active arrow.svg"
                        }
                        alt=""
                        width={25}
                        height={16}
                        aria-hidden="true"
                        style={{
                          transform: isLastSlide ? "rotate(180deg)" : "none",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        ) : (
          /* Desktop/tablet: slides + control row (avatar left, nav right) */
          <>
            <div
              className="testimonials-slides"
              style={{
                position: "relative",
                width: "100%",
                minHeight: "var(--token-size-192)",
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }
                  }
                >
                  <TestimonialCard
                    testimonial={currentTestimonial}
                    isActive={true}
                    slideIndex={currentIndex + 1}
                    totalSlides={totalSlides}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="testimonials-controls"
              style={{
                marginTop: "var(--token-space-80)" /* 80px gap */,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                gap: "var(--token-space-24)",
              }}
            >
              <div
                className="testimonials-client-info"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "var(--token-space-24)" /* 24px gap between avatar and text */,
                }}
              >
                <div
                  className="testimonials-avatar"
                  style={{
                    width: "var(--token-size-64)",
                    height: "var(--token-size-64)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={currentTestimonial.avatarSrc}
                    alt={`${currentTestimonial.clientName}'s profile photo`}
                    width={64}
                    height={64}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  className="testimonials-client-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--token-space-12)",
                  }}
                >
                  <span
                    className="testimonials-client-name"
                    style={{
                      fontFamily: "var(--token-font-family-base)",
                      fontSize: "var(--token-size-h6)" /* 20px */,
                      fontWeight: "var(--token-weight-semibold)" /* 600 */,
                      lineHeight: "var(--token-leading-140)" /* 140% */,
                      color: "var(--token-color-accent)",
                    }}
                  >
                    {currentTestimonial.clientName}
                  </span>
                  <div
                    className="testimonials-client-meta"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "var(--token-space-8)",
                    }}
                  >
                    <span
                      className="testimonials-client-role"
                      style={{
                        fontFamily: "var(--token-font-family-base)",
                        fontSize: "var(--token-size-label-md)" /* 16px */,
                        fontWeight: "var(--token-weight-semibold)" /* 600 */,
                        lineHeight: "var(--token-leading-115)" /* 115% */,
                        letterSpacing: "0px",
                        color: "var(--token-color-accent)",
                      }}
                    >
                      {currentTestimonial.clientRole}
                    </span>
                    {currentTestimonial.linkedInUrl && (
                      <>
                        <span
                          aria-hidden="true"
                          style={{
                            fontFamily: "var(--token-font-family-base)",
                            fontSize: "var(--token-size-label-md)" /* 16px */,
                            fontWeight: "var(--token-weight-semibold)" /* 600 */,
                            letterSpacing: "0px",
                            color: "var(--token-color-accent)",
                          }}
                        >
                          •
                        </span>
                        <a
                          href={currentTestimonial.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label-link-md"
                          style={{
                            fontWeight: "var(--token-weight-semibold)",
                          }}
                        >
                          LinkedIn
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="testimonials-nav"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "var(--token-space-0)",
                }}
              >
            <span
              className="testimonials-indicator"
              style={{
                fontFamily: "var(--token-font-family-base)",
                fontSize: "var(--token-size-label-md)" /* 16px */,
                fontWeight: "var(--token-weight-semibold)" /* 600 */,
                lineHeight: "var(--token-leading-115)" /* 115% */,
                letterSpacing: "0px",
                color: "var(--token-color-accent)",
                marginRight: "var(--token-space-64)" /* 64px gap to arrows */,
              }}
              aria-live="polite"
              aria-atomic="true"
            >
                  {currentIndex + 1}/{totalSlides}
                </span>
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  disabled={isFirstSlide}
                  aria-disabled={isFirstSlide}
                  aria-label="Previous testimonial"
                  className="testimonials-nav-btn testimonials-nav-btn--prev"
                  style={{
                    width: "var(--token-size-64)",
                    height: "var(--token-size-64)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isFirstSlide
                      ? "transparent"
                      : "var(--token-color-accent)",
                    border: "none",
                    cursor: isFirstSlide ? "not-allowed" : "pointer",
                    transition: "background-color 0.2s ease",
                    outline: "none",
                    padding: 0,
                  }}
                >
                  <Image
                    src={
                      isFirstSlide
                        ? "/assets/images/testimonials/disabled arrow.svg"
                        : "/assets/images/testimonials/active arrow.svg"
                    }
                    alt=""
                    width={25}
                    height={16}
                    aria-hidden="true"
                    style={{
                      transform: isFirstSlide ? "none" : "rotate(180deg)",
                    }}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  disabled={isLastSlide}
                  aria-disabled={isLastSlide}
                  aria-label="Next testimonial"
                  className="testimonials-nav-btn testimonials-nav-btn--next"
                  style={{
                    width: "var(--token-size-64)",
                    height: "var(--token-size-64)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isLastSlide
                      ? "transparent"
                      : "var(--token-color-accent)",
                    border: "none",
                    cursor: isLastSlide ? "not-allowed" : "pointer",
                    transition: "background-color 0.2s ease",
                    outline: "none",
                    padding: 0,
                  }}
                >
                  <Image
                    src={
                      isLastSlide
                        ? "/assets/images/testimonials/disabled arrow.svg"
                        : "/assets/images/testimonials/active arrow.svg"
                    }
                    alt=""
                    width={25}
                    height={16}
                    aria-hidden="true"
                    style={{
                      transform: isLastSlide ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Focus styles for navigation buttons; mobile-only layout for testimonial-item */}
      <style jsx>{`
        .testimonials-nav-btn:focus-visible {
          outline: 2px solid var(--token-color-accent);
          outline-offset: 2px;
        }
        .testimonial-control:focus-visible {
          outline: 2px solid var(--token-color-accent);
          outline-offset: 2px;
        }
        @media (max-width: 768px) {
          .testimonials-controls {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
        /* Mobile-only (max-width: 767px): square avatar, tokens for spacing, 1/3 left / arrows right */
        @media (max-width: 767px) {
          .testimonial-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
          }
          .testimonial-avatar-block {
            width: var(--token-size-64);
            height: var(--token-size-64);
            overflow: hidden;
            flex-shrink: 0;
            margin-top: var(--token-space-96);
          }
          .testimonial-avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            margin: 0;
          }
          .testimonial-meta {
            margin-top: var(--token-space-24);
            display: flex;
            flex-direction: column;
            gap: var(--token-space-12);
          }
          .testimonial-name {
            font-family: var(--token-font-family-base);
            font-size: var(--token-size-h6);
            font-weight: var(--token-weight-semibold);
            line-height: var(--token-leading-140);
            color: var(--token-color-accent);
          }
          .testimonial-role-or-desc {
            font-family: var(--token-font-family-base);
            font-size: var(--token-size-label-md);
            font-weight: var(--token-weight-semibold);
            line-height: var(--token-leading-115);
            letter-spacing: 0;
            color: var(--token-color-accent);
          }
          .testimonial-role-or-desc a {
            font-weight: var(--token-weight-semibold);
          }
          .testimonial-controls {
            margin-top: var(--token-space-96);
            display: flex;
            align-items: center;
            gap: var(--token-space-16);
            width: 100%;
            justify-content: space-between;
          }
          .testimonial-controls-arrows {
            display: flex;
            align-items: center;
            gap: var(--token-space-16);
          }
          .testimonial-control {
            width: var(--token-size-64);
            height: var(--token-size-64);
            min-width: var(--token-size-64);
            min-height: var(--token-size-64);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: none;
            padding: 0;
            outline: none;
            background: transparent;
            cursor: pointer;
          }
          .testimonial-control:not(:disabled) {
            background: var(--token-color-accent);
            cursor: pointer;
          }
          .testimonial-control:disabled {
            cursor: not-allowed;
          }
          .testimonial-pagination {
            font-family: var(--token-font-family-base);
            font-size: var(--token-size-label-md);
            font-weight: var(--token-weight-semibold);
            line-height: var(--token-leading-115);
            color: var(--token-color-accent);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Testimonials;
