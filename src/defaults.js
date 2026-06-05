const DEFAULT_SETTINGS = {
  enabled: true,
  theme: 'monokai',
  fontSize: 12.5,
  lineHeight: 1.55,
  fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace",
};

function withDefaults(stored) {
  return Object.assign({}, DEFAULT_SETTINGS, stored || {});
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_SETTINGS, withDefaults };
}
