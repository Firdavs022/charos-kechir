/**
 * Web Audio API synthesizer for romantic ambient melodies and sound effects.
 * Works completely offline without depending on external network assets,
 * while also supporting external mp3 streams.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMelodyPlaying: boolean = false;
  private melodyTimer: number | null = null;
  private externalAudio: HTMLAudioElement | null = null;
  private useExternal: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft romantic chime when hovering or tapping
  playChime(note = 523.25) { // C5
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(note * 1.5, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch {
      // ignore audio context restrictions
    }
  }

  // Playful boing/whoosh sound when "Yo'q" button flees
  playBoing() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // ignore
    }
  }

  // Heartfelt harp / chord fanfare on forgiveness (Ha, Kechiraman)
  playHarpFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      chords.forEach((freq, index) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 1.2);
        }, index * 90);
      });
    } catch {
      // ignore
    }
  }

  // Envelope open sound effect
  playEnvelopeOpen() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch {
      // ignore
    }
  }

  // Typewriter subtle key sound
  playKeyTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900 + Math.random() * 300, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // ignore
    }
  }

  // Background romantic piano arpeggiator (infinite relaxing music box)
  startSynthMelody() {
    if (this.isMelodyPlaying) return;
    this.isMelodyPlaying = true;
    this.initContext();

    const notes = [
      261.63, 329.63, 392.00, 523.25, // C - E - G - C
      220.00, 261.63, 329.63, 440.00, // A - C - E - A
      174.61, 220.00, 261.63, 349.23, // F - A - C - F
      196.00, 246.94, 293.66, 392.00  // G - B - D - G
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isMelodyPlaying) return;
      if (!this.isMuted && this.ctx) {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[noteIndex % notes.length], this.ctx.currentTime);

          gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 1.2);
        } catch {
          // ignore
        }
      }
      noteIndex++;
      this.melodyTimer = window.setTimeout(playNext, 450);
    };

    playNext();
  }

  stopSynthMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  // Start background audio (attempts mp3 first, falls back smoothly to ambient synth)
  startBGM(url = "https://assets.mixkit.co/music/preview/mixkit-romantic-sunset-2533.mp3", onStateChange?: (playing: boolean) => void) {
    if (this.externalAudio) {
      this.externalAudio.pause();
      this.externalAudio = null;
    }

    try {
      this.externalAudio = new Audio(url);
      this.externalAudio.loop = true;
      this.externalAudio.volume = 0.55;

      const playPromise = this.externalAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.useExternal = true;
            onStateChange?.(true);
          })
          .catch(() => {
            // If browser blocks audio URL or network fails, fallback to Web Audio Synth
            this.useExternal = false;
            this.startSynthMelody();
            onStateChange?.(true);
          });
      }
    } catch {
      this.useExternal = false;
      this.startSynthMelody();
      onStateChange?.(true);
    }
  }

  toggleBGM(isPlaying: boolean, onStateChange?: (playing: boolean) => void) {
    if (isPlaying) {
      if (this.externalAudio) {
        this.externalAudio.pause();
      }
      this.stopSynthMelody();
      onStateChange?.(false);
    } else {
      this.startBGM("https://assets.mixkit.co/music/preview/mixkit-romantic-sunset-2533.mp3", onStateChange);
    }
  }

  stopAll() {
    if (this.externalAudio) {
      this.externalAudio.pause();
    }
    this.stopSynthMelody();
  }
}

export const audioEngine = new RomanticAudioEngine();
