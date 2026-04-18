import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Local Sound Hook ---
let audioCtx = null;
const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
};

const useLocalSounds = () => {
  const [isMuted, setIsMuted] = useState(true);

  const playTypingSound = useCallback(() => {
    if (isMuted) return;
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400 + Math.random() * 100, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  }, [isMuted]);

  const playHoverSound = useCallback(() => {
    if (isMuted) return;
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => {
      if (!prev) initAudio();
      return !prev;
    });
  };

  return { isMuted, toggleMute, playTypingSound, playHoverSound };
};

// --- Terminal Typing Component ---
const TerminalTyping = ({ playTypingSound }) => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const textLines = [
    "> Initializing profile...",
    "> Loading user: Anushka",
    "> Role: Backend Engineer",
    "> Status: Building scalable systems",
  ];

  useEffect(() => {
    if (currentLineIndex >= textLines.length) return;

    const currentFullLine = textLines[currentLineIndex];

    if (currentCharIndex < currentFullLine.length) {
      const timer = setTimeout(() => {
        setLines(prev => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) newLines[currentLineIndex] = "";
          newLines[currentLineIndex] += currentFullLine[currentCharIndex];
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
        playTypingSound();
      }, 30 + Math.random() * 40); // typing speed
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 500); // line delay
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, playTypingSound]);

  return (
    <div className="font-mono text-[#00ff41] text-sm md:text-base leading-loose drop-shadow-[0_0_5px_rgba(0,255,65,0.6)]">
      {lines.map((line, idx) => (
        <div key={idx} className="flex">
          <span>
            {line}
            {idx === currentLineIndex && (
              <span className="inline-block w-2.5 h-4 bg-[#00ff41] ml-1 align-middle animate-pulse"></span>
            )}
          </span>
        </div>
      ))}
      {currentLineIndex >= textLines.length && (
        <div className="flex mt-2">
          <span>&gt; <span className="inline-block w-2.5 h-4 bg-[#00ff41] ml-1 align-middle animate-pulse"></span></span>
        </div>
      )}
    </div>
  );
};

// --- Main Hacker Block Component ---
const HackerExperienceBlock = () => {
  const containerRef = useRef(null);
  const [stage, setStage] = useState('hidden'); // hidden -> boot -> crt -> terminal
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [mouseInBounds, setMouseInBounds] = useState(false);
  const { isMuted, toggleMute, playTypingSound, playHoverSound } = useLocalSounds();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && stage === 'hidden') {
          setStage('boot');
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [stage]);

  useEffect(() => {
    if (stage === 'boot') {
      const timer1 = setTimeout(() => setStage('crt'), 800);
      const timer2 = setTimeout(() => setStage('terminal'), 1800);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [stage]);

  // Local Cursor tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseInBounds(true)}
      onMouseLeave={() => setMouseInBounds(false)}
      className="relative w-full h-full min-h-[300px] bg-black/50 border border-gray-800 rounded-lg overflow-hidden cursor-none group p-8"
      style={{
        boxShadow: mouseInBounds ? '0 0 20px rgba(0, 255, 65, 0.1)' : 'none',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      {/* Sound Toggle (only visible inside) */}
      <button 
        onClick={toggleMute}
        onMouseEnter={playHoverSound}
        className="absolute top-4 right-4 z-[50] text-[#00ff41] opacity-50 hover:opacity-100 hover:scale-110 transition-all z-50 cursor-none"
      >
        <i className={isMuted ? "ri-volume-mute-fill" : "ri-volume-up-fill"}></i>
      </button>

      {/* Local custom cursor */}
      {mouseInBounds && (
        <div 
          className="pointer-events-none absolute z-[100] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <div className="w-1 h-1 bg-[#00ff41] rounded-full shadow-[0_0_10px_#00ff41]"></div>
          <div className="absolute w-[24px] h-[2px] bg-[#00ff41]/50"></div>
          <div className="absolute h-[24px] w-[2px] bg-[#00ff41]/50"></div>
        </div>
      )}

      {/* Content wrapper with scanlines */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {/* Scanlines layer */}
        <div className="absolute inset-0 bg-[#00ff41] mix-blend-overlay opacity-5 pointer-events-none z-20"
             style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }}>
        </div>

        {stage === 'hidden' && (
          <div className="w-full h-full flex items-center justify-center opacity-0"></div>
        )}

        {stage === 'boot' && (
          <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-white/5 animate-pulse">
            <div className="w-full h-1 bg-white/30 absolute animate-[bounce_0.5s_infinite]"></div>
          </div>
        )}

        {stage === 'crt' && (
          <div className="w-full h-full flex flex-col items-center justify-center absolute inset-0">
             <h3 className="text-white text-6xl font-black tracking-tighter" style={{
               textShadow: '2px 0 red, -2px 0 blue',
               animation: 'glitch 0.3s infinite alternate'
             }}>
               AP
             </h3>
             <style>{`
               @keyframes glitch {
                 0% { transform: skew(0deg); }
                 50% { transform: skew(5deg); }
                 100% { transform: skew(-5deg); }
               }
             `}</style>
          </div>
        )}

        {stage === 'terminal' && (
          <div className="w-full h-full z-10 pointer-events-auto">
            <div className="mb-6 pointer-events-auto cursor-none">
              <span 
                onMouseEnter={playHoverSound}
                className="text-purple-400 text-lg font-semibold tracking-wider hover:text-[#00ff41] transition-colors"
                style={{ textShadow: mouseInBounds ? '0 0 5px rgba(0,255,65,0.5)' : 'none' }}
              >
                Building & Delivering: My Experience
              </span>
            </div>
            
            <TerminalTyping playTypingSound={playTypingSound} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HackerExperienceBlock;
