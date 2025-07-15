import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

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
      scale: 0.4,
      x: "-50%",
      bottom: "-60%",
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

    // Crazy 3D Mouse Tracking for Achievements Section
    const achievementsSection = document.querySelector(".achievements-section");
    const achievementCards = document.querySelectorAll(".achievement-card");
    const floatingOrbs = document.querySelectorAll(".floating-orb");

    achievementsSection?.addEventListener("mousemove", function (e) {
      const rect = achievementsSection.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      // Update CSS variables for dynamic background
      achievementsSection.style.setProperty('--mouse-x', `${mouseX}%`);
      achievementsSection.style.setProperty('--mouse-y', `${mouseY}%`);

      // 3D tilt effect for achievement cards
      achievementCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const angleX = (e.clientY - cardCenterY) / 15;
        const angleY = (e.clientX - cardCenterX) / 15;

        gsap.to(card, {
          rotateX: -angleX,
          rotateY: angleY,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });

        // Parallax effect for particles inside cards
        const particles = card.querySelectorAll('.particle');
        particles.forEach((particle, pIndex) => {
          const moveX = (angleY * (pIndex + 1)) / 5;
          const moveY = (angleX * (pIndex + 1)) / 5;

          gsap.to(particle, {
            x: moveX,
            y: moveY,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Dynamic floating orbs movement based on mouse
      floatingOrbs.forEach((orb, index) => {
        const intensity = (index + 1) * 0.3;
        const moveX = (mouseX - 50) * intensity;
        const moveY = (mouseY - 50) * intensity;

        gsap.to(orb, {
          x: moveX,
          y: moveY,
          duration: 1.5,
          ease: "power2.out",
        });
      });
    });

    // Reset cards when mouse leaves
    achievementsSection?.addEventListener("mouseleave", function () {
      achievementCards.forEach((card) => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        const particles = card.querySelectorAll('.particle');
        particles.forEach((particle) => {
          gsap.to(particle, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      floatingOrbs.forEach((orb) => {
        gsap.to(orb, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    });

    // Crazy entrance animations for achievement cards
    gsap.fromTo(".achievement-card",
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
        scale: 0.5,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".achievements-grid",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Floating particles animation
    gsap.to(".particle", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(0, 360)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Interactive Image Reveal
    const imageRevealContainer = document.querySelector('.image-reveal-container');
    const revealImage = document.querySelector('.reveal-image');
    const cursorIndicator = document.querySelector('.cursor-indicator');

    if (imageRevealContainer && revealImage && cursorIndicator) {
      imageRevealContainer.addEventListener('mousemove', function (e) {
        const rect = imageRevealContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const containerWidth = rect.width;
        const percentage = (mouseX / containerWidth) * 100;

        // Clamp percentage between 0 and 100
        const clampedPercentage = Math.max(0, Math.min(100, percentage));

        // Update clip-path for reveal effect
        revealImage.style.clipPath = `inset(0 ${100 - clampedPercentage}% 0 0)`;

        // Update cursor indicator position
        cursorIndicator.style.left = `${clampedPercentage}%`;
        cursorIndicator.style.opacity = '1';

        // Add subtle tilt effect based on mouse position
        const tilt = (clampedPercentage - 50) / 10;
        gsap.to(imageRevealContainer, {
          rotateY: tilt,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      imageRevealContainer.addEventListener('mouseenter', function () {
        cursorIndicator.style.opacity = '1';
        gsap.to(imageRevealContainer, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      imageRevealContainer.addEventListener('mouseleave', function () {
        // Reset to center position
        revealImage.style.clipPath = 'inset(0 50% 0 0)';
        cursorIndicator.style.left = '50%';
        cursorIndicator.style.opacity = '0';

        gsap.to(imageRevealContainer, {
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }

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
                  <div className="line w-12 h-1 bg-purple-400 rounded"></div>
                  <div className="line w-8 h-1 bg-purple-400 rounded"></div>
                  <div className="line w-6 h-1 bg-purple-400 rounded"></div>
                </div>
                <h3 className="text-3xl font-bold leading-none text-white tracking-wider">
                  PORTFOLIO
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
                src="./bg1.jpg"
                alt=""
              />
              <div className="text text-white flex flex-col gap-2 absolute top-16 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[10rem] leading-[0.8] -ml-32 font-black tracking-tighter">Anushka</h1>
                <h1 className="text-[10rem] leading-[0.8] ml-16 font-black tracking-tighter">Pandey</h1>
                <h1 className="text-[10rem] leading-[0.8] -ml-32 font-black tracking-tighter"></h1>
             
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2  scale-[1] rotate-[-20deg]"
                src="./image2.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-12 px-10 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="animate-bounce">
                    <i className="text-3xl ri-arrow-down-line text-purple-400"></i>
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
                  src="./image1.png"
                  alt="Character"
                />
              </div>
              <div className="rg w-1/2">
                <div className="mb-6">
                  <span className="text-purple-400 text-lg font-semibold tracking-wider">Building & Delivering: My Experience</span>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Experience the most ambitious and expansive Grand Theft Auto yet.
                  Set within the fictional state of San Andreas, based on Southern California.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Follow three unique protagonists whose stories interconnect and interweave
                  throughout the game's narrative. Switch between characters at will and
                  experience their individual storylines.
                </p>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 relative overflow-hidden">
            {/* 3D Background Effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-40 right-20 w-48 h-48 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-10 max-w-7xl relative z-10">
              <div className="text-center mb-20">
                <span className="text-purple-400 text-lg font-semibold tracking-wider">CAREER PATH</span>
                <h2 className="text-white text-5xl font-black mt-4 transform hover:scale-105 transition-transform duration-300">
                  EXPERIENCE
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left side - Character Image with 3D effects */}
                <div className="relative h-[600px] flex items-center justify-center perspective-1000">
                  <div className="relative transform-gpu hover:rotate-y-12 transition-transform duration-700 preserve-3d">
                    <img
                      className="scale-[1.2] drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(192,132,252,0.5)] transition-all duration-500"
                      src="./image2.png"
                      alt="Character"
                    />
                    {/* 3D Floating particles */}
                    <div className="absolute -top-10 -left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-70"></div>
                    <div className="absolute -bottom-5 -right-5 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/4 -right-8 w-2 h-2 bg-purple-200 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>

                {/* Right side - Experience Timeline with enhanced 3D effects */}
                <div className="relative">
                  {/* Vertical Line with glow */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-purple-300 to-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.6)]"></div>

                  {/* Timeline Items */}
                  <div className="space-y-12" style={{fontFamily: 'Poppins, sans-serif'}}>
                    <div className="flex items-start group">
                      <div className="w-6 h-6 bg-purple-400 rounded-full relative z-10 mr-8 shadow-[0_0_20px_rgba(192,132,252,0.8)] group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
                      <div className="text-white transform group-hover:translate-x-2 transition-transform duration-300 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-colors">
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-white">Pratishthan Software Ventures</h3>
                          <p className="text-lg text-gray-300">Software Engineer</p>
                          <p className="text-sm text-gray-400 mb-2">Jan 2023 – Present</p>
                          <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                              Contributed to the development of a Buy Now, Pay Later (BNPL) service for Emirates National Bank of Dubai,
                              supporting 20M+ customers with short-term loan processing.
                            </li>
                            <li>
                              Implemented Kafka consumers to handle real-time billing, triggered by customer payments and due amount updates.
                            </li>
                            <li>
                              Introduced a business reconciliation microservice to validate multi-step business process workflow across
                              microservices, ensuring transactional integrity.
                            </li>
                            <li>
                              Reduced data access latency by 30% by designing and implementing a shared query library that dynamically builds
                              and executes optimized SQL queries across multiple microservices.
                            </li>
                            <li>
                              Led the development of a rejection management system to track failed transactions, enabling manual re-triggering
                              and ensuring data consistency.
                            </li>
                            <li>
                              <strong>Tech Stack:</strong> Java, Spring Boot, Spring MVC, SQL, Kafka
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start group font-poppins">
                      <div
                        className="w-6 h-6 bg-purple-400 rounded-full relative z-10 mr-8 shadow-[0_0_20px_rgba(192,132,252,0.8)] group-hover:scale-125 transition-transform duration-300 animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      ></div>

                      <div className="text-white transform group-hover:translate-x-2 transition-transform duration-300 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-colors">
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-white">Zomato Ltd</h3>
                          <p className="text-lg text-gray-300">Software Engineer Intern</p>
                          <p className="text-sm text-gray-400 mb-2">Jan 2023 – June 2023 · Gurgaon, India</p>
                          <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                              Worked with Logistics team, handling over 3,50,000 active riders, processing 1.3 million orders per day.
                            </li>
                            <li>
                              Implemented RESTful APIs for CRUD operations, optimizing query design for efficient data access.
                            </li>
                            <li>
                              Contributed to the FleetCoach app, improving rider and coach management efficiency by 40%.
                            </li>
                            <li>
                              Enabled real-time tracking of fleet coaches during live meetings using Kafka event streaming.
                            </li>
                            <li>
                              Enhanced dashboard with rider–coach ID search functionality.
                            </li>
                            <li>
                              Built targeted meeting notifications, reducing irrelevant alerts to non-participants.
                            </li>
                            <li>
                              <strong>Tech Stack:</strong> Golang, SQL, Kafka
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>



                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* Interactive Image Reveal Section */}
          <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 relative overflow-hidden">
            <div className="container mx-auto px-10 max-w-7xl">
              <div className="text-center mb-16">
                <span className="text-purple-400 text-lg font-semibold tracking-wider uppercase">IDENTITY</span>
                <h2 className="text-white text-6xl font-black mt-4 mb-8">
                  BEHIND THE MASK
                </h2>
                <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                  Move your cursor across the image to reveal the transformation
                </p>
              </div>

              <div className="flex justify-center items-center gap-16">
                {/* Left Text - Designer */}
                <div className="text-left flex-1 max-w-xs">
                  <h3 className="text-white text-5xl font-black mb-4 tracking-wider">designer</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Creative designer specializing in UI design and visual systems.
                  </p>
                </div>

                {/* Image Container */}
                <div className="image-reveal-container relative w-full max-w-lg aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  {/* Real Image (Base Layer) */}
                  <img
                    src="./anushka-real.jpeg"
                    alt="Clear version"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Blurred Image (Reveal Layer) */}
                  <img
                    src="./anushka-blur.jpeg"
                    alt="Blurred version"
                    className="reveal-image absolute inset-0 w-full h-full object-cover"
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                  />

                  {/* Custom Cursor Indicator */}
                  <div className="cursor-indicator absolute top-1/2 pointer-events-none opacity-0 transition-all duration-300 z-20"
                    style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="relative">
                      {/* Outer ring */}
                      <div className="w-12 h-12 border-2 border-purple-400 rounded-full animate-spin-slow bg-black/20 backdrop-blur-sm"></div>
                      {/* Inner dot */}
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                      {/* Arrow indicators */}
                      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                        <i className="ri-arrow-left-line text-purple-400 text-xl animate-bounce-x"></i>
                      </div>
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                        <i className="ri-arrow-right-line text-purple-400 text-xl animate-bounce-x"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Text - Coder */}
                <div className="text-right flex-1 max-w-xs">
                  <h3 className="text-white text-5xl font-black mb-4 tracking-wider font-mono">&lt;developer&gt;</h3>
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
          </div>

          {/* Enhanced Social Links Section */}
          <div className="w-full bg-gradient-to-b from-black to-gray-900 py-12 relative overflow-hidden">
            <div className="container mx-auto px-10 max-w-4xl">
              <div className="text-center mb-8">
                <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">CONNECT</span>
                <h3 className="text-white text-2xl font-bold mb-2">Let's Stay Connected</h3>
                <p className="text-gray-400 text-sm">Follow for updates and collaborations</p>
              </div>

              {/* Simple Social Media Links */}
              <div className="flex justify-center gap-4">
                <a href="https://www.linkedin.com/in/anushkapandey2911/" className="group">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:scale-110">
                    <i className="ri-linkedin-fill text-lg text-white"></i>
                  </div>
                </a>

                <a href="#" className="group">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700 hover:scale-110">
                    <i className="ri-twitter-x-line text-lg text-white"></i>
                  </div>
                </a>

                <a href="https://github.com/anushkapandeyyy" className="group">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700 hover:scale-110">
                    <i className="ri-github-line text-lg text-white"></i>
                  </div>
                </a>

                <a href="mailto:anushkapandey2915@gmail.com" className="group">
                  <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-purple-300 hover:scale-110">
                    <i className="ri-mail-line text-lg text-white"></i>
                  </div>
                </a>
              </div>

              {/* Minimal Copyright */}
              <div className="text-center mt-8 pt-6 border-t border-gray-800/50">
                <p className="text-gray-500 text-xs">© 2024 Portfolio. Built with passion.</p>
              </div>
            </div>
          </div>


        </div>
      )}
    </>
  );
}

export default App;
