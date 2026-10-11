import React from 'react';
import { Heart, Music, Volume2, VolumeX, Sparkles, Settings2 } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface HeaderProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  maxUnlockedStep: number;
  partnerName: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onSelectStep,
  maxUnlockedStep,
  partnerName,
  isMusicPlaying,
  onToggleMusic,
  onOpenSettings,
}) => {
  const steps = [
    { num: 1, label: 'Xotiralar', icon: '✨' },
    { num: 2, label: 'Maktub', icon: '💌' },
    { num: 3, label: 'Savol', icon: '🥺' },
    { num: 4, label: 'Tantana', icon: '💖' },
  ];

  return (
    <header className="w-full max-w-4xl flex flex-col gap-4 z-20 py-3 px-2 sm:px-4">
      <div className="flex justify-between items-center w-full">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl glass-card flex items-center justify-center text-pink-400 text-xl shadow-lg border border-pink-400/30">
            <Heart className="w-6 h-6 fill-pink-500 text-pink-400 heart-beat-anim" />
          </div>
          <div>
            <h1 className="font-romantic text-2xl sm:text-3xl font-bold text-pink-300 text-glow leading-tight">
              Kechir Meni, {partnerName || 'Jonim'}...
            </h1>
            <p className="text-xs text-pink-200/70 flex items-center gap-1">
              <span>Faqat sen uchun tayyorlandi</span>
              <Sparkles className="w-3 h-3 text-pink-400 inline" />
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Personalize Button */}
          <button
            onClick={() => {
              audioEngine.playChime(600);
              onOpenSettings();
            }}
            title="Ism va sozlamalarni o'zgartirish"
            className="glass-btn p-2.5 rounded-full text-pink-200 hover:text-pink-100 flex items-center justify-center border-pink-400/30"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Music Button */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? "Musiqani to'xtatish" : "Musiqani yoqish"}
            className="glass-btn px-3.5 py-2 rounded-full flex items-center gap-2.5 text-xs sm:text-sm text-pink-200 shadow-md border-pink-400/30 hover:border-pink-400/60"
          >
            {isMusicPlaying ? (
              <div className="flex items-end gap-0.5 h-4 w-4">
                <div className="w-1 bg-pink-400 rounded-sm eq-bar-1"></div>
                <div className="w-1 bg-pink-400 rounded-sm eq-bar-2"></div>
                <div className="w-1 bg-pink-400 rounded-sm eq-bar-3"></div>
                <div className="w-1 bg-pink-400 rounded-sm eq-bar-4"></div>
              </div>
            ) : (
              <Music className="w-4 h-4 text-pink-400" />
            )}
            <span className="hidden sm:inline font-medium">
              {isMusicPlaying ? "Musiqa: Yoqilgan" : "Musiqa: O'chiq"}
            </span>
          </button>
        </div>
      </div>

      {/* Step Navigation Dots */}
      <nav aria-label="Bosqichlar" className="flex items-center justify-center gap-2 sm:gap-6 mt-1">
        {steps.map((s) => {
          const isActive = currentStep === s.num;
          const isUnlocked = s.num <= maxUnlockedStep;

          return (
            <button
              key={s.num}
              onClick={() => {
                if (isUnlocked) {
                  audioEngine.playChime(500 + s.num * 80);
                  onSelectStep(s.num);
                }
              }}
              disabled={!isUnlocked}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/40 scale-105 border border-pink-300/40'
                  : isUnlocked
                  ? 'bg-white/5 text-pink-200/80 hover:bg-white/10 hover:text-white border border-white/10 cursor-pointer'
                  : 'bg-white/5 text-pink-200/30 cursor-not-allowed opacity-50 border border-transparent'
              }`}
            >
              <span className="text-sm">{s.icon}</span>
              <span className="hidden xs:inline">
                {s.num}-Qadam: {s.label}
              </span>
              <span className="xs:hidden">{s.num}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
