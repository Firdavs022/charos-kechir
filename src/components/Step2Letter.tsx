import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Heart, Mail, Sparkles, RotateCcw, FastForward } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface Step2LetterProps {
  onBack: () => void;
  onNext: () => void;
  partnerName: string;
  senderName: string;
  customLetter?: string;
}

export const Step2Letter: React.FC<Step2LetterProps> = ({
  onBack,
  onNext,
  partnerName,
  senderName,
  customLetter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingTimerRef = useRef<number | null>(null);

  const defaultName = partnerName || 'Sevgilim, jonim';
  const defaultLetter = customLetter || `${defaultName}... ❤️

Ba'zida bilmasdan ko'nglingga og'ir botadigan gap gapirib qo'yganim yoxud seni ozgina bo'lsa ham xafa qilib qo'yganim uchun chin yurakdan afsusdaman.

Sen mening hayotimga kirib kelganingdan beri butun dunyo men uchun boshqacha, yanada yorqin va rang-barang ko'rina boshladi. Sening har bir samimiy tabassuming — mening eng katta baxtim va kuch-quvvatimdir.

Xatolarimni chuqur tushunib yetdim. Menga yana bir bor imkoniyat berishingni, arazlaringni unutib, yana avvalgidek menga mehr bilan boqishingni chin dildan so'rayman...

Seni har doim asrab-avaylayman va hech qachon xafa qilmaslikka va'da beraman! ✨`;

  const openEnvelope = () => {
    audioEngine.playEnvelopeOpen();
    setIsOpen(true);
    startTyping();
  };

  const startTyping = () => {
    setDisplayedText('');
    setIsTypingComplete(false);
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    let currentIndex = 0;
    const textToType = defaultLetter;

    typingTimerRef.current = window.setInterval(() => {
      if (currentIndex < textToType.length) {
        setDisplayedText(textToType.slice(0, currentIndex + 1));
        if (currentIndex % 3 === 0) {
          audioEngine.playKeyTick();
        }
        currentIndex++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsTypingComplete(true);
      }
    }, 28);
  };

  const instantReveal = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedText(defaultLetter);
    setIsTypingComplete(true);
    audioEngine.playChime(700);
  };

  const replayTyping = () => {
    audioEngine.playChime(500);
    startTyping();
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  return (
    <section className="w-full glass-card p-5 sm:p-8 rounded-3xl flex flex-col items-center text-center animate-fadeIn relative">
      <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-3xl mb-3 shadow-lg shadow-pink-500/20">
        <Mail className="w-7 h-7 text-pink-400" />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-pink-300 text-glow">
        2-Qadam: Senga Chin Yurakdan Maktubim 💌
      </h2>
      <p className="text-sm sm:text-base text-pink-100/80 mb-6 max-w-md">
        {isOpen
          ? 'Maktubni oxirigacha diqqat bilan o\'qing...'
          : 'Konvert ustiga bosing va muhrni oching:'}
      </p>

      {/* Interactive Envelope */}
      {!isOpen ? (
        <div
          onClick={openEnvelope}
          className="group cursor-pointer my-4 w-full max-w-md perspective-1000 transform transition-transform hover:scale-105 duration-300"
        >
          <div className="w-full h-56 sm:h-64 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 p-1 shadow-2xl relative flex flex-col justify-center items-center overflow-hidden border-2 border-pink-300/40">
            {/* Envelope flap decor */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/20 to-transparent clip-path-polygon pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-red-600/90 border-2 border-amber-300/80 shadow-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-10 h-10 text-white fill-white heart-beat-anim" />
            </div>

            <p className="font-romantic text-3xl text-white font-bold drop-shadow-md">
              {partnerName ? `${partnerName} Uchun Maxsus...` : 'Sen Uchun Maxsus...'}
            </p>

            <span className="text-xs text-white/90 mt-3 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 group-hover:bg-black/50 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              Konvertni ochish uchun bosing 👆
            </span>
          </div>
        </div>
      ) : (
        /* Opened Letter Parchment Box */
        <div className="w-full max-w-xl glass-card p-6 sm:p-8 rounded-3xl mb-6 text-left relative bg-purple-950/50 border border-pink-400/40 shadow-2xl">
          {/* Top Controls */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-pink-400/20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-pink-400"></span>
              <span className="w-3 h-3 rounded-full bg-purple-400"></span>
              <span className="text-xs text-pink-300/80 font-serif-romantic italic ml-1">
                Chin dildan yozilgan maktub
              </span>
            </div>

            <div className="flex items-center gap-1">
              {!isTypingComplete ? (
                <button
                  onClick={instantReveal}
                  title="Maktubni darhol ko'rsatish"
                  className="glass-btn px-2.5 py-1 rounded-lg text-xs text-pink-300 hover:text-white flex items-center gap-1"
                >
                  <FastForward className="w-3 h-3" />
                  <span>Tezroq</span>
                </button>
              ) : (
                <button
                  onClick={replayTyping}
                  title="Qayta o'qish"
                  className="glass-btn px-2.5 py-1 rounded-lg text-xs text-pink-300 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Qayta</span>
                </button>
              )}
            </div>
          </div>

          {/* Letter Body */}
          <div className="min-h-[180px] sm:min-h-[200px] whitespace-pre-line text-sm sm:text-base text-pink-100 font-light leading-relaxed font-serif-romantic tracking-wide">
            {displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-2 h-4 ml-1 bg-pink-400 animate-pulse align-middle" />
            )}
          </div>

          {/* Signature */}
          {isTypingComplete && (
            <div className="mt-6 pt-4 border-t border-pink-400/20 text-right">
              <p className="font-romantic text-2xl text-pink-300 font-bold">
                Har doim seni sevuvchi,
              </p>
              <p className="text-sm text-pink-200/80 font-medium">
                {senderName || 'Sening yagonang'} ❤️
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <button
          onClick={() => {
            audioEngine.playChime(450);
            onBack();
          }}
          className="glass-btn px-6 py-2.5 rounded-full text-pink-200 text-sm font-medium flex items-center gap-2 border-pink-400/30"
        >
          <ArrowLeft className="w-4 h-4" />
          Xotiralarga Qaytish
        </button>

        {isOpen && (
          <button
            onClick={() => {
              audioEngine.playChime(750);
              onNext();
            }}
            className="glass-btn px-8 py-2.5 rounded-full text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-xl shadow-pink-500/30 hover:scale-105 transition-all flex items-center gap-2"
          >
            Eng Muhim Savolga O'tish
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
