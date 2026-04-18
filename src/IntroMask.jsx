import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const IntroMask = ({ onComplete }) => {
  const containerRef = useRef(null);
  const triggered = useRef(false); // ✅ correct place

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 0,
      duration: 1.5,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group", {
      scale: 12,
      duration: 2,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0.3,
      onUpdate: function () {
        if (this.progress() > 0.7 && !triggered.current) {
          triggered.current = true;
          onComplete && onComplete();
        }
      },
    });

  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-[999] w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="introMask">
            <rect width="100%" height="100%" fill="black" />
            <g className="vi-mask-group">
              <text
                x="50%"
                y="50%"
                fontSize="250"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Arial Black"
              >
                AP
              </text>
            </g>
          </mask>
        </defs>

        <image
          href="./bg1.jpg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#introMask)"
        />
      </svg>
    </div>
  );
};

export default IntroMask;