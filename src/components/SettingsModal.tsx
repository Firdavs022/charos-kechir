import React, { useState } from 'react';
import { X, Heart, Sparkles, Check, RotateCcw } from 'lucide-react';
import { CustomSettings } from '../types';
import { audioEngine } from '../utils/audio';

interface SettingsModalProps {
  settings: CustomSettings;
  onSave: (newSettings: CustomSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onSave,
  onClose,
}) => {
  const [partnerName, setPartnerName] = useState(settings.partnerName);
  const [senderName, setSenderName] = useState(settings.senderName);
  const [customLetter, setCustomLetter] = useState(settings.customLetter || '');

  const quickNames = ['Jonim', 'Yulduzim', 'Malikam', 'Farishtam', 'Go\'zalim', 'Shirinim'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playChime(700);
    onSave({
      partnerName: partnerName.trim() || 'Jonim',
      senderName: senderName.trim() || 'Sening Sevgiling',
      customLetter: customLetter.trim(),
    });
    onClose();
  };

  const handleReset = () => {
    setPartnerName('Jonim');
    setSenderName('Sening Sevgiling');
    setCustomLetter('');
    audioEngine.playChime(400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-card max-w-lg w-full p-6 sm:p-7 rounded-3xl border border-pink-400/50 shadow-2xl bg-[#140224]/95 text-left relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-300 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          <h3 className="text-xl font-bold text-pink-200">
            Shaxsiylashtirish Sozlamalari
          </h3>
        </div>
        <p className="text-xs text-pink-200/70 mb-5">
          Ushbu sahifani aynan sevgilingiz uchun moslashtiring:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-pink-200 block mb-1.5">
              Sevgilingizning ismi yoki erkalash so'zi:
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Masalan: Jonim, Shahrizoda, Farishtam..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-300/40 text-sm focus:outline-none focus:border-pink-400"
            />
            {/* Quick buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickNames.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPartnerName(n)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    partnerName === n
                      ? 'bg-pink-500/40 border-pink-300 text-white'
                      : 'bg-white/5 border-white/10 text-pink-200/80 hover:bg-white/10'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-200 block mb-1.5">
              Sizning ismingiz (Maktub va sertifikat imzosi):
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Masalan: Sening Sevgiling, Firdavs..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-300/40 text-sm focus:outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-200 block mb-1.5">
              Shaxsiy Yurakdan Maktub matni (Ixtiyoriy):
            </label>
            <textarea
              rows={4}
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              placeholder="Standart samimiy maktub o'rniga o'zingizning xatingizni yozishingiz mumkin..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-300/40 text-xs sm:text-sm focus:outline-none focus:border-pink-400 resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-pink-400/20">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-pink-300/80 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Standartga qaytarish
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="glass-btn px-4 py-2 rounded-xl text-xs text-pink-300"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="glass-btn px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-pink-400 shadow-md flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Saqlash
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
