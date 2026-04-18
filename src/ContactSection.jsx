import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "anushkapandey2915@gmail.com";

const LINKS = [
  {
    num: "01",
    title: "Email",
    sub: "anushkapandey2915@gmail.com",
    href: "mailto:anushkapandey2915@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8989" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "LinkedIn",
    sub: "anushkapandey2911",
    href: "https://www.linkedin.com/in/anushkapandey2911/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8989" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "GitHub",
    sub: "Browse the source",
    href: "https://github.com/anushkapandey2911",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8989" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Resume",
    sub: "Download PDF",
    href: "https://drive.google.com/file/d/1vycf5pBXPgDfpYp2kmcRhxeLM3wsoRCF/view?usp=sharing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8989" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

// ── custom cursor hook ────────────────────────────────────────────────────────
function useCursor(wrapRef) {
  const curRef = useRef();
  const dotRef = useRef();
  const pos    = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });
  const rafRef = useRef();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      pos.current.mx = e.clientX - r.left;
      pos.current.my = e.clientY - r.top;
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.mx + "px";
        dotRef.current.style.top  = pos.current.my + "px";
      }
    };
    wrap.addEventListener("mousemove", onMove);

    function tick() {
      const p = pos.current;
      p.cx += (p.mx - p.cx) * 0.12;
      p.cy += (p.my - p.cy) * 0.12;
      if (curRef.current) {
        curRef.current.style.left = p.cx + "px";
        curRef.current.style.top  = p.cy + "px";
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [wrapRef]);

  return { curRef, dotRef };
}

// ── parallax orbs hook ────────────────────────────────────────────────────────
function useParallax(wrapRef, orb1Ref, orb2Ref) {
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e) => {
      const r  = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width  - 0.5;
      const ny = (e.clientY - r.top)  / r.height - 0.5;
      if (orb1Ref.current)
        orb1Ref.current.style.transform = `translateX(calc(-50% + ${nx * 50}px)) translateY(${ny * 35}px)`;
      if (orb2Ref.current)
        orb2Ref.current.style.transform = `translate(${nx * -35}px, ${ny * -28}px)`;
    };
    wrap.addEventListener("mousemove", onMove);
    return () => wrap.removeEventListener("mousemove", onMove);
  }, [wrapRef, orb1Ref, orb2Ref]);
}

