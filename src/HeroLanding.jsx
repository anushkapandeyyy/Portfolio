import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroLanding = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const main = containerRef.current;

    if (!main) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".hero-text", {
        x: `${xMove * 0.4}%`,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".hero-sky", {
        x: xMove,
        duration: 0.5,
      });

      gsap.to(".hero-bg", {
        x: xMove * 1.7,
        duration: 0.5,
      });
    };

    main.addEventListener("mousemove", handleMouseMove);

    return () => {
      main.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero relative w-full h-screen overflow-hidden "
    >
      {/* NAVBAR */}
      <div className="absolute top-0 left-0 z-20 w-full py-8 px-10">
        <h3 className="text-3xl font-bold text-white tracking-wider">
          PORTFOLIO
        </h3>
      </div>

      {/* BACKGROUND LAYERS */}
      <img
        className=" absolute top-0 left-0 h-full object-cover scale-[1.2]"
      />

      {/* <img
        className="hero-bg absolute top-0 left-0 w-full h-full object-cover scale-[1.3]"
        src="./bg1.jpg"
        alt=""
      /> */}

      {/* TEXT */}
      <div className="hero-text absolute top-20 left-1/2 -translate-x-1/2 text-white text-center z-10">
        <h1 className="text-[8rem] leading-[0.8] font-black tracking-tight">
          Anushka
        </h1>
        <h1 className="text-[8rem] leading-[0.8] font-black tracking-tight">
          Pandey
        </h1>
      </div>

      {/* CHARACTER */}
      <img
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 
                    w-[450px] max-w-none z-10"
        src="./image2.png"
        alt=""
        />

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-20">
        <p className="text-sm tracking-widest animate-bounce">
          SCROLL
        </p>
      </div>
    </div>
  );
};

export default HeroLanding;