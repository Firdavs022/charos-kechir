import React, { useState } from 'react';
import { Heart, RotateCcw, Award, Sparkles, Check, Gift, Share2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveCoupon } from '../types';
import { audioEngine } from '../utils/audio';

interface Step4CelebrationProps {
  onRestart: () => void;
  partnerName: string;
  senderName: string;
  onFireworkBurst: () => void;
}

const INITIAL_COUPONS: LoveCoupon[] = [
  {
    id: '1',
    title: '100 ta Issiq Quchoqlash',
    description: 'Qachon xohlasang, darhol erkalash va quchoqlash huquqi!',
    icon: '🫂',
    claimed: false,
  },
  {
    id: '2',
    title: 'Muzqaymoq & Shirinlik Sayri',
    description: 'Eng sevimli kafengda istagan shirinliging mening hisobimdan!',
    icon: '🍦',
    claimed: false,
  },
  {
    id: '3',
    title: '1 Kun Qirolicha Rejimi',
    description: 'Butun bir kun faqat sening xohish-istaklaring amalga oshadi!',
    icon: '👑',
    claimed: false,
  },
  {
    id: '4',
    title: 'Sevimli Taomingni Tayyorlab Berish',
    description: 'Maxsus mehr va e\'tibor bilan tayyorlangan kechki ovqat!',
    icon: '🍝',
    claimed: false,
  },
  {
    id: '5',
    title: 'Yulduzlar Ostida Sayr',
    description: 'Shaharning eng chiroyli joyida romantik sayr va shirin suhbat!',
    icon: '🌙',
    claimed: false,
  },
];

export const Step4Celebration: React.FC<Step4CelebrationProps> = ({
  onRestart,
  partnerName,
  senderName,
  onFireworkBurst,
}) => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(INITIAL_COUPONS);
  const [copiedLink, setCopiedLink] = useState(false);

  const name = partnerName || 'Jonim';
  const sender = senderName || 'Sening Sevgiling';

  const triggerConfetti = () => {
    audioEngine.playHarpFanfare();
    onFireworkBurst();

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#ff69b4', '#9333ea', '#fb7185', '#ffd700'],
      });
    } catch {
      // fallback
    }
  };

  const claimCoupon = (id: string) => {
    audioEngine.playChime(700);
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, claimed: !c.claimed } : c))
    );
  };

  const handleShare = () => {
    audioEngine.playChime(600);
    const textToShare = `${name}, seni butun qalbim bilan yaxshi ko'raman! Biz yana birgamiz ❤️ — ${sender}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section className="w-full glass-card p-6 sm:p-10 rounded-3xl flex flex-col items-center text-center animate-fadeIn relative">
      {/* Celebration Icon */}
      <div className="text-6xl sm:text-7xl mb-4 animate-bounce select-none">
        💖
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-pink-200 text-glow font-romantic">
        Uraa! Rahmat Senga, {name}! 🥰
      </h2>

      <p className="text-sm sm:text-base text-pink-100 mb-6 max-w-lg leading-relaxed font-light">
        Sen dunyodagi eng ko'ngli toza, kechirimli va mehribon yulduzimsan! Seni cheksiz sevaman va har soniya asrab-avaylashga va'da beraman! ✨
      </p>

      {/* Romantic Quote Card */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card bg-pink-500/15 border-pink-400/40 max-w-lg mb-8 shadow-inner">
        <p className="text-sm sm:text-base text-pink-200 italic font-serif-romantic">
          "Dunyo bir yon, sen bir yonsan... Sen mening baxtim, quvonchim va hayotimdagi eng yorug' yulduzimsan!"
        </p>
      </div>

      {/* Official Certificate of Forgiveness */}
      <div className="w-full max-w-xl glass-card p-6 sm:p-8 rounded-3xl mb-8 border-2 border-pink-400/50 relative overflow-hidden bg-gradient-to-b from-purple-950/60 to-pink-950/60 shadow-2xl">
        <div className="flex justify-between items-center border-b border-pink-400/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            <span className="text-xs uppercase tracking-widest font-semibold text-yellow-300">
              Rasmiy Shahodatnoma
            </span>
          </div>
          <span className="text-xs text-pink-300/80">№ SEVGI-2026</span>
        </div>

        <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-pink-200 mb-2">
          Kechirim va Abadiy Muhabbat Guvohnomasi
        </h3>

        <div className="space-y-3 my-6 text-sm text-pink-100/90 text-left font-serif-romantic border-y border-pink-400/20 py-4">
          <div className="flex justify-between">
            <span className="text-pink-300/70">Kechirim Egasi:</span>
            <span className="font-bold text-pink-200">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-pink-300/70">Baxtli Sevgiling:</span>
            <span className="font-bold text-pink-200">{sender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-pink-300/70">Qaror:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4 inline" /> To'liq Kechirildi & Baxtli!
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-pink-300/70">Amal Qilish Muddati:</span>
            <span className="font-bold text-pink-300">Abadiy ❤️</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-pink-300/60 pt-2">
          <span>Yuraklar Muhrlandi ✨</span>
          <div className="w-12 h-12 rounded-full border-2 border-pink-400/50 bg-pink-500/20 flex items-center justify-center text-lg rotate-12">
            👑
          </div>
        </div>
      </div>

      {/* Romantic Promise Coupons */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-bold text-pink-200">
            Senga Maxsus Va'da Kuponlari 🎁
          </h3>
        </div>
        <p className="text-xs text-pink-200/70 mb-4">
          Istalgan kuponingni bosing va faollashtiring — bu va'dalar so'zsiz bajariladi!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {coupons.map((c) => (
            <div
              key={c.id}
              onClick={() => claimCoupon(c.id)}
              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                c.claimed
                  ? 'bg-emerald-950/40 border-emerald-400/50 shadow-md shadow-emerald-500/10'
                  : 'bg-white/5 border-pink-400/20 hover:bg-white/10 hover:border-pink-400/40'
              }`}
            >
              <div className="text-2xl mt-0.5">{c.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-pink-200">
                    {c.title}
                  </h4>
                  {c.claimed && (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Faol
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-pink-200/70 mt-1">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={triggerConfetti}
          className="glass-btn px-6 py-2.5 rounded-full text-white font-semibold text-xs sm:text-sm bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-xl shadow-pink-500/40 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Yana Tantana Qilish! 🎆
        </button>

        <button
          onClick={handleShare}
          className="glass-btn px-5 py-2.5 rounded-full text-pink-200 hover:text-white text-xs sm:text-sm flex items-center gap-2 border-pink-400/30"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Nusxalandi! ❤️</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-pink-400" />
              <span>Muhabbat Izhorini Nusxalash</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            audioEngine.playChime(500);
            onRestart();
          }}
          className="glass-btn px-5 py-2.5 rounded-full text-pink-300 hover:text-white text-xs sm:text-sm flex items-center gap-2 border-pink-400/30"
        >
          <RotateCcw className="w-4 h-4" />
          Boshidan Ko'rish
        </button>
      </div>
    </section>
  );
};