// ── link cell ─────────────────────────────────────────────────────────────────
function LinkCell({ link, curRef }) {
  return (
    <a
      href={link.href}
      target={link.href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noreferrer"
      className="link-cell"
      onMouseEnter={() => curRef.current?.classList.add("cur-big")}
      onMouseLeave={() => curRef.current?.classList.remove("cur-big")}
    >
      <span className="lc-num">{link.num}</span>
      <div className="lc-icon">{link.icon}</div>
      <div className="lc-title">{link.title}</div>
      <div className="lc-sub">{link.sub}</div>
      <div className="lc-line" />
      <span className="lc-arrow">↗</span>
    </a>
  );
}

// ── main component ────────────────────────────────────────────────────────────
const ContactSection = () => {
  const wrapRef = useRef();
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const [copied, setCopied] = useState(false);

  const { curRef, dotRef } = useCursor(wrapRef);
  useParallax(wrapRef, orb1Ref, orb2Ref);

  useGSAP(() => {
    const st = (trigger, extra = {}) => ({
      trigger: trigger ?? wrapRef.current,
      start: "top 80%",
      once: true,
      ...extra,
    });

    gsap.from(".ct-eyebrow",
      { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: st() });

    gsap.from([".ct-line1", ".ct-line2"],
      { y: 70, opacity: 0, duration: 1, stagger: 0.15, ease: "power4.out", scrollTrigger: st() });

    gsap.from(".ct-divider",
      { scaleY: 0, opacity: 0, duration: 0.6, delay: 0.35, ease: "power2.out", scrollTrigger: st() });

    gsap.from(".ct-sub",
      { y: 20, opacity: 0, duration: 0.8, delay: 0.45, ease: "power3.out", scrollTrigger: st() });

    gsap.from(".link-cell",
      { y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: st(".links-row", { start: "top 85%" }) });

    gsap.from(".email-strip",
      { y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: st(".email-strip", { start: "top 90%" }) });

    gsap.from(".ct-foot",
      { y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: st(".ct-foot", { start: "top 95%" }) });
  }, { scope: wrapRef });

  const doCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        .contact-wrap { cursor: none; }

        .ct-cursor {
          position: absolute; width: 38px; height: 38px;
          border: 1px solid rgba(255,137,137,0.55); border-radius: 50%;
          pointer-events: none; z-index: 100; transform: translate(-50%,-50%);
          transition: width .2s, height .2s, border-color .2s;
        }
        .ct-cursor.cur-big { width: 58px; height: 58px; border-color: #ff8989; }

        .ct-dot {
          position: absolute; width: 4px; height: 4px;
          background: #ff8989; border-radius: 50%;
          pointer-events: none; z-index: 101; transform: translate(-50%,-50%);
        }

        .ct-scan {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px,
            rgba(255,137,137,0.006) 3px, rgba(255,137,137,0.006) 4px);
        }

        .ct-orb1 {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,137,137,0.08) 0%, transparent 70%);
          top: -200px; left: 50%; transform: translateX(-50%);
          pointer-events: none; transition: transform 1s ease; z-index: 0;
        }
        .ct-orb2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(80,40,160,0.06) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          pointer-events: none; transition: transform 1.2s ease; z-index: 0;
        }

        .ct-hero { position: relative; z-index: 3; padding: 70px 60px 0; text-align: center; }

        .ct-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 10px; letter-spacing: 0.55em; text-transform: uppercase;
          color: rgba(255,137,137,0.35); margin-bottom: 20px;
        }

        .ct-line1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px,13vw,155px); line-height: 0.85;
          letter-spacing: 0.01em; color: #ff8989; display: block;
          position: relative;
        }
        .ct-line2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px,13vw,155px); line-height: 0.85;
          letter-spacing: 0.01em; display: block; position: relative;
          color: rgba(255,255,255,0.06);
          -webkit-text-stroke: 1px rgba(255,137,137,0.2);
        }

        .ct-line1::before, .ct-line1::after,
        .ct-line2::before, .ct-line2::after {
          content: attr(data-t); position: absolute; top: 0; left: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit; line-height: inherit; letter-spacing: inherit;
          width: 100%; text-align: center;
        }
        .ct-line1::before { color: rgba(0,255,200,0.1);  animation: g1 6s infinite; }
        .ct-line1::after  { color: rgba(255,0,80,0.08);  animation: g2 6s infinite; }
        .ct-line2::before { color: rgba(0,255,200,0.06); animation: g1 6s 0.5s infinite; }
        .ct-line2::after  { color: rgba(255,0,80,0.05);  animation: g2 6s 0.5s infinite; }

        @keyframes g1 {
          0%,90%,100% { clip-path: none; transform: none; }
          91% { clip-path: inset(25% 0 55% 0); transform: translate(-4px); }
          93% { clip-path: inset(65% 0 5% 0);  transform: translate(4px); }
          95% { clip-path: none; transform: none; }
        }
        @keyframes g2 {
          0%,87%,100% { clip-path: none; transform: none; }
          88% { clip-path: inset(10% 0 75% 0); transform: translate(3px); }
          90% { clip-path: inset(55% 0 15% 0); transform: translate(-3px); }
          92% { clip-path: none; transform: none; }
        }

        .ct-divider {
          width: 1px; height: 56px;
          background: linear-gradient(to bottom, rgba(255,137,137,0.5), transparent);
          margin: 22px auto; transform-origin: top;
        }
        .ct-sub {
          font-family: 'Space Mono', monospace;
          font-size: 12px; line-height: 1.9; color: rgba(255,255,255,0.3);
          max-width: 400px; margin: 0 auto 52px;
        }

        .links-row {
          position: relative; z-index: 3;
          display: grid; grid-template-columns: repeat(4,1fr);
          border-top: 1px solid rgba(255,137,137,0.08);
          border-left: 1px solid rgba(255,137,137,0.08);
        }

        .link-cell {
          border-right: 1px solid rgba(255,137,137,0.08);
          border-bottom: 1px solid rgba(255,137,137,0.08);
          padding: 32px 28px; position: relative; overflow: hidden;
          cursor: none; text-decoration: none; display: block;
        }
        .link-cell::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,137,137,0); transition: background .4s;
        }
        .link-cell:hover::before { background: rgba(255,137,137,0.04); }

        .lc-line {
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px; background: #ff8989;
          transition: width .5s cubic-bezier(.23,1,.32,1);
        }
        .link-cell:hover .lc-line { width: 100%; }

        .lc-num {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.4em;
          color: rgba(255,137,137,0.25); margin-bottom: 20px;
          display: block; transition: color .3s;
        }
        .link-cell:hover .lc-num { color: rgba(255,137,137,0.6); }

        .lc-icon {
          width: 32px; height: 32px;
          border: 1px solid rgba(255,137,137,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transition: border-color .3s, transform .4s cubic-bezier(.23,1,.32,1);
        }
        .link-cell:hover .lc-icon { border-color: rgba(255,137,137,0.5); transform: scale(1.1); }

        .lc-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; color: #fff; letter-spacing: 0.06em;
          margin-bottom: 6px; transition: color .3s;
        }
        .link-cell:hover .lc-title { color: #ff8989; }

        .lc-sub {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.2); line-height: 1.5;
        }

        .lc-arrow {
          position: absolute; bottom: 28px; right: 28px;
          font-size: 18px; color: rgba(255,137,137,0.2);
          transform: translate(-4px,4px);
          transition: transform .4s cubic-bezier(.23,1,.32,1), color .3s;
        }
        .link-cell:hover .lc-arrow { transform: translate(0,0); color: #ff8989; }

        .email-strip {
          position: relative; z-index: 3;
          padding: 44px 60px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(255,137,137,0.08);
          cursor: none; overflow: hidden;
        }
        .email-strip::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,137,137,0); transition: background .5s;
        }
        .email-strip:hover::before { background: rgba(255,137,137,0.03); }

        .es-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(255,137,137,0.3); margin-bottom: 10px;
        }
        .es-addr {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px,3.2vw,46px); color: #fff;
          letter-spacing: 0.04em; transition: color .3s;
          position: relative; z-index: 2;
        }
        .email-strip:hover .es-addr { color: #ff8989; }

        .copy-btn {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,137,137,0.5); border: 1px solid rgba(255,137,137,0.2);
          padding: 11px 22px; background: none; cursor: none;
          transition: all .3s; white-space: nowrap; position: relative; z-index: 2;
        }
        .copy-btn:hover { border-color: rgba(255,137,137,0.6); color: #ff8989; background: rgba(255,137,137,0.06); }
        .copy-btn.ok { color: #4ade80; border-color: rgba(74,222,128,0.4); background: rgba(74,222,128,0.05); }

        .ct-foot {
          position: relative; z-index: 3;
          padding: 26px 60px;
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Space Mono', monospace;
        }
        .ct-foot-left { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.1); }
        .ct-foot-right { display: flex; align-items: center; gap: 8px; }

        .avail-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
          animation: pg 1.8s ease-in-out infinite;
        }
        @keyframes pg {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,.5); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }
        .avail-txt { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(74,222,128,0.6); }

        .ct-city { position: absolute; bottom: 0; left: 0; width: 100%; pointer-events: none; z-index: 1; opacity: 0.25; }
      `}</style>

      <section
        ref={wrapRef}
        className="contact-wrap"
        style={{ width: "100%", minHeight: "100vh",  position: "relative", overflow: "hidden" }}
      >
        <div className="ct-cursor" ref={curRef} />
        <div className="ct-dot"    ref={dotRef} />
        <div className="ct-scan"   />
        <div className="ct-orb1"   ref={orb1Ref} />
        <div className="ct-orb2"   ref={orb2Ref} />

        {/* city silhouette */}
        <svg className="ct-city" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 L0,160 L60,160 L60,120 L80,120 L80,100 L100,100 L100,80 L120,80 L120,60 L140,60 L140,160 L180,160 L180,110 L200,110 L200,85 L220,85 L220,65 L250,65 L250,45 L270,45 L270,25 L290,25 L290,160 L330,160 L330,100 L350,100 L350,75 L370,75 L370,50 L400,50 L400,30 L420,30 L420,15 L440,15 L440,160 L480,160 L480,110 L500,110 L500,85 L520,85 L520,60 L550,60 L550,160 L590,160 L590,120 L610,120 L610,95 L630,95 L630,70 L660,70 L660,45 L680,45 L680,160 L720,160 L720,100 L740,100 L740,75 L760,75 L760,50 L790,50 L790,30 L810,30 L810,10 L830,10 L830,160 L870,160 L870,115 L890,115 L890,90 L910,90 L910,65 L940,65 L940,40 L960,40 L960,160 L1000,160 L1000,120 L1020,120 L1020,95 L1040,95 L1040,70 L1070,70 L1070,50 L1090,50 L1090,160 L1130,160 L1130,110 L1150,110 L1150,85 L1170,85 L1170,60 L1200,60 L1200,40 L1220,40 L1220,160 L1260,160 L1260,120 L1280,120 L1280,95 L1300,95 L1300,70 L1330,70 L1330,50 L1350,50 L1350,160 L1440,160 L1440,200 Z" fill="rgba(255,137,137,0.08)" />
          <rect x="125" y="65" width="5" height="4" fill="rgba(255,137,137,0.4)"  rx="1"/>
          <rect x="275" y="32" width="5" height="4" fill="rgba(255,200,100,0.35)" rx="1"/>
          <rect x="425" y="20" width="5" height="4" fill="rgba(255,137,137,0.3)"  rx="1"/>
          <rect x="815" y="18" width="5" height="4" fill="rgba(255,137,137,0.4)"  rx="1"/>
          <rect x="965" y="47" width="5" height="4" fill="rgba(255,200,100,0.3)"  rx="1"/>
          <rect x="1225" y="47" width="5" height="4" fill="rgba(255,137,137,0.35)" rx="1"/>
        </svg>

        {/* hero */}
        <div className="ct-hero">
          <div className="ct-eyebrow">Transmission Incoming · Bengaluru</div>
          <span className="ct-line1" data-t="GET IN">GET IN</span>
          <span className="ct-line2" data-t="TOUCH">TOUCH</span>
          <div className="ct-divider" />
          <p className="ct-sub">
            Backend engineer based in Bengaluru.
          </p>
        </div>

        {/* links grid */}
        <div className="links-row">
          {LINKS.map((link) => (
            <LinkCell key={link.num} link={link} curRef={curRef} />
          ))}
        </div>

        {/* email strip */}
        <div
          className="email-strip"
          onMouseEnter={() => curRef.current?.classList.add("cur-big")}
          onMouseLeave={() => curRef.current?.classList.remove("cur-big")}
        >
          <div>
            <div className="es-label">Direct Line</div>
            <div className="es-addr">{EMAIL.toUpperCase()}</div>
          </div>
          <button
            className={`copy-btn${copied ? " ok" : ""}`}
            onClick={doCopy}
            onMouseEnter={() => curRef.current?.classList.add("cur-big")}
            onMouseLeave={() => curRef.current?.classList.remove("cur-big")}
          >
            {copied ? "Copied ✓" : "Copy Address"}
          </button>
        </div>

        {/* footer */}
        <div className="ct-foot">
          <div className="ct-foot-left">© 2025 · Built with React + GSAP · GTA VI Inspired</div>
          <div className="ct-foot-right">
            <div className="avail-dot" />
            <span className="avail-txt">Open to Opportunities</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
