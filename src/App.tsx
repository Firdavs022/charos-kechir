/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Step1Memories } from './components/Step1Memories';
import { Step2Letter } from './components/Step2Letter';
import { Step3Question } from './components/Step3Question';
import { Step4Celebration } from './components/Step4Celebration';
import { SettingsModal } from './components/SettingsModal';
import { CustomSettings } from './types';
import { audioEngine } from './utils/audio';

const STORAGE_KEY = 'romantic_apology_settings';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [fireworksTrigger, setFireworksTrigger] = useState<number>(0);

  const [settings, setSettings] = useState<CustomSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      partnerName: 'Jonim',
      senderName: 'Sening Sevgiling',
      customLetter: '',
    };
  });

  const saveSettings = (newSettings: CustomSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  };

  const handleToggleMusic = () => {
    audioEngine.toggleBGM(isMusicPlaying, (playing) => {
      setIsMusicPlaying(playing);
    });
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > maxUnlockedStep) {
      setMaxUnlockedStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleForgive = () => {
    setFireworksTrigger((prev) => prev + 1);
    goToStep(4);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Attempt auto-start sound on first user gesture
  useEffect(() => {
    const handleFirstClick = () => {
      if (!isMusicPlaying) {
        audioEngine.startBGM(undefined, (playing) => {
          setIsMusicPlaying(playing);
        });
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  }, [isMusicPlaying]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center p-3 sm:p-6 overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Background Animated Atmosphere */}
      <div className="bg-glow" />
      <ParticleCanvas launchFireworksTrigger={fireworksTrigger} />

      {/* Top Header & Navigation */}
      <Header
        currentStep={currentStep}
        onSelectStep={goToStep}
        maxUnlockedStep={maxUnlockedStep}
        partnerName={settings.partnerName}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Interactive Stage */}
      <main className="w-full max-w-3xl z-10 flex-1 flex items-center justify-center my-4 sm:my-8 px-1">
        {currentStep === 1 && (
          <Step1Memories
            onNext={() => goToStep(2)}
            partnerName={settings.partnerName}
          />
        )}

        {currentStep === 2 && (
          <Step2Letter
            onBack={() => goToStep(1)}
            onNext={() => goToStep(3)}
            partnerName={settings.partnerName}
            senderName={settings.senderName}
            customLetter={settings.customLetter}
          />
        )}

        {currentStep === 3 && (
          <Step3Question
            onForgive={handleForgive}
            partnerName={settings.partnerName}
          />
        )}

        {currentStep === 4 && (
          <Step4Celebration
            onRestart={handleRestart}
            partnerName={settings.partnerName}
            senderName={settings.senderName}
            onFireworkBurst={() => setFireworksTrigger((prev) => prev + 1)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-3xl z-10 py-3 text-center text-xs text-pink-200/50 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/5 mt-4">
        <p className="flex items-center gap-1.5">
          <span>Yurakdan va mehr bilan yaratildi</span>
          <span className="text-pink-400">❤️</span>
        </p>
        <p className="font-romantic text-sm text-pink-300/70">
          "Muhabbat — kechirim va tushunishdan boshlanadi"
        </p>
      </footer>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onSave={saveSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}
