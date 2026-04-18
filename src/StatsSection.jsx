import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ── data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { target: 500,  suffix: "+", label: "DSA Problems",       prefix: ""     },
  { target: 1,    suffix: " %", label: "Hack-a-Noodle",      prefix: "TOP " },
  { target: 12, suffix: "%", label: "LC Ranked", prefix: "TOP "     },
  { target: 2025, suffix: "",  label: "Most Promising Rookie Award",       prefix: "YEAR:"     },
];

const TECH = [
  { cat: "Languages & Frameworks", pills: ["Golang", "Java", "C++", "Spring Boot", "JPA / Hibernate"] },
  { cat: "Data & Messaging",       pills: ["PostgreSQL", "MySQL", "Kafka", "RabbitMQ"] },
  { cat: "DevOps & Tools",         pills: ["Jenkins", "SonarQube", "Postman", "Maven", "GitHub"] },
];

const ACHIEVEMENTS = [
  {
    num: "01",
    title: "Most Promising Rookie",
    sub: "Rapid contribution to core project initiatives from day one at the company",
    badge: "2024 – 2025",
  },
  {
    num: "02",
    title: "National Finalist · Hack-a-Noodle",
    sub: "Zomato-organised hackathon — ranked in the top 1% from 300+ participants",
    badge: "National Stage",
  },
  {
    num: "03",
    title: "500+ DSA Problems Solved",
    sub: "Consistent problem-solving across LeetCode and GeeksforGeeks platforms",
    badge: "LeetCode · GFG",
  },
   {
    num: "04",
    title: "PhonePe Tech Scholar · Final Round",
    sub: "Qualified from a competitive pool of 3,000+ candidates nationwide",
    badge: "Top Qualifier",
  }
];

// ── easing ────────────────────────────────────────────────────────────────────
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ── hook: count-up ─────────────────────────────────────────────────────────
function useCountUp(target, duration = 1600, startFrom2000 = false) {
  const [value, setValue]     = React.useState(startFrom2000 ? 2000 : 0);
  const [counting, setCounting] = React.useState(false);
  const raf = useRef(null);

  const start = React.useCallback(() => {
    const startVal  = startFrom2000 ? 2000 : 0;
    const startTime = performance.now();
    setCounting(true);

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutExpo(progress);
      const current  = Math.floor(startVal + eased * (target - startVal));
      setValue(current);
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
        setCounting(false);
      }
    }
    raf.current = requestAnimationFrame(tick);
  }, [target, duration, startFrom2000]);

  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return { value, counting, start };
}

// ── sub-components ────────────────────────────────────────────────────────────
function StatBox({ stat, delay, onTrigger }) {
  const is2025   = stat.target === 2025;
  const { value, counting, start } = useCountUp(stat.target, 1400 + delay * 200, is2025);

  // expose start() so parent can call all at once
  React.useEffect(() => { onTrigger(start); }, [start, onTrigger]);

  return (
    <div className="stat-box group relative overflow-hidden border-r border-b border-white/[0.07] p-5 transition-colors hover:bg-[#ff8989]/[0.04]">
      <div className="stat-number flex items-baseline gap-[2px] font-['Bebas_Neue'] text-[clamp(38px,5vw,56px)] leading-none tracking-[0.03em] text-white">
        {stat.prefix && <span>{stat.prefix}</span>}
        <span>{value}</span>
        {counting && (
          <span className="animate-blink ml-1 text-[0.55em] text-[#ff8989]">▋</span>
        )}
        {stat.suffix && (
          <span className="text-[0.55em] text-[#ff8989]">{stat.suffix}</span>
        )}
      </div>
      <div className="mt-[6px] text-[8px] uppercase tracking-[0.35em] text-white/25">
        {stat.label}
      </div>
    </div>
  );
}

