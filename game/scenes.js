// Scene definitions for The Curious House. Each scene is a hand-drawn SVG room
// (viewBox 0 0 640 480) rendered twice: variant 0 is the left panel (the original),
// variant 1 is the right panel (the same room with every difference applied).
// A difference is { id, x, y, r, label }: the click target in scene coordinates.

export const SCENES = [
  {
    id: 'study',
    name: 'The Study',
    subtitle: 'A quiet room, a curious cat, seven small lies.',
    timeLimit: 150,
    differences: [
      { id: 'clock', x: 320, y: 92, r: 30, label: 'the clock hands' },
      { id: 'cat-tail', x: 200, y: 400, r: 25, label: 'the cat’s tail' },
      { id: 'book-red', x: 374, y: 103, r: 22, label: 'the red book' },
      { id: 'teapot-spout', x: 462, y: 308, r: 22, label: 'the teapot spout' },
      { id: 'lamp-glow', x: 282, y: 222, r: 36, label: 'the lamp glow' },
      { id: 'star', x: 92, y: 82, r: 16, label: 'the window star' },
      { id: 'flower', x: 580, y: 316, r: 20, label: 'the plant flower' },
    ],
    build(v) {
      const clockHands =
        v === 0
          ? `<line x1="320" y1="92" x2="320" y2="70" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/><line x1="320" y1="92" x2="338" y2="92" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/>`
          : `<line x1="320" y1="92" x2="320" y2="114" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/><line x1="320" y1="92" x2="298" y2="92" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/>`;
      return `
      <rect width="640" height="480" fill="#e8d5b0"/>
      <rect y="360" width="640" height="120" fill="#8a5a33"/>
      <rect y="352" width="640" height="10" fill="#6e4525"/>
      <ellipse cx="320" cy="420" rx="220" ry="34" fill="#b5533c"/>
      <ellipse cx="320" cy="420" rx="180" ry="24" fill="#c96a4a"/>
      <rect x="40" y="40" width="120" height="150" rx="6" fill="#2e4a6b"/>
      <rect x="48" y="48" width="104" height="134" fill="#16283e"/>
      <circle cx="120" cy="80" r="16" fill="#f4e3b2"/>
      ${v === 0 ? `<path d="M92 82 l4 8 8 1 -6 6 2 8 -8 -5 -8 5 2 -8 -6 -6 8 -1 z" fill="#ffe066"/>` : ''}
      <path d="M60 150 q20 -14 40 0 q20 -14 40 0" stroke="#16283e" stroke-width="3" fill="none"/>
      <rect x="200" y="30" width="240" height="130" rx="4" fill="#7a4a28"/>
      <rect x="210" y="40" width="220" height="110" rx="2" fill="#5d3619"/>
      <rect x="216" y="46" width="60" height="34" fill="#b5533c"/><rect x="280" y="46" width="60" height="34" fill="#3f7a4e"/><rect x="344" y="46" width="60" height="34" fill="#2e5a8a"/>
      <rect x="216" y="86" width="60" height="34" fill="#c99a3c"/><rect x="280" y="86" width="60" height="34" fill="#7a4a8a"/>
      ${v === 0 ? `<rect x="344" y="86" width="60" height="34" fill="#b5533c"/>` : `<rect x="344" y="86" width="60" height="34" fill="#5d3619"/>`}
      <rect x="216" y="126" width="60" height="18" fill="#3f7a4e"/><rect x="280" y="126" width="60" height="18" fill="#b5533c"/><rect x="344" y="126" width="60" height="18" fill="#c99a3c"/>
      <rect x="470" y="30" width="130" height="130" rx="4" fill="#6b4423"/>
      <rect x="478" y="38" width="114" height="114" fill="#f4ead2"/>
      <circle cx="535" cy="95" r="34" fill="#7fb069"/>
      <path d="M505 130 q30 -18 60 0" stroke="#5d8a4a" stroke-width="4" fill="none"/>
      <circle cx="320" cy="92" r="34" fill="#f4ead2" stroke="#2b2118" stroke-width="4"/>
      ${clockHands}
      <circle cx="320" cy="92" r="4" fill="#2b2118"/>
      <rect x="180" y="240" width="280" height="120" rx="6" fill="#5d3619"/>
      <rect x="180" y="240" width="280" height="14" fill="#7a4a28"/>
      <rect x="196" y="360" width="14" height="90" fill="#4a2c14"/><rect x="430" y="360" width="14" height="90" fill="#4a2c14"/>
      <rect x="252" y="180" width="60" height="60" rx="4" fill="#2e5a8a"/>
      <path d="M282 180 v-28 a12 12 0 0 1 24 0 v28" fill="none" stroke="#2b2118" stroke-width="5"/>
      ${v === 0 ? `<ellipse cx="294" cy="212" rx="34" ry="26" fill="#ffe9a8" opacity="0.55"/><circle cx="294" cy="212" r="12" fill="#fff3c4"/>` : `<circle cx="294" cy="212" r="12" fill="#d8c9a8"/>`}
      <ellipse cx="424" cy="310" rx="34" ry="22" fill="#3f7a4e"/>
      <path d="M424 288 q0 -14 12 -14" fill="none" stroke="#2e5a3c" stroke-width="5"/>
      ${v === 0 ? `<path d="M456 302 q18 4 12 16 q-6 8 -16 2" fill="none" stroke="#2e5a3c" stroke-width="5"/>` : ''}
      <rect x="360" y="300" width="30" height="40" rx="3" fill="#b5533c"/>
      <rect x="360" y="300" width="30" height="8" fill="#8a3a28"/>
      <ellipse cx="148" cy="400" rx="46" ry="26" fill="#3a3a3a"/>
      <circle cx="120" cy="372" r="22" fill="#3a3a3a"/>
      <path d="M104 356 l6 -12 8 10 z" fill="#3a3a3a"/><path d="M128 356 l6 -12 8 10 z" fill="#3a3a3a"/>
      ${v === 0 ? `<path d="M190 392 q26 -6 22 18 q-2 12 -16 10" fill="none" stroke="#3a3a3a" stroke-width="7" stroke-linecap="round"/>` : ''}
      <circle cx="112" cy="368" r="3" fill="#ffe066"/><circle cx="126" cy="368" r="3" fill="#ffe066"/>
      <rect x="560" y="360" width="44" height="60" rx="4" fill="#b5533c"/>
      <path d="M582 360 q-6 -30 -22 -40 M582 360 q2 -34 18 -44 M582 360 q10 -28 26 -34" stroke="#3f7a4e" stroke-width="5" fill="none"/>
      ${v === 0 ? `<circle cx="560" cy="318" r="9" fill="#e87a90"/><circle cx="600" cy="314" r="9" fill="#e87a90"/>` : ''}
      `;
    },
  },
  {
    id: 'greenhouse',
    name: 'The Greenhouse',
    subtitle: 'Glass, green, and ten things that moved.',
    timeLimit: 120,
    differences: [
      { id: 'butterfly', x: 480, y: 122, r: 22, label: 'the butterfly' },
      { id: 'can-spout', x: 240, y: 386, r: 22, label: 'the watering-can spout' },
      { id: 'flower-color', x: 352, y: 302, r: 20, label: 'the flower colour' },
      { id: 'pot', x: 552, y: 422, r: 22, label: 'the small pot' },
      { id: 'sun-rays', x: 92, y: 72, r: 30, label: 'the sun rays' },
      { id: 'leaf', x: 302, y: 182, r: 18, label: 'the missing leaf' },
      { id: 'tool', x: 452, y: 380, r: 20, label: 'the trowel' },
      { id: 'pane', x: 252, y: 62, r: 26, label: 'the cracked pane' },
      { id: 'mushroom', x: 122, y: 432, r: 20, label: 'the mushroom' },
      { id: 'bird', x: 562, y: 62, r: 20, label: 'the roof bird' },
    ],
    build(v) {
      const sunRays =
        v === 0
          ? `<g stroke="#f4c542" stroke-width="5" stroke-linecap="round"><line x1="92" y1="30" x2="92" y2="14"/><line x1="92" y1="114" x2="92" y2="130"/><line x1="50" y1="72" x2="34" y2="72"/><line x1="134" y1="72" x2="150" y2="72"/><line x1="62" y1="42" x2="50" y2="30"/><line x1="122" y1="42" x2="134" y2="30"/><line x1="62" y1="102" x2="50" y2="114"/><line x1="122" y1="102" x2="134" y2="114"/></g>`
          : `<g stroke="#f4c542" stroke-width="5" stroke-linecap="round"><line x1="92" y1="30" x2="92" y2="14"/><line x1="92" y1="114" x2="92" y2="130"/><line x1="50" y1="72" x2="34" y2="72"/><line x1="134" y1="72" x2="150" y2="72"/><line x1="62" y1="42" x2="50" y2="30"/></g>`;
      return `
      <rect width="640" height="480" fill="#bfe3c0"/>
      <path d="M0 120 L320 20 L640 120 L640 480 L0 480 Z" fill="#dcefd9"/>
      <g stroke="#5d8a6a" stroke-width="6"><line x1="0" y1="120" x2="640" y2="120"/><line x1="160" y1="70" x2="160" y2="480"/><line x1="320" y1="20" x2="320" y2="480"/><line x1="480" y1="70" x2="480" y2="480"/><line x1="0" y1="300" x2="640" y2="300"/></g>
      <circle cx="92" cy="72" r="28" fill="#f4c542"/>
      ${sunRays}
      ${v === 1 ? `<path d="M238 48 l14 12 l-10 14 l-12 -8 z" fill="none" stroke="#5d8a6a" stroke-width="3"/>` : ''}
      ${v === 0 ? `<path d="M552 62 q6 -8 12 0 q6 -8 12 0 l-4 10 h-16 z" fill="#2e4a6b"/><circle cx="556" cy="56" r="4" fill="#2e4a6b"/>` : ''}
      <rect x="60" y="380" width="520" height="100" fill="#8a5a33"/>
      <rect x="60" y="372" width="520" height="10" fill="#6e4525"/>
      <rect x="120" y="300" width="400" height="80" rx="6" fill="#6b4423"/>
      <rect x="120" y="300" width="400" height="12" fill="#8a5a33"/>
      <path d="M180 300 q-10 -60 20 -90 q10 40 30 40 q-6 -50 24 -70 q4 44 26 52 q-10 -40 30 -56 q-2 50 10 66" stroke="#3f7a4e" stroke-width="6" fill="none"/>
      <circle cx="352" cy="302" r="14" fill="${v === 0 ? '#e87a90' : '#f4c542'}"/>
      <circle cx="352" cy="302" r="5" fill="#fff3c4"/>
      ${v === 0 ? `<ellipse cx="302" cy="182" rx="16" ry="8" fill="#3f7a4e" transform="rotate(-30 302 182)"/>` : ''}
      <path d="M480 122 q-14 -10 -6 -22 q10 2 12 12 q10 -4 14 6 q-8 8 -20 4" fill="#7a4a8a"/>
      ${v === 0 ? `<path d="M480 122 q-14 -10 -6 -22 q10 2 12 12 q10 -4 14 6 q-8 8 -20 4" fill="#b06ab0" transform="translate(0 -14)"/>` : ''}
      <ellipse cx="202" cy="392" rx="30" ry="18" fill="#2e5a8a"/>
      <rect x="168" y="368" width="40" height="14" rx="4" fill="#2e5a8a"/>
      ${v === 0 ? `<path d="M228 382 q22 -4 26 8" fill="none" stroke="#2e5a8a" stroke-width="7" stroke-linecap="round"/>` : ''}
      <rect x="430" y="380" width="44" height="16" rx="3" fill="#8a8a8a"/>
      ${v === 0 ? `<path d="M452 380 v-18 h10 v18" fill="#6e6e6e"/>` : ''}
      <rect x="540" y="400" width="26" height="44" rx="3" fill="#b5533c"/>
      ${v === 0 ? `<rect x="536" y="392" width="34" height="12" rx="3" fill="#c96a4a"/>` : ''}
      <ellipse cx="122" cy="442" rx="18" ry="12" fill="#e87a90"/>
      ${v === 0 ? `<rect x="118" y="420" width="8" height="16" rx="4" fill="#f4ead2"/>` : ''}
      <path d="M60 480 q80 -30 160 0 q80 -30 160 0 q80 -30 160 0 q40 -14 100 0" stroke="#3f7a4e" stroke-width="5" fill="none"/>
      `;
    },
  },
  {
    id: 'attic',
    name: 'The Night Attic',
    subtitle: 'Moonlight, moths, and twelve things that changed.',
    timeLimit: 90,
    differences: [
      { id: 'owl-eyes', x: 502, y: 130, r: 18, label: 'the owl’s eyes' },
      { id: 'flame', x: 187, y: 292, r: 14, label: 'the candle flame' },
      { id: 'star', x: 82, y: 72, r: 14, label: 'the attic star' },
      { id: 'scope', x: 395, y: 200, r: 30, label: 'the telescope' },
      { id: 'web', x: 560, y: 62, r: 24, label: 'the cobweb' },
      { id: 'trunk-book', x: 302, y: 382, r: 20, label: 'the trunk book' },
      { id: 'crater', x: 122, y: 92, r: 18, label: 'the moon crater' },
      { id: 'key', x: 452, y: 422, r: 18, label: 'the chest key' },
      { id: 'rug-stripe', x: 252, y: 442, r: 22, label: 'the rug stripe' },
      { id: 'mouse', x: 552, y: 442, r: 18, label: 'the little mouse' },
      { id: 'candle-count', x: 161, y: 320, r: 20, label: 'the candles' },
      { id: 'window', x: 522, y: 252, r: 26, label: 'the small window' },
    ],
    build(v) {
      const scope =
        v === 0
          ? `<g transform="rotate(-28 352 202)"><rect x="352" y="192" width="90" height="18" rx="9" fill="#8a8a8a"/><path d="M442 192 l26 -6 v30 l-26 -6 z" fill="#6e6e6e"/></g><rect x="344" y="210" width="10" height="90" fill="#4a4a4a"/><rect x="330" y="300" width="40" height="8" fill="#4a4a4a"/>`
          : `<g transform="rotate(24 352 202)"><rect x="352" y="192" width="90" height="18" rx="9" fill="#8a8a8a"/><path d="M442 192 l26 -6 v30 l-26 -6 z" fill="#6e6e6e"/></g><rect x="344" y="210" width="10" height="90" fill="#4a4a4a"/><rect x="330" y="300" width="40" height="8" fill="#4a4a4a"/>`;
      return `
      <rect width="640" height="480" fill="#1d2440"/>
      <path d="M0 480 L0 160 L320 20 L640 160 L640 480 Z" fill="#2a3358"/>
      <path d="M0 160 L320 20 L640 160" stroke="#141a30" stroke-width="10" fill="none"/>
      <rect y="400" width="640" height="80" fill="#4a2c14"/>
      <circle cx="122" cy="92" r="34" fill="#f4e3b2"/>
      ${v === 0 ? `<circle cx="112" cy="82" r="7" fill="#d8c9a8"/><circle cx="132" cy="100" r="5" fill="#d8c9a8"/>` : ''}
      ${v === 0 ? `<path d="M82 72 l3 6 6 1 -4 5 1 6 -6 -4 -6 4 1 -6 -4 -5 6 -1 z" fill="#ffe066"/>` : ''}
      <path d="M200 60 l3 6 6 1 -4 5 1 6 -6 -4 -6 4 1 -6 -4 -5 6 -1 z" fill="#ffe066"/>
      <path d="M300 44 l3 6 6 1 -4 5 1 6 -6 -4 -6 4 1 -6 -4 -5 6 -1 z" fill="#ffe066"/>
      ${v === 0 ? `<path d="M560 40 q22 22 0 44 q22 -22 0 -44" stroke="#d8d8e8" stroke-width="2" fill="none"/><path d="M560 62 q-12 0 -22 10 M560 62 q12 0 22 10 M560 40 v44" stroke="#d8d8e8" stroke-width="2" fill="none"/>` : ''}
      <rect x="480" y="220" width="90" height="70" rx="4" fill="#141a30"/>
      <rect x="488" y="228" width="74" height="54" fill="#3a4a7a"/>
      ${v === 0 ? `<rect x="488" y="228" width="74" height="54" fill="#1d2440"/><line x1="488" y1="228" x2="562" y2="282" stroke="#3a4a7a" stroke-width="3"/><line x1="562" y1="228" x2="488" y2="282" stroke="#3a4a7a" stroke-width="3"/>` : `<rect x="488" y="228" width="74" height="54" fill="#7fb069" opacity="0.7"/>`}
      ${scope}
      <rect x="120" y="340" width="160" height="90" rx="6" fill="#6b4423"/>
      <rect x="120" y="340" width="160" height="12" fill="#8a5a33"/>
      <rect x="190" y="352" width="20" height="30" rx="3" fill="#c99a3c"/>
      ${v === 0 ? `<rect x="280" y="360" width="44" height="14" rx="2" fill="#b5533c"/><rect x="280" y="374" width="44" height="10" rx="2" fill="#3f7a4e"/>` : ''}
      <rect x="400" y="380" width="110" height="60" rx="6" fill="#5d3619"/>
      <rect x="400" y="380" width="110" height="10" fill="#7a4a28"/>
      ${v === 0 ? `<circle cx="452" cy="422" r="7" fill="#c99a3c"/><rect x="452" y="428" width="4" height="12" fill="#c99a3c"/>` : ''}
      <ellipse cx="502" cy="170" rx="30" ry="36" fill="#8a6a4a"/>
      <circle cx="502" cy="132" r="22" fill="#8a6a4a"/>
      <path d="M486 116 l4 -12 8 10 z" fill="#8a6a4a"/><path d="M512 116 l4 -12 8 10 z" fill="#8a6a4a"/>
      ${v === 0 ? `<circle cx="494" cy="130" r="5" fill="#ffe066"/><circle cx="510" cy="130" r="5" fill="#ffe066"/>` : `<path d="M488 130 q6 5 12 0 M504 130 q6 5 12 0" stroke="#2b2118" stroke-width="3" fill="none"/>`}
      <path d="M486 190 q16 10 32 0" stroke="#6b4a2a" stroke-width="4" fill="none"/>
      ${v === 0 ? `<rect x="154" y="300" width="14" height="60" rx="3" fill="#f4ead2"/>` : ''}
      <rect x="180" y="300" width="14" height="60" rx="3" fill="#f4ead2"/>
      <rect x="206" y="300" width="14" height="60" rx="3" fill="#f4ead2"/>
      ${v === 0 ? `<ellipse cx="161" cy="292" rx="6" ry="10" fill="#ffb347"/>` : ''}
      ${v === 0 ? `<ellipse cx="187" cy="292" rx="6" ry="10" fill="#ffb347"/>` : ''}
      <ellipse cx="213" cy="292" rx="6" ry="10" fill="#ffb347"/>
      <ellipse cx="252" cy="452" rx="120" ry="18" fill="#7a4a8a"/>
      ${v === 0 ? `<rect x="180" y="444" width="144" height="6" fill="#b06ab0"/>` : ''}
      ${v === 0 ? `<ellipse cx="552" cy="448" rx="14" ry="9" fill="#8a8a8a"/><circle cx="542" cy="442" r="7" fill="#8a8a8a"/><path d="M546 436 q8 -6 10 2" fill="none" stroke="#8a8a8a" stroke-width="3"/>` : ''}
      `;
    },
  },
];

export function sceneById(id) {
  return SCENES.find((s) => s.id === id) ?? SCENES[0];
}
