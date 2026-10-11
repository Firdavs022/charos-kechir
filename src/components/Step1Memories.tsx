import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart, Plus, Calendar, Star } from 'lucide-react';
import { MemoryItem } from '../types';
import { audioEngine } from '../utils/audio';

interface Step1MemoriesProps {
  onNext: () => void;
  partnerName: string;
}

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: '1',
    title: 'Ilk Diydor',
    subtitle: 'Birinchi Uchrashuv',
    description: "Aynan shu kuni ko'zlaringga qarab, dunyodagi eng baxtli inson bo'lgan edim. Seni ilk bor ko'rganimdagidek toza va beg'ubor baxtni boshqa hech qachon his qilmaganman.",
    icon: '🌸',
    badge: 'Unutilmas Kun',
    date: 'O\'sha eng go\'zal oqshom',
  },
  {
    id: '2',
    title: 'Kulging Nuri',
    subtitle: 'Shirin Kulging',
    description: "Sening samimiy va beg'ubor kulging - bu dunyodagi eng jarangdor va go'zal musiqa. Sening bitta tabassuming uchun butun dunyoni berishga tayyorman!",
    icon: '🥰',
    badge: 'Yuragim Quvonchi',
    date: 'Har bir tabassumingda',
  },
  {
    id: '3',
    title: 'Orzularimiz',
    subtitle: 'Baxtli Kelajak',
    description: "Sen bilan birga qo'l ushlashib kelajak qurish, har tong senga baxt tilash va har oqshom seni quchoqlash mening hayotimdagi eng buyuk orzuimdir.",
    icon: '🕊️',
    badge: 'Cheksiz Orzu',
    date: 'Bir umrga birga',
  },
  {
    id: '4',
    title: 'Yomg\'irdagi Sayr',
    subtitle: 'Dildan Suhbatlar',
    description: "Har safar birga soatlab gaplashganimizda vaqt to'xtab qolgandek bo'ladi. Sening ovozing mening yuragimga taskin beradi, xotirjamlik bag'ishlaydi.",
    icon: '🌧️',
    badge: 'Qalb Sadosi',
    date: 'Orom baxsh lahzalar',
  },
  {
    id: '5',
    title: 'Ko\'zlaring Sehri',
    subtitle: 'Yulduzli Nigohlar',
    description: "Sening ko'zlaringga boqqanimda dunyoning butun g'am-tashvishi unutiladi. U nigohlarda faqat cheksiz mehr, sadoqat va sevgini ko'raman.",
    icon: '✨',
    badge: 'Maftunkor',
    date: 'Har bir nigohingda',
  },
  {
    id: '6',
    title: 'Bizning Qo\'shiq',
    subtitle: 'Yuraklar Nag\'masi',
    description: "Har qachon bizning qo'shiq yangraganda, vujudim sen haqingdagi shirin tuyg'ular bilan to'ladi. Sen mening eng go'zal kuyimsan.",
    icon: '🎶',
    badge: 'Muhabbat Kuyi',
    date: 'Abadiy sado',
  },
];

