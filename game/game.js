// The game itself: levels, timer, clicks, hints, scoring, win and lose.
// One level is one scene; the two panels show the same room, the right one
// with every difference applied. A click on either panel that lands on an
// unfound difference marks it on both panels.

import { SCENES } from './scenes.js';
import { renderPanels, toScenePoint, pickDifference, hintRingSVG } from './render.js';
import { SoundBank } from './audio.js';

const MISS_PENALTY_SECONDS = 3;
const HINTS_PER_LEVEL = 3;
const FIND_POINTS = 100;

export class CuriousHouseGame {
  constructor(els) {
    this.els = els;
    this.sounds = new SoundBank();
    this.levelIndex = 0;
    this.scene = SCENES[0];
    this.found = new Set();
    this.score = 0;
    this.streak = 0;
    this.misses = 0;
    this.finds = 0;
    this.timeLeft = 0;
    this.hintsLeft = HINTS_PER_LEVEL;
    this.hintTarget = null;
    this.hintTimer = null;
    this.timerId = null;
    this.status = 'title';
  }

  startGame() {
    this.score = 0;
    this.finds = 0;
    this.misses = 0;
    this.startLevel(0);
  }

  startLevel(i) {
    this.levelIndex = i;
    this.scene = SCENES[i];
    this.found = new Set();
    this.streak = 0;
    this.timeLeft = this.scene.timeLimit;
    this.hintsLeft = HINTS_PER_LEVEL;
    this.clearHint();
    this.status = 'playing';
    this.hideOverlays();
    this.refreshPanels();
    this.updateHUD();
    this.startTimer();
  }

  startTimer() {
    this.stopTimer();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  stopTimer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  tick() {
    if (this.status !== 'playing') return;
    this.timeLeft -= 1;
    if (this.timeLeft <= 10 && this.timeLeft > 0) this.sounds.playTick();
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.updateHUD();
      this.levelFailed();
      return;
    }
    this.updateHUD();
  }

  refreshPanels() {
    renderPanels(this.els.leftPanel, this.els.rightPanel, this.scene, this.found);
    if (this.hintTarget) this.applyHintRing();
  }

  applyHintRing() {
    for (const panel of [this.els.leftPanel, this.els.rightPanel]) {
      const svg = panel.querySelector('svg');
      if (!svg) continue;
      svg.querySelectorAll('.hint-ring').forEach((n) => n.remove());
      const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      tmp.innerHTML = hintRingSVG(this.hintTarget);
      while (tmp.firstChild) svg.appendChild(tmp.firstChild);
    }
  }

  onPanelClick(panelEl, event) {
    if (this.status !== 'playing') return;
    const svg = panelEl.querySelector('svg');
    if (!svg) return;
    const pt = toScenePoint(svg, event.clientX, event.clientY);
    const diff = pickDifference(this.scene, pt.x, pt.y, this.found);
    if (diff) this.registerFind(panelEl, event, diff);
    else this.registerMiss(panelEl, event);
  }

  registerFind(panelEl, event, diff) {
    this.found.add(diff.id);
    this.finds += 1;
    this.streak += 1;
    const points = FIND_POINTS + (this.streak - 1) * 10;
    this.score += points;
    this.sounds.playFind();
    this.refreshPanels();
    this.showFloat(panelEl, event, `+${points}`, 'pop-good');
    this.updateHUD();
    if (this.found.size === this.scene.differences.length) {
      this.stopTimer();
      setTimeout(() => this.levelComplete(), 650);
    }
  }

  registerMiss(panelEl, event) {
    this.misses += 1;
    this.streak = 0;
    this.timeLeft = Math.max(0, this.timeLeft - MISS_PENALTY_SECONDS);
    this.sounds.playMiss();
    panelEl.classList.remove('shake');
    void panelEl.offsetWidth;
    panelEl.classList.add('shake');
    this.showFloat(panelEl, event, `−${MISS_PENALTY_SECONDS}s`, 'pop-bad');
    this.updateHUD();
    if (this.timeLeft <= 0) this.levelFailed();
  }