function Achievement({ data, index }) {
  return (
    <div
      className="achievement flex gap-[14px] items-start border-b border-white/[0.05] py-[15px] opacity-0 translate-y-3 transition-all duration-500"
      style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
      data-ach
    >
      <div className="font-['Bebas_Neue'] text-sm text-[#ff8989]/40 min-w-[20px] mt-[2px]">
        {data.num}
      </div>

      <div className="flex-1">
        {/* TITLE */}
        <div className="text-base font-semibold text-white/90 leading-[1.5] mb-[4px]">
          {data.title}
        </div>

        {/* DESCRIPTION */}
        <div className="text-sm text-white/60 leading-[1.6] mb-[8px]">
          {data.sub}
        </div>

        {/* BADGE */}
        <span className="inline-block text-xs uppercase tracking-[0.12em] text-[#ff8989] border border-[#ff8989]/30 px-[8px] py-[3px] rounded-[2px]">
          {data.badge}
        </span>
      </div>
    </div>
  );
}
// ── main component ────────────────────────────────────────────────────────────
const LeonidaStats = () => {
  const container      = useRef();
  const startersRef    = useRef([]);   // holds each StatBox's start()
  const [triggered, setTriggered] = useState(false);

  // collect start() callbacks from each StatBox
  const registerStarter = React.useCallback((index, fn) => {
    startersRef.current[index] = fn;
  }, []);

  useGSAP(() => {
    // headline reveal
    gsap.from(".gsap-headline", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        once: true,
      },
    });

    // body copy + pills
    gsap.from(".gsap-fade", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        once: true,
      },
    });

    // trigger counters + achievement reveals
    ScrollTrigger.create({
      trigger: container.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        setTriggered(true);

        // stagger each counter start
        startersRef.current.forEach((fn, i) => {
          setTimeout(() => fn?.(), i * 130);
        });

        // reveal achievements
        const achs = container.current.querySelectorAll("[data-ach]");
        achs.forEach((el) => {
          el.classList.remove("opacity-0", "translate-y-3");
        });
      },
    });
  }, { scope: container });

  return (
    <>
      {/* Google Font — add this once in your index.html instead if you prefer */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .animate-blink { animation: blink 0.4s step-end infinite; }

        .stat-box { cursor: default; }

        /* scanline overlay */
        .scanlines::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,137,137,0.012) 3px,
            rgba(255,137,137,0.012) 4px
          );
          pointer-events: none;
        }

        /* pulsing green dot */
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); }
          50%       { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }
        .pulse-dot { animation: pulse-green 1.8s ease-in-out infinite; }
      `}</style>

<section
  ref={container}
  className="scanlines relative w-full min-h-screen overflow-hidden px-6 py-16 md:px-12 lg:px-20 select-none"
  style={{ fontFamily: "'Space Mono', monospace", background: "#060408" }}
>
  {/* TOP FADE — blends bg image into this section */}
  <div style={{
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "220px",
    background: "linear-gradient(to bottom, transparent, #060408)",
    pointerEvents: "none",
    zIndex: 30,
  }} >

          PORTFOLIO · VI
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-14 pt-8 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT ── */}
          <div>
            {/* eyebrow */}
            <div className="gsap-fade mb-3 text-[9px] uppercase tracking-[0.4em] text-[#ff8989]/45">
              Backend Engineer · India
            </div>

            {/* headline */}
            <h2
              className="gsap-headline mb-5 leading-[0.88] text-[#ff8989]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(72px, 10vw, 108px)",
                letterSpacing: "0.015em",
              }}
            >
              Numbers
            </h2>

            {/* red rule */}
            <div className="gsap-fade mb-5 h-[2px] w-9 bg-[#ff8989]" />

            {/* stats grid */}
            <div className="mb-9 grid grid-cols-2 border-l border-t border-white/[0.07]">
              {STATS.map((stat, i) => (
                <StatBox
                  key={stat.label}
                  stat={stat}
                  delay={i}
                  onTrigger={(fn) => registerStarter(i, fn)}
                />
              ))}
            </div>

            {/* tech pills */}
            <div className="gsap-fade">
              <div className="mb-3 border-t border-[#ff8989]/10 pt-3 text-[8px] uppercase tracking-[0.4em] text-[#ff8989]/40">
                Tech Arsenal
              </div>
              {TECH.map((row) => (
                <div key={row.cat} className="mb-3">
                  <div className="mb-2 text-[8px] uppercase tracking-[0.25em] text-white/20">
                    {row.cat}
                  </div>
                  <div className="flex flex-wrap gap-[5px]">
                    {row.pills.map((p) => (
                      <span
                        key={p}
                        className="rounded-[1px] border border-[#ff8989]/20 bg-[#ff8989]/[0.04] px-[9px] py-1 text-[8px] uppercase tracking-[0.12em] text-[#ff8989]/80 transition-colors hover:border-[#ff8989]/50 hover:bg-[#ff8989]/[0.09]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div>
            <div className="mb-1 border-t border-[#ff8989]/10 pt-3 text-[8px] uppercase tracking-[0.4em] text-[#ff8989]/40">
              Ranked · Recognised · Rewarded
            </div>

            <div className="mb-7 text-[19px]">
              {ACHIEVEMENTS.map((ach, i) => (
                <Achievement key={ach.num} data={ach} index={i} />
              ))}
            </div>

            {/* status badge */}
            <div className="border-t border-[#ff8989]/10 pt-3 text-[8px] uppercase tracking-[0.4em] text-[#ff8989]/40 mb-4">
              Current Status
            </div>
            <div className="flex items-center gap-3 border-b border-white/[0.05] pb-5">
              <div className="pulse-dot h-[7px] w-[7px] flex-shrink-0 rounded-full bg-green-400" />
              <div>
                <div className="text-[11px] font-bold text-white/80">
                  Open to Opportunities
                </div>
                <div className="mt-[2px] text-[9px] tracking-[0.1em] text-white/30">
                  Backend · Distributed Systems · Golang / Java
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

                {/* bottom fade to blend into contact */}
        {/* ADD THIS — gradient fade at bottom */}
  <div style={{
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: "180px",
    background: "linear-gradient(to bottom, transparent, #060408)",
    pointerEvents: "none",
    zIndex: 30,
  }} />
    </>
  );
};

export default LeonidaStats;