export const Step1Memories: React.FC<Step1MemoriesProps> = ({ onNext, partnerName }) => {
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState('💖');

  const openModal = (memory: MemoryItem) => {
    audioEngine.playChime(650);
    setSelectedMemory(memory);
  };

  const closeModal = () => {
    setSelectedMemory(null);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newMem: MemoryItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      subtitle: 'Bizning Yangi Xotiramiz',
      description: newDesc.trim(),
      icon: newIcon || '💖',
      badge: 'Yurakdan',
      date: 'Maxsus kun',
    };

    setMemories([...memories, newMem]);
    setNewTitle('');
    setNewDesc('');
    setIsAddingCustom(false);
    audioEngine.playHarpFanfare();
  };

  return (
    <section className="w-full glass-card p-5 sm:p-8 rounded-3xl flex flex-col items-center text-center animate-fadeIn relative">
      {/* Decorative Badge */}
      <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-3xl mb-3 shadow-lg shadow-pink-500/20">
        <Sparkles className="w-7 h-7 text-pink-400 animate-pulse" />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-pink-300 text-glow">
        1-Qadam: Bizning Shiringina Xotiralarimiz ✨
      </h2>
      <p className="text-sm sm:text-base text-pink-100/80 mb-6 max-w-xl">
        {partnerName ? `${partnerName}, sen` : 'Sen'} bilan o'tgan har bir sekund men uchun bebaho xazina va baxtdir. Xotirani ochish uchun kartochkani bosing!
      </p>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
        {memories.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(item)}
            className="glass-card-interactive p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer group relative overflow-hidden"
          >
            {item.badge && (
              <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-pink-500/25 border border-pink-400/30 text-pink-200">
                {item.badge}
              </span>
            )}

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-400/30 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-md">
              <span>{item.icon}</span>
            </div>

            <h3 className="font-semibold text-pink-200 text-base group-hover:text-pink-100">
              {item.title}
            </h3>
            <p className="text-xs text-pink-300/70 mt-0.5 mb-2">
              {item.subtitle}
            </p>

            <span className="text-[11px] text-pink-400 group-hover:underline flex items-center gap-1 mt-auto">
              Batafsil o'qish <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons: Add Custom Memory & Next Step */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => {
            audioEngine.playChime(500);
            setIsAddingCustom(true);
          }}
          className="glass-btn px-5 py-2.5 rounded-full text-pink-200/90 hover:text-white text-xs sm:text-sm font-medium flex items-center gap-2 border-pink-400/30"
        >
          <Plus className="w-4 h-4 text-pink-400" />
          Yangi Shaxsiy Xotira Qo'shish
        </button>

        <button
          onClick={() => {
            audioEngine.playChime(800);
            onNext();
          }}
          className="glass-btn px-8 py-3 rounded-full text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-xl shadow-pink-500/30 hover:scale-105 transition-all"
        >
          Keyingi Bosqichga O'tish
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Memory Details Modal */}
      {selectedMemory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="glass-card max-w-md w-full p-6 sm:p-8 text-center relative border border-pink-400/50 rounded-3xl shadow-2xl bg-[#170428]/90"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-4xl mb-4 shadow-lg">
              {selectedMemory.icon}
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-medium border border-pink-400/30 mb-2">
              {selectedMemory.subtitle}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-pink-200 mb-3 font-romantic">
              {selectedMemory.title}
            </h3>

            <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed mb-6 font-light">
              "{selectedMemory.description}"
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-pink-300/70 mb-6">
              <Star className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>{selectedMemory.date || 'Har bir shirin onimizda'}</span>
              <Star className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            </div>

            <button
              onClick={() => {
                audioEngine.playChime(500);
                closeModal();
              }}
              className="glass-btn px-8 py-2.5 rounded-full text-white font-medium text-sm bg-pink-500/30 hover:bg-pink-500/50 border-pink-400/40 shadow-lg"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Add Custom Memory Modal */}
      {isAddingCustom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsAddingCustom(false)}
        >
          <div
            className="glass-card max-w-md w-full p-6 text-left relative border border-pink-400/50 rounded-3xl shadow-2xl bg-[#170428]/95"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-pink-200 mb-1 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
              Yangi Xotira Qo'shish
            </h3>
            <p className="text-xs text-pink-200/70 mb-4">
              Ikkalamiz uchun qadrli bo'lgan o'sha maxsus lahzani yozing:
            </p>

            <form onSubmit={handleAddMemory} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-pink-300 mb-1 block">Sarlavha:</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Samarqanddagi oqshom..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-300/40 text-sm focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="text-xs text-pink-300 mb-1 block">Xotira ta'rifi:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="O'sha kuni qanday baxtli ekanligimizni eslaysanmi..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-300/40 text-sm focus:outline-none focus:border-pink-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-pink-300 mb-1 block">Belgi (Emoji):</label>
                <div className="flex gap-2">
                  {['💖', '🌸', '✨', '☕', '🌟', '🌙', '🍫', '🎁'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewIcon(emoji)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg border transition-all ${
                        newIcon === emoji
                          ? 'bg-pink-500/40 border-pink-300 scale-110'
                          : 'bg-white/5 border-white/10 hover:bg-white/15'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="glass-btn px-4 py-2 rounded-xl text-xs text-pink-300"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="glass-btn px-5 py-2 rounded-xl text-xs font-semibold text-white bg-pink-500/40 hover:bg-pink-500/60 border-pink-400"
                >
                  Xotirani Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
