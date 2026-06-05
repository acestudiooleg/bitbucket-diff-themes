const { test } = require('node:test');
const assert = require('node:assert');
const { buildThemeVars, VAR_MAP } = require('../src/theme-css.js');
const { THEMES, THEME_ROLES } = require('../src/themes.js');

const typography = { fontSize: 12.5, lineHeight: 1.55, fontFamily: "'JetBrains Mono', monospace" };

test('VAR_MAP covers every theme role', () => {
  for (const role of THEME_ROLES) assert.ok(VAR_MAP[role], `no var for ${role}`);
});

test('buildThemeVars emits a :root block with every palette + typography var', () => {
  const css = buildThemeVars(THEMES.monokai, typography);
  assert.match(css, /^:root\s*\{/);
  for (const role of THEME_ROLES) {
    assert.ok(css.includes(`${VAR_MAP[role]}:`), `missing ${VAR_MAP[role]}`);
  }
  assert.ok(css.includes('--bdt-keyword:#f92672'));
  assert.ok(css.includes('--bdt-font-size:12.5px'));
  assert.ok(css.includes('--bdt-line-height:1.55'));
  assert.ok(css.includes("--bdt-font-family:'JetBrains Mono', monospace"));
});
