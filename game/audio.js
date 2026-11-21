// Sound effects, synthesized with WebAudio: no audio files, no network.
// Every sound is a short oscillator phrase; the game stays silent until the
// player first interacts, so browsers allow the AudioContext.

export class SoundBank {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  tone(freq, at, dur, type = 'sine', vol = 0.12) {
    const ctx = this.ensure();
    if (!ctx || this.muted) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t0 = ctx.currentTime + at;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  playFind() {
    this.tone(660, 0, 0.14, 'sine', 0.14);
    this.tone(880, 0.09, 0.2, 'sine', 0.14);
  }

  playMiss() {
    this.tone(160, 0, 0.18, 'triangle', 0.1);
    this.tone(120, 0.05, 0.2, 'triangle', 0.08);
  }

  playHint() {
    this.tone(1200, 0, 0.1, 'sine', 0.07);
    this.tone(1500, 0.08, 0.14, 'sine', 0.06);
  }

  playTick() {
    this.tone(980, 0, 0.05, 'square', 0.04);
  }

  playWin() {
    [523, 659, 784, 1047].forEach((f, i) => this.tone(f, i * 0.11, 0.22, 'sine', 0.13));
  }

  playLose() {
    [392, 330, 262].forEach((f, i) => this.tone(f, i * 0.14, 0.22, 'triangle', 0.1));
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}
