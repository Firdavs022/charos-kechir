import React, { useState } from 'react';
import { Heart, Sparkles, Smile, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface Step3QuestionProps {
  onForgive: () => void;
  partnerName: string;
}

const FLEE_RESPONSES = [
  "Yo'q 😜",
  "Aniqmi? 🥺",
  "Yana bir bor o'ylab ko'r...",
  "Arazlama iltimos 🌹",
  "Baribir kechirasan! ❤️",
  "Qochib qutulolmaysan 😄",
  "Tugma ham qochyapti-ku! 🏃‍♂️",
  "Meni qiynama jooon... ✨",
  "Faqat 'HA' tugmasini bos! 🥰",
  "Kechirdim deb qo'yaqol 🙈",
  "Yuragim ezilib ketyapti 💔",
  "Sen baribir mening yagonamsan! 🌟",
];

const BEARS_GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW5pZXp5MnY1amRmd2hhNDF5Mm43b3ZwMnIycDF2ZW1mMnlsdGNnbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L952348395488/giphy.gif", // sad/crying
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc29oc21uaWNpdXZ1cndxOWJuc3pvbnJpM29yd212OG4wMTdwYjdrZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ISOckXUybVfQ4/giphy.gif", // puppy eyes
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3g2c3FqN3R3eDkxMGVqZmhld3pkcnN6MnB1NWt0cmh3OWtudXdyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Y5BbDSkSTiY8/giphy.gif", // pleading
];

export const Step3Question: React.FC<Step3QuestionProps> = ({ onForgive, partnerName }) => {
  const [fleeCount, setFleeCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const name = partnerName || 'Farishtam';

  const handleFlee = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    audioEngine.playBoing();

    const nextCount = fleeCount + 1;
    setFleeCount(nextCount);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);

    // Calculate safe random coordinates inside the viewport
    const paddingX = 80;
    const paddingY = 80;
    const maxX = Math.max(100, window.innerWidth - 180);
    const maxY = Math.max(100, window.innerHeight - 100);

    const randomX = Math.floor(Math.random() * (maxX - paddingX) + paddingX / 2);
    const randomY = Math.floor(Math.random() * (maxY - paddingY) + paddingY / 2);

    setNoPosition({ x: randomX, y: randomY });
  };

  const currentScale = Math.min(1 + fleeCount * 0.1, 1.75);
  const angerLevel = Math.max(0, 100 - fleeCount * 12);

  return (
    <section className="w-full glass-card p-6 sm:p-10 rounded-3xl flex flex-col items-center text-center animate-fadeIn relative min-h-[460px] justify-center overflow-hidden">
      {/* Dynamic Cute Character GIF with fallback */}
      <div className="relative mb-4 group">
        <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-pink-400/40 shadow-2xl shadow-pink-500/20 bg-pink-950/40 flex items-center justify-center">
          <img
            src={BEARS_GIFS[fleeCount % BEARS_GIFS.length]}
            alt="Iltijo qilayotgan ayiqcha"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              // fallback cute SVG avatar if giphy is blocked by user adblock
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-5xl">
            🥺
          </div>
        </div>

        {/* Small floating feeling badge */}
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-pink-300 shadow-md">
          {fleeCount === 0 ? 'Kechirim so\'rayapman' : `${fleeCount} marta qochildi! 😅`}
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-pink-200 text-glow">
        Meni Kechirasanmi, {name}? 🥺
      </h2>

      <p className="text-sm sm:text-base text-pink-200/80 mb-4 max-w-md font-light leading-relaxed">
        Xatoyimni chin dildan tushundim... Seni ranjitganim uchun qalbim og'riyapti.
        Boshqa hech qachon seni xafa qilmayman, so'z beraman! 🌹
      </p>

      {/* Playful Anger Meter */}
      <div className="w-full max-w-xs mb-8 bg-white/5 border border-pink-400/20 rounded-full p-1.5 flex items-center gap-2">
        <span className="text-[11px] text-pink-300 font-medium pl-2 whitespace-nowrap">
          Araz darajasi:
        </span>
        <div className="flex-1 bg-black/40 h-3 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${angerLevel}%` }}
          />
        </div>
        <span className="text-[11px] font-bold text-pink-300 pr-2">
          {angerLevel}%
        </span>
      </div>

      {/* Dynamic Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full relative min-h-[85px] z-20">
        {/* Yes Button (Grows progressively larger) */}
        <button
          onClick={() => {
            audioEngine.playHarpFanfare();
            onForgive();
          }}
          style={{
            transform: `scale(${currentScale})`,
            transformOrigin: 'center center',
          }}
          className="glass-btn px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-bold text-base sm:text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 shadow-2xl shadow-pink-500/60 hover:shadow-pink-500/80 border-2 border-pink-300/50 transition-transform duration-300 cursor-pointer flex items-center gap-2 heart-beat-anim"
        >
          <Heart className="w-5 h-5 fill-white" />
          Ha, Kechiraman! ❤️
        </button>

        {/* No Button (Runs away on mouse hover or touch) */}
        <button
          onMouseEnter={handleFlee}
          onClick={handleFlee}
          onTouchStart={handleFlee}
          style={
            noPosition
              ? {
                  position: 'fixed',
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                  zIndex: 999,
                }
              : {}
          }
          className={`glass-btn px-6 sm:px-8 py-3.5 rounded-full text-slate-200 text-sm font-semibold hover:bg-red-500/25 border border-red-400/40 shadow-lg transition-all select-none ${
            isShaking ? 'shake-btn' : ''
          }`}
        >
          {FLEE_RESPONSES[fleeCount % FLEE_RESPONSES.length]}
        </button>
      </div>

      {fleeCount > 2 && (
        <p className="text-xs text-pink-300/80 mt-6 animate-pulse">
          💡 "Yo'q" tugmasi qochib yuribdi, baribir "Ha"ni bosishingga to'g'ri keladi! 🥰
        </p>
      )}
    </section>
  );
};
