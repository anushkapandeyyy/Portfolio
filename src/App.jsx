import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
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
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-8 px-10">
              <div className="logo flex gap-6 items-center">
                <div className="lines flex flex-col gap-[3px]">
                  <div className="line w-12 h-1 bg-yellow-500 rounded"></div>
                  <div className="line w-8 h-1 bg-yellow-500 rounded"></div>
                  <div className="line w-6 h-1 bg-yellow-500 rounded"></div>
                </div>
                <h3 className="text-3xl font-bold leading-none text-white tracking-wider">
                  ROCKSTAR
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-2 absolute top-16 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[10rem] leading-[0.8] -ml-32 font-black tracking-tighter">GRAND</h1>
                <h1 className="text-[10rem] leading-[0.8] ml-16 font-black tracking-tighter">THEFT</h1>
                <h1 className="text-[10rem] leading-[0.8] -ml-32 font-black tracking-tighter">AUTO</h1>
                <div className="mt-4 ml-16">
                  <span className="text-2xl bg-yellow-500 text-black px-4 py-2 font-bold tracking-wider">V</span>
                </div>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2  scale-[3] rotate-[-20deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-12 px-10 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="animate-bounce">
                    <i className="text-3xl ri-arrow-down-line text-yellow-500"></i>
                  </div>
                  <h3 className="text-lg font-semibold tracking-wider">
                    SCROLL TO EXPLORE
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">AVAILABLE ON</span>
                  <img
                    className="h-8 opacity-80 hover:opacity-100 transition-opacity"
                    src="./ps5.png"
                    alt="PlayStation 5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-20">
            <div className="cntnr flex text-white w-full max-w-7xl mx-auto px-10 items-center gap-16">
              <div className="limg relative w-1/2 h-[600px]">
                <img
                  className="absolute scale-[1.2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
                  src="./imag.png"
                  alt="Character"
                />
              </div>
              <div className="rg w-1/2">
                <div className="mb-6">
                  <span className="text-yellow-500 text-lg font-semibold tracking-wider">WELCOME TO LOS SANTOS</span>
                </div>
                <h1 className="text-7xl font-black leading-tight mb-8">
                  <span className="block">STILL RUNNING,</span>
                  <span className="block text-yellow-500">NOT HUNTING</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Experience the most ambitious and expansive Grand Theft Auto yet. 
                  Set within the fictional state of San Andreas, based on Southern California.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Follow three unique protagonists whose stories interconnect and interweave 
                  throughout the game's narrative. Switch between characters at will and 
                  experience their individual storylines.
                </p>
                <div className="flex gap-6">
                  <button className="bg-yellow-500 hover:bg-yellow-400 transition-colors px-8 py-4 text-black font-bold text-xl tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                    PLAY NOW
                  </button>
                  <button className="border-2 border-white hover:bg-white hover:text-black transition-colors px-8 py-4 text-white font-bold text-xl tracking-wider">
                    WATCH TRAILER
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-10 max-w-6xl">
              <div className="text-center mb-20">
                <span className="text-yellow-500 text-lg font-semibold tracking-wider">CAREER PATH</span>
                <h2 className="text-white text-5xl font-black mt-4">
                  EXPERIENCE
                </h2>
              </div>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-yellow-500"></div>
                
                {/* Timeline Items */}
                <div className="space-y-12">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8"></div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">Worked in Los Santos Police Department</h3>
                      <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                        Started as a rookie cop, learned the ins and outs of the criminal underworld. 
                        Gained valuable skills in investigation and law enforcement tactics.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8"></div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">Worked in Underground Racing Circuit</h3>
                      <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                        Mastered high-speed driving and vehicle customization. 
                        Built reputation as one of the fastest drivers in the city.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8"></div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">Worked in Private Security Firm</h3>
                      <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                        Specialized in VIP protection and tactical operations. 
                        Developed advanced combat skills and strategic planning abilities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8"></div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">Worked in Criminal Organization</h3>
                      <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                        Rose through the ranks of the criminal underworld. 
                        Planned and executed major heists and operations across the city.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8"></div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">Worked as Independent Contractor</h3>
                      <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                        Now operating as a freelance criminal for hire. 
                        Taking on the most dangerous and lucrative jobs in Los Santos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-24">
            <div className="container mx-auto px-10 max-w-6xl">
              <div className="text-center mb-16">
                <span className="text-yellow-500 text-lg font-semibold tracking-wider uppercase">Network</span>
                <h2 className="text-white text-6xl font-black mt-4 leading-tight">
                  CONNECT WITH THE
                  <span className="block text-yellow-500">UNDERWORLD</span>
                </h2>
                <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
                  Establish connections across Los Santos. Every link opens new opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {/* LinkedIn */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  <a 
                    href="#" 
                    className="relative block bg-gray-900 border border-gray-700 group-hover:border-blue-500 transition-all duration-300 p-8 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-blue-600 group-hover:bg-blue-500 transition-colors duration-300 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                      <p className="text-gray-400 text-sm">Professional Network</p>
                    </div>
                  </a>
                </div>

                {/* GitHub */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  <a 
                    href="#" 
                    className="relative block bg-gray-900 border border-gray-700 group-hover:border-gray-500 transition-all duration-300 p-8 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-gray-500/20"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gray-700 group-hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-gray-400 transition-colors">GitHub</h3>
                      <p className="text-gray-400 text-sm">Code Repository</p>
                    </div>
                  </a>
                </div>

                {/* Portfolio */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  <a 
                    href="#" 
                    className="relative block bg-gray-900 border border-gray-700 group-hover:border-purple-500 transition-all duration-300 p-8 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-purple-600 group-hover:bg-purple-500 transition-colors duration-300 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Portfolio</h3>
                      <p className="text-gray-400 text-sm">Personal Showcase</p>
                    </div>
                  </a>
                </div>

                {/* GeeksforGeeks */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  <a 
                    href="#" 
                    className="relative block bg-gray-900 border border-gray-700 group-hover:border-green-500 transition-all duration-300 p-8 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-green-500/20"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-green-600 group-hover:bg-green-500 transition-colors duration-300 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 13.363c-.29.718-.664 1.334-1.118 1.858-.454.524-.99.94-1.608 1.247-.618.308-1.267.462-1.949.462-.681 0-1.331-.154-1.949-.462-.618-.308-1.154-.723-1.608-1.247-.454-.524-.828-1.14-1.118-1.858-.29-.718-.436-1.449-.436-2.193s.145-1.475.436-2.193c.29-.718.664-1.334 1.118-1.858.454-.524.99-.94 1.608-1.247.618-.308 1.268-.462 1.949-.462.681 0 1.331.154 1.949.462.618.308 1.154.723 1.608 1.247.454.524.828 1.14 1.118 1.858.29.718.436 1.449.436 2.193s-.146 1.475-.436 2.193z"/>
                        </svg>
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">GeeksforGeeks</h3>
                      <p className="text-gray-400 text-sm">Coding Practice</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="text-center">
                <div className="inline-block relative group">
                  <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <button className="relative bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 px-12 py-4 text-black font-black text-lg tracking-wider transform group-hover:scale-105 shadow-xl hover:shadow-2xl">
                    INITIATE CONTACT
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-4">Ready to join the crew? Let's make some noise.</p>
              </div>
            </div>
          </div>

          
        </div>
      )}
    </>
  );
}

export default App;
