// Panel rendering: turns a scene into the two side-by-side pictures, draws the
// found markers on both, and maps a mouse click back to scene coordinates.

export function buildPanelSVG(scene, variant, foundIds) {
  const marks = scene.differences
    .filter((d) => foundIds.has(d.id))
    .map(
      (d) => `
      <g class="found-mark">
        <circle cx="${d.x}" cy="${d.y}" r="${d.r + 8}" />
        <path d="M ${d.x - 8} ${d.y} l 6 6 l 12 -12" />
      </g>`,
    )
    .join('');
  return `<svg viewBox="0 0 640 480" role="img" aria-label="${scene.name}">${scene.build(variant)}${marks}</svg>`;
}

export function renderPanels(leftEl, rightEl, scene, foundIds) {
  leftEl.innerHTML = buildPanelSVG(scene, 0, foundIds);
  rightEl.innerHTML = buildPanelSVG(scene, 1, foundIds);
}

export function hintRingSVG(d) {
  return `<g class="hint-ring"><circle cx="${d.x}" cy="${d.y}" r="${d.r + 10}" /></g>`;
}

export function toScenePoint(svgEl, clientX, clientY) {
  const rect = svgEl.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 640;
  const y = ((clientY - rect.top) / rect.height) * 480;
  return { x, y };
}

export function pickDifference(scene, x, y, foundIds) {
  let best = null;
  let bestDist = Infinity;
  for (const d of scene.differences) {
    if (foundIds.has(d.id)) continue;
    const dist = Math.hypot(d.x - x, d.y - y);
    if (dist <= d.r + 10 && dist < bestDist) {
      best = d;
      bestDist = dist;
    }
  }
  return best;
}
