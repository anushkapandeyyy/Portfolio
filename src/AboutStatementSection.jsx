import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GtaExperienceTransition = () => {
  const [activeYear, setActiveYear] = useState("2024");
  const mainRef = useRef(null);
  const scrollTrackRef = useRef(null);

  const experiences = {
    "2024": {
      company: "Pratishthan Software Ventures",
      role: "Software Engineer // Bangalore",
      tech: "Java, Spring Boot, SQL, Kafka",
      points: [
        "Contributed to the development of a Buy Now, Pay Later (BNPL) service for Emirates National Bank of Dubai, supporting 20M+ customers with short term loan processing.",
        "Implemented a scalable Spring Batch process leveraging chunking to optimize performance during cross-system migration of 1L+ records in 4 minutes.",
        "Implemented Kafka consumers for real-time billing triggered by customer payments.",
        "Automated overdue payment recovery, leveraging real-time data to accelerate initial response to missed installments and triggering immediate user notifications and predefined corrective actions (e.g., late fee application, account freeze)",
        "Architected a reconciliation microservice to validate end-to-end transactional integrity."
      ]
    },
    "2023": {
      company: "Zomato Ltd",
      role: "Software Engineer Intern // Gurgaon",
      tech: "Go, Java, Kafka, Microservices",
      points: [
        "Worked with Logistics team, handling over 3,50,000 active riders, processing 1.3 million orders per day.",
        "Implemented RESTful APIs to perform CRUD operations, ensuring optimal data retrieval and manipulation through efficient query design.",
        "Contributed to the development of the in-house FleetCoach app, resulting in 40% improvement in rider and fleet coach management efficiency, streamlining communication and operational tracking.",
        "Created real-time participant location tracking during live meetings of fleet coaches using Kafka for event streaming",
        "Designed and deployed meeting banners in the FleetCoach app, helping 50+ coaches consistently share important meeting information with riders."
      ]
    }
  };

  const yearOrder = ["2024", "2023"];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
      },
    });

    tl.to(".zoom-text", { scale: 80, opacity: 0, duration: 2.5, ease: "power2.in" }, 0)
      .to(".bg-vignette", { opacity: 1, duration: 1.5, ease: "power2.out" }, 1.5)
      .to(".exp-details", { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 1.5);

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative w-full">
      <div ref={scrollTrackRef} className="relative h-[300vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* BACKGROUND VIGNETTE */}
          <div className="bg-vignette opacity-0 absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

          {/* ZOOM TEXT (Intro) */}
          <div className="zoom-text z-0 absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[12vw] font-black text-white/20 leading-none tracking-tighter italic">
              EXPERIENCE
            </h1>
          </div>

          {/* CONTENT AREA */}
          <div className="exp-details absolute z-20 opacity-0 w-full h-full flex items-center px-20 lg:px-32">
            
            {/* HUGE BACKGROUND YEAR */}
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden">
                <h2 className="text-[35vw] font-black italic leading-none text-transparent stroke-text opacity-15 uppercase tracking-tighter">
                    {activeYear}
                </h2>
            </div>

            {/* FIX 1: Removed max-w-7xl here so the wrapper can stretch all the way */}
            <div className="flex w-full items-center gap-16 lg:gap-24 relative z-30">
              
              {/* VERTICAL TIMELINE NAV */}
              {/* Added shrink-0 so this column doesn't get squished by the massive text area */}
              <div className="flex flex-col gap-10 border-l border-white/10 pl-8 relative min-w-[150px] shrink-0">
                <div 
                  className="absolute left-[-1.5px] w-[3px] bg-pink-500 shadow-[0_0_15px_#ec4899] transition-all duration-500 ease-in-out"
                  style={{ height: '40px', top: activeYear === "2024" ? '8px' : '96px' }}
                />

                {yearOrder.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`text-left transition-all duration-300 origin-left ${
                      activeYear === year 
                        ? "opacity-100 scale-110 text-white" 
                        : "text-gray-300 opacity-60 hover:opacity-100 hover:text-white"
                    }`}
                  >
                    <span className="block text-4xl font-black italic leading-none">{year}</span>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-pink-500 mt-1 block">
                      {year === "2024" ? "Active" : "Archive"}
                    </span>
                  </button>
                ))}
              </div>

              {/* MISSION DETAILS */}
              {/* FIX 2: Removed max-w-5xl, added flex-1 to force it to fill up all remaining horizontal space, and added some right padding so it doesn't touch the literal edge of the monitor */}
              <div className="flex-1 w-full space-y-8 py-10 pr-10 lg:pr-20">
                <div key={activeYear} className="animate-fadeIn">
                  <h2 className="text-6xl font-black uppercase italic leading-none tracking-tight text-white mb-2">
                    {experiences[activeYear].company}
                  </h2>
                  <div className="flex items-center gap-4 text-pink-500 font-mono text-xs tracking-[0.3em] uppercase">
                    <span>{experiences[activeYear].role}</span>
                    <span className="w-8 h-[1px] bg-white/20"></span>
                    <span className="text-pink-700">Tech: {experiences[activeYear].tech}</span>
                  </div>

                  <ul className="mt-10 space-y-6">
                    {experiences[activeYear].points.map((point, i) => (
                      <li key={i} className="flex gap-4 group">
                        <span className="text-pink-500 font-black text-2xl leading-none mt-[-2px]">.</span>
                        <p className="text-lg text-gray-200 font-sans leading-snug group-hover:text-white transition-colors">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>

                
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 2px white;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default GtaExperienceTransition;