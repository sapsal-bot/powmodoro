
import React, { useEffect, useState, useRef, useMemo } from 'react';
import NatureGallery from './NatureGallery';

interface CelebrationProps {
  sessionCount: number;
  initialPraise: string;
  onNext: () => void;
  floatingImages: string[]; // New prop for floating images
}

declare var confetti: any;

const Celebration: React.FC<CelebrationProps> = ({ sessionCount, initialPraise, onNext, floatingImages }) => {
  const [praise] = useState<string>(initialPraise);
  const [isCalm, setIsCalm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hypeSectionRef = useRef<HTMLElement>(null);
  const confettiIntervalRef = useRef<any>(null);

  // Randomly select 4 to 6 images from the floatingImages prop
  const selectedFloatingImages = useMemo(() => {
    // Shuffle the array to get a random order
    const shuffled = [...floatingImages].sort(() => 0.5 - Math.random());
    // Select a random number between 4 and 6 (inclusive)
    const count = Math.floor(Math.random() * (6 - 4 + 1)) + 4; // Changed from 2-4 to 4-6
    // Return the sliced array, ensuring we don't try to get more images than available
    const images = shuffled.slice(0, Math.min(count, shuffled.length));
    // console.log("Selected Floating Images:", images); // Debug log removed
    return images;
  }, [floatingImages]);


  useEffect(() => {
    // Fire confetti continuously in "Hype Mode"
    const fireConfetti = () => {
      if (isCalm) return;
      confetti({
        particleCount: 4, // Doubled particle count
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        zIndex: 100
      });
      confetti({
        particleCount: 4, // Doubled particle count
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        zIndex: 100
      });
    };

    confettiIntervalRef.current = setInterval(fireConfetti, 100);

    return () => {
      if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
    };
  }, [isCalm]);

  const handleScroll = () => {
    if (containerRef.current && hypeSectionRef.current) {
      const scrollPos = containerRef.current.scrollTop;
      const calmThreshold = hypeSectionRef.current.offsetHeight - 100; 
      
      if (scrollPos > calmThreshold && !isCalm) {
        setIsCalm(true);
      } else if (scrollPos <= calmThreshold && isCalm) {
        setIsCalm(false);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className={`fixed inset-0 z-50 flex flex-col items-center overflow-y-auto overflow-x-hidden transition-colors duration-1000 scroll-smooth ${
        isCalm ? 'bg-[#f4f1ea]' : 'rainbow-animate'
      }`}
    >
      {/* HYPE SECTION */}
      <section 
        ref={hypeSectionRef}
        className="shrink-0 min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
      >
        {!isCalm && (
          <>
            {/* Background Marquee - Clipped to section */}
            <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none">
              <div className="animate-marquee inline-block text-9xl font-black text-white italic">
                {praise} {praise} {praise}
              </div>
            </div>
            {/* Corner Sparks */}
            <div className="absolute top-0 left-0 p-8 text-8xl opacity-50 animate-pulse">✨</div>
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}>🌟</div>

            {/* Floating Images */}
            {selectedFloatingImages.map((src, index) => ( // Use selectedFloatingImages here
              <img
                key={index}
                src={src}
                alt="Floating character"
                className="absolute animate-drift-around pointer-events-none"
                style={{
                  top: `${Math.random() * 90 + 5}%`, // Expanded to 5% to 95% vertically
                  left: `${Math.random() * 90 + 5}%`, // Expanded to 5% to 95% horizontally
                  width: `${Math.random() * (150 - 80) + 80}px`, // Reverted size: 80px to 150px
                  animationDuration: `${Math.random() * (7 - 4) + 4}s`, // Slightly faster: 4s-7s
                  animationDelay: `${Math.random() * -10}s`, // Start with negative delay for variety
                  zIndex: 20, 
                  objectFit: 'contain',
                }}
              />
            ))}
          </>
        )}

        <div className={`bg-white bg-opacity-95 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl border-8 border-yellow-300 relative z-10 ${!isCalm ? 'animate-zoom-pulse' : ''}`}>
          <div className="flex justify-center space-x-6 mb-6">
            <div className={`text-6xl ${!isCalm ? 'animate-bounce' : ''}`}>🎊</div>
            <div className={`text-7xl ${!isCalm ? 'animate-shake-intense' : ''}`}>🔥</div>
            <div className={`text-6xl ${!isCalm ? 'animate-bounce' : ''}`}>🎆</div>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-black mb-8 leading-tight uppercase ${
            !isCalm 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-600 to-blue-600'
              : 'text-indigo-900'
          }`}>
            {praise}
          </h2>

          <div className="mt-4 p-4 rounded-2xl bg-indigo-50 font-bold text-indigo-800">
            SESSION {sessionCount} COMPLETED SUCCESSFULLY!
          </div>

          <div className="mt-16 animate-bounce flex flex-col items-center gap-4">
            <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Scroll down for peace</span>
            <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center">
              <i className="fa-solid fa-chevron-down text-gray-300 text-xl"></i>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION & CALM SECTION - Immediately follows HYPE SECTION */}
      <section className="shrink-0 min-h-screen w-full flex flex-col items-center p-8 bg-white bg-opacity-60 backdrop-blur-md border-t border-white border-opacity-30">
        <div className="max-w-4xl w-full text-center py-20">
          <div className="mb-12">
            <h3 className="text-5xl md:text-7xl font-light text-slate-800 mb-6 font-serif italic tracking-tight">
              And breathe...
            </h3>
            <div className="w-24 h-1 bg-slate-200 mx-auto rounded-full mb-8"></div>
            <p className="text-2xl text-slate-500 max-w-xl mx-auto leading-relaxed font-light">
              Excellent focus. Now, allow your mind a moment of stillness before we continue.
            </p>
          </div>
          
          <div className="flex justify-center w-full mb-20 transform transition-all duration-1000 ease-out translate-y-0 opacity-100">
            <NatureGallery />
          </div>

          <div className="pb-32">
             <button 
              onClick={onNext}
              className="group relative inline-flex items-center justify-center px-20 py-10 font-black text-white transition-all duration-700 bg-slate-900 rounded-[2.5rem] hover:bg-black hover:scale-105 active:scale-95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              <span className="flex items-center gap-6 text-2xl tracking-[0.1em] uppercase">
                Return to Focus
                <i className="fa-solid fa-arrow-right group-hover:translate-x-3 transition-transform duration-500"></i>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Celebration;