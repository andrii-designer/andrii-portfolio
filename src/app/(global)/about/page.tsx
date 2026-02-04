"use client";

import Title from "@/components/Title";
import { BookCallButton } from "@/components/Button";
import Footer from "@/components/Footer";

/**
 * About page — placeholder content
 * 
 * Layout:
 * - Uses same section patterns as home page
 * - Section background: base color
 * - Side padding: 24px
 * 
 * TODO: Replace placeholder content with actual About content
 */
export default function AboutPage() {
  return (
    <>
      {/* About Section */}
      <section
        className="section-wrap"
        style={{
          backgroundColor: "var(--token-color-base)",
        }}
      >
        <div
          className="section-inner"
          style={{
            paddingLeft: "var(--token-space-24)",
            paddingRight: "var(--token-space-24)",
            paddingTop: "var(--token-space-48)",
            paddingBottom: "var(--token-space-192)",
          }}
        >
          <Title index="( 006 )" label="get to know me" heading="About" />

          <div
            style={{
              marginTop: "var(--token-space-256)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--token-space-64)",
              maxWidth: "800px",
            }}
          >
            {/* Bio Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--token-space-24)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-h4)",
                  fontWeight: "var(--token-weight-semibold)",
                  lineHeight: "var(--token-leading-120)",
                  color: "var(--token-color-accent)",
                  margin: 0,
                }}
              >
                Hi, I'm Andrii Vynarchyk
              </h3>
              <p
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-body-lg)",
                  fontWeight: "var(--token-weight-regular)",
                  lineHeight: "var(--token-leading-160)",
                  color: "var(--token-color-accent)",
                  margin: 0,
                }}
              >
                I'm a digital designer helping founders and product owners create
                exceptional digital experiences. With years of experience in web
                and mobile app design, I focus on creating intuitive, beautiful
                interfaces that drive results.
              </p>
              <p
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-body-lg)",
                  fontWeight: "var(--token-weight-regular)",
                  lineHeight: "var(--token-leading-160)",
                  color: "var(--token-color-accent)",
                  margin: 0,
                }}
              >
                My approach combines strategic thinking with pixel-perfect
                execution. I believe great design isn't just about aesthetics—it's
                about solving real problems and creating meaningful connections
                between products and their users.
              </p>
            </div>

            {/* Skills Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--token-space-24)",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-h5)",
                  fontWeight: "var(--token-weight-semibold)",
                  lineHeight: "var(--token-leading-120)",
                  color: "var(--token-color-accent)",
                  margin: 0,
                }}
              >
                What I do
              </h4>
              <ul
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-body-lg)",
                  fontWeight: "var(--token-weight-regular)",
                  lineHeight: "var(--token-leading-160)",
                  color: "var(--token-color-accent)",
                  margin: 0,
                  paddingLeft: "var(--token-space-24)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--token-space-8)",
                }}
              >
                <li>Web & Mobile App Design</li>
                <li>3D & Motion Design</li>
                <li>Branding & Visual Identity</li>
                <li>UI/UX Design & Prototyping</li>
                <li>Design Systems</li>
              </ul>
            </div>

            {/* CTA Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--token-space-24)",
                marginTop: "var(--token-space-48)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--token-font-family-base)",
                  fontSize: "var(--token-size-h5)",
                  fontWeight: "var(--token-weight-semibold)",
                  lineHeight: "var(--token-leading-140)",
                  color: "var(--token-color-accent)",
                  margin: 0,
                }}
              >
                Ready to start your project?
              </p>
              <BookCallButton href="/contact" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
