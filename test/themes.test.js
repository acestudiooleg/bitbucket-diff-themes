const { test } = require('node:test');
const assert = require('node:assert');
const { THEMES, THEME_ROLES } = require('../src/themes.js');

test('exactly 9 themes, monokai present', () => {
  const keys = Object.keys(THEMES);
  assert.strictEqual(keys.length, 9);
  assert.ok(keys.includes('monokai'));
});

test('every theme defines every role with a non-empty color', () => {
  for (const [name, theme] of Object.entries(THEMES)) {
    for (const role of THEME_ROLES) {
      assert.ok(theme[role], `${name} missing role ${role}`);
      assert.match(theme[role], /^(#|rgba?\()/, `${name}.${role} not a color`);
    }
  }
});
