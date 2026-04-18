import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroMask from "./IntroMask";
import HeroLanding from "./HeroLanding";
import AboutStatementSection from "./AboutStatementSection";
import GtaStatsSection from "./StatsSection";
import ContactSection from "./ContactSection";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const overlayRef = useRef();
  const heroRef    = useRef();

  useEffect(() => {
    if (showIntro) return;
    const id = setTimeout(() => {
      const overlay = overlayRef.current;
      const hero    = heroRef.current;
      if (!overlay || !hero) return;

      // Scrub the dark overlay in as the hero/about section scrolls out.
      // By the time the Numbers section is visible, bg is already #060408.
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "bottom 100%",   // starts dimming as About bottom hits 60% of viewport
end:   "bottom 60%",    // completes when hero fully gone
            scrub: 1,
          },
        }
      );
    }, 150);
    return () => clearTimeout(id);
  }, [showIntro]);

  return (
    <div className="relative w-full">

      {/* ── GLOBAL BG IMAGE (warm Leonida sunset) ── */}
      <div className="fixed inset-0 z-0">
        <img
          className="w-full h-full object-cover scale-[1.1]"
          src="./bg1.jpg"
          alt=""
        />
      </div>

      {/* ── NIGHT OVERLAY — GSAP scrubs opacity 0→1 ── */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: "#060408",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── INTRO MASK ── */}
      {showIntro && (
        <IntroMask onComplete={() => setShowIntro(false)} />
      )}

      {/* ── ALL CONTENT — z-10 sits above the overlay ── */}
      <div className="relative z-10 w-full">

        {/* Hero + About — visible against warm bg image */}
        <div ref={heroRef}>
          <HeroLanding />
          <AboutStatementSection />
        </div>

        {/* Numbers section — transparent bg, dark overlay behind it */}
        <GtaStatsSection />

        {/* ── GRADIENT BRIDGE ──────────────────────────────────────────
            Overlaps the last 120px of Numbers and fades to #060408.
            Kills the hard edge between sections completely.
        ─────────────────────────────────────────────────────────── */}

        {/* Contact section — sits on solid #060408 */}
        <ContactSection />

      </div>

    </div>
  );
}

export default App;
