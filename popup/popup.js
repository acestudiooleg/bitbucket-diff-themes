// popup/popup.js
const DEFAULTS = {
  enabled: true, theme: 'monokai', fontSize: 12.5, lineHeight: 1.55,
  fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace",
};

const els = {
  enabled: document.getElementById('enabled'),
  theme: document.getElementById('theme'),
  fontSize: document.getElementById('fontSize'),
  fontSizeOut: document.getElementById('fontSizeOut'),
  lineHeight: document.getElementById('lineHeight'),
  lineHeightOut: document.getElementById('lineHeightOut'),
  fontFamily: document.getElementById('fontFamily'),
};

// Populate theme dropdown from THEMES (global from themes.js).
for (const [key, theme] of Object.entries(THEMES)) {
  const opt = document.createElement('option');
  opt.value = key;
  opt.textContent = theme.label || key;
  els.theme.appendChild(opt);
}

function render(s) {
  els.enabled.checked = s.enabled;
  els.theme.value = s.theme;
  els.fontSize.value = s.fontSize;
  els.fontSizeOut.textContent = s.fontSize;
  els.lineHeight.value = s.lineHeight;
  els.lineHeightOut.textContent = s.lineHeight;
  els.fontFamily.value = s.fontFamily;
}

function save(patch) {
  chrome.storage.sync.set(patch);
}

chrome.storage.sync.get(null, (stored) => render(Object.assign({}, DEFAULTS, stored)));

els.enabled.addEventListener('change', () => save({ enabled: els.enabled.checked }));
els.theme.addEventListener('change', () => save({ theme: els.theme.value }));
els.fontFamily.addEventListener('change', () => save({ fontFamily: els.fontFamily.value }));
els.fontSize.addEventListener('input', () => {
  els.fontSizeOut.textContent = els.fontSize.value;
  save({ fontSize: parseFloat(els.fontSize.value) });
});
els.lineHeight.addEventListener('input', () => {
  els.lineHeightOut.textContent = els.lineHeight.value;
  save({ lineHeight: parseFloat(els.lineHeight.value) });
});