  useHint() {
    if (this.status !== 'playing' || this.hintsLeft <= 0) return;
    const remaining = this.scene.differences.filter((d) => !this.found.has(d.id));
    if (remaining.length === 0) return;
    this.hintsLeft -= 1;
    this.hintTarget = remaining[Math.floor(Math.random() * remaining.length)];
    this.sounds.playHint();
    this.applyHintRing();
    this.updateHUD();
    if (this.hintTimer !== null) clearTimeout(this.hintTimer);
    this.hintTimer = setTimeout(() => this.clearHint(), 2200);
  }

  clearHint() {
    this.hintTarget = null;
    if (this.hintTimer !== null) {
      clearTimeout(this.hintTimer);
      this.hintTimer = null;
    }
    for (const panel of [this.els.leftPanel, this.els.rightPanel]) {
      panel.querySelectorAll('.hint-ring').forEach((n) => n.remove());
    }
  }

  levelComplete() {
    if (this.status !== 'playing') return;
    const bonus = this.timeLeft * 5;
    this.score += bonus;
    this.status = 'level-done';
    this.sounds.playWin();
    this.updateHUD();
    const last = this.levelIndex === SCENES.length - 1;
    this.els.completeTitle.textContent = last ? 'The house is solved!' : `${this.scene.name} — cleared!`;
    this.els.completeBody.textContent = `Time bonus +${bonus} · ${this.found.size} of ${this.scene.differences.length} found · Score ${this.score}`;
    this.els.nextButton.textContent = last ? 'See my results' : 'Next room';
    this.showOverlay(this.els.completeOverlay);
  }

  levelFailed() {
    if (this.status !== 'playing') return;
    this.status = 'failed';
    this.stopTimer();
    this.sounds.playLose();
    this.els.failBody.textContent = `You found ${this.found.size} of ${this.scene.differences.length} in ${this.scene.name}. The clock ran out.`;
    this.showOverlay(this.els.failOverlay);
  }

  gameComplete() {
    this.status = 'done';
    this.stopTimer();
    this.sounds.playWin();
    const total = this.finds + this.misses;
    const accuracy = total === 0 ? 100 : Math.round((this.finds / total) * 100);
    this.els.resultsBody.textContent = `Final score ${this.score} · ${this.finds} finds · ${this.misses} misses · ${accuracy}% accuracy across all three rooms.`;
    this.showOverlay(this.els.resultsOverlay);
  }

  nextAfterComplete() {
    if (this.levelIndex >= SCENES.length - 1) this.gameComplete();
    else this.startLevel(this.levelIndex + 1);
  }

  retryLevel() {
    this.startLevel(this.levelIndex);
  }

  toggleMute() {
    const muted = this.sounds.toggleMute();
    this.els.muteButton.textContent = muted ? 'Sound: off' : 'Sound: on';
    return muted;
  }

  showFloat(panelEl, event, text, cls) {
    const rect = panelEl.getBoundingClientRect();
    const pop = document.createElement('div');
    pop.className = `float-pop ${cls}`;
    pop.textContent = text;
    pop.style.left = `${event.clientX - rect.left}px`;
    pop.style.top = `${event.clientY - rect.top}px`;
    panelEl.appendChild(pop);
    setTimeout(() => pop.remove(), 950);
  }

  showOverlay(el) {
    this.hideOverlays();
    el.classList.add('visible');
  }

  hideOverlays() {
    for (const o of [this.els.titleOverlay, this.els.completeOverlay, this.els.failOverlay, this.els.resultsOverlay]) {
      o.classList.remove('visible');
    }
  }

  updateHUD() {
    const remaining = this.scene.differences.length - this.found.size;
    this.els.levelName.textContent = `Room ${this.levelIndex + 1} of ${SCENES.length} — ${this.scene.name}`;
    this.els.timer.textContent = `${Math.floor(this.timeLeft / 60)}:${String(this.timeLeft % 60).padStart(2, '0')}`;
    this.els.timer.classList.toggle('low', this.timeLeft <= 15);
    this.els.score.textContent = String(this.score);
    this.els.counter.textContent = `${this.found.size} found · ${remaining} to go`;
    this.els.hintButton.textContent = `Hint (${this.hintsLeft})`;
    this.els.hintButton.disabled = this.hintsLeft <= 0 || this.status !== 'playing';
    this.els.levelDots.forEach((dot, i) => {
      dot.classList.toggle('done', i < this.levelIndex);
      dot.classList.toggle('current', i === this.levelIndex);
    });
  }
}
