const { test } = require('node:test');
const assert = require('node:assert');
const { DEFAULT_SETTINGS, withDefaults } = require('../src/defaults.js');

test('defaults are Monokai, enabled', () => {
  assert.strictEqual(DEFAULT_SETTINGS.enabled, true);
  assert.strictEqual(DEFAULT_SETTINGS.theme, 'monokai');
});

test('withDefaults fills missing keys and keeps overrides', () => {
  const merged = withDefaults({ theme: 'dracula' });
  assert.strictEqual(merged.theme, 'dracula');
  assert.strictEqual(merged.enabled, true);
  assert.strictEqual(merged.fontSize, DEFAULT_SETTINGS.fontSize);
});

test('withDefaults(undefined) returns a full copy', () => {
  const merged = withDefaults(undefined);
  assert.deepStrictEqual(merged, DEFAULT_SETTINGS);
  assert.notStrictEqual(merged, DEFAULT_SETTINGS);
});
