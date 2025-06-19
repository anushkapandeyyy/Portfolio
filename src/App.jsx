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
          <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 relative overflow-hidden">
            {/* 3D Background Effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-40 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="container mx-auto px-10 max-w-7xl relative z-10">
              <div className="text-center mb-20">
                <span className="text-yellow-500 text-lg font-semibold tracking-wider">CAREER PATH</span>
                <h2 className="text-white text-5xl font-black mt-4 transform hover:scale-105 transition-transform duration-300">
                  EXPERIENCE
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left side - Character Image with 3D effects */}
                <div className="relative h-[600px] flex items-center justify-center perspective-1000">
                  <div className="relative transform-gpu hover:rotate-y-12 transition-transform duration-700 preserve-3d">
                    <img
                      className="scale-[1.2] drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all duration-500"
                      src="./girlbg.png"
                      alt="Character"
                    />
                    {/* 3D Floating particles */}
                    <div className="absolute -top-10 -left-10 w-4 h-4 bg-yellow-500 rounded-full animate-bounce opacity-70"></div>
                    <div className="absolute -bottom-5 -right-5 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-1/4 -right-8 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>

                {/* Right side - Experience Timeline with enhanced 3D effects */}
                <div className="relative">
                  {/* Vertical Line with glow */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-500 shadow-[0_0_20px_rgba(251,191,36,0.6)]"></div>
                  
                  {/* Timeline Items */}
                  <div className="space-y-12">
                    <div className="flex items-start group">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8 shadow-[0_0_20px_rgba(251,191,36,0.8)] group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
                      <div className="text-white transform group-hover:translate-x-2 transition-transform duration-300 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Worked in Los Santos Police Department</h3>
                        <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                          Started as a rookie cop, learned the ins and outs of the criminal underworld. 
                          Gained valuable skills in investigation and law enforcement tactics.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8 shadow-[0_0_20px_rgba(251,191,36,0.8)] group-hover:scale-125 transition-transform duration-300 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="text-white transform group-hover:translate-x-2 transition-transform duration-300 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Worked in Underground Racing Circuit</h3>
                        <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                          Mastered high-speed driving and vehicle customization. 
                          Built reputation as one of the fastest drivers in the city.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8 shadow-[0_0_20px_rgba(251,191,36,0.8)] group-hover:scale-125 transition-transform duration-300 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="text-white transform group-hover:translate-x-2 transition-transform duration-300 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Worked in Private Security Firm</h3>
                        <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                          Specialized in VIP protection and tactical operations. 
                          Developed advanced combat skills and strategic planning abilities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8 shadow-[0_0_20px_rgba(251,191,36,0.8)] group-hover:scale-125 transition-transform duration-300 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="text-white transform group-hover:translate-x-2 transition-transform duration-300 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Worked in Criminal Organization</h3>
                        <p className="text-lg text-gray-300 font-[Helvetica_Now_Display]">
                          Rose through the ranks of the criminal underworld. 
                          Planned and executed major heists and operations across the city.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full relative z-10 mr-8 shadow-[0_0_20px_rgba(251,191,36,0.8)] group-hover:scale-125 transition-transform duration-300 animate-pulse" style={{animationDelay: '0.8s'}}></div>
                      <div className="text-white transform group-hover:translate-x-2 transition-transform duration-300 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Worked as Independent Contractor</h3>
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
          </div>

          {/* Achievements Section */}
          <div className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>
            
            <div className="container mx-auto px-10 max-w-7xl relative z-10">
              <div className="text-center mb-16">
                <span className="text-yellow-500 text-lg font-semibold tracking-wider uppercase">LEGACY</span>
                <h2 className="text-white text-6xl font-black mt-4 transform hover:scale-105 transition-transform duration-300">
                  ACHIEVEMENTS
                </h2>
                <p className="text-gray-300 text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
                  Milestones and accomplishments throughout my criminal career in Los Santos
                </p>
              </div>
              
              {/* Achievement Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Achievement 1 */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/30 transition-colors">
                      <i className="ri-trophy-line text-3xl text-yellow-500"></i>
                    </div>
                    <span className="text-yellow-500 text-sm font-semibold tracking-wider uppercase">HEIST MASTER</span>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-4 text-center">100+ SUCCESSFUL HEISTS</h3>
                  <p className="text-gray-300 text-lg text-center leading-relaxed">
                    Completed over 100 major heists without getting caught, establishing reputation as the most reliable criminal in the city.
                  </p>
                </div>

                {/* Achievement 2 */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/30 transition-colors">
                      <i className="ri-car-line text-3xl text-red-500"></i>
                    </div>
                    <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">SPEED DEMON</span>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-4 text-center">STREET RACING CHAMPION</h3>
                  <p className="text-gray-300 text-lg text-center leading-relaxed">
                    Won the underground racing championship 5 times in a row, dominating the streets of Los Santos with unmatched driving skills.
                  </p>
                </div>

                {/* Achievement 3 */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                      <i className="ri-money-dollar-circle-line text-3xl text-green-500"></i>
                    </div>
                    <span className="text-green-500 text-sm font-semibold tracking-wider uppercase">BIG SCORE</span>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-4 text-center">$50M+ STOLEN</h3>
                  <p className="text-gray-300 text-lg text-center leading-relaxed">
                    Accumulated over $50 million through various criminal activities, becoming one of the wealthiest criminals in the underworld.
                  </p>
                </div>

                {/* Achievement 4 */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                      <i className="ri-skull-line text-3xl text-purple-500"></i>
                    </div>
                    <span className="text-purple-500 text-sm font-semibold tracking-wider uppercase">SURVIVOR</span>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-4 text-center">ESCAPED DEATH 50 TIMES</h3>
                  <p className="text-gray-300 text-lg text-center leading-relaxed">
                    Survived countless shootouts and dangerous situations, proving to be nearly indestructible in the face of danger.
                  </p>
                </div>

                {/* Achievement 5 */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                      <i className="ri-shield-star-line text-3xl text-blue-500"></i>
                    </div>
                    <span className="text-blue-500 text-sm font-semibold tracking-wider uppercase">MASTERMIND</span>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-4 text-center">CRIMINAL MASTERMIND</h3>
                  <p className="text-gray-300 text-lg text-center leading-relaxed">
                    Planned and executed the most complex criminal operations, outsmarting law enforcement and rival gangs consistently.
                  </p>
                </div>

                {/* Achievement 6 */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors">
                      <i className="ri-fire-line text-3xl text-orange-500"></i>
                    </div>
                    <span className="text-orange-500 text-sm font-semibold tracking-wider uppercase">LEGEND</span>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-4 text-center">HALL OF FAME</h3>
                  <p className="text-gray-300 text-lg text-center leading-relaxed">
                    Inducted into the criminal hall of fame, recognized as one of the greatest criminals in Los Santos history.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Footer Section with Social Links */}
          <div className="w-full bg-black py-16 relative">
            <div className="container mx-auto px-10 max-w-7xl">
              <div className="text-center mb-12">
                <h3 className="text-white text-4xl font-black mb-4">CONNECT WITH ME</h3>
                <p className="text-gray-400 text-lg">Follow my criminal adventures on social media</p>
              </div>
              
              {/* Social Media Links */}
              <div className="flex justify-center gap-8">
                <a href="#" className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <i className="ri-facebook-fill text-2xl text-white"></i>
                  </div>
                </a>
                
                <a href="#" className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(219,39,119,0.5)]">
                    <i className="ri-instagram-line text-2xl text-white"></i>
                  </div>
                </a>
                
                <a href="#" className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                    <i className="ri-twitter-x-line text-2xl text-white"></i>
                  </div>
                </a>
                
                <a href="#" className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    <i className="ri-youtube-line text-2xl text-white"></i>
                  </div>
                </a>
                
                <a href="#" className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(22,163,74,0.5)]">
                    <i className="ri-whatsapp-line text-2xl text-white"></i>
                  </div>
                </a>
                
                <a href="#" className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(75,85,99,0.5)]">
                    <i className="ri-github-line text-2xl text-white"></i>
                  </div>
                </a>
              </div>
              
              {/* Copyright */}
              <div className="text-center mt-12 pt-8 border-t border-gray-800">
                <p className="text-gray-500">© 2024 ROCKSTAR. All rights reserved. Made in Los Santos.</p>
              </div>
            </div>
          </div>

          
        </div>
      )}
    </>
  );
}

export default App;
