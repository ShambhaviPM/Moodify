// Sound effects manager for Moodify
// Uses Web Audio API for generating sounds (no external files needed)

class SoundManager {
  constructor() {
    this.enabled = this.loadSoundPreference();
    this.audioContext = null;
    this.initialized = false;
  }

  // Initialize audio context (must be called after user interaction)
  init() {
    if (this.initialized) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  // Load sound preference from localStorage
  loadSoundPreference() {
    const saved = localStorage.getItem('moodify_sound');
    return saved !== 'false'; // Default to enabled
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('moodify_sound', this.enabled.toString());
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  // Check if enabled
  isEnabled() {
    return this.enabled;
  }

  // Create oscillator for synthetic sounds
  createOscillator(frequency, type = 'sine', duration = 0.1) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Click sound - short blip
  playClick() {
    this.init();
    this.createOscillator(800, 'sine', 0.05);
  }

  // Hover sound - soft tone
  playHover() {
    this.init();
    this.createOscillator(600, 'sine', 0.03);
  }

  // Success sound - ascending tones
  playSuccess() {
    this.init();
    if (!this.enabled || !this.audioContext) return;

    const frequencies = [523, 659, 784]; // C5, E5, G5 (major chord)
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 'sine', 0.15);
      }, i * 100);
    });
  }

  // XP gain sound
  playXPGain() {
    this.init();
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  // Level up sound - fanfare
  playLevelUp() {
    this.init();
    if (!this.enabled || !this.audioContext) return;

    const notes = [
      { freq: 523, time: 0 },     // C5
      { freq: 659, time: 0.1 },   // E5
      { freq: 784, time: 0.2 },   // G5
      { freq: 1047, time: 0.3 },  // C6
    ];

    notes.forEach(({ freq, time }) => {
      setTimeout(() => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = freq;

        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
      }, time * 1000);
    });
  }

  // Error sound - descending tone
  playError() {
    this.init();
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  // Selection sound
  playSelect() {
    this.init();
    this.createOscillator(1000, 'sine', 0.08);
    setTimeout(() => this.createOscillator(1200, 'sine', 0.08), 50);
  }

  // Navigate/transition sound
  playNavigate() {
    this.init();
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }
}

// Export singleton instance
const soundManager = new SoundManager();
export default soundManager;
