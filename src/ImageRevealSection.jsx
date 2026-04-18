import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ImageRevealSection = () => {
  const wrapperRef = useRef(null);
  const imageBoxRef = useRef(null);
  const clearImageRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    const box = imageBoxRef.current;
    const clearImage = clearImageRef.current;
    const cursor = cursorRef.current;

    if (!box || !clearImage || !cursor) return;

    const handleMove = (e) => {
      const rect = box.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const percentage = (mouseX / rect.width) * 100;
      const clamped = Math.max(0, Math.min(100, percentage));

      // Right side reveals clear image
    clearImage.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      cursor.style.left = `${clamped}%`;
      cursor.style.opacity = "1";

      const tilt = (clamped - 50) / 12;
      gsap.to(box, {
        rotateY: tilt,
        scale: 1.02,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const handleEnter = () => {
      gsap.to(box, {
        scale: 1.02,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.2,
      });
    };

    const handleLeave = () => {
      // back to half blur / half clear
      clearImage.style.clipPath = "inset(0 50% 0 0)";

      gsap.to(cursor, {
        left: "50%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(box, {
        rotateY: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    box.addEventListener("mousemove", handleMove);
    box.addEventListener("mouseenter", handleEnter);
    box.addEventListener("mouseleave", handleLeave);

    return () => {
      box.removeEventListener("mousemove", handleMove);
      box.removeEventListener("mouseenter", handleEnter);
      box.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-10 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-lg font-semibold tracking-wider uppercase">
            IDENTITY
          </span>
          <h2 className="text-white text-6xl font-black mt-4 mb-8">
            BEHIND THE MASK
          </h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Move your cursor across the image to reveal the transformation
          </p>
        </div>

        <div className="flex justify-center items-center gap-16">
          <div className="text-left flex-1 max-w-xs">
            <h3 className="text-white text-5xl font-black mb-4 tracking-wider">
              designer
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Creative designer specializing in UI design and visual systems.
            </p>
          </div>

          <div
            ref={imageBoxRef}
className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-2xl"            style={{ perspective: "1000px" }}
          >
{/* Base = BLURRED */}
<img
  src="./anushka-real.jpeg"   // 👈 swap
  className="absolute inset-0 w-full h-full object-cover"
/>

{/* Top = CLEAR */}
<img
  ref={clearImageRef}
  src="./anushka-blur.jpeg"   // 👈 swap
  className="absolute inset-0 w-full h-full object-cover"
  style={{ clipPath: "inset(0 50% 0 0)" }}
/>

            {/* Divider / cursor */}
            <div
              ref={cursorRef}
              className="absolute top-1/2 z-20 pointer-events-none opacity-0"
              style={{
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute h-[520px] w-[2px] bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.45)]"></div>

                <div className="w-12 h-12 border-2 border-purple-400 rounded-full animate-spin-slow bg-black/20 backdrop-blur-sm"></div>

                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

                <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                  <i className="ri-arrow-left-line text-purple-400 text-xl"></i>
                </div>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                  <i className="ri-arrow-right-line text-purple-400 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right flex-1 max-w-xs">
            <h3 className="text-white text-5xl font-black mb-4 tracking-wider font-mono">
              &lt;developer&gt;
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              It worked on my local.
            </p>
            <div className="mt-4 text-sm text-gray-500 font-mono">
              <div>&lt;html&gt;</div>
              <div className="ml-4">&lt;script&gt;</div>
              <div className="ml-8">CSS3 HTML5</div>
              <div className="ml-8">color: #000;</div>
              <div className="ml-4">&lt;/query&gt;</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            <i className="ri-mouse-line mr-2"></i>
            Move your mouse horizontally across the image
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageRevealSection;