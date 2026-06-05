const { test } = require('node:test');
const assert = require('node:assert');
const { langForPath } = require('../src/highlighter.js');

test('maps common extensions to Prism language ids', () => {
  assert.strictEqual(langForPath('OHIF/src/index.ts'), 'typescript');
  assert.strictEqual(langForPath('a/b/file.tsx'), 'tsx');
  assert.strictEqual(langForPath('x.js'), 'javascript');
  assert.strictEqual(langForPath('s.py'), 'python');
  assert.strictEqual(langForPath('styles.scss'), 'scss');
  assert.strictEqual(langForPath('data.json'), 'json');
  assert.strictEqual(langForPath('Main.java'), 'java');
});

test('unknown or extensionless paths return null', () => {
  assert.strictEqual(langForPath('LICENSE'), null);
  assert.strictEqual(langForPath('weird.xyz'), null);
  assert.strictEqual(langForPath(''), null);
});
