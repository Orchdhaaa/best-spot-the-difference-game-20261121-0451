// Boot: wires the page to the game. Exposes the game on window.__game so a
// play-tester (or a screenshot script) can read its state.

import { CuriousHouseGame } from './game.js';

function el(id) {
  return document.getElementById(id);
}

const game = new CuriousHouseGame({
  leftPanel: el('panel-left'),
  rightPanel: el('panel-right'),
  levelName: el('level-name'),
  timer: el('timer'),
  score: el('score'),
  counter: el('counter'),
  hintButton: el('hint-btn'),
  muteButton: el('mute-btn'),
  levelDots: Array.from(document.querySelectorAll('.level-dot')),
  titleOverlay: el('overlay-title'),
  completeOverlay: el('overlay-complete'),
  failOverlay: el('overlay-fail'),
  resultsOverlay: el('overlay-results'),
  completeTitle: el('complete-title'),
  completeBody: el('complete-body'),
  nextButton: el('next-btn'),
  failBody: el('fail-body'),
  resultsBody: el('results-body'),
});

game.showOverlay(game.els.titleOverlay);
game.updateHUD();

el('panel-left').addEventListener('click', (e) => game.onPanelClick(el('panel-left'), e));
el('panel-right').addEventListener('click', (e) => game.onPanelClick(el('panel-right'), e));
el('hint-btn').addEventListener('click', () => game.useHint());
el('mute-btn').addEventListener('click', () => game.toggleMute());
el('restart-btn').addEventListener('click', () => game.retryLevel());
el('start-btn').addEventListener('click', () => game.startGame());
el('next-btn').addEventListener('click', () => game.nextAfterComplete());
el('retry-btn').addEventListener('click', () => game.retryLevel());
el('again-btn').addEventListener('click', () => game.startGame());

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'h') game.useHint();
  else if (key === 'm') game.toggleMute();
  else if (key === 'r') game.retryLevel();
  else if (key === 'enter') {
    if (game.status === 'title') game.startGame();
    else if (game.status === 'level-done') game.nextAfterComplete();
    else if (game.status === 'failed') game.retryLevel();
    else if (game.status === 'done') game.startGame();
  }
});

window.__game = game;
